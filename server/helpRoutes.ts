import { Router } from "express";
import { storage } from "./storage";
import { helpCategories, helpArticles, helpFeedback, users } from "@shared/schema";
import { eq, desc, asc, and, sql, like } from "drizzle-orm";
import type { Request, Response } from "express";

const router = Router();

// Middleware to check admin role
const requireAdmin = (req: Request, res: Response, next: Function) => {
  if (!req.session.user || req.session.user.role !== 'admin') {
    return res.status(403).json({ message: "Admin access required" });
  }
  next();
};

// PUBLIC ROUTES - Help for users

// Get all published categories with article count
router.get("/categories", async (req: Request, res: Response) => {
  try {
    const categoriesWithCount = await storage.db
      .select({
        id: helpCategories.id,
        name: helpCategories.name,
        slug: helpCategories.slug,
        description: helpCategories.description,
        icon: helpCategories.icon,
        order: helpCategories.order,
        articleCount: sql<number>`count(${helpArticles.id})::int`
      })
      .from(helpCategories)
      .leftJoin(helpArticles, and(
        eq(helpCategories.id, helpArticles.categoryId),
        eq(helpArticles.published, true)
      ))
      .where(eq(helpCategories.published, true))
      .groupBy(helpCategories.id)
      .orderBy(asc(helpCategories.order), asc(helpCategories.name));

    res.json(categoriesWithCount);
  } catch (error) {
    console.error("Error fetching help categories:", error);
    res.status(500).json({ message: "Failed to fetch categories" });
  }
});

// Get articles by category
router.get("/categories/:slug/articles", async (req: Request, res: Response) => {
  try {
    const { slug } = req.params;
    
    const category = await storage.db
      .select()
      .from(helpCategories)
      .where(and(eq(helpCategories.slug, slug), eq(helpCategories.published, true)))
      .limit(1);

    if (!category.length) {
      return res.status(404).json({ message: "Category not found" });
    }

    const articles = await storage.db
      .select({
        id: helpArticles.id,
        title: helpArticles.title,
        slug: helpArticles.slug,
        excerpt: helpArticles.excerpt,
        author: helpArticles.author,
        views: helpArticles.views,
        helpful: helpArticles.helpful,
        notHelpful: helpArticles.notHelpful,
        featured: helpArticles.featured,
        createdAt: helpArticles.createdAt,
        updatedAt: helpArticles.updatedAt
      })
      .from(helpArticles)
      .where(and(
        eq(helpArticles.categoryId, category[0].id),
        eq(helpArticles.published, true)
      ))
      .orderBy(desc(helpArticles.featured), asc(helpArticles.order), desc(helpArticles.createdAt));

    res.json({ category: category[0], articles });
  } catch (error) {
    console.error("Error fetching category articles:", error);
    res.status(500).json({ message: "Failed to fetch articles" });
  }
});

// Get single article
router.get("/articles/:slug", async (req: Request, res: Response) => {
  try {
    const { slug } = req.params;
    
    const article = await storage.db
      .select({
        id: helpArticles.id,
        title: helpArticles.title,
        slug: helpArticles.slug,
        content: helpArticles.content,
        excerpt: helpArticles.excerpt,
        author: helpArticles.author,
        tags: helpArticles.tags,
        views: helpArticles.views,
        helpful: helpArticles.helpful,
        notHelpful: helpArticles.notHelpful,
        createdAt: helpArticles.createdAt,
        updatedAt: helpArticles.updatedAt,
        categoryName: helpCategories.name,
        categorySlug: helpCategories.slug
      })
      .from(helpArticles)
      .leftJoin(helpCategories, eq(helpArticles.categoryId, helpCategories.id))
      .where(and(eq(helpArticles.slug, slug), eq(helpArticles.published, true)))
      .limit(1);

    if (!article.length) {
      return res.status(404).json({ message: "Article not found" });
    }

    // Increment view count
    await storage.db
      .update(helpArticles)
      .set({ views: sql`${helpArticles.views} + 1` })
      .where(eq(helpArticles.id, article[0].id));

    res.json(article[0]);
  } catch (error) {
    console.error("Error fetching article:", error);
    res.status(500).json({ message: "Failed to fetch article" });
  }
});

// Search articles
router.get("/search", async (req: Request, res: Response) => {
  try {
    const { q } = req.query;
    
    if (!q || typeof q !== 'string') {
      return res.status(400).json({ message: "Search query required" });
    }

    const searchTerm = `%${q}%`;
    
    const results = await storage.db
      .select({
        id: helpArticles.id,
        title: helpArticles.title,
        slug: helpArticles.slug,
        excerpt: helpArticles.excerpt,
        author: helpArticles.author,
        categoryName: helpCategories.name,
        categorySlug: helpCategories.slug,
        createdAt: helpArticles.createdAt
      })
      .from(helpArticles)
      .leftJoin(helpCategories, eq(helpArticles.categoryId, helpCategories.id))
      .where(and(
        eq(helpArticles.published, true),
        sql`(${helpArticles.title} ILIKE ${searchTerm} OR ${helpArticles.content} ILIKE ${searchTerm} OR ${helpArticles.excerpt} ILIKE ${searchTerm})`
      ))
      .orderBy(desc(helpArticles.createdAt))
      .limit(50);

    res.json(results);
  } catch (error) {
    console.error("Error searching articles:", error);
    res.status(500).json({ message: "Failed to search articles" });
  }
});

// Submit feedback
router.post("/articles/:id/feedback", async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { type, comment, email } = req.body;

    if (!type || !['helpful', 'not_helpful', 'suggestion'].includes(type)) {
      return res.status(400).json({ message: "Invalid feedback type" });
    }

    // Check if article exists
    const article = await storage.db
      .select({ id: helpArticles.id })
      .from(helpArticles)
      .where(eq(helpArticles.id, id))
      .limit(1);

    if (!article.length) {
      return res.status(404).json({ message: "Article not found" });
    }

    // Insert feedback
    await storage.db.insert(helpFeedback).values({
      articleId: id,
      userId: req.session.user?.id || null,
      type,
      comment: comment || null,
      email: email || null
    });

    // Update article counters
    if (type === 'helpful') {
      await storage.db
        .update(helpArticles)
        .set({ helpful: sql`${helpArticles.helpful} + 1` })
        .where(eq(helpArticles.id, id));
    } else if (type === 'not_helpful') {
      await storage.db
        .update(helpArticles)
        .set({ notHelpful: sql`${helpArticles.notHelpful} + 1` })
        .where(eq(helpArticles.id, id));
    }

    res.json({ message: "Feedback submitted successfully" });
  } catch (error) {
    console.error("Error submitting feedback:", error);
    res.status(500).json({ message: "Failed to submit feedback" });
  }
});

// ADMIN ROUTES - Manage help content

// Get all categories (admin)
router.get("/admin/categories", requireAdmin, async (req: Request, res: Response) => {
  try {
    const categories = await storage.db
      .select()
      .from(helpCategories)
      .orderBy(asc(helpCategories.order), asc(helpCategories.name));

    res.json(categories);
  } catch (error) {
    console.error("Error fetching admin categories:", error);
    res.status(500).json({ message: "Failed to fetch categories" });
  }
});

// Create category (admin)
router.post("/admin/categories", requireAdmin, async (req: Request, res: Response) => {
  try {
    const { name, slug, description, icon, order, published } = req.body;

    if (!name || !slug) {
      return res.status(400).json({ message: "Name and slug are required" });
    }

    const [category] = await storage.db.insert(helpCategories).values({
      name,
      slug,
      description: description || null,
      icon: icon || null,
      order: order || 0,
      published: published !== false
    }).returning();

    res.status(201).json(category);
  } catch (error) {
    console.error("Error creating category:", error);
    res.status(500).json({ message: "Failed to create category" });
  }
});

// Update category (admin)
router.put("/admin/categories/:id", requireAdmin, async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { name, slug, description, icon, order, published } = req.body;

    const [category] = await storage.db
      .update(helpCategories)
      .set({
        name,
        slug,
        description,
        icon,
        order,
        published,
        updatedAt: sql`now()`
      })
      .where(eq(helpCategories.id, id))
      .returning();

    if (!category) {
      return res.status(404).json({ message: "Category not found" });
    }

    res.json(category);
  } catch (error) {
    console.error("Error updating category:", error);
    res.status(500).json({ message: "Failed to update category" });
  }
});

// Delete category (admin)
router.delete("/admin/categories/:id", requireAdmin, async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    // Check if category has articles
    const articles = await storage.db
      .select({ id: helpArticles.id })
      .from(helpArticles)
      .where(eq(helpArticles.categoryId, id))
      .limit(1);

    if (articles.length > 0) {
      return res.status(400).json({ message: "Cannot delete category with articles" });
    }

    await storage.db.delete(helpCategories).where(eq(helpCategories.id, id));
    res.json({ message: "Category deleted successfully" });
  } catch (error) {
    console.error("Error deleting category:", error);
    res.status(500).json({ message: "Failed to delete category" });
  }
});

