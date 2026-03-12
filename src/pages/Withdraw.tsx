import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import PEVLogo from '@/components/PEVLogo';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { toast } from 'sonner';
import { ArrowLeft } from 'lucide-react';

const amounts = [1000, 2000, 3000, 5000, 10000, 20000, 50000];

const Withdraw = () => {
  const [amount, setAmount] = useState('');
  const { user, withdraw } = useAuth();
  const navigate = useNavigate();

  if (!user) { navigate('/'); return null; }

  const handleWithdraw = () => {
    const num = parseFloat(amount);
    if (!num || num <= 0) { toast.error('Enter a valid amount'); return; }
    if (withdraw(num)) {
      toast.success(`Successfully withdrew ₱${num.toLocaleString()}`);
      setAmount('');
    } else {
      toast.error('Insufficient balance');
    }
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="banking-card p-8 w-full max-w-lg">
        <div className="flex items-center gap-4 mb-6">
          <Button variant="ghost" size="icon" onClick={() => navigate('/dashboard')}>
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <div className="banking-gradient rounded-xl p-3 flex items-center gap-2">
            <PEVLogo size="sm" />
          </div>
        </div>

        <div className="flex flex-col md:flex-row gap-8">
          <div className="flex-1">
            <h3 className="text-destructive font-bold text-sm mb-1">Withdraw Cash</h3>
            <h2 className="text-xl font-bold text-foreground mb-4">Select the amount to withdraw</h2>
          </div>

          <div className="flex-1 space-y-4">
            <div>
              <label className="text-sm font-medium text-foreground">Enter amount</label>
              <Input
                type="number"
                value={amount}
                onChange={e => setAmount(e.target.value)}
                placeholder="0"
                className="mt-1 bg-primary-foreground"
              />
            </div>

            <div className="grid grid-cols-2 gap-2">
              {amounts.map(a => (
                <Button
                  key={a}
                  variant="secondary"
                  className="banking-gradient text-primary-foreground font-semibold text-sm"
                  onClick={() => setAmount(String(a))}
                >
                  Php {a.toLocaleString()}
                </Button>
              ))}
            </div>

            <Button
              className="w-full banking-gradient text-primary-foreground font-bold mt-2"
              onClick={handleWithdraw}
            >
              Withdraw
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Withdraw;
