import { supabase } from './supabase'

export interface User {
  id: string
  email: string
  name: string
  phone?: string
  role: 'admin' | 'customer'
  created_at: string
}

export interface AuthState {
  user: User | null
  session: any | null
  loading: boolean
}

export class AuthService {
  static async signUp(email: string, password: string, name: string, phone?: string) {
    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            name,
            phone,
            role: 'customer'
          }
        }
      })

      if (error) throw error

      return { user: data.user, session: data.session, error: null }
    } catch (error: any) {
      return { user: null, session: null, error: error.message }
    }
  }

  static async signIn(email: string, password: string) {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password
      })

      if (error) throw error

      return { user: data.user, session: data.session, error: null }
    } catch (error: any) {
      return { user: null, session: null, error: error.message }
    }
  }

  static async signOut() {
    try {
      const { error } = await supabase.auth.signOut()
      if (error) throw error
      return { error: null }
    } catch (error: any) {
      return { error: error.message }
    }
  }

  static async getCurrentUser() {
    try {
      const { data: { user }, error } = await supabase.auth.getUser()
      if (error) throw error
      
      if (!user) return { user: null, error: null }

      const formattedUser: User = {
        id: user.id,
        email: user.email || '',
        name: user.user_metadata?.name || '',
        phone: user.user_metadata?.phone || '',
        role: user.user_metadata?.role || 'customer',
        created_at: user.created_at || ''
      }

      return { user: formattedUser, error: null }
    } catch (error: any) {
      return { user: null, error: error.message }
    }
  }

  static async updateProfile(name: string, phone?: string) {
    try {
      const { data, error } = await supabase.auth.updateUser({
        data: {
          name,
          phone
        }
      })

      if (error) throw error

      return { user: data.user, error: null }
    } catch (error: any) {
      return { user: null, error: error.message }
    }
  }

  static isAdmin(user: User | null): boolean {
    return user?.role === 'admin' || user?.email === 'admin@cozyhaven.co.uk'
  }

  static getAuthHeaders() {
    return supabase.auth.getSession().then(({ data: { session } }) => {
      if (session?.access_token) {
        return {
          'Authorization': `Bearer ${session.access_token}`,
          'Content-Type': 'application/json'
        }
      }
      return {
        'Content-Type': 'application/json'
      }
    })
  }
}

