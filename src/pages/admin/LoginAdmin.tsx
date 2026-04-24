import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { LogIn, AlertCircle, Loader2 } from 'lucide-react';

const LoginAdmin = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    // Mock authentication delay
    setTimeout(() => {
      if (username === 'admin' && password === 'admin') {
        navigate('/admin');
      } else {
        setError('Invalid username or password. Please try again.');
        setIsLoading(false);
      }
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-admin-netral-10 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 font-admin-regular">
      <div className="max-w-md w-full space-y-8 bg-white p-10 rounded-[32px] shadow-[0_8px_40px_rgba(0,0,0,0.04)] border border-admin-netral-20">
        <div className="text-center">
          <div className="mx-auto h-16 w-16 bg-admin-primary-100 rounded-2xl flex items-center justify-center mb-6">
            <LogIn className="h-8 w-8 text-admin-secondary-100" />
          </div>
          <h2 className="text-admin-2xl font-admin-semibold text-admin-netral-100">
            Admin Portal
          </h2>
          <p className="mt-2 text-admin-sm text-admin-netral-50">
            Enter your credentials to access the dashboard
          </p>
        </div>

        <form className="mt-8 space-y-6" onSubmit={handleLogin}>
          {error && (
            <div className="bg-admin-error-10 border border-admin-error-100/20 p-4 rounded-xl flex items-center gap-3 text-admin-error-100 text-admin-xs">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <p>{error}</p>
            </div>
          )}

          <div className="space-y-4">
            <div>
              <label className="block text-admin-xs font-admin-medium text-admin-netral-100 mb-2 ml-1">Username</label>
              <input
                type="text"
                required
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="admin"
                className="block w-full px-4 py-3 border border-admin-netral-20 rounded-xl shadow-sm outline-none focus:border-admin-primary-100 transition-colors text-admin-base text-admin-netral-100 placeholder:text-admin-netral-30"
              />
            </div>

            <div>
              <label className="block text-admin-xs font-admin-medium text-admin-netral-100 mb-2 ml-1">Password</label>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="block w-full px-4 py-3 border border-admin-netral-20 rounded-xl shadow-sm outline-none focus:border-admin-primary-100 transition-colors text-admin-base text-admin-netral-100 placeholder:text-admin-netral-30"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className={`w-full flex justify-center py-3.5 px-4 border border-transparent rounded-full text-admin-sm font-admin-semibold text-admin-primary-100 bg-admin-secondary-100 hover:bg-admin-secondary-100/90 transition-all shadow-lg shadow-admin-secondary-100/20 relative overflow-hidden ${
              isLoading ? 'opacity-80 cursor-not-allowed' : ''
            }`}
          >
            {isLoading ? (
              <Loader2 className="w-5 h-5 animate-spin" />
            ) : (
              'Sign in to Dashboard'
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginAdmin;
