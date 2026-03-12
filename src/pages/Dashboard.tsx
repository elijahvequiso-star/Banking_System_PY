import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import PEVLogo from '@/components/PEVLogo';
import { Button } from '@/components/ui/button';
import { User, Wallet, ArrowDownCircle } from 'lucide-react';


const Dashboard = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
  if (!user) {
    navigate('/');
  }
}, [user, navigate]);

if (!user) return null;

  const cards = [
    {
      title: 'Account Details',
      description: 'View your account information and balance details.',
      icon: <User className="w-10 h-10 text-primary-foreground" />,
      action: () => navigate('/account'),
      label: 'Open Account',
    },
    {
      title: 'Deposit Account',
      description: 'Make deposits to your account easily and quickly.',
      icon: <Wallet className="w-10 h-10 text-primary-foreground" />,
      action: () => navigate('/deposit'),
      label: 'Open Deposit',
    },
    {
      title: 'Withdraw Account',
      description: 'Withdraw your funds securely from your account.',
      icon: <ArrowDownCircle className="w-10 h-10 text-primary-foreground" />,
      action: () => navigate('/withdraw'),
      label: 'Open Withdraw',
    },
  ];

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <header className="banking-header py-6 px-8 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <PEVLogo size="md" />
          <span className="text-2xl font-bold text-primary-foreground ml-4">Finding your ways</span>
        </div>
      </header>

      {/* Cards */}
      <main className="flex-1 flex flex-col items-center justify-center px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl w-full">
          {cards.map((card) => (
            <div key={card.title} className="banking-card p-6 flex flex-col items-center text-center gap-4">
              <div className="banking-gradient rounded-full p-4">
                {card.icon}
              </div>
              <h3 className="text-lg font-bold text-foreground">{card.title}</h3>
              <p className="text-sm text-muted-foreground">{card.description}</p>
              <Button onClick={card.action} className="banking-gradient text-primary-foreground font-semibold mt-2">
                {card.label}
              </Button>
            </div>
          ))}
        </div>

        <Button
          variant="outline"
          className="mt-12 px-10 py-3 font-semibold text-foreground border-foreground"
          onClick={() => { logout(); navigate('/'); }}
        >
          Logout
        </Button>
      </main>
    </div>
  );
};

export default Dashboard;
