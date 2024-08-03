import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';

interface AuthContextType {
  isLoggedIn: boolean;
  login: (token: string) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(!!localStorage.getItem('jwtToken'));

  // 로그인 시 JWT 토큰을 로컬 스토리지에 저장하고 로그인 상태 업데이트
  const login = (token: string) => {
    localStorage.setItem('jwtToken', token);
    setIsLoggedIn(true);
  }
  
  // 로그아웃 시 로컬 스토리지에서 JWT 토큰을 삭제하고 로그인 상태 업데이트
  const logout = () => {
    localStorage.removeItem('jwtToken');
    setIsLoggedIn(false);
  }

  // 컴포넌트가 처음 마운트될 때 JWT 토큰의 존재 여부를 확인하여 상태를 업데이트
  useEffect(() => {
    const token = localStorage.getItem('jwtToken');
    setIsLoggedIn(!!token);
  }, []);

  return (
    <AuthContext.Provider value={{ isLoggedIn, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
