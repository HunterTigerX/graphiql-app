import { initializeApp } from 'firebase/app';
import { describe, test, expect } from 'vitest';
import app, { auth } from './firebase';

describe('Firebase Initialization', () => {
  test('should initialize Firebase app successfully', () => {
    expect(app).toBeDefined();
  });

  test('should initialize Firebase with correct config', () => {
    const config = {
      apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
      authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
      projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
      storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
      messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
      appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
    };

    const firebaseApp = initializeApp(config);
    expect(firebaseApp).toBeDefined();
  });

  test('should get Auth instance from Firebase app', () => {
    expect(auth).toBeDefined();
  });
});
