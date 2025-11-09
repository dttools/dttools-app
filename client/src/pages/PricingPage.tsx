import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Check } from 'lucide-react'

export function PricingPage() {
  const plans = [
    {
      name: 'Gratuito',
      price: 'R$ 0',
      period: '/mês',
      description: 'Perfeito para começar',
      features: [
        '1 projeto ativo',
        'Todas as ferramentas básicas',
        'Exportação em PDF',
        'Suporte por email'
      ],
      popular: false
    },
    {
      name: 'Pro',
      price: 'R$ 29',
      period: '/mês',
      description: 'Para profissionais e equipes',
      features: [
        'Projetos ilimitados',
        'Todas as ferramentas avançadas',
        'Análises com IA',
        'Colaboração em equipe',
        'Exportação em múltiplos formatos',
        'Suporte prioritário'
      ],
      popular: true
    },
    {
      name: 'Enterprise',
      price: 'R$ 99',
      period: '/mês',
      description: 'Para grandes organizações',
      features: [
        'Tudo do plano Pro',
        'SSO e integração personalizada',
        'API personalizada',
        'Suporte 24/7',
        'Treinamento dedicado',
        'Gerenciamento de permissões'
      ],
      popular: false
    }
  ]

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="text-center mb-16">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Planos e Preços
        </h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          Escolha o plano ideal para suas necessidades de Design Thinking
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {plans.map((plan, index) => (
          <Card key={index} className={`relative ${plan.popular ? 'border-primary shadow-lg' : ''}`}>
            {plan.popular && (
              <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                <span className="bg-primary text-white px-4 py-1 rounded-full text-sm font-medium">
                  Mais Popular
                </span>
              </div>
            )}
            <CardHeader className="text-center">
              <CardTitle className="text-2xl">{plan.name}</CardTitle>
              <div className="mt-4">
                <span className="text-4xl font-bold text-gray-900">{plan.price}</span>
                <span className="text-gray-600">{plan.period}</span>
              </div>
              <CardDescription className="mt-2">{plan.description}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <ul className="space-y-3">
                {plan.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="flex items-center">
                    <Check className="h-5 w-5 text-green-500 mr-3 flex-shrink-0" />
                    <span className="text-gray-700">{feature}</span>
                  </li>
                ))}
              </ul>
              <Button 
                className="w-full mt-6" 
                variant={plan.popular ? 'default' : 'outline'}
              >
                {plan.name === 'Gratuito' ? 'Começar Grátis' : 'Escolher Plano'}
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="text-center mt-16">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          Precisa de algo personalizado?
        </h2>
        <p className="text-gray-600 mb-6">
          Entre em contato conosco para discutir soluções empresariais personalizadas
        </p>
        <Button variant="outline">
          Falar com Vendas
        </Button>
      </div>
    </div>
  )
}