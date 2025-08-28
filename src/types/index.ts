export interface User {
  id: string
  email: string
  name?: string
  phone?: string
  role: 'admin' | 'customer'
}

export interface ClientActivity {
  id: string
  clientName: string
  email: string
  action: string
  property: string
  amount: string
  timestamp: string
  status: string
  ipAddress: string
  location: string
  paymentMethod: string
  riskScore: string
}

export interface SuspiciousActivity {
  id: string
  type: string
  client: string
  description: string
  riskLevel: string
  timestamp: string
  status: string
  actions: string[]
}