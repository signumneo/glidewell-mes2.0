'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Lock, User, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { MESLogo } from '@/components/ui/MESLogo';
import { useAuth } from '@/hooks/useAuth';
import { appConfig } from '@/lib/config/app.config';
import { themeColors } from '@/lib/theme';

const loginSchema = z.object({
  username: z.string().min(1, 'Username is required'),
  password: z.string().min(1, 'Password is required'),
});

type LoginFormData = z.infer<typeof loginSchema>;

export function LoginForm() {
  const { login, loginWithAzure } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [isSSOLoading, setIsSSOLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginFormData) => {
    setIsLoading(true);
    setError(null);

    const result = await login(data, 'basic');

    if (!result.success) {
      setError(result.message || 'Login failed');
      setIsLoading(false);
    }
  };

  const handleAzureSSO = async () => {
    setIsSSOLoading(true);
    setError(null);

    const result = await loginWithAzure();

    if (!result.success) {
      setError(result.message || 'Azure SSO login failed');
      setIsSSOLoading(false);
    }
  };

  return (
    <Card className="w-full bg-white dark:bg-[#242424] border border-gray-200 dark:border-[#3a3a3a] backdrop-blur-sm shadow-xl dark:shadow-2xl dark:shadow-black/20 animate-fade-in">
      <CardHeader className="space-y-4 text-center pb-6 pt-8">
        <div className="mx-auto animate-scale-in">
          <MESLogo size="lg" />
        </div>
        <div className="space-y-1 animate-slide-up">
          <CardTitle className="text-2xl font-semibold tracking-tight text-gray-900 dark:text-[#f5f5f5]">
            Welcome Back
          </CardTitle>
          <CardDescription className="text-sm text-gray-600 dark:text-[#a3a3a3]">
            Sign in to continue to {appConfig.app.name}
          </CardDescription>
        </div>
      </CardHeader>

      <CardContent className="pb-8 px-8">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 animate-slide-up" style={{ animationDelay: '100ms' }}>
          <div className="space-y-2">
            <Label htmlFor="username" className="text-sm font-medium text-gray-900 dark:text-[#f5f5f5]">
              Username
            </Label>
            <div className="relative group">
              <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 dark:text-[#737373] transition-colors group-focus-within:text-blue-500 dark:group-focus-within:text-blue-400" />
              <Input
                id="username"
                placeholder="Enter username"
                className="pl-10 h-11 text-sm bg-white dark:bg-[#1e1e1e] border-gray-300 dark:border-[#3a3a3a] text-gray-900 dark:text-[#f5f5f5] placeholder:text-gray-400 dark:placeholder:text-[#666666] focus:border-blue-500 dark:focus:border-blue-400 focus:ring-2 focus:ring-blue-500/20 dark:focus:ring-blue-400/20 transition-all"
                {...register('username')}
                disabled={isLoading}
              />
            </div>
            {errors.username && (
              <p className="text-xs text-rose-600 dark:text-rose-400 animate-slide-down">{errors.username.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="password" className="text-sm font-medium text-gray-900 dark:text-[#f5f5f5]">
              Password
            </Label>
            <div className="relative group">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 dark:text-[#737373] transition-colors group-focus-within:text-blue-500 dark:group-focus-within:text-blue-400" />
              <Input
                id="password"
                type="password"
                placeholder="Enter password"
                className="pl-10 h-11 text-sm bg-white dark:bg-[#1e1e1e] border-gray-300 dark:border-[#3a3a3a] text-gray-900 dark:text-[#f5f5f5] placeholder:text-gray-400 dark:placeholder:text-[#666666] focus:border-blue-500 dark:focus:border-blue-400 focus:ring-2 focus:ring-blue-500/20 dark:focus:ring-blue-400/20 transition-all"
                {...register('password')}
                disabled={isLoading}
              />
            </div>
            {errors.password && (
              <p className="text-xs text-rose-600 dark:text-rose-400 animate-slide-down">{errors.password.message}</p>
            )}
          </div>

          {error && (
            <div className="bg-rose-50 dark:bg-rose-500/10 border border-rose-200 dark:border-rose-500/30 text-rose-800 dark:text-rose-300 px-4 py-3 rounded-lg text-sm animate-slide-down">
              {error}
            </div>
          )}

          <Button
            type="submit"
            className="w-full h-11 text-sm bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 text-white font-medium transition-all hover:shadow-lg hover:scale-[1.02] active:scale-[0.98]"
            disabled={isLoading || isSSOLoading}
          >
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Signing in...
              </>
            ) : (
              'Sign In'
            )}
          </Button>

          {/* Divider */}
          <div className="relative py-3">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-200 dark:border-[#3a3a3a]"></div>
            </div>
            <div className="relative flex justify-center text-xs">
              <span className="px-3 bg-white dark:bg-[#242424] text-gray-500 dark:text-[#888888]">
                Or continue with
              </span>
            </div>
          </div>

          {/* Azure SSO Button */}
          <Button
            type="button"
            onClick={handleAzureSSO}
            className="w-full h-11 text-sm bg-white dark:bg-[#1e1e1e] hover:bg-gray-50 dark:hover:bg-[#2a2a2a] border-2 border-gray-300 dark:border-[#3a3a3a] text-gray-700 dark:text-[#f5f5f5] font-medium transition-all hover:shadow-lg hover:scale-[1.02] active:scale-[0.98]"
            disabled={isLoading || isSSOLoading}
          >
            {isSSOLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Connecting...
              </>
            ) : (
              <>
                <svg className="mr-2 h-4 w-4" viewBox="0 0 21 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <rect x="1" y="1" width="9" height="9" fill="#F25022"/>
                  <rect x="1" y="11" width="9" height="9" fill="#00A4EF"/>
                  <rect x="11" y="1" width="9" height="9" fill="#7FBA00"/>
                  <rect x="11" y="11" width="9" height="9" fill="#FFB900"/>
                </svg>
                Sign in with Microsoft
              </>
            )}
          </Button>

          <div className="pt-4 border-t border-gray-200 dark:border-[#3a3a3a]">
            <p className="text-xs text-center text-gray-500 dark:text-[#888888]">
              Demo: <span className="font-mono font-medium text-gray-700 dark:text-[#b0b0b0]">{appConfig.auth.basic.demoCredentials.username}</span> / <span className="font-mono font-medium text-gray-700 dark:text-[#b0b0b0]">{appConfig.auth.basic.demoCredentials.password}</span>
            </p>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
