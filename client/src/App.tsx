import React from 'react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { Router, Route, Switch } from 'wouter'
import { ThemeProvider } from 'next-themes'
import { Toaster } from '@/components/ui/toaster'
import { AuthProvider } from '@/contexts/AuthContext'
import { LoginPage } from '@/pages/LoginPage'
import { RegisterPage } from '@/pages/RegisterPage'
import { DashboardPage } from '@/pages/DashboardPage'
import { ProjectPage } from '@/pages/ProjectPage'
import { ProfilePage } from '@/pages/ProfilePage'
import { SubscriptionPage } from '@/pages/SubscriptionPage'
import { LibraryPage } from '@/pages/LibraryPage'
import { HelpPage } from '@/pages/HelpPage'
import { AdminHelpPage } from '@/pages/AdminHelpPage'
import { ProtectedRoute } from '@/components/ProtectedRoute'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      refetchOnWindowFocus: false,
    },
  },
})

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
        <AuthProvider>
          <Router>
            <Switch>
              <Route path="/login" component={LoginPage} />
              <Route path="/register" component={RegisterPage} />
              <Route path="/">
                <ProtectedRoute>
                  <DashboardPage />
                </ProtectedRoute>
              </Route>
              <Route path="/project/:id">
                {(params) => (
                  <ProtectedRoute>
                    <ProjectPage projectId={params.id} />
                  </ProtectedRoute>
                )}
              </Route>
              <Route path="/profile">
                <ProtectedRoute>
                  <ProfilePage />
                </ProtectedRoute>
              </Route>
              <Route path="/subscription">
                <ProtectedRoute>
                  <SubscriptionPage />
                </ProtectedRoute>
              </Route>
              <Route path="/library">
                <ProtectedRoute>
                  <LibraryPage />
                </ProtectedRoute>
              </Route>
              <Route path="/help">
                <HelpPage />
              </Route>
              <Route path="/admin/help">
                <ProtectedRoute>
                  <AdminHelpPage />
                </ProtectedRoute>
              </Route>
            </Switch>
          </Router>
          <Toaster />
        </AuthProvider>
      </ThemeProvider>
    </QueryClientProvider>
  )
}

export default App