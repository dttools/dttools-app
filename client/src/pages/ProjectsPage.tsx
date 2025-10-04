import { useAuth } from '@/contexts/AuthContext'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Plus } from 'lucide-react'

export function ProjectsPage() {
  const { user } = useAuth()

  if (!user) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Acesso Negado</h1>
          <p className="text-gray-600">Você precisa estar logado para acessar esta página.</p>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Projetos</h1>
          <p className="text-gray-600">Gerencie todos os seus projetos de Design Thinking</p>
        </div>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          Novo Projeto
        </Button>
      </div>

      <Card className="text-center py-12">
        <CardContent>
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            Página em Desenvolvimento
          </h3>
          <p className="text-gray-600 mb-4">
            A funcionalidade completa de projetos será implementada em breve.
          </p>
        </CardContent>
      </Card>
    </div>
  )
}