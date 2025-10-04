import { Link, useLocation } from 'wouter'
import { useAuth } from '@/contexts/AuthContext'
import { Button } from '@/components/ui/button'
import { 
  Lightbulb, 
  User, 
  LogOut, 
  Settings, 
  BookOpen,
  BarChart3,
  FolderOpen
} from 'lucide-react'

export function Navigation() {
  const { user, logout } = useAuth()
  const [location] = useLocation()

  const handleLogout = async () => {
    try {
      await logout()
    } catch (error) {
      console.error('Logout failed:', error)
    }
  }

  const isActive = (path: string) => location === path

  return (
    <nav className="bg-white shadow-sm border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link href="/" className="flex items-center space-x-2">
              <Lightbulb className="h-8 w-8 text-primary" />
              <span className="text-xl font-bold text-gray-900">DTTools</span>
            </Link>
            
            {user && (
              <div className="hidden md:ml-10 md:flex md:space-x-8">
                <Link href="/dashboard">
                  <Button 
                    variant={isActive('/dashboard') ? 'default' : 'ghost'}
                    className="flex items-center space-x-1"
                  >
                    <BarChart3 className="h-4 w-4" />
                    <span>Dashboard</span>
                  </Button>
                </Link>
                <Link href="/projects">
                  <Button 
                    variant={isActive('/projects') ? 'default' : 'ghost'}
                    className="flex items-center space-x-1"
                  >
                    <FolderOpen className="h-4 w-4" />
                    <span>Projetos</span>
                  </Button>
                </Link>
                <Link href="/library">
                  <Button 
                    variant={isActive('/library') ? 'default' : 'ghost'}
                    className="flex items-center space-x-1"
                  >
                    <BookOpen className="h-4 w-4" />
                    <span>Biblioteca</span>
                  </Button>
                </Link>
              </div>
            )}
          </div>

          <div className="flex items-center space-x-4">
            {user ? (
              <>
                <Link href="/profile">
                  <Button 
                    variant={isActive('/profile') ? 'default' : 'ghost'} 
                    size="sm"
                    className="flex items-center space-x-1"
                  >
                    <User className="h-4 w-4" />
                    <span className="hidden sm:inline">{user.name}</span>
                  </Button>
                </Link>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={handleLogout}
                  className="flex items-center space-x-1"
                >
                  <LogOut className="h-4 w-4" />
                  <span className="hidden sm:inline">Sair</span>
                </Button>
              </>
            ) : (
              <>
                <Link href="/login">
                  <Button variant="ghost" size="sm">
                    Entrar
                  </Button>
                </Link>
                <Link href="/register">
                  <Button size="sm">
                    Cadastrar
                  </Button>
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  )
}