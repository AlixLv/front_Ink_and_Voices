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
    setIsLoading(false)
  }, [])

const login = async (email: string, password: string) => {
    const data = await loginService(email, password)
    setUser({
        email: data.email,
        username: data.username,
        // Le token est dans le cookie httpOnly, pas besoin de le stocker
    })
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


// créer une route auth/me pour vérifier si le user est connecté jspk