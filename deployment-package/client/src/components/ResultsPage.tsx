import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckCircle, Leaf, Users, Building } from "lucide-react";

interface ResultsPageProps {
  results: any;
  onNewEvaluation: () => void;
}

export default function ResultsPage({ results, onNewEvaluation }: ResultsPageProps) {
  const getClassificationColor = (classification: string) => {
    switch (classification) {
      case 'PROATIVA':
        return 'bg-forest-600 text-white';
      case 'NORMATIVA':
        return 'bg-yellow-500 text-white';
      case 'REATIVA':
        return 'bg-red-500 text-white';
      default:
        return 'bg-gray-500 text-white';
    }
  };

  const getMaxScore = (dimension: string) => {
    switch (dimension) {
      case 'environmental':
        return 75;
      case 'social':
      case 'governance':
        return 24;
      default:
        return 0;
    }
  };

  return (
    <div className="space-y-8">
      <Card className="shadow-lg">
        <CardContent className="p-8 text-center">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="text-green-600 h-8 w-8" />
          </div>
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Avaliação Concluída!</h2>
          <p className="text-gray-600 mb-8">Sua classificação ESG foi calculada com base nas respostas fornecidas.</p>

          {/* Results Summary */}
          <div className="grid md:grid-cols-3 gap-6 mt-8">
            <Card className="bg-forest-50">
              <CardContent className="p-6">
                <div className="flex items-center justify-center mb-4">
                  <Leaf className="text-forest-600 h-8 w-8" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900">Ambiental</h3>
                <div className="mt-4">
                  <div className="text-3xl font-bold text-forest-600">
                    {results.environmentalScore}
                  </div>
                  <div className="text-sm text-gray-600">
                    de {getMaxScore('environmental')} pontos
                  </div>
                  <div className={`mt-2 px-3 py-1 text-sm rounded-full inline-block ${getClassificationColor(results.environmentalClassification)}`}>
                    {results.environmentalClassification}
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-blue-50">
              <CardContent className="p-6">
                <div className="flex items-center justify-center mb-4">
                  <Users className="text-blue-600 h-8 w-8" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900">Social</h3>
                <div className="mt-4">
                  <div className="text-3xl font-bold text-blue-600">
                    {results.socialScore}
                  </div>
                  <div className="text-sm text-gray-600">
                    de {getMaxScore('social')} pontos
                  </div>
                  <div className={`mt-2 px-3 py-1 text-sm rounded-full inline-block ${getClassificationColor(results.socialClassification)}`}>
                    {results.socialClassification}
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-earth-50">
              <CardContent className="p-6">
                <div className="flex items-center justify-center mb-4">
                  <Building className="text-earth-600 h-8 w-8" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900">Governança</h3>
                <div className="mt-4">
                  <div className="text-3xl font-bold text-earth-600">
                    {results.governanceScore}
                  </div>
                  <div className="text-sm text-gray-600">
                    de {getMaxScore('governance')} pontos
                  </div>
                  <div className={`mt-2 px-3 py-1 text-sm rounded-full inline-block ${getClassificationColor(results.governanceClassification)}`}>
                    {results.governanceClassification}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="mt-8 space-y-4">
            <Button 
              onClick={onNewEvaluation}
              className="bg-forest-600 hover:bg-forest-700 text-white px-8 py-3"
            >
              Nova Avaliação
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
