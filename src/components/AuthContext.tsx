// AuthContext.tsx
import React, { createContext, useContext, useState, useEffect } from 'react';
import { onAuthStateChanged, signOut, User } from 'firebase/auth';
import { auth } from '../../firebase'; // your Firebase config

interface AuthContextValue {
  user: User | null;
  role: string | null; // 'admin' or 'presenter'
  loading: boolean;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextValue>({
  user: null,
  role: null,
  loading: true,
  logout: async () => {},
});

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [role, setRole] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    // Listen for changes in Firebase Auth state
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);

      if (currentUser) {
        // HARD-CODED ROLE CHECK
        // Make sure these emails exist in your Firebase Auth user list
        if (currentUser.email === 'admin@test.com') {
          setRole('admin');
        } else if (currentUser.email === 'presenter@test.com') {
          setRole('presenter');
        } else {
          setRole(null);
        }
      } else {
        setRole(null);
      }

      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const logout = async () => {
    await signOut(auth);
  };

  const value: AuthContextValue = {
    user,
    role,
    loading,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

// Custom hook to use AuthContext
export function useAuth() {
  return useContext(AuthContext);
}

export default AuthContext;
