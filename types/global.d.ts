export {}

// Create a type for the roles
export type Roles = 'election_admin' | 'member'

declare global {
  interface CustomJwtSessionClaims {
    metadata: {
      role?: Roles
    }
  }
}