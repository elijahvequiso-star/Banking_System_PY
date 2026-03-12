import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

const Signup = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const { signup } = useAuth();
  const navigate = useNavigate();

 const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      toast.error('Passwords do not match');
      return;
    }

    const success = await signup(firstName, lastName, email, phoneNumber, username, password);
    if (success) {
      toast.success('Account created! Please login.');
      navigate('/');
    } else {
      toast.error('Signup failed.');
    }
  };
  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="banking-card p-8 w-full max-w-md">
        <h2 className="text-2xl font-extrabold text-foreground mb-6">SIGNUP HERE!</h2>

        <form onSubmit={handleSignup} className="space-y-4">
          <div>
            <label className="text-sm font-medium text-foreground">First Name:</label>
            <Input value={firstName} onChange={e => setFirstName(e.target.value)} className="mt-1 bg-primary-foreground" required />
          </div>

          <div>
            <label className="text-sm font-medium text-foreground">Last Name:</label>
            <Input value={lastName} onChange={e => setLastName(e.target.value)} className="mt-1 bg-primary-foreground" required />
          </div>

          {/* ✅ New email field matching Django's USERNAME_FIELD */}
          <div>
            <label className="text-sm font-medium text-foreground">Email:</label>
            <Input type="email" value={email} onChange={e => setEmail(e.target.value)} className="mt-1 bg-primary-foreground" required />
          </div>

          <div>
            <label className="text-sm font-medium text-foreground">Phone Number:</label>
            <Input value={phoneNumber} onChange={e => setPhoneNumber(e.target.value)} className="mt-1 bg-primary-foreground" required />
          </div>

          <div>
            <label className="text-sm font-medium text-foreground">Username:</label>
            <Input value={username} onChange={e => setUsername(e.target.value)} className="mt-1 bg-primary-foreground" required />
          </div>

          <div>
            <label className="text-sm font-medium text-foreground">Password:</label>
            <Input type="password" value={password} onChange={e => setPassword(e.target.value)} className="mt-1 bg-primary-foreground" required />
          </div>

          <div>
            <label className="text-sm font-medium text-foreground">Confirm Password:</label>
            <Input type="password" value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} className="mt-1 bg-primary-foreground" required />
          </div>

          <div className="flex justify-end pt-2">
            <Button type="submit" className="banking-gradient text-primary-foreground font-semibold px-8">
              Signup
            </Button>
          </div>

          <p className="text-sm text-muted-foreground cursor-pointer" onClick={() => navigate('/')}>
            ← Back to Login
          </p>
        </form>
      </div>
    </div>
  );
};

export default Signup;