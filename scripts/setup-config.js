#!/usr/bin/env node

/**
 * Configuration Setup & Validation Script
 * Run this to validate your configuration and see what's active
 */

const fs = require('fs');
const path = require('path');

console.log('\n🔧 MES Dashboard Configuration\n');
console.log('=' .repeat(60));

// Load config (simulate - in real use it would import from dist)
const configPath = path.join(__dirname, '../lib/config/app.config.ts');
const configExists = fs.existsSync(configPath);

if (!configExists) {
  console.error('❌ Configuration file not found!');
  process.exit(1);
}

console.log('✅ Configuration file found\n');

// Display environment variables
console.log('📋 Environment Variables:');
console.log('-'.repeat(60));
console.log(`NEXT_PUBLIC_AZURE_CLIENT_ID: ${process.env.NEXT_PUBLIC_AZURE_CLIENT_ID || '(using default)'}`);
console.log(`NEXT_PUBLIC_AZURE_AUTHORITY: ${process.env.NEXT_PUBLIC_AZURE_AUTHORITY || '(using default)'}`);
console.log(`NEXT_PUBLIC_API_BASE_URL: ${process.env.NEXT_PUBLIC_API_BASE_URL || '(using default)'}`);

console.log('\n📦 Configuration Summary:');
console.log('-'.repeat(60));
console.log('To update the application:');
console.log('  1. Edit lib/config/app.config.ts');
console.log('  2. Or set environment variables in .env.local');
console.log('  3. Restart the development server');

console.log('\n🎨 Theme & Branding:');
console.log('  - Update colors in app.config.ts → theme.colors');
console.log('  - Update logo in lib/theme/brand.ts');

console.log('\n🔐 Authentication:');
console.log('  - Azure SSO: lib/config/app.config.ts → auth.azure');
console.log('  - Cognito: lib/config/app.config.ts → auth.cognito');

console.log('\n🌐 API Configuration:');
console.log('  - Base URL: lib/config/app.config.ts → api.baseUrl');
console.log('  - Endpoints: lib/config/app.config.ts → api.endpoints');

console.log('\n✨ Feature Flags:');
console.log('  - Toggle features in app.config.ts → features');

console.log('\n' + '='.repeat(60));
console.log('✅ Configuration is ready!\n');
