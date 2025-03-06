
import React from 'react';
import { useRouter } from '@/context/RouterContext';

const SecuritySettings: React.FC = () => {
  const { configurations, updateConfiguration, setShowExplanation, setCurrentExplanation } = useRouter();

  const handleShowExplanation = (text: string) => {
    setCurrentExplanation(text);
    setShowExplanation(true);
  };

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
        <div className="bg-gray-50 px-4 py-3 border-b border-gray-200 flex justify-between items-center">
          <h3 className="text-lg font-medium text-router-black">Admin Credentials</h3>
          <button
            onClick={() => handleShowExplanation("Secure your router's administration panel with a strong password. This is one of the most important security measures.")}
            className="text-router-blue hover:text-router-blue-light text-sm flex items-center"
          >
            <svg className="w-4 h-4 mr-1" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <circle cx="12" cy="12" r="10" strokeWidth="2" />
              <path d="M12 16v-4" strokeWidth="2" strokeLinecap="round" />
              <path d="M12 8h.01" strokeWidth="2" strokeLinecap="round" />
            </svg>
            Help
          </button>
        </div>
        <div className="p-4 space-y-4">
          <div>
            <label htmlFor="adminPassword" className="block text-sm font-medium text-router-gray-dark mb-1">
              Administrator Password
            </label>
            <input
              id="adminPassword"
              type="password"
              value={configurations.adminPassword}
              onChange={(e) => updateConfiguration('adminPassword', e.target.value)}
              className="router-input w-full"
              placeholder="Enter strong password"
            />
            <p className="text-xs text-router-gray-medium mt-1">
              Use a strong password with at least 12 characters including letters, numbers, and symbols
            </p>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
        <div className="bg-gray-50 px-4 py-3 border-b border-gray-200 flex justify-between items-center">
          <h3 className="text-lg font-medium text-router-black">WiFi Encryption</h3>
          <button
            onClick={() => handleShowExplanation("WPA3 is the latest and most secure encryption protocol. It protects your network traffic and prevents unauthorized access.")}
            className="text-router-blue hover:text-router-blue-light text-sm flex items-center"
          >
            <svg className="w-4 h-4 mr-1" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <circle cx="12" cy="12" r="10" strokeWidth="2" />
              <path d="M12 16v-4" strokeWidth="2" strokeLinecap="round" />
              <path d="M12 8h.01" strokeWidth="2" strokeLinecap="round" />
            </svg>
            Help
          </button>
        </div>
        <div className="p-4 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="encryptionType" className="block text-sm font-medium text-router-gray-dark mb-1">
                Encryption Type
              </label>
              <select
                id="encryptionType"
                value={configurations.encryptionType}
                onChange={(e) => updateConfiguration('encryptionType', e.target.value)}
                className="router-input w-full"
              >
                <option value="WEP">WEP (Wired Equivalent Privacy)</option>
                <option value="WPA">WPA (WiFi Protected Access)</option>
                <option value="WPA2">WPA2-PSK (Pre-Shared Key)</option>
                <option value="WPA3">WPA3-Personal</option>
              </select>
              <p className="text-xs text-router-gray-medium mt-1">
                Select the encryption protocol for your wireless network
              </p>
            </div>
            
            <div>
              <label htmlFor="wifiPassword" className="block text-sm font-medium text-router-gray-dark mb-1">
                WiFi Password
              </label>
              <input
                id="wifiPassword"
                type="password"
                value={configurations.wifiPassword}
                onChange={(e) => updateConfiguration('wifiPassword', e.target.value)}
                className="router-input w-full"
                placeholder="Enter WiFi password"
              />
              <p className="text-xs text-router-gray-medium mt-1">
                Create a strong, unique password for your wireless network
              </p>
            </div>
          </div>

          <div className="space-y-3 mt-4">
            <div className="flex items-center">
              <input
                id="wpa3Sae"
                type="checkbox"
                checked={configurations.wpa3Sae}
                onChange={(e) => updateConfiguration('wpa3Sae', e.target.checked)}
                className="h-4 w-4 text-router-blue rounded border-router-gray focus:ring-router-blue"
                disabled={configurations.encryptionType !== 'WPA3'}
              />
              <label htmlFor="wpa3Sae" className={`ml-2 block text-sm ${configurations.encryptionType !== 'WPA3' ? 'text-router-gray-medium' : 'text-router-gray-dark'}`}>
                Enable WPA3-SAE (Simultaneous Authentication of Equals)
              </label>
            </div>
            
            <div className="flex items-center">
              <input
                id="wpa3Aes"
                type="checkbox"
                checked={configurations.wpa3Aes}
                onChange={(e) => updateConfiguration('wpa3Aes', e.target.checked)}
                className="h-4 w-4 text-router-blue rounded border-router-gray focus:ring-router-blue"
                disabled={configurations.encryptionType !== 'WPA3'}
              />
              <label htmlFor="wpa3Aes" className={`ml-2 block text-sm ${configurations.encryptionType !== 'WPA3' ? 'text-router-gray-medium' : 'text-router-gray-dark'}`}>
                Enable WPA3-AES (Advanced Encryption Standard)
              </label>
            </div>
            
            <div className="flex items-center">
              <input
                id="disableWep"
                type="checkbox"
                checked={configurations.disableWep}
                onChange={(e) => updateConfiguration('disableWep', e.target.checked)}
                className="h-4 w-4 text-router-blue rounded border-router-gray focus:ring-router-blue"
              />
              <label htmlFor="disableWep" className="ml-2 block text-sm text-router-gray-dark">
                Disable outdated WEP protocol
              </label>
            </div>
            
            <div className="flex items-center">
              <input
                id="disableWpa2"
                type="checkbox"
                checked={configurations.disableWpa2}
                onChange={(e) => updateConfiguration('disableWpa2', e.target.checked)}
                className="h-4 w-4 text-router-blue rounded border-router-gray focus:ring-router-blue"
              />
              <label htmlFor="disableWpa2" className="ml-2 block text-sm text-router-gray-dark">
                Disable WPA2 backward compatibility
              </label>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
        <div className="bg-gray-50 px-4 py-3 border-b border-gray-200 flex justify-between items-center">
          <h3 className="text-lg font-medium text-router-black">Advanced Encryption</h3>
          <button
            onClick={() => handleShowExplanation("WPA3 Enterprise provides the highest level of security for business networks by using individual encryption keys for each user and requiring authentication through a RADIUS server.")}
            className="text-router-blue hover:text-router-blue-light text-sm flex items-center"
          >
            <svg className="w-4 h-4 mr-1" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <circle cx="12" cy="12" r="10" strokeWidth="2" />
              <path d="M12 16v-4" strokeWidth="2" strokeLinecap="round" />
              <path d="M12 8h.01" strokeWidth="2" strokeLinecap="round" />
            </svg>
            Help
          </button>
        </div>
        <div className="p-4 space-y-4">
          <div className="flex items-center mb-4">
            <input
              id="wpa3Enterprise"
              type="checkbox"
              checked={configurations.wpa3Enterprise}
              onChange={(e) => updateConfiguration('wpa3Enterprise', e.target.checked)}
              className="h-4 w-4 text-router-blue rounded border-router-gray focus:ring-router-blue"
              disabled={configurations.encryptionType !== 'WPA3'}
            />
            <label htmlFor="wpa3Enterprise" className={`ml-2 block text-sm ${configurations.encryptionType !== 'WPA3' ? 'text-router-gray-medium' : 'text-router-gray-dark'}`}>
              Enable WPA3 Enterprise (for business networks)
            </label>
          </div>
          
          {configurations.wpa3Enterprise && configurations.encryptionType === 'WPA3' && (
            <div className="pl-6 space-y-4 border-l-2 border-gray-100">
              <div className="flex items-center">
                <input
                  id="wpaEnterpriseTls"
                  type="checkbox"
                  checked={configurations.wpaEnterpriseTls}
                  onChange={(e) => updateConfiguration('wpaEnterpriseTls', e.target.checked)}
                  className="h-4 w-4 text-router-blue rounded border-router-gray focus:ring-router-blue"
                />
                <label htmlFor="wpaEnterpriseTls" className="ml-2 block text-sm text-router-gray-dark">
                  Use TLS Certificate Authentication
                </label>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="radiusServer" className="block text-sm font-medium text-router-gray-dark mb-1">
                    RADIUS Server
                  </label>
                  <input
                    id="radiusServer"
                    type="text"
                    value={configurations.radiusServer}
                    onChange={(e) => updateConfiguration('radiusServer', e.target.value)}
                    className="router-input w-full"
                    placeholder="radius.example.com"
                  />
                </div>
                
                <div>
                  <label htmlFor="radiusPort" className="block text-sm font-medium text-router-gray-dark mb-1">
                    RADIUS Port
                  </label>
                  <input
                    id="radiusPort"
                    type="number"
                    value={configurations.radiusPort}
                    onChange={(e) => updateConfiguration('radiusPort', Number(e.target.value))}
                    className="router-input w-full"
                    placeholder="1812"
                  />
                </div>
                
                <div>
                  <label htmlFor="radiusSecret" className="block text-sm font-medium text-router-gray-dark mb-1">
                    RADIUS Secret
                  </label>
                  <input
                    id="radiusSecret"
                    type="password"
                    value={configurations.radiusSecret}
                    onChange={(e) => updateConfiguration('radiusSecret', e.target.value)}
                    className="router-input w-full"
                    placeholder="Shared secret"
                  />
                </div>
              </div>
            </div>
          )}
          
          <div className="mt-6">
            <label htmlFor="pmfMode" className="block text-sm font-medium text-router-gray-dark mb-1">
              Protected Management Frames (PMF)
            </label>
            <select
              id="pmfMode"
              value={configurations.pmfMode}
              onChange={(e) => updateConfiguration('pmfMode', e.target.value as 'disabled' | 'optional' | 'required')}
              className="router-input w-full"
            >
              <option value="disabled">Disabled</option>
              <option value="optional">Optional</option>
              <option value="required">Required</option>
            </select>
            <p className="text-xs text-router-gray-medium mt-1">
              Protects management frames from being forged or altered
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SecuritySettings;
