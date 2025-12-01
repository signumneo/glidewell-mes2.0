import { NextRequest, NextResponse } from 'next/server';
import { appConfig } from '@/lib/config/app.config';

/**
 * STEP 1: Authenticate with AWS Cognito using SERVICE account credentials
 * This gets system-level tokens to authorize calls to your backend
 */
async function authenticateWithCognito() {
  const cognitoConfig = appConfig.auth.cognito;
  
  console.log('[Cognito] Step 1: Authenticating with AWS Cognito using service account:', {
    endpoint: 'https://cognito-idp.us-east-1.amazonaws.com/',
    clientId: cognitoConfig.clientId,
    serviceUsername: cognitoConfig.credentials.username
  });
  
  try {
    const response = await fetch('https://cognito-idp.us-east-1.amazonaws.com/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-amz-json-1.1',
        'X-Amz-Target': 'AWSCognitoIdentityProviderService.InitiateAuth',
      },
      body: JSON.stringify({
        AuthFlow: 'USER_PASSWORD_AUTH',
        ClientId: cognitoConfig.clientId,
        AuthParameters: {
          USERNAME: cognitoConfig.credentials.username,
          PASSWORD: cognitoConfig.credentials.password,
        },
      }),
    });

    console.log('[Cognito] Response status:', response.status);

    if (!response.ok) {
      const error = await response.json();
      console.error('[Cognito] Authentication failed:', error);
      throw new Error('Failed to authenticate with Cognito service account');
    }

    const data = await response.json();
    const idToken = data.AuthenticationResult?.IdToken;
    const accessToken = data.AuthenticationResult?.AccessToken;
    const refreshToken = data.AuthenticationResult?.RefreshToken;
    
    console.log('[Cognito] Service account authentication successful, tokens received');
    
    return {
      idToken,
      accessToken,
      refreshToken,
    };
  } catch (error: any) {
    console.error('[Cognito] Auth error:', error);
    throw error;
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { username, password } = body;

    console.log('[Login API] Login attempt for user:', username);

    if (!username || !password) {
      console.log('[Login API] Missing credentials');
      return NextResponse.json(
        { error: 'Username and password are required' },
        { status: 400 }
      );
    }

    // STEP 1: Authenticate with AWS Cognito using SERVICE account credentials
    // This gets system tokens to authorize backend API calls
    console.log('[Login API] STEP 1: Getting Cognito tokens with service account...');
    const cognitoTokens = await authenticateWithCognito();
    console.log('[Login API] Cognito tokens obtained successfully');

    // STEP 2: Validate ACTUAL user credentials via your User API
    // Pass the user's email/password (not the service account)
    console.log('[Login API] STEP 2: Validating user credentials with User API...');
    const apiUrl = appConfig.api.baseUrl;
    console.log('[Login API] Calling User API:', `${apiUrl}/user`);

    const response = await fetch(`${apiUrl}/user`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': cognitoTokens.idToken, // Use Cognito token to authorize
      },
      body: JSON.stringify({
        actionType: 'getUserInfo',
        email: username,      // User's actual email
        password: password,   // User's actual password
      }),
    });

    console.log('[Login API] User API response status:', response.status);
    const data = await response.json();
    console.log('[Login API] User API response:', { 
      hasUserEmail: !!data.useremail,
      accessLevel: data.accesslevel,
      hasTechId: !!data.techId,
      error: data.error 
    });

    if (!response.ok || data.error) {
      console.error('[Login API] User validation failed:', data.error);
      return NextResponse.json(
        { error: data.error || 'Invalid credentials' },
        { status: 401 }
      );
    }

    // Return user data with Cognito tokens
    // IdToken is used as primary auth token for backend API calls
    console.log('[Login API] Login successful for:', data.useremail);
    return NextResponse.json({
      useremail: data.useremail,
      techId: data.techId,
      accesslevel: data.accesslevel,
      // Return tokens
      token: cognitoTokens.idToken, // Primary auth token
      accessToken: cognitoTokens.accessToken, // AWS services (optional)
      refreshToken: cognitoTokens.refreshToken, // Token refresh
    });

  } catch (error: any) {
    console.error('Login API error:', error);
    return NextResponse.json(
      { error: error.message || 'Internal server error' },
      { status: 500 }
    );
  }
}
