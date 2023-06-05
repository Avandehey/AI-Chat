import React, { createContext, useState, ReactNode } from 'react';

interface User {
  token: string;
  username: string;
  loggedIn: boolean;
}

interface UserContext {
  user: User;
  setUser: React.Dispatch<React.SetStateAction<User>>;
}

// Create a user context with initial empty values
export const AuthContext = createContext<UserContext>({} as UserContext);

interface AuthProviderProps {
  children: ReactNode; // Represents the child elements wrapped by AuthProvider
}

// AuthProvider component
const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  // Set up the state for the user and setUser function using useState
  const [user, setUser] = useState<User>({
    token: '',
    username: '',
    loggedIn: false,
  });

  // Create the value object containing the user and setUser
  const value: UserContext = {
    user,
    setUser,
  };

  // Render the AuthContext.Provider with the value and children
  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;