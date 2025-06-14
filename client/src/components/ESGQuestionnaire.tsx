import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Progress } from "@/components/ui/progress";
import { Leaf, Users, Building, ChevronLeft, ChevronRight } from "lucide-react";
import { esgQuestions, calculateClassification } from "@/data/esgQuestions";
import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";

interface ESGQuestionnaireProps {
  onBack: () => void;
  onComplete: (results: any) => void;
}

export default function ESGQuestionnaire({ onBack, onComplete }: ESGQuestionnaireProps) {
  const [currentQuestion, setCurrentQuestion] = useState(1);
  const [propertyName, setPropertyName] = useState('');
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [showPropertyInfo, setShowPropertyInfo] = useState(true);
  const { toast } = useToast();

  const totalQuestions = esgQuestions.length;

  const submitEvaluation = useMutation({
    mutationFn: async (data: any) => {
      const response = await apiRequest('POST', '/api/evaluations', data);
      return response.json();
    },
    onSuccess: (data) => {
      onComplete(data);
    },
    onError: (error) => {
      toast({
        title: "Erro",
        description: "Falha ao salvar a avaliação. Tente novamente.",
        variant: "destructive",
      });
    },
  });

  const handlePropertySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!propertyName.trim()) {
      toast({
        title: "Campo obrigatório",
        description: "Por favor, informe o nome da propriedade.",
        variant: "destructive",
      });
      return;
    }
    setShowPropertyInfo(false);
  };

  const handleAnswerChange = (value: string) => {
    setAnswers(prev => ({
      ...prev,
      [currentQuestion]: parseInt(value)
    }));
  };

  const nextQuestion = () => {
    if (!answers[currentQuestion]) {
      toast({
        title: "Resposta obrigatória",
        description: "Por favor, selecione uma resposta antes de continuar.",
        variant: "destructive",
      });
      return;
    }

    if (currentQuestion < totalQuestions) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      // Calculate scores and submit
      const environmentalScore = esgQuestions
        .filter(q => q.dimension === 'environmental')
        .reduce((sum, q) => sum + (answers[q.id] || 1), 0);
      
      const socialScore = esgQuestions
        .filter(q => q.dimension === 'social')
        .reduce((sum, q) => sum + (answers[q.id] || 1), 0);
      
      const governanceScore = esgQuestions
        .filter(q => q.dimension === 'governance')
        .reduce((sum, q) => sum + (answers[q.id] || 1), 0);

      const evaluationData = {
        propertyName,
        answers,
        environmentalScore,
        socialScore,
        governanceScore,
        environmentalClassification: calculateClassification(environmentalScore, 'environmental'),
        socialClassification: calculateClassification(socialScore, 'social'),
        governanceClassification: calculateClassification(governanceScore, 'governance'),
      };

      submitEvaluation.mutate(evaluationData);
    }
  };

  const previousQuestion = () => {
    if (currentQuestion > 1) {
      setCurrentQuestion(currentQuestion - 1);
    } else {
      setShowPropertyInfo(true);
    }
  };

  if (showPropertyInfo) {
    return (
      <div className="space-y-8">
        <Card className="shadow-lg">
          <CardContent className="p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Informações da Propriedade</h3>
            <form onSubmit={handlePropertySubmit} className="space-y-4">
              <div className="max-w-md">
                <Label htmlFor="propertyName" className="text-sm font-medium text-gray-700">
                  Nome/ID da Propriedade *
                </Label>
                <Input
                  id="propertyName"
                  type="text"
                  required
                  value={propertyName}
                  onChange={(e) => setPropertyName(e.target.value)}
                  placeholder="Ex: Fazenda São João"
                  className="mt-2"
                />
              </div>
              <Button type="submit" className="bg-forest-600 hover:bg-forest-700">
                Iniciar Questionário
              </Button>
            </form>
          </CardContent>
        </Card>
        
        <div className="text-center">
          <Button variant="ghost" onClick={onBack} className="text-forest-600 hover:text-forest-700">
            ← Voltar ao início
          </Button>
        </div>
      </div>
    );
  }

  const progress = (currentQuestion / totalQuestions) * 100;
  const currentQuestionData = esgQuestions[currentQuestion - 1];
  
  const getSectionInfo = () => {
    switch (currentQuestionData.dimension) {
      case 'environmental':
        return {
          icon: <Leaf className="text-forest-600 h-6 w-6" />,
          title: 'Dimensão Ambiental',
          description: 'Questões sobre práticas ambientais e sustentabilidade',
          color: 'forest'
        };
      case 'social':
        return {
          icon: <Users className="text-blue-600 h-6 w-6" />,
          title: 'Dimensão Social',
          description: 'Questões sobre responsabilidade social e trabalhista',
          color: 'blue'
        };
      case 'governance':
        return {
          icon: <Building className="text-earth-600 h-6 w-6" />,
          title: 'Dimensão Governança',
          description: 'Questões sobre gestão e transparência',
          color: 'earth'
        };
    }
  };

  const sectionInfo = getSectionInfo();

  return (
    <div className="space-y-8">
      {/* Progress Header */}
      <Card className="shadow-lg">
        <CardContent className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-bold text-gray-900">Avaliação ESG</h2>
            <div className="text-sm text-gray-600">
              <span>{currentQuestion}</span> de <span>{totalQuestions}</span>
            </div>
          </div>
          
          <Progress value={progress} className="mb-4" />
          
          <div className="flex justify-between">
            <div className="flex items-center space-x-2 text-sm">
              <div className={`w-3 h-3 rounded-full ${currentQuestionData.dimension === 'environmental' ? 'bg-forest-600' : 'bg-gray-300'}`} />
              <span className="text-gray-700">Ambiental (25)</span>
            </div>
            <div className="flex items-center space-x-2 text-sm">
              <div className={`w-3 h-3 rounded-full ${currentQuestionData.dimension === 'social' ? 'bg-blue-600' : 'bg-gray-300'}`} />
              <span className="text-gray-700">Social (8)</span>
            </div>
            <div className="flex items-center space-x-2 text-sm">
              <div className={`w-3 h-3 rounded-full ${currentQuestionData.dimension === 'governance' ? 'bg-earth-600' : 'bg-gray-300'}`} />
              <span className="text-gray-700">Governança (8)</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Question Container */}
      <Card className="shadow-lg">
        <CardContent className="p-8">
          {/* Current Section Header */}
          <div className="flex items-center space-x-3 mb-6">
            <div className={`w-12 h-12 bg-${sectionInfo.color}-100 rounded-full flex items-center justify-center`}>
              {sectionInfo.icon}
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900">{sectionInfo.title}</h3>
              <p className="text-gray-600 text-sm">{sectionInfo.description}</p>
            </div>
          </div>

          {/* Question */}
          <div className="space-y-6">
            <div className="bg-gray-50 rounded-lg p-6">
              <h4 className="text-lg font-medium text-gray-900 mb-6">
                {currentQuestionData.text}
              </h4>
              
              <RadioGroup
                value={answers[currentQuestion]?.toString() || ""}
                onValueChange={handleAnswerChange}
                className="space-y-3"
              >
                <div className="flex items-center space-x-4">
                  <RadioGroupItem value="1" id="option-1" />
                  <Label htmlFor="option-1" className="flex-1 p-4 border border-gray-200 rounded-lg cursor-pointer hover:bg-gray-50 transition-colors">
                    <span className="flex items-center justify-between">
                      <span className="font-medium text-gray-900">1 - Não contempla</span>
                      <span className="text-sm text-gray-500">A propriedade não possui o item avaliado</span>
                    </span>
                  </Label>
                </div>
                <div className="flex items-center space-x-4">
                  <RadioGroupItem value="2" id="option-2" />
                  <Label htmlFor="option-2" className="flex-1 p-4 border border-gray-200 rounded-lg cursor-pointer hover:bg-gray-50 transition-colors">
                    <span className="flex items-center justify-between">
                      <span className="font-medium text-gray-900">2 - Contempla em parte</span>
                      <span className="text-sm text-gray-500">A propriedade possui parcialmente o item avaliado</span>
                    </span>
                  </Label>
                </div>
                <div className="flex items-center space-x-4">
                  <RadioGroupItem value="3" id="option-3" />
                  <Label htmlFor="option-3" className="flex-1 p-4 border border-gray-200 rounded-lg cursor-pointer hover:bg-gray-50 transition-colors">
                    <span className="flex items-center justify-between">
                      <span className="font-medium text-gray-900">3 - Contempla amplamente</span>
                      <span className="text-sm text-gray-500">A propriedade possui integralmente o item avaliado</span>
                    </span>
                  </Label>
                </div>
              </RadioGroup>
            </div>
          </div>

          {/* Navigation Buttons */}
          <div className="flex justify-between mt-8">
            <Button
              variant="outline"
              onClick={previousQuestion}
              className="flex items-center space-x-2"
            >
              <ChevronLeft className="h-4 w-4" />
              <span>Anterior</span>
            </Button>
            <Button
              onClick={nextQuestion}
              disabled={submitEvaluation.isPending}
              className="bg-forest-600 hover:bg-forest-700 flex items-center space-x-2"
            >
              <span>{currentQuestion === totalQuestions ? 'Finalizar' : 'Próxima'}</span>
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Back to Home */}
      <div className="text-center">
        <Button variant="ghost" onClick={onBack} className="text-forest-600 hover:text-forest-700">
          ← Voltar ao início
        </Button>
      </div>
    </div>
  );
}
