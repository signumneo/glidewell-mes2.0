'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { AuthService } from '@/lib/auth/auth';

/**
 * Azure AD SSO Redirect Handler
 * This page handles the redirect back from Microsoft login
 */
export default function TechnicianPage() {
  const router = useRouter();
  const [status, setStatus] = useState<'loading' | 'success' | 'error'>('loading');
  const [message, setMessage] = useState('Processing authentication...');

  useEffect(() => {
    const handleAuth = async () => {
      try {
        setStatus('loading');
        setMessage('Verifying credentials...');

        // Handle the redirect response from Azure AD
        const result = await AuthService.handleRedirectResponse();

        if (result?.success) {
          setStatus('success');
          setMessage('Authentication successful! Redirecting...');
          
          // Wait a moment then redirect to dashboard
          setTimeout(() => {
            router.push('/dashboard');
          }, 1000);
        } else {
          setStatus('error');
          setMessage(result?.message || 'Authentication failed');
          
          // Redirect back to login after error
          setTimeout(() => {
            router.push('/');
          }, 3000);
        }
      } catch (error: any) {
        console.error('Authentication error:', error);
        setStatus('error');
        setMessage(error.message || 'An unexpected error occurred');
        
        // Redirect back to login after error
        setTimeout(() => {
          router.push('/');
        }, 3000);
      }
    };

    handleAuth();
  }, [router]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <div className="max-w-md w-full mx-4">
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 text-center">
          {/* Loading Spinner */}
          {status === 'loading' && (
            <div className="mb-6">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-blue-100 dark:bg-blue-900/30">
                <svg
                  className="animate-spin h-8 w-8 text-blue-600 dark:text-blue-400"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  />
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  />
                </svg>
              </div>
            </div>
          )}

          {/* Success Icon */}
          {status === 'success' && (
            <div className="mb-6">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-emerald-100 dark:bg-emerald-900/30">
                <svg
                  className="w-8 h-8 text-emerald-600 dark:text-emerald-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </div>
            </div>
          )}

          {/* Error Icon */}
          {status === 'error' && (
            <div className="mb-6">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-rose-100 dark:bg-rose-900/30">
                <svg
                  className="w-8 h-8 text-rose-600 dark:text-rose-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </div>
            </div>
          )}

          {/* Message */}
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
            {status === 'loading' && 'Authenticating'}
            {status === 'success' && 'Success!'}
            {status === 'error' && 'Authentication Failed'}
          </h1>
          
          <p className="text-gray-600 dark:text-gray-400">
            {message}
          </p>

          {status === 'error' && (
            <button
              onClick={() => router.push('/')}
              className="mt-6 px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
            >
              Return to Login
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
