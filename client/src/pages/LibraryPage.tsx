import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { BookOpen } from 'lucide-react'

export function LibraryPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Biblioteca</h1>
        <p className="text-gray-600">
          Recursos, artigos e guias sobre Design Thinking
        </p>
      </div>

      <Card className="text-center py-12">
        <CardContent>
          <BookOpen className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            Biblioteca em Desenvolvimento
          </h3>
          <p className="text-gray-600 mb-4">
            Em breve você terá acesso a uma biblioteca completa de recursos sobre Design Thinking.
          </p>
        </CardContent>
      </Card>
    </div>
  )
}