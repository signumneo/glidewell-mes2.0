import { NextRequest, NextResponse } from 'next/server';
import { appConfig } from '@/lib/config/app.config';

/**
 * Authenticate with AWS Cognito using fixed credentials
 */
async function authenticateWithCognito() {
  const cognitoConfig = appConfig.auth.cognito;
  
  try {
    const response = await fetch(cognitoConfig.authEndpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-amz-json-1.1',
        'X-Amz-Target': 'AWSCognitoIdentityProviderService.InitiateAuth',
      },
      body: JSON.stringify({
        AuthFlow: cognitoConfig.authFlow,
        ClientId: cognitoConfig.clientId,
        AuthParameters: {
          USERNAME: cognitoConfig.credentials.username,
          PASSWORD: cognitoConfig.credentials.password,
        },
      }),
    });

    if (!response.ok) {
      const error = await response.json();
      console.error('Cognito authentication failed:', error);
      throw new Error('Failed to authenticate with Cognito');
    }

    const data = await response.json();
    return data.AuthenticationResult?.IdToken || data.AuthenticationResult?.AccessToken;
  } catch (error: any) {
    console.error('Cognito auth error:', error);
    throw error;
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { username, password } = body;

    console.log('Login attempt for:', username);

    if (!username || !password) {
      return NextResponse.json(
        { error: 'Username and password are required' },
        { status: 400 }
      );
    }

    // Step 1: Authenticate with Cognito using fixed credentials
    console.log('Step 1: Authenticating with Cognito...');
    const cognitoToken = await authenticateWithCognito();
    console.log('Cognito authentication successful');

    // Step 2: Call User API to validate user-entered credentials
    console.log('Step 2: Validating user credentials...');
    const apiUrl = appConfig.api.baseUrl;
    console.log('Calling backend API:', `${apiUrl}/user`);

    const response = await fetch(`${apiUrl}/user`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${cognitoToken}`,
      },
      body: JSON.stringify({
        actionType: 'getUserInfo',
        email: username,
        password: password,
      }),
    });

    console.log('Backend response status:', response.status);
    const data = await response.json();
    console.log('Backend response data:', data);

    if (!response.ok || data.error) {
      console.error('Authentication failed:', data.error);
      return NextResponse.json(
        { error: data.error || 'Authentication failed' },
        { status: 401 }
      );
    }

    // Return user data with Cognito token
    return NextResponse.json({
      useremail: data.useremail,
      accesslevel: data.accesslevel,
      token: cognitoToken,
    });

  } catch (error: any) {
    console.error('Login API error:', error);
    return NextResponse.json(
      { error: error.message || 'Internal server error' },
      { status: 500 }
    );
  }
}
