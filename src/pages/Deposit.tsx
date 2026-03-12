import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { toast } from 'sonner';
import { ArrowLeft } from 'lucide-react';

const Deposit = () => {
  const [amount, setAmount] = useState('');
  const { user, deposit } = useAuth();
  const navigate = useNavigate();

  if (!user) { navigate('/'); return null; }

  const handleDeposit = () => {
    const num = parseFloat(amount);
    if (!num || num <= 0) { toast.error('Enter a valid amount'); return; }
    deposit(num);
    toast.success(`Successfully deposited ₱${num.toLocaleString()}`);
    setAmount('');
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="banking-card p-8 w-full max-w-sm">
        <div className="flex items-center gap-4 mb-6">
          <Button variant="ghost" size="icon" onClick={() => navigate('/dashboard')}>
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <h2 className="text-xl font-bold text-foreground">Deposit Funds</h2>
        </div>

        <div className="space-y-4">
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

          <p className="text-sm text-muted-foreground">
            Current Balance: <span className="font-bold text-foreground">₱{user.balance.toLocaleString()}</span>
          </p>

          <Button
            className="w-full banking-gradient text-primary-foreground font-bold"
            onClick={handleDeposit}
          >
            Deposit
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Deposit;
