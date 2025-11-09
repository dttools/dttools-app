import { Link } from 'wouter'
import { useAuth } from '@/contexts/AuthContext'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { 
  Lightbulb, 
  Users, 
  Target, 
  Zap, 
  TestTube, 
  ArrowRight,
  CheckCircle
} from 'lucide-react'

export function HomePage() {
  const { user } = useAuth()

  const phases = [
    {
      icon: Users,
      title: "Empatizar",
      description: "Compreenda profundamente seus usuários através de pesquisas e observações.",
      color: "text-red-500"
    },
    {
      icon: Target,
      title: "Definir",
      description: "Sintetize insights em declarações de problemas claras e acionáveis.",
      color: "text-orange-500"
    },
    {
      icon: Lightbulb,
      title: "Idear",
      description: "Gere uma ampla gama de soluções criativas e inovadoras.",
      color: "text-yellow-500"
    },
    {
      icon: Zap,
      title: "Prototipar",
      description: "Construa representações rápidas e testáveis de suas ideias.",
      color: "text-green-500"
    },
    {
      icon: TestTube,
      title: "Testar",
      description: "Valide suas soluções com usuários reais e colete feedback.",
      color: "text-blue-500"
    }
  ]

  const features = [
    "Ferramentas completas para todas as 5 fases do Design Thinking",
    "Templates e frameworks prontos para uso",
    "Colaboração em tempo real com sua equipe",
    "Análises com IA para insights profundos",
    "Biblioteca de recursos e artigos especializados",
    "Exportação em múltiplos formatos"
  ]

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Transforme Ideias em <span className="text-yellow-300">Inovação</span>
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-blue-100 max-w-3xl mx-auto">
              A plataforma completa de Design Thinking que guia você através de todas as fases 
              do processo de inovação centrada no usuário.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              {user ? (
                <Link href="/dashboard">
                  <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-100">
                    Ir para Dashboard
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
              ) : (
                <>
                  <Link href="/register">
                    <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-100">
                      Começar Gratuitamente
                      <ArrowRight className="ml-2 h-5 w-5" />
                    </Button>
                  </Link>
                  <Link href="/login">
                    <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-blue-600">
                      Fazer Login
                    </Button>
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Por que escolher o DTTools?
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Nossa plataforma oferece tudo que você precisa para conduzir projetos 
              de Design Thinking de forma eficiente e colaborativa.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="flex items-start space-x-3">
                <CheckCircle className="h-6 w-6 text-green-500 mt-1 flex-shrink-0" />
                <p className="text-gray-700">{feature}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Design Thinking Phases */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              As 5 Fases do Design Thinking
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Metodologia comprovada para inovação centrada no usuário
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
            {phases.map((phase, index) => {
              const Icon = phase.icon
              return (
                <Card key={index} className="text-center hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="flex justify-center mb-4">
                      <Icon className={`h-12 w-12 ${phase.color}`} />
                    </div>
                    <CardTitle className="text-lg">{phase.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-sm">
                      {phase.description}
                    </CardDescription>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-blue-600 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Pronto para Inovar?
          </h2>
          <p className="text-xl mb-8 text-blue-100 max-w-2xl mx-auto">
            Junte-se a milhares de inovadores que já usam o DTTools para 
            criar soluções centradas no usuário.
          </p>
          {!user && (
            <Link href="/register">
              <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-100">
                Criar Conta Gratuita
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          )}
        </div>
      </section>
    </div>
  )
}