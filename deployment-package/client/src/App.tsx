import { useState } from "react";
import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Leaf } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import Landing from "@/components/Landing";
import AdminLogin from "@/components/AdminLogin";
import ESGQuestionnaire from "@/components/ESGQuestionnaire";
import ResultsPage from "@/components/ResultsPage";
import AdminDashboard from "@/components/AdminDashboard";
import NotFound from "@/pages/not-found";

type AppPage = 'landing' | 'login' | 'questionnaire' | 'results' | 'dashboard';

function AppContent() {
  const [currentPage, setCurrentPage] = useState<AppPage>('landing');
  const [evaluationResults, setEvaluationResults] = useState(null);
  const { isAuthenticated, isLoading } = useAuth();

  // If user is authenticated and trying to access landing, show dashboard
  if (isAuthenticated && currentPage === 'landing') {
    setCurrentPage('dashboard');
  }

  const handleLogout = () => {
    window.location.href = '/api/logout';
  };

  const renderPage = () => {
    switch (currentPage) {
      case 'landing':
        return (
          <Landing
            onStartQuestionnaire={() => setCurrentPage('questionnaire')}
            onShowLogin={() => setCurrentPage('login')}
          />
        );
      case 'login':
        return <AdminLogin onBack={() => setCurrentPage('landing')} />;
      case 'questionnaire':
        return (
          <ESGQuestionnaire
            onBack={() => setCurrentPage('landing')}
            onComplete={(results) => {
              setEvaluationResults(results);
              setCurrentPage('results');
            }}
          />
        );
      case 'results':
        return (
          <ResultsPage
            results={evaluationResults}
            onNewEvaluation={() => setCurrentPage('landing')}
          />
        );
      case 'dashboard':
        return <AdminDashboard onLogout={handleLogout} />;
      default:
        return <NotFound />;
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <Leaf className="h-8 w-8 text-forest-600 animate-pulse mx-auto mb-4" />
          <p className="text-gray-600">Carregando...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div 
              className="flex items-center space-x-3 cursor-pointer"
              onClick={() => setCurrentPage('landing')}
            >
              <Leaf className="text-forest-600 h-8 w-8" />
              <h1 className="text-xl font-semibold text-gray-900">Sistema ESG Rural</h1>
            </div>
            <div className="flex items-center space-x-4">
              {isAuthenticated && (
                <button
                  onClick={handleLogout}
                  className="text-gray-600 hover:text-gray-900 text-sm font-medium"
                >
                  Sair
                </button>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {renderPage()}
      </main>
    </div>
  );
}

function Router() {
  return (
    <Switch>
      <Route path="/" component={AppContent} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Router />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
