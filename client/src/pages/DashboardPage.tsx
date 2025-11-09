import { useEffect, useState } from 'react'
import { Link } from 'wouter'
import { useAuth } from '@/contexts/AuthContext'
import { api } from '@/lib/api'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { useToast } from '@/hooks/use-toast'
import { 
  Plus, 
  FolderOpen, 
  BarChart3, 
  Users, 
  Target, 
  Lightbulb, 
  Zap, 
  TestTube 
} from 'lucide-react'

interface Project {
  id: string
  name: string
  description: string
  status: string
  currentPhase: number
  completionRate: number
  createdAt: string
  updatedAt: string
}

export function DashboardPage() {
  const { user } = useAuth()
  const { toast } = useToast()
  const [projects, setProjects] = useState<Project[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!user) return
    loadProjects()
  }, [user])

  const loadProjects = async () => {
    try {
      const data = await api.getProjects()
      setProjects(data)
    } catch (error: any) {
      toast({
        title: "Erro ao carregar projetos",
        description: error.message,
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  const getPhaseInfo = (phase: number) => {
    const phases = [
      { name: 'Empatizar', icon: Users, color: 'text-red-500' },
      { name: 'Definir', icon: Target, color: 'text-orange-500' },
      { name: 'Idear', icon: Lightbulb, color: 'text-yellow-500' },
      { name: 'Prototipar', icon: Zap, color: 'text-green-500' },
      { name: 'Testar', icon: TestTube, color: 'text-blue-500' }
    ]
    return phases[phase - 1] || phases[0]
  }

  if (!user) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Acesso Negado</h1>
          <p className="text-gray-600 mb-4">Você precisa estar logado para acessar o dashboard.</p>
          <Link href="/login">
            <Button>Fazer Login</Button>
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Bem-vindo, {user.name}!
        </h1>
        <p className="text-gray-600">
          Gerencie seus projetos de Design Thinking e acompanhe seu progresso.
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total de Projetos</CardTitle>
            <FolderOpen className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{projects.length}</div>
            <p className="text-xs text-muted-foreground">
              {projects.filter(p => p.status === 'in_progress').length} em andamento
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Projetos Concluídos</CardTitle>
            <BarChart3 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {projects.filter(p => p.status === 'completed').length}
            </div>
            <p className="text-xs text-muted-foreground">
              {projects.length > 0 
                ? Math.round((projects.filter(p => p.status === 'completed').length / projects.length) * 100)
                : 0}% do total
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Progresso Médio</CardTitle>
            <Target className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {projects.length > 0 
                ? Math.round(projects.reduce((acc, p) => acc + p.completionRate, 0) / projects.length)
                : 0}%
            </div>
            <p className="text-xs text-muted-foreground">
              Média de conclusão
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Projects Section */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-900">Seus Projetos</h2>
        <Link href="/projects">
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            Novo Projeto
          </Button>
        </Link>
      </div>

      {loading ? (
        <div className="flex items-center justify-center py-12">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
        </div>
      ) : projects.length === 0 ? (
        <Card className="text-center py-12">
          <CardContent>
            <FolderOpen className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              Nenhum projeto encontrado
            </h3>
            <p className="text-gray-600 mb-4">
              Comece criando seu primeiro projeto de Design Thinking.
            </p>
            <Link href="/projects">
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                Criar Primeiro Projeto
              </Button>
            </Link>
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.slice(0, 6).map((project) => {
            const phaseInfo = getPhaseInfo(project.currentPhase)
            const Icon = phaseInfo.icon
            
            return (
              <Card key={project.id} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg truncate">{project.name}</CardTitle>
                    <Icon className={`h-5 w-5 ${phaseInfo.color}`} />
                  </div>
                  <CardDescription className="line-clamp-2">
                    {project.description || 'Sem descrição'}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span>Progresso</span>
                        <span>{Math.round(project.completionRate)}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-primary h-2 rounded-full transition-all"
                          style={{ width: `${project.completionRate}%` }}
                        />
                      </div>
                    </div>
                    <div className="flex justify-between items-center text-sm text-gray-600">
                      <span>Fase: {phaseInfo.name}</span>
                      <span className={`px-2 py-1 rounded-full text-xs ${
                        project.status === 'completed' 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-blue-100 text-blue-800'
                      }`}>
                        {project.status === 'completed' ? 'Concluído' : 'Em andamento'}
                      </span>
                    </div>
                    <Link href={`/projects/${project.id}`}>
                      <Button className="w-full" variant="outline">
                        Ver Projeto
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>
      )}

      {projects.length > 6 && (
        <div className="text-center mt-8">
          <Link href="/projects">
            <Button variant="outline">
              Ver Todos os Projetos
            </Button>
          </Link>
        </div>
      )}
    </div>
  )
}