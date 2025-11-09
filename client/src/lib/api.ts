const API_BASE = '/api'

export class ApiError extends Error {
  constructor(public status: number, message: string) {
    super(message)
    this.name = 'ApiError'
  }
}

async function fetchApi(endpoint: string, options: RequestInit = {}) {
  const response = await fetch(`${API_BASE}${endpoint}`, {
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
    credentials: 'include',
    ...options,
  })

  if (!response.ok) {
    const error = await response.json().catch(() => ({ message: 'Unknown error' }))
    throw new ApiError(response.status, error.message)
  }

  return response.json()
}

export const api = {
  // Auth
  login: (username: string, password: string) =>
    fetchApi('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ username, password }),
    }),

  register: (userData: any) =>
    fetchApi('/auth/register', {
      method: 'POST',
      body: JSON.stringify(userData),
    }),

  logout: () =>
    fetchApi('/auth/logout', { method: 'POST' }),

  getProfile: () =>
    fetchApi('/auth/profile'),

  updateProfile: (data: any) =>
    fetchApi('/auth/profile', {
      method: 'PUT',
      body: JSON.stringify(data),
    }),

  // Projects
  getProjects: () =>
    fetchApi('/projects'),

  getProject: (id: string) =>
    fetchApi(`/projects/${id}`),

  createProject: (data: any) =>
    fetchApi('/projects', {
      method: 'POST',
      body: JSON.stringify(data),
    }),

  updateProject: (id: string, data: any) =>
    fetchApi(`/projects/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    }),

  deleteProject: (id: string) =>
    fetchApi(`/projects/${id}`, { method: 'DELETE' }),

  // Empathy Maps
  getEmpathyMaps: (projectId: string) =>
    fetchApi(`/projects/${projectId}/empathy-maps`),

  createEmpathyMap: (projectId: string, data: any) =>
    fetchApi(`/projects/${projectId}/empathy-maps`, {
      method: 'POST',
      body: JSON.stringify(data),
    }),

  updateEmpathyMap: (projectId: string, id: string, data: any) =>
    fetchApi(`/projects/${projectId}/empathy-maps/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    }),

  deleteEmpathyMap: (projectId: string, id: string) =>
    fetchApi(`/projects/${projectId}/empathy-maps/${id}`, { method: 'DELETE' }),

  // Personas
  getPersonas: (projectId: string) =>
    fetchApi(`/projects/${projectId}/personas`),

  createPersona: (projectId: string, data: any) =>
    fetchApi(`/projects/${projectId}/personas`, {
      method: 'POST',
      body: JSON.stringify(data),
    }),

  updatePersona: (projectId: string, id: string, data: any) =>
    fetchApi(`/projects/${projectId}/personas/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    }),

  deletePersona: (projectId: string, id: string) =>
    fetchApi(`/projects/${projectId}/personas/${id}`, { method: 'DELETE' }),

  // Ideas
  getIdeas: (projectId: string) =>
    fetchApi(`/projects/${projectId}/ideas`),

  createIdea: (projectId: string, data: any) =>
    fetchApi(`/projects/${projectId}/ideas`, {
      method: 'POST',
      body: JSON.stringify(data),
    }),

  updateIdea: (projectId: string, id: string, data: any) =>
    fetchApi(`/projects/${projectId}/ideas/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    }),

  deleteIdea: (projectId: string, id: string) =>
    fetchApi(`/projects/${projectId}/ideas/${id}`, { method: 'DELETE' }),

  // AI Analysis
  analyzeProject: (projectId: string) =>
    fetchApi(`/projects/${projectId}/analyze`),

  // Subscription
  getSubscriptionPlans: () =>
    fetchApi('/subscription/plans'),

  createCheckoutSession: (planId: string, billingPeriod: string) =>
    fetchApi('/subscription/create-checkout-session', {
      method: 'POST',
      body: JSON.stringify({ planId, billingPeriod }),
    }),

  // Library
  getArticles: () =>
    fetchApi('/library/articles'),

  getArticle: (id: string) =>
    fetchApi(`/library/articles/${id}`),
}