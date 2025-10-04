import React from 'react'
import { useAuth } from '@/contexts/AuthContext'
import { Link } from 'wouter'
import { HelpCircle, Settings, User, LogOut } from 'lucide-react'

export function DashboardPage() {
  const { user, logout } = useAuth()

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <Link href="/">
                <h1 className="text-xl font-semibold cursor-pointer hover:text-blue-600">
                  Design Thinking Tools
                </h1>
              </Link>
            </div>
            <div className="flex items-center space-x-6">
              <Link href="/help">
                <a className="flex items-center space-x-1 text-gray-600 hover:text-blue-600 transition-colors">
                  <HelpCircle className="h-5 w-5" />
                  <span>Ajuda</span>
                </a>
              </Link>
              
              {user?.role === 'admin' && (
                <Link href="/admin/help">
                  <a className="flex items-center space-x-1 text-gray-600 hover:text-blue-600 transition-colors">
                    <Settings className="h-5 w-5" />
                    <span>Admin</span>
                  </a>
                </Link>
              )}
              
              <Link href="/profile">
                <a className="flex items-center space-x-1 text-gray-600 hover:text-blue-600 transition-colors">
                  <User className="h-5 w-5" />
                  <span>{user?.name || user?.username}</span>
                </a>
              </Link>
              
              <button
                onClick={logout}
                className="flex items-center space-x-1 bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition-colors"
              >
                <LogOut className="h-4 w-4" />
                <span>Sair</span>
              </button>
            </div>
          </div>
        </div>
      </nav>
      
      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <div className="border-4 border-dashed border-gray-200 rounded-lg h-96 flex items-center justify-center">
            <div className="text-center">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                Welcome to Design Thinking Tools
              </h2>
              <p className="text-gray-600">
                Your dashboard is ready! Start creating projects and exploring design thinking methodologies.
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}