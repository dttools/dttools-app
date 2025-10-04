import React, { useState, useEffect } from 'react'
import { useQuery } from '@tanstack/react-query'
import { Search, Book, HelpCircle, ThumbsUp, ThumbsDown, MessageSquare, ArrowLeft } from 'lucide-react'

interface HelpCategory {
  id: string
  name: string
  slug: string
  description: string
  icon: string
  articleCount: number
}

interface HelpArticle {
  id: string
  title: string
  slug: string
  content: string
  excerpt: string
  author: string
  views: number
  helpful: number
  notHelpful: number
  createdAt: string
  updatedAt: string
  categoryName?: string
  categorySlug?: string
}

interface SearchResult {
  id: string
  title: string
  slug: string
  excerpt: string
  author: string
  categoryName: string
  categorySlug: string
  createdAt: string
}

export function HelpPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  const [selectedArticle, setSelectedArticle] = useState<string | null>(null)
  const [searchResults, setSearchResults] = useState<SearchResult[]>([])
  const [isSearching, setIsSearching] = useState(false)

  // Fetch categories
  const { data: categories = [], isLoading: categoriesLoading } = useQuery({
    queryKey: ['help-categories'],
    queryFn: async () => {
      const response = await fetch('/api/help/categories')
      if (!response.ok) throw new Error('Failed to fetch categories')
      return response.json() as Promise<HelpCategory[]>
    }
  })

  // Fetch articles for selected category
  const { data: categoryData, isLoading: articlesLoading } = useQuery({
    queryKey: ['help-category-articles', selectedCategory],
    queryFn: async () => {
      if (!selectedCategory) return null
      const response = await fetch(`/api/help/categories/${selectedCategory}/articles`)
      if (!response.ok) throw new Error('Failed to fetch articles')
      return response.json() as Promise<{ category: HelpCategory; articles: HelpArticle[] }>
    },
    enabled: !!selectedCategory
  })

  // Fetch single article
  const { data: article, isLoading: articleLoading } = useQuery({
    queryKey: ['help-article', selectedArticle],
    queryFn: async () => {
      if (!selectedArticle) return null
      const response = await fetch(`/api/help/articles/${selectedArticle}`)
      if (!response.ok) throw new Error('Failed to fetch article')
      return response.json() as Promise<HelpArticle>
    },
    enabled: !!selectedArticle
  })

  // Search articles
  useEffect(() => {
    if (searchQuery.trim().length < 2) {
      setSearchResults([])
      setIsSearching(false)
      return
    }

    const searchTimeout = setTimeout(async () => {
      setIsSearching(true)
      try {
        const response = await fetch(`/api/help/search?q=${encodeURIComponent(searchQuery)}`)
        if (response.ok) {
          const results = await response.json()
          setSearchResults(results)
        }
      } catch (error) {
        console.error('Search error:', error)
      } finally {
        setIsSearching(false)
      }
    }, 300)

    return () => clearTimeout(searchTimeout)
  }, [searchQuery])

  const submitFeedback = async (articleId: string, type: 'helpful' | 'not_helpful', comment?: string) => {
    try {
      await fetch(`/api/help/articles/${articleId}/feedback`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ type, comment })
      })
      // Refresh article data to show updated counts
      // You might want to use query invalidation here
    } catch (error) {
      console.error('Failed to submit feedback:', error)
    }
  }

  const goBack = () => {
    if (selectedArticle) {
      setSelectedArticle(null)
    } else if (selectedCategory) {
      setSelectedCategory(null)
    }
  }

  const resetView = () => {
    setSelectedCategory(null)
    setSelectedArticle(null)
    setSearchQuery('')
    setSearchResults([])
  }

  if (categoriesLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4">
              {(selectedCategory || selectedArticle) && (
                <button
                  onClick={goBack}
                  className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-md"
                >
                  <ArrowLeft className="h-5 w-5" />
                </button>
              )}
              <button
                onClick={resetView}
                className="flex items-center space-x-2 text-xl font-semibold text-gray-900 hover:text-blue-600"
              >
                <HelpCircle className="h-6 w-6" />
                <span>Central de Ajuda</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Search Bar */}
        <div className="mb-8">
          <div className="relative max-w-2xl mx-auto">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Pesquisar na central de ajuda..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>

        {/* Search Results */}
        {searchQuery.trim().length >= 2 && (
          <div className="mb-8">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">
              Resultados da pesquisa {isSearching && <span className="text-sm text-gray-500">(pesquisando...)</span>}
            </h2>
            <div className="space-y-4">
              {searchResults.map((result) => (
                <div
                  key={result.id}
                  className="bg-white p-6 rounded-lg shadow-sm border hover:shadow-md transition-shadow cursor-pointer"
                  onClick={() => setSelectedArticle(result.slug)}
                >
                  <h3 className="text-lg font-medium text-gray-900 mb-2">{result.title}</h3>
                  <p className="text-gray-600 mb-3">{result.excerpt}</p>
                  <div className="flex items-center text-sm text-gray-500">
                    <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs mr-3">
                      {result.categoryName}
                    </span>
                    <span>Por {result.author}</span>
                  </div>
                </div>
              ))}
              {!isSearching && searchResults.length === 0 && (
                <p className="text-gray-500 text-center py-8">
                  Nenhum resultado encontrado para "{searchQuery}"
                </p>
              )}
            </div>
          </div>
        )}

        {/* Article View */}
        {selectedArticle && article && (
          <div className="bg-white rounded-lg shadow-sm border p-8">
            <div className="mb-6">
              <h1 className="text-3xl font-bold text-gray-900 mb-4">{article.title}</h1>
              <div className="flex items-center text-sm text-gray-500 space-x-4">
                <span>Por {article.author}</span>
                <span>•</span>
                <span>{new Date(article.updatedAt).toLocaleDateString('pt-BR')}</span>
                <span>•</span>
                <span>{article.views} visualizações</span>
              </div>
            </div>
            
            <div 
              className="prose max-w-none mb-8"
              dangerouslySetInnerHTML={{ __html: article.content }}
            />

            {/* Feedback Section */}
            <div className="border-t pt-6">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Este artigo foi útil?</h3>
              <div className="flex items-center space-x-4 mb-4">
                <button
                  onClick={() => submitFeedback(article.id, 'helpful')}
                  className="flex items-center space-x-2 px-4 py-2 bg-green-100 text-green-800 rounded-md hover:bg-green-200 transition-colors"
                >
                  <ThumbsUp className="h-4 w-4" />
                  <span>Sim ({article.helpful})</span>
                </button>
                <button
                  onClick={() => submitFeedback(article.id, 'not_helpful')}
                  className="flex items-center space-x-2 px-4 py-2 bg-red-100 text-red-800 rounded-md hover:bg-red-200 transition-colors"
                >
                  <ThumbsDown className="h-4 w-4" />
                  <span>Não ({article.notHelpful})</span>
                </button>
              </div>
              
              <div className="mt-4">
                <textarea
                  placeholder="Deixe um comentário ou sugestão (opcional)..."
                  className="w-full p-3 border border-gray-300 rounded-md focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                  rows={3}
                  onBlur={(e) => {
                    if (e.target.value.trim()) {
                      submitFeedback(article.id, 'suggestion', e.target.value)
                      e.target.value = ''
                    }
                  }}
                />
              </div>
            </div>
          </div>
        )}

        {/* Category Articles View */}
        {selectedCategory && !selectedArticle && categoryData && (
          <div>
            <div className="mb-6">
              <h1 className="text-3xl font-bold text-gray-900 mb-2">{categoryData.category.name}</h1>
              <p className="text-gray-600">{categoryData.category.description}</p>
            </div>
            
            <div className="grid gap-6">
              {categoryData.articles.map((article) => (
                <div
                  key={article.id}
                  className="bg-white p-6 rounded-lg shadow-sm border hover:shadow-md transition-shadow cursor-pointer"
                  onClick={() => setSelectedArticle(article.slug)}
                >
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">{article.title}</h3>
                  <p className="text-gray-600 mb-4">{article.excerpt}</p>
                  <div className="flex items-center justify-between text-sm text-gray-500">
                    <span>Por {article.author}</span>
                    <div className="flex items-center space-x-4">
                      <span>{article.views} visualizações</span>
                      <div className="flex items-center space-x-1">
                        <ThumbsUp className="h-4 w-4" />
                        <span>{article.helpful}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Categories Grid */}
        {!selectedCategory && !selectedArticle && searchQuery.trim().length < 2 && (
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">
              Como podemos ajudar você?
            </h2>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {categories.map((category) => (
                <div
                  key={category.id}
                  className="bg-white p-6 rounded-lg shadow-sm border hover:shadow-md transition-shadow cursor-pointer"
                  onClick={() => setSelectedCategory(category.slug)}
                >
                  <div className="flex items-center mb-4">
                    <div className="p-3 bg-blue-100 rounded-lg mr-4">
                      <Book className="h-6 w-6 text-blue-600" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900">{category.name}</h3>
                      <p className="text-sm text-gray-500">{category.articleCount} artigos</p>
                    </div>
                  </div>
                  <p className="text-gray-600">{category.description}</p>
                </div>
              ))}
            </div>

            {categories.length === 0 && (
              <div className="text-center py-12">
                <HelpCircle className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  Central de Ajuda em Construção
                </h3>
                <p className="text-gray-600">
                  Estamos preparando conteúdos úteis para você. Volte em breve!
                </p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}