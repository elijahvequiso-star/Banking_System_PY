import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import PEVLogo from '@/components/PEVLogo';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';

const AccountDetails = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  if (!user) { navigate('/'); return null; }

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="w-full max-w-lg">
        <div className="flex items-center gap-4 mb-6">
          <div className="banking-gradient rounded-xl p-3 flex-shrink-0">
            <PEVLogo size="sm" />
          </div>
          <div className="banking-header rounded-xl px-6 py-3 flex-1">
            <h2 className="text-lg font-bold text-primary-foreground">Account Details</h2>
          </div>
        </div>

        <div className="banking-card p-8 space-y-4">
          <div className="space-y-3">
            <DetailRow label="Account Number" value={user.accountNumber} />
            <DetailRow label="Account Holder" value={user.fullname} />
            <DetailRow label="Balance" value={`Php ${user.balance.toLocaleString()}.00`} />
            <DetailRow label="Status" value="Active" />
            <DetailRow label="Name" value={user.fullname} />
          </div>

          <Button
            variant="ghost"
            className="mt-4 text-muted-foreground"
            onClick={() => navigate('/dashboard')}
          >
            <ArrowLeft className="w-4 h-4 mr-2" /> Back to Dashboard
          </Button>
        </div>
      </div>
    </div>
  );
};

const DetailRow = ({ label, value }: { label: string; value: string }) => (
  <div className="flex justify-between items-center py-2 border-b border-border">
    <span className="text-sm font-medium text-muted-foreground">{label}:</span>
    <span className="text-sm font-bold text-foreground">{value}</span>
  </div>
);

export default AccountDetails;
