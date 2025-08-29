'use client'

import React, { createContext, useContext, useEffect, useState } from 'react'
import { supabase } from './supabase'
import { AuthService, User } from './auth'

interface AuthContextType {
  user: User | null
  session: any | null
  loading: boolean
  signIn: (email: string, password: string) => Promise<any>
  signUp: (email: string, password: string, name: string, phone?: string) => Promise<any>
  signOut: () => Promise<void>
  isAdmin: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [session, setSession] = useState<any | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Get initial session
    const getInitialSession = async () => {
      const { data: { session } } = await supabase.auth.getSession()
      setSession(session)
      
      if (session?.user) {
        const { user: currentUser } = await AuthService.getCurrentUser()
        setUser(currentUser)
      }
      
      setLoading(false)
    }

    getInitialSession()

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        setSession(session)
        
        if (session?.user) {
          const { user: currentUser } = await AuthService.getCurrentUser()
          setUser(currentUser)
        } else {
          setUser(null)
        }
        
        setLoading(false)
      }
    )

    return () => subscription.unsubscribe()
  }, [])

  const signIn = async (email: string, password: string) => {
    const result = await AuthService.signIn(email, password)
    return result
  }

  const signUp = async (email: string, password: string, name: string, phone?: string) => {
    const result = await AuthService.signUp(email, password, name, phone)
    return result
  }

  const signOut = async () => {
    await AuthService.signOut()
    setUser(null)
    setSession(null)
  }

  const isAdmin = AuthService.isAdmin(user)

  const value = {
    user,
    session,
    loading,
    signIn,
    signUp,
    signOut,
    isAdmin
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}

