import React, { createContext, useContext, useState, useEffect } from 'react'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import type { User } from '@shared/schema'

interface AuthContextType {
  user: User | null
  isLoading: boolean
  login: (username: string, password: string) => Promise<void>
  logout: () => Promise<void>
  register: (userData: any) => Promise<void>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const queryClient = useQueryClient()

  const { data: user, isLoading } = useQuery({
    queryKey: ['user'],
    queryFn: async () => {
      const response = await fetch('/api/auth/me')
      if (!response.ok) {
        if (response.status === 401) return null
        throw new Error('Failed to fetch user')
      }
      return response.json()
    },
    retry: false,
  })

  const loginMutation = useMutation({
    mutationFn: async ({ username, password }: { username: string; password: string }) => {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      })
      if (!response.ok) {
        const error = await response.json()
        throw new Error(error.message || 'Login failed')
      }
      return response.json()
    },
    onSuccess: (data) => {
      queryClient.setQueryData(['user'], data.user)
    },
  })

  const logoutMutation = useMutation({
    mutationFn: async () => {
      const response = await fetch('/api/auth/logout', { method: 'POST' })
      if (!response.ok) throw new Error('Logout failed')
    },
    onSuccess: () => {
      queryClient.setQueryData(['user'], null)
    },
  })

  const registerMutation = useMutation({
    mutationFn: async (userData: any) => {
      const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(userData),
      })
      if (!response.ok) {
        const error = await response.json()
        throw new Error(error.message || 'Registration failed')
      }
      return response.json()
    },
    onSuccess: (data) => {
      queryClient.setQueryData(['user'], data.user)
    },
  })

  const login = async (username: string, password: string) => {
    await loginMutation.mutateAsync({ username, password })
  }

  const logout = async () => {
    await logoutMutation.mutateAsync()
  }

  const register = async (userData: any) => {
    await registerMutation.mutateAsync(userData)
  }

  return (
    <AuthContext.Provider value={{
      user: user || null,
      isLoading,
      login,
      logout,
      register,
    }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}