import { createContext, useContext, useState, useEffect } from 'react'
import type { User } from '../types/User'
import { loginService } from '../services/AuthService'

interface AuthContextType {
  user: User | null
  login: (email: string, password: string) => Promise<void>
  isLoading: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // checkAuth()
    setIsLoading(false)
  }, [])

  // Used to check the session status with the server
//   const checkAuth = async () => {
//     try {
//       const response = await fetch('/api/auth/me', {
//         credentials: 'include',
//       })
//       const data = await response.json()
//       setUser(data)
//     } catch (error) {
//       console.error('Failed to check auth status:', error)
//       setUser(null)
//     } finally {
//       setIsLoading(false)
//     }
//   }


  // Used to create a session and store the user data in the context
// const useLogin = login = () // appeler le service puis     const data = await response.json()setUser(data)
//   }
  const login = async (email: string, password: string) => {
    const data = await loginService(email, password)
    setUser(data || null)
  }

  return (
    <AuthContext.Provider value={{ user, login, isLoading }}>
      {children}
    </AuthContext.Provider>
  )
}

// Custom hook to access the auth context from any component
export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}