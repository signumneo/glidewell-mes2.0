'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { LoginForm } from '@/components/auth/LoginForm';
import { AuthService } from '@/lib/auth/auth';
import { themeColors } from '@/lib/theme';
import { Activity, Shield, Zap, TrendingUp } from 'lucide-react';

export default function Home() {
  const router = useRouter();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    // Redirect to routers if already authenticated
    if (AuthService.isAuthenticated()) {
      router.push('/routers');
    }
  }, [router]);

  // Prevent hydration mismatch by waiting for client-side mount
  if (!mounted) {
    return (
      <div className={`min-h-screen ${themeColors.pageBackground}`}>
        <div className="h-screen flex items-center justify-center">
          <div className="animate-pulse text-sm text-gray-400">Loading...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white dark:bg-[#1e1e1e] flex items-center justify-center p-4 relative overflow-hidden">
      {/* Animated gradient background */}
      <div className="absolute inset-0">
        {/* Subtle animated orbs */}
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-500/8 dark:bg-blue-400/10 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-indigo-500/8 dark:bg-indigo-400/10 rounded-full blur-3xl animate-float-delayed" />
      </div>

      {/* Content Container */}
      <div className="relative z-10 w-full max-w-7xl flex items-center justify-center lg:justify-between gap-16">
        {/* Features Conveyor Belt - Hidden on mobile */}
        <div className="hidden lg:flex flex-col gap-6 flex-1 max-w-lg animate-slide-from-left">
          {/* Feature 1 */}
          <div className="relative bg-white dark:bg-[#242424] backdrop-blur-md border border-gray-200 dark:border-[#3a3a3a] rounded-3xl p-8 shadow-lg dark:shadow-xl dark:shadow-black/10 animate-conveyor-item overflow-hidden cursor-pointer transition-all hover:scale-105 hover:shadow-2xl hover:border-blue-400 dark:hover:border-blue-500">
            {/* Animated line */}
            <div className="absolute bottom-0 left-0 h-[2px] w-full bg-gradient-to-r from-transparent via-blue-500/50 dark:via-blue-400/50 to-transparent animate-card-line" />
            <div className="flex items-center gap-5">
              <div className="w-16 h-16 rounded-full bg-blue-500/10 dark:bg-blue-400/10 flex items-center justify-center flex-shrink-0">
                <Activity className="w-8 h-8 text-blue-600 dark:text-blue-400" />
              </div>
              <div>
                <p className="text-xl font-medium text-gray-900 dark:text-[#f5f5f5]">Smart Data Collection</p>
                <p className="text-base text-gray-600 dark:text-[#a3a3a3] mt-1">Automated and intelligent data gathering</p>
              </div>
            </div>
          </div>

          {/* Feature 2 */}
          <div className="relative bg-white dark:bg-[#242424] backdrop-blur-md border border-gray-200 dark:border-[#3a3a3a] rounded-3xl p-8 shadow-lg dark:shadow-xl dark:shadow-black/10 animate-conveyor-item-delayed-1 overflow-hidden cursor-pointer transition-all hover:scale-105 hover:shadow-2xl hover:border-indigo-400 dark:hover:border-indigo-500">
            {/* Animated line */}
            <div className="absolute bottom-0 left-0 h-[2px] w-full bg-gradient-to-r from-transparent via-indigo-500/50 dark:via-indigo-400/50 to-transparent animate-card-line" />
            <div className="flex items-center gap-5">
              <div className="w-16 h-16 rounded-full bg-indigo-500/10 dark:bg-indigo-400/10 flex items-center justify-center flex-shrink-0">
                <Shield className="w-8 h-8 text-indigo-600 dark:text-indigo-400" />
              </div>
              <div>
                <p className="text-xl font-medium text-gray-900 dark:text-[#f5f5f5]">Access Router Data with Ease</p>
                <p className="text-base text-gray-600 dark:text-[#a3a3a3] mt-1">Seamless integration with your routers</p>
              </div>
            </div>
          </div>

          {/* Feature 3 */}
          <div className="relative bg-white dark:bg-[#242424] backdrop-blur-md border border-gray-200 dark:border-[#3a3a3a] rounded-3xl p-8 shadow-lg dark:shadow-xl dark:shadow-black/10 animate-conveyor-item-delayed-2 overflow-hidden cursor-pointer transition-all hover:scale-105 hover:shadow-2xl hover:border-purple-400 dark:hover:border-purple-500">
            {/* Animated line */}
            <div className="absolute bottom-0 left-0 h-[2px] w-full bg-gradient-to-r from-transparent via-purple-500/50 dark:via-purple-400/50 to-transparent animate-card-line" />
            <div className="flex items-center gap-5">
              <div className="w-16 h-16 rounded-full bg-purple-500/10 dark:bg-purple-400/10 flex items-center justify-center flex-shrink-0">
                <Zap className="w-8 h-8 text-purple-600 dark:text-purple-400" />
              </div>
              <div>
                <p className="text-xl font-medium text-gray-900 dark:text-[#f5f5f5]">Traceability for All Work Orders</p>
                <p className="text-base text-gray-600 dark:text-[#a3a3a3] mt-1">Complete tracking from start to finish</p>
              </div>
            </div>
          </div>

          {/* Feature 4 */}
          <div className="relative bg-white dark:bg-[#242424] backdrop-blur-md border border-gray-200 dark:border-[#3a3a3a] rounded-3xl p-8 shadow-lg dark:shadow-xl dark:shadow-black/10 animate-conveyor-item-delayed-3 overflow-hidden cursor-pointer transition-all hover:scale-105 hover:shadow-2xl hover:border-green-400 dark:hover:border-green-500">
            {/* Animated line */}
            <div className="absolute bottom-0 left-0 h-[2px] w-full bg-gradient-to-r from-transparent via-green-500/50 dark:via-green-400/50 to-transparent animate-card-line" />
            <div className="flex items-center gap-5">
              <div className="w-16 h-16 rounded-full bg-green-500/10 dark:bg-green-400/10 flex items-center justify-center flex-shrink-0">
                <TrendingUp className="w-8 h-8 text-green-600 dark:text-green-400" />
              </div>
              <div>
                <p className="text-xl font-medium text-gray-900 dark:text-[#f5f5f5]">Custom Analytics</p>
                <p className="text-base text-gray-600 dark:text-[#a3a3a3] mt-1">Tailored insights for manufacturing</p>
              </div>
            </div>
          </div>
        </div>

        {/* Login Form - Slides from right */}
        <div className="w-full max-w-lg animate-slide-from-right">
          <LoginForm />
        </div>
      </div>
    </div>
  );
}
