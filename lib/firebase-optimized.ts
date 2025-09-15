import { initializeApp, getApps } from 'firebase/app'
import { getFirestore, connectFirestoreEmulator } from 'firebase/firestore'

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID
}

// Initialize Firebase with singleton pattern
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0]
export const db = getFirestore(app)

// Connect to emulator in development (only on client side)
if (process.env.NODE_ENV === 'development' && typeof window !== 'undefined') {
  try {
    connectFirestoreEmulator(db, 'localhost', 8080)
  } catch (error) {
    // Emulator already connected or not available
    console.log('Firestore emulator not available, using production')
  }
}

export interface BlogPost {
  id: string
  title: string
  date: string
  content: string
  author: string
  readingTime: string
  categories: string[]
  summary?: string
}

// Cached data store
const cache = new Map<string, { data: any; timestamp: number }>()
const CACHE_DURATION = 5 * 60 * 1000 // 5 minutes

// Optimized data fetching with caching
export async function getCachedData<T>(
  key: string,
  fetcher: () => Promise<T>
): Promise<T> {
  const cached = cache.get(key)
  const now = Date.now()

  if (cached && (now - cached.timestamp) < CACHE_DURATION) {
    return cached.data
  }

  const data = await fetcher()
  cache.set(key, { data, timestamp: now })
  return data
}

// Clear cache function
export function clearCache() {
  cache.clear()
}
