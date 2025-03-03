import { useState } from 'react';
import { motion } from 'framer-motion';
import { Lock, Key } from 'lucide-react';

interface AuthProps {
  onAuth: (isAuthenticated: boolean) => void;
}

export default function Auth({ onAuth }: AuthProps) {
  const [key, setKey] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    // This is a simple check. In production, you should use a more secure method
    const correctKey = process.env.NEXT_PUBLIC_ADMIN_KEY || 'your-secret-key';
    
    if (key === correctKey) {
      localStorage.setItem('blog_admin_auth', 'true');
      onAuth(true);
    } else {
      setError('Invalid key. Please try again.');
    }
    
    setIsLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 to-gray-800 p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md"
      >
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl overflow-hidden">
          <div className="p-8">
            <div className="flex justify-center mb-6">
              <div className="p-4 bg-blue-100 dark:bg-blue-900 rounded-full">
                <Lock className="w-8 h-8 text-blue-600 dark:text-blue-300" />
              </div>
            </div>
            
            <h2 className="text-2xl font-bold text-center text-gray-800 dark:text-white mb-8">
              Blog Admin Authentication
            </h2>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Secret Key
                </label>
                <div className="relative">
                  <Key className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="password"
                    value={key}
                    onChange={(e) => setKey(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                    placeholder="Enter your secret key"
                    required
                  />
                </div>
              </div>

              {error && (
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-red-600 dark:text-red-400 text-sm text-center"
                >
                  {error}
                </motion.p>
              )}

              <button
                type="submit"
                disabled={isLoading}
                className={`w-full py-2 px-4 rounded-md text-white font-medium transition-colors ${
                  isLoading
                    ? 'bg-gray-400 cursor-not-allowed'
                    : 'bg-blue-600 hover:bg-blue-700'
                }`}
              >
                {isLoading ? 'Verifying...' : 'Authenticate'}
              </button>
            </form>
          </div>
        </div>
      </motion.div>
    </div>
  );
} 