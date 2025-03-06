
import React, { createContext, useContext, useState } from 'react';

interface RouterContextProps {
  isLoggedIn: boolean;
  login: (username: string, password: string) => boolean;
  logout: () => void;
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
  applySettings: () => void;
  settingsApplied: boolean;
  rebootInProgress: boolean;
  rebootRouter: () => void;
}

interface RouterConfigurations {
  // Basic Network Settings
  ssid: string;
  broadcastSsid: boolean;
  adminPassword: string;
  wifiPassword: string;
  routerName: string;
  
  // Connection Settings
  channelWidth: '20MHz' | '40MHz' | '80MHz' | '160MHz';
  channel: number;
  band: '2.4GHz' | '5GHz' | 'dual';
  transmitPower: 'low' | 'medium' | 'high';
  beamforming: boolean;
  
  // Security Settings
  encryptionType: 'WEP' | 'WPA' | 'WPA2' | 'WPA3';
  wpa3Sae: boolean;
  wpa3Aes: boolean;
  wpa3Enterprise: boolean;
  wpaEnterpriseTls: boolean;
  radiusServer: string;
  radiusPort: number;
  radiusSecret: string;
  pmfMode: 'disabled' | 'optional' | 'required';
  
  // Access Control
  macFiltering: boolean;
  macAddresses: string[];
  ipv6Security: boolean;
  disableWep: boolean;
  disableWpa2: boolean;
  firewallEnabled: boolean;
  
  // DHCP Settings
  dhcpEnabled: boolean;
  dhcpStartIp: string;
  dhcpEndIp: string;
  dhcpLeaseTimeLimit: boolean;
  dhcpLeaseTime: number;
  
  // Advanced Security
  networkIsolation: boolean;
  vpnPassthrough: boolean;
  upnpEnabled: boolean;
  dmzEnabled: boolean;
  dmzIp: string;
  
  // QoS Settings
  qosEnabled: boolean;
  bandwidthLimit: boolean;
  downloadBandwidth: number;
  uploadBandwidth: number;
  
  // Maintenance
  firmwareVersion: string;
  autoUpdate: boolean;
  ntp: boolean;
  timezone: string;
  logEnabled: boolean;
  remoteMgmt: boolean;
}

const defaultConfigurations: RouterConfigurations = {
  // Basic Network Settings
  ssid: 'Default_Router',
  broadcastSsid: true,
  adminPassword: '',
  wifiPassword: '',
  routerName: 'WPA3-Router',
  
  // Connection Settings
  channelWidth: '40MHz',
  channel: 6,
  band: '2.4GHz',
  transmitPower: 'high',
  beamforming: false,
  
  // Security Settings
  encryptionType: 'WPA2',
  wpa3Sae: false,
  wpa3Aes: false,
  wpa3Enterprise: false,
  wpaEnterpriseTls: false,
  radiusServer: '',
  radiusPort: 1812,
  radiusSecret: '',
  pmfMode: 'disabled',
  
  // Access Control
  macFiltering: false,
  macAddresses: [],
  ipv6Security: false,
  disableWep: false,
  disableWpa2: false,
  firewallEnabled: true,
  
  // DHCP Settings
  dhcpEnabled: true,
  dhcpStartIp: '192.168.1.100',
  dhcpEndIp: '192.168.1.200',
  dhcpLeaseTimeLimit: false,
  dhcpLeaseTime: 1440, // minutes
  
  // Advanced Security
  networkIsolation: false,
  vpnPassthrough: true,
  upnpEnabled: true,
  dmzEnabled: false,
  dmzIp: '',
  
  // QoS Settings
  qosEnabled: false,
  bandwidthLimit: false,
  downloadBandwidth: 100,
  uploadBandwidth: 20,
  
  // Maintenance
  firmwareVersion: 'v1.2.3',
  autoUpdate: false,
  ntp: true,
  timezone: 'UTC',
  logEnabled: false,
  remoteMgmt: false,
};

const RouterContext = createContext<RouterContextProps | undefined>(undefined);

export const RouterProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [configurations, setConfigurations] = useState<RouterConfigurations>(defaultConfigurations);
  const [showExplanation, setShowExplanation] = useState(false);
  const [currentExplanation, setCurrentExplanation] = useState('');
  const [isCompleted, setIsCompleted] = useState(false);
  const [settingsApplied, setSettingsApplied] = useState(false);
  const [rebootInProgress, setRebootInProgress] = useState(false);

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
    resetConfigurations();
  };

  const updateConfiguration = (key: keyof RouterConfigurations, value: any) => {
    setConfigurations(prev => ({ ...prev, [key]: value }));
    setSettingsApplied(false);
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
    setSettingsApplied(false);
  };

  const applySettings = () => {
    checkCompletion();
    setSettingsApplied(true);
  };

  const rebootRouter = () => {
    setRebootInProgress(true);
    setTimeout(() => {
      setRebootInProgress(false);
      setSettingsApplied(true);
    }, 3000);
  };

  return (
    <RouterContext.Provider
      value={{
        isLoggedIn,
        login,
        logout,
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
        applySettings,
        settingsApplied,
        rebootInProgress,
        rebootRouter
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
