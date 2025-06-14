import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Shield } from "lucide-react";

interface AdminLoginProps {
  onBack: () => void;
}

export default function AdminLogin({ onBack }: AdminLoginProps) {
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    // Redirect to Replit Auth
    window.location.href = '/api/login';
  };

  return (
    <div className="max-w-md mx-auto">
      <Card className="shadow-lg">
        <CardContent className="p-8">
          <div className="text-center space-y-4 mb-8">
            <div className="w-16 h-16 bg-forest-100 rounded-full flex items-center justify-center mx-auto">
              <Shield className="text-forest-600 h-8 w-8" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900">Acesso Administrador</h2>
            <p className="text-gray-600">Entre com sua conta Replit para acessar o painel</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-6">
            <Button 
              type="submit" 
              disabled={isLoading}
              className="w-full bg-forest-600 hover:bg-forest-700 text-white py-3"
            >
              {isLoading ? 'Redirecionando...' : 'Entrar com Replit'}
            </Button>
          </form>

          <div className="mt-6 text-center">
            <Button 
              variant="ghost"
              onClick={onBack}
              className="text-forest-600 hover:text-forest-700 text-sm font-medium"
            >
              ← Voltar ao início
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
