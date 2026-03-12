import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import PEVLogo from '@/components/PEVLogo';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    const success = await login(username, password);
    if (success) {
       navigate('/dashboard');
      } else {
          toast.error('Invalid username or password');
       }
        };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="banking-card p-8 w-full max-w-sm flex flex-col items-center gap-6">
        <div className="banking-gradient rounded-xl p-4 w-full flex justify-center">
          <PEVLogo size="md" />
        </div>

        <form onSubmit={handleLogin} className="w-full space-y-4">
          <div>
            <label className="text-sm font-medium text-foreground">Username:</label>
            <Input
              value={username}
              onChange={e => setUsername(e.target.value)}
              className="mt-1 bg-primary-foreground border-border"
              required
            />
          </div>
          <div>
            <label className="text-sm font-medium text-foreground">Password:</label>
            <Input
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              className="mt-1 bg-primary-foreground border-border"
              required
            />
          </div>

          <div className="space-y-2 pt-2">
            <Button type="submit" className="w-full banking-gradient text-primary-foreground font-semibold">
              Login
            </Button>
            <Button
              type="button"
              variant="secondary"
              className="w-full font-semibold"
              onClick={() => navigate('/signup')}
            >
              Signup
            </Button>
          </div>

          <p className="text-center text-sm text-muted-foreground underline cursor-pointer">
            Forgot password?
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
