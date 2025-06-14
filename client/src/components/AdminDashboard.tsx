import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Download, LogOut, ClipboardList, MapPin, Leaf, Calendar } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { useToast } from "@/hooks/use-toast";

interface AdminDashboardProps {
  onLogout: () => void;
}

export default function AdminDashboard({ onLogout }: AdminDashboardProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedPeriod, setSelectedPeriod] = useState('all');
  const { toast } = useToast();

  const { data: stats } = useQuery({
    queryKey: ['/api/evaluations/stats'],
  });

  const { data: evaluations = [] } = useQuery({
    queryKey: ['/api/evaluations', searchTerm, selectedPeriod],
  });

  const handleExportData = () => {
    toast({
      title: "Exportação iniciada",
      description: "Os dados serão baixados em breve.",
    });
    // TODO: Implement export functionality
  };

  const getClassificationColor = (classification: string) => {
    switch (classification) {
      case 'PROATIVA':
        return 'bg-forest-100 text-forest-800';
      case 'NORMATIVA':
        return 'bg-yellow-100 text-yellow-800';
      case 'REATIVA':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('pt-BR');
  };

  return (
    <div className="space-y-8">
      {/* Dashboard Header */}
      <Card className="shadow-lg">
        <CardContent className="p-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">Painel Administrativo</h2>
              <p className="text-gray-600">Gerencie e visualize as avaliações ESG realizadas</p>
            </div>
            <div className="flex items-center space-x-4">
              <Button 
                onClick={handleExportData}
                className="bg-forest-600 hover:bg-forest-700 flex items-center space-x-2"
              >
                <Download className="h-4 w-4" />
                <span>Exportar Dados</span>
              </Button>
              <Button 
                variant="outline"
                onClick={onLogout}
                className="flex items-center space-x-2"
              >
                <LogOut className="h-4 w-4" />
                <span>Sair</span>
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Stats Cards */}
      {stats && (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card className="shadow-lg">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Total de Avaliações</p>
                  <p className="text-2xl font-bold text-gray-900">{stats.totalEvaluations}</p>
                </div>
                <div className="w-12 h-12 bg-forest-100 rounded-full flex items-center justify-center">
                  <ClipboardList className="text-forest-600 h-6 w-6" />
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="shadow-lg">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Propriedades Avaliadas</p>
                  <p className="text-2xl font-bold text-gray-900">{stats.uniqueProperties}</p>
                </div>
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                  <MapPin className="text-blue-600 h-6 w-6" />
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="shadow-lg">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Média Ambiental</p>
                  <p className="text-2xl font-bold text-forest-600">{stats.avgEnvironmentalScore}</p>
                </div>
                <div className="w-12 h-12 bg-forest-100 rounded-full flex items-center justify-center">
                  <Leaf className="text-forest-600 h-6 w-6" />
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="shadow-lg">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Este Mês</p>
                  <p className="text-2xl font-bold text-gray-900">{stats.thisMonth}</p>
                </div>
                <div className="w-12 h-12 bg-earth-100 rounded-full flex items-center justify-center">
                  <Calendar className="text-earth-600 h-6 w-6" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Filters and Search */}
      <Card className="shadow-lg">
        <CardContent className="p-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
            <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
              <Input
                type="text"
                placeholder="Buscar propriedade..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="max-w-sm"
              />
              <Select value={selectedPeriod} onValueChange={setSelectedPeriod}>
                <SelectTrigger className="max-w-sm">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todos os períodos</SelectItem>
                  <SelectItem value="month">Último mês</SelectItem>
                  <SelectItem value="quarter">Últimos 3 meses</SelectItem>
                  <SelectItem value="year">Último ano</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Evaluations Table */}
      <Card className="shadow-lg">
        <CardContent className="p-0">
          <div className="px-6 py-4 border-b border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900">Avaliações Realizadas</h3>
          </div>
          
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Propriedade</TableHead>
                  <TableHead>Data</TableHead>
                  <TableHead>Ambiental</TableHead>
                  <TableHead>Social</TableHead>
                  <TableHead>Governança</TableHead>
                  <TableHead>Ações</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {evaluations.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={6} className="text-center py-8 text-gray-500">
                      Nenhuma avaliação encontrada
                    </TableCell>
                  </TableRow>
                ) : (
                  evaluations.map((evaluation: any) => (
                    <TableRow key={evaluation.id} className="hover:bg-gray-50">
                      <TableCell>
                        <div>
                          <div className="font-medium text-gray-900">{evaluation.propertyName}</div>
                          <div className="text-sm text-gray-500">ID: {evaluation.id}</div>
                        </div>
                      </TableCell>
                      <TableCell className="text-sm text-gray-900">
                        {formatDate(evaluation.submissionDate)}
                      </TableCell>
                      <TableCell>
                        <span className={`px-2 py-1 text-xs font-semibold rounded-full ${getClassificationColor(evaluation.environmentalClassification)}`}>
                          {evaluation.environmentalClassification} ({evaluation.environmentalScore})
                        </span>
                      </TableCell>
                      <TableCell>
                        <span className={`px-2 py-1 text-xs font-semibold rounded-full ${getClassificationColor(evaluation.socialClassification)}`}>
                          {evaluation.socialClassification} ({evaluation.socialScore})
                        </span>
                      </TableCell>
                      <TableCell>
                        <span className={`px-2 py-1 text-xs font-semibold rounded-full ${getClassificationColor(evaluation.governanceClassification)}`}>
                          {evaluation.governanceClassification} ({evaluation.governanceScore})
                        </span>
                      </TableCell>
                      <TableCell>
                        <div className="flex space-x-2">
                          <Button variant="ghost" size="sm" className="text-forest-600 hover:text-forest-900">
                            Visualizar
                          </Button>
                          <Button variant="ghost" size="sm" className="text-blue-600 hover:text-blue-900">
                            Exportar
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