// Get all articles (admin)
router.get("/admin/articles", requireAdmin, async (req: Request, res: Response) => {
  try {
    const articles = await storage.db
      .select({
        id: helpArticles.id,
        title: helpArticles.title,
        slug: helpArticles.slug,
        excerpt: helpArticles.excerpt,
        author: helpArticles.author,
        published: helpArticles.published,
        featured: helpArticles.featured,
        views: helpArticles.views,
        helpful: helpArticles.helpful,
        notHelpful: helpArticles.notHelpful,
        createdAt: helpArticles.createdAt,
        updatedAt: helpArticles.updatedAt,
        categoryName: helpCategories.name
      })
      .from(helpArticles)
      .leftJoin(helpCategories, eq(helpArticles.categoryId, helpCategories.id))
      .orderBy(desc(helpArticles.createdAt));

    res.json(articles);
  } catch (error) {
    console.error("Error fetching admin articles:", error);
    res.status(500).json({ message: "Failed to fetch articles" });
  }
});

// Get single article (admin)
router.get("/admin/articles/:id", requireAdmin, async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    
    const [article] = await storage.db
      .select()
      .from(helpArticles)
      .where(eq(helpArticles.id, id));

    if (!article) {
      return res.status(404).json({ message: "Article not found" });
    }

    res.json(article);
  } catch (error) {
    console.error("Error fetching admin article:", error);
    res.status(500).json({ message: "Failed to fetch article" });
  }
});

// Create article (admin)
router.post("/admin/articles", requireAdmin, async (req: Request, res: Response) => {
  try {
    const { title, slug, content, excerpt, categoryId, tags, order, published, featured } = req.body;

    if (!title || !slug || !content) {
      return res.status(400).json({ message: "Title, slug, and content are required" });
    }

    const [article] = await storage.db.insert(helpArticles).values({
      title,
      slug,
      content,
      excerpt: excerpt || null,
      categoryId: categoryId || null,
      author: req.session.user!.name || req.session.user!.username,
      tags: tags || [],
      order: order || 0,
      published: published !== false,
      featured: featured === true
    }).returning();

    res.status(201).json(article);
  } catch (error) {
    console.error("Error creating article:", error);
    res.status(500).json({ message: "Failed to create article" });
  }
});

// Update article (admin)
router.put("/admin/articles/:id", requireAdmin, async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { title, slug, content, excerpt, categoryId, tags, order, published, featured } = req.body;

    const [article] = await storage.db
      .update(helpArticles)
      .set({
        title,
        slug,
        content,
        excerpt,
        categoryId,
        tags,
        order,
        published,
        featured,
        updatedAt: sql`now()`
      })
      .where(eq(helpArticles.id, id))
      .returning();

    if (!article) {
      return res.status(404).json({ message: "Article not found" });
    }

    res.json(article);
  } catch (error) {
    console.error("Error updating article:", error);
    res.status(500).json({ message: "Failed to update article" });
  }
});

// Delete article (admin)
router.delete("/admin/articles/:id", requireAdmin, async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    // Delete related feedback first
    await storage.db.delete(helpFeedback).where(eq(helpFeedback.articleId, id));
    
    // Delete article
    await storage.db.delete(helpArticles).where(eq(helpArticles.id, id));
    
    res.json({ message: "Article deleted successfully" });
  } catch (error) {
    console.error("Error deleting article:", error);
    res.status(500).json({ message: "Failed to delete article" });
  }
});

// Get feedback (admin)
router.get("/admin/feedback", requireAdmin, async (req: Request, res: Response) => {
  try {
    const feedback = await storage.db
      .select({
        id: helpFeedback.id,
        type: helpFeedback.type,
        comment: helpFeedback.comment,
        email: helpFeedback.email,
        createdAt: helpFeedback.createdAt,
        articleTitle: helpArticles.title,
        articleSlug: helpArticles.slug,
        userName: users.name
      })
      .from(helpFeedback)
      .leftJoin(helpArticles, eq(helpFeedback.articleId, helpArticles.id))
      .leftJoin(users, eq(helpFeedback.userId, users.id))
      .orderBy(desc(helpFeedback.createdAt));

    res.json(feedback);
  } catch (error) {
    console.error("Error fetching feedback:", error);
    res.status(500).json({ message: "Failed to fetch feedback" });
  }
});

export { router as helpRoutes };