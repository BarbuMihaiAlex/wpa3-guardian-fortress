
import React, { createContext, useContext, useState } from 'react';

interface RouterContextProps {
  isLoggedIn: boolean;
  login: (username: string, password: string) => boolean;
  logout: () => void;
  currentStep: number;
  setCurrentStep: (step: number) => void;
  configurations: RouterConfigurations;
  updateConfiguration: (key: keyof RouterConfigurations, value: any) => void;
  securityScore: number;
  calculateSecurityScore: () => number;
  showExplanation: boolean;
  setShowExplanation: (show: boolean) => void;
  currentExplanation: string;
  setCurrentExplanation: (explanation: string) => void;
  isCompleted: boolean;
  checkCompletion: () => boolean;
  resetConfigurations: () => void;
}

interface RouterConfigurations {
  ssid: string;
  adminPassword: string;
  encryptionType: 'WEP' | 'WPA' | 'WPA2' | 'WPA3';
  wpa3Sae: boolean;
  wpa3Aes: boolean;
  wpa3Enterprise: boolean;
  wifiPassword: string;
  macFiltering: boolean;
  ipv6Security: boolean;
  disableWep: boolean;
  disableWpa2: boolean;
  dhcpLeaseTimeLimit: boolean;
  networkIsolation: boolean;
}

const defaultConfigurations: RouterConfigurations = {
  ssid: 'Default_Router',
  adminPassword: '',
  encryptionType: 'WPA2',
  wpa3Sae: false,
  wpa3Aes: false,
  wpa3Enterprise: false,
  wifiPassword: '',
  macFiltering: false,
  ipv6Security: false,
  disableWep: false,
  disableWpa2: false,
  dhcpLeaseTimeLimit: false,
  networkIsolation: false,
};

const RouterContext = createContext<RouterContextProps | undefined>(undefined);

export const RouterProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [configurations, setConfigurations] = useState<RouterConfigurations>(defaultConfigurations);
  const [showExplanation, setShowExplanation] = useState(false);
  const [currentExplanation, setCurrentExplanation] = useState('');
  const [isCompleted, setIsCompleted] = useState(false);

  const login = (username: string, password: string) => {
    // For simplicity, any non-empty username/password works in this lab
    if (username.trim() && password.trim()) {
      setIsLoggedIn(true);
      return true;
    }
    return false;
  };

  const logout = () => {
    setIsLoggedIn(false);
    setCurrentStep(0);
    resetConfigurations();
  };

  const updateConfiguration = (key: keyof RouterConfigurations, value: any) => {
    setConfigurations(prev => ({ ...prev, [key]: value }));
  };

  const calculateSecurityScore = () => {
    let score = 0;
    const config = configurations;

    // Basic settings - up to 20 points
    if (config.ssid !== 'Default_Router' && config.ssid !== '') score += 5;
    if (config.adminPassword.length >= 8) score += 15;

    // WPA3 Security - up to 30 points
    if (config.encryptionType === 'WPA3') score += 15;
    if (config.wpa3Sae) score += 8;
    if (config.wpa3Aes) score += 7;
    
    // Advanced Security - up to 30 points
    if (config.wpa3Enterprise) score += 10;
    if (config.macFiltering) score += 5;
    if (config.ipv6Security) score += 5;
    if (config.disableWep) score += 5;
    if (config.disableWpa2) score += 5;
    
    // Protection against offline attacks - up to 20 points
    if (config.dhcpLeaseTimeLimit) score += 10;
    if (config.networkIsolation) score += 10;
    
    // WiFi Password strength - up to 10 points (bonus)
    if (config.wifiPassword.length >= 12) score += 10;
    else if (config.wifiPassword.length >= 8) score += 5;

    return Math.min(score, 100);
  };

  const checkCompletion = () => {
    const score = calculateSecurityScore();
    const completed = score >= 90;
    setIsCompleted(completed);
    return completed;
  };

  const resetConfigurations = () => {
    setConfigurations(defaultConfigurations);
    setIsCompleted(false);
  };

  return (
    <RouterContext.Provider
      value={{
        isLoggedIn,
        login,
        logout,
        currentStep,
        setCurrentStep,
        configurations,
        updateConfiguration,
        securityScore: calculateSecurityScore(),
        calculateSecurityScore,
        showExplanation,
        setShowExplanation,
        currentExplanation,
        setCurrentExplanation,
        isCompleted,
        checkCompletion,
        resetConfigurations,
      }}
    >
      {children}
    </RouterContext.Provider>
  );
};

export const useRouter = () => {
  const context = useContext(RouterContext);
  if (context === undefined) {
    throw new Error('useRouter must be used within a RouterProvider');
  }
  return context;
};
