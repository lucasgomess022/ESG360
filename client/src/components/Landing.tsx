import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Leaf, Users, Building } from "lucide-react";

interface LandingProps {
  onStartQuestionnaire: () => void;
  onShowLogin: () => void;
}

export default function Landing({ onStartQuestionnaire, onShowLogin }: LandingProps) {
  return (
    <div className="space-y-8">
      {/* Hero Section */}
      <div className="text-center space-y-6">
        <div className="relative h-64 bg-gradient-to-r from-forest-700 to-sage-600 rounded-2xl overflow-hidden">
          <img 
            src="https://images.unsplash.com/photo-1500595046743-cd271d694d30?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&h=600" 
            alt="Green pastures with cattle grazing" 
            className="w-full h-full object-cover opacity-30"
          />
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center text-white space-y-4">
              <h2 className="text-4xl font-bold">Classificação ESG para Pecuária</h2>
              <p className="text-xl opacity-90">Avalie a sustentabilidade da sua propriedade rural</p>
            </div>
          </div>
        </div>

        {/* ESG Dimensions Cards */}
        <div className="grid md:grid-cols-3 gap-6 mt-12">
          <Card className="shadow-lg border-gray-100">
            <CardContent className="p-6">
              <div className="text-center space-y-4">
                <div className="w-16 h-16 bg-forest-100 rounded-full flex items-center justify-center mx-auto">
                  <Leaf className="text-forest-600 h-8 w-8" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900">Ambiental</h3>
                <p className="text-gray-600">25 questões sobre práticas ambientais e sustentabilidade</p>
              </div>
            </CardContent>
          </Card>
          
          <Card className="shadow-lg border-gray-100">
            <CardContent className="p-6">
              <div className="text-center space-y-4">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto">
                  <Users className="text-blue-600 h-8 w-8" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900">Social</h3>
                <p className="text-gray-600">8 questões sobre responsabilidade social e trabalhista</p>
              </div>
            </CardContent>
          </Card>
          
          <Card className="shadow-lg border-gray-100">
            <CardContent className="p-6">
              <div className="text-center space-y-4">
                <div className="w-16 h-16 bg-earth-100 rounded-full flex items-center justify-center mx-auto">
                  <Building className="text-earth-600 h-8 w-8" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900">Governança</h3>
                <p className="text-gray-600">8 questões sobre gestão e transparência</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mt-12">
        <Button 
          onClick={onStartQuestionnaire}
          className="bg-forest-600 hover:bg-forest-700 text-white px-8 py-3 flex items-center space-x-2"
        >
          <span>Iniciar Avaliação ESG</span>
        </Button>
        <Button 
          variant="outline"
          onClick={onShowLogin}
          className="border-gray-300 hover:bg-gray-50 text-gray-700 px-8 py-3 flex items-center space-x-2"
        >
          <span>Acesso Administrador</span>
        </Button>
      </div>
    </div>
  );
}
