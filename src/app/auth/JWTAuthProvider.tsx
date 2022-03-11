/* eslint-disable @typescript-eslint/no-empty-function */
import React, { createContext, ReactNode, useContext, useState } from 'react';
// import { useDispatch } from 'react-redux';
// import { fetchError, fetchStart, fetchSuccess } from '@/redux/actions';
// import { useMutation, useQuery } from '@apollo/client';
import { Users } from '@halay08/hasura-common/dist/shared/generated';
// import { UserRole } from '@/types/models/User';

interface JWTAuthContextProps {
  user: Users | any;
  isAuthenticated: boolean;
  userId: number;
}

interface JWTAuthActionsProps {
  logout: () => void;
  // any is just example. Should replace to MutationRootAuthenticateArgs
  authenticate: (data: any) => void;
}

const DEFAULT_AUTH_PROPS = {
  user: undefined,
  isCodeSent: false,
  isAuthenticated: false,
  userId: 0
};

export const setAuthToken = (token?: string): void => {
  if (token) {
    localStorage.setItem('token', token);
  } else {
    localStorage.removeItem('token');
  }
};

export const setUserData = (userData?: Users | null): void => {
  if (userData) {
    localStorage.setItem('userData', JSON.stringify(userData));
  } else {
    localStorage.removeItem('userData');
  }
};

const JWTAuthContext = createContext<JWTAuthContextProps>(DEFAULT_AUTH_PROPS);
const JWTAuthActionsContext = createContext<JWTAuthActionsProps>({
  logout: () => {},
  authenticate: () => {}
});

export const useJWTAuth = (): JWTAuthContextProps => useContext(JWTAuthContext);

export const useJWTAuthActions = (): JWTAuthActionsProps =>
  useContext(JWTAuthActionsContext);

interface JWTAuthProviderProps {
  children: ReactNode;
}

const JWTAuthProvider: React.FC<JWTAuthProviderProps> = ({ children }) => {
  const userData = JSON.parse(localStorage.getItem('userData') || '{}');
  const [jwtAuthData, setJWTAuthData] = useState<JWTAuthContextProps>({
    ...DEFAULT_AUTH_PROPS,
    user: userData,
    isAuthenticated: !!userData?.id,
    userId: userData?.id
  });

  const authenticate = () => {
    /* */
  };

  const logout = async () => {
    setAuthToken();
    setUserData();
    setJWTAuthData(DEFAULT_AUTH_PROPS);
  };

  return (
    <JWTAuthContext.Provider
      value={{
        ...jwtAuthData
      }}
    >
      <JWTAuthActionsContext.Provider
        value={{
          authenticate,
          logout
        }}
      >
        {children}
      </JWTAuthActionsContext.Provider>
    </JWTAuthContext.Provider>
  );
};
export default JWTAuthProvider;
