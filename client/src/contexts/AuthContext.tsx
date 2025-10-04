import React, { createContext, useContext, useEffect, useState } from 'react'
import { api } from '@/lib/api'

interface User {
  id: string
  username: string
  email: string
  name: string
  role: string
  subscriptionStatus: string
  createdAt: string
}

interface AuthContextType {
  user: User | null
  loading: boolean
  login: (username: string, password: string) => Promise<void>
  register: (userData: any) => Promise<void>
  logout: () => Promise<void>
  updateProfile: (data: any) => Promise<void>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    checkAuth()
  }, [])

  const checkAuth = async () => {
    try {
      const userData = await api.getProfile()
      setUser(userData)
    } catch (error) {
      // User not authenticated
      setUser(null)
    } finally {
      setLoading(false)
    }
  }

  const login = async (username: string, password: string) => {
    const userData = await api.login(username, password)
    setUser(userData)
  }

  const register = async (userData: any) => {
    const newUser = await api.register(userData)
    setUser(newUser)
  }

  const logout = async () => {
    await api.logout()
    setUser(null)
  }

  const updateProfile = async (data: any) => {
    const updatedUser = await api.updateProfile(data)
    setUser(updatedUser)
  }

  const value = {
    user,
    loading,
    login,
    register,
    logout,
    updateProfile,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}