
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useRouter } from '@/context/RouterContext';
import ConfigurationStep from './ConfigurationStep';
import SecurityExplanation from './SecurityExplanation';
import FlagReveal from './FlagReveal';

const RouterInterface: React.FC = () => {
  const { 
    logout, 
    currentStep, 
    setCurrentStep,
    configurations, 
    updateConfiguration,
    securityScore,
    calculateSecurityScore,
    checkCompletion
  } = useRouter();

  useEffect(() => {
    calculateSecurityScore();
    if (currentStep === 4) {
      checkCompletion();
    }
  }, [configurations, currentStep, calculateSecurityScore, checkCompletion]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-gray-100 p-6">
      <motion.div 
        className="max-w-4xl mx-auto"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex justify-between items-center mb-6">
          <motion.div 
            className="flex items-center"
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.4 }}
          >
            <div className="h-10 w-10 bg-router-blue rounded-md flex items-center justify-center text-white mr-3">
              <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M5 12H19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M12 5L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M8 9C8 9 9.5 7 12 7C14.5 7 16 9 16 9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M16 15C16 15 14.5 17 12 17C9.5 17 8 15 8 15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <div>
              <h1 className="text-xl font-semibold text-router-black">WPA3 Guardian Fortress</h1>
              <p className="text-sm text-router-gray-dark">Router Administration Portal</p>
            </div>
          </motion.div>

          <motion.div 
            className="flex items-center space-x-4"
            initial={{ x: 20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.4 }}
          >
            <div className="text-right mr-2">
              <div className="text-sm font-medium text-router-black">Security Score</div>
              <div className="text-xl font-bold text-router-blue">{securityScore}%</div>
            </div>
            <button 
              onClick={logout}
              className="text-router-gray-dark hover:text-router-black transition-colors"
            >
              <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
                <polyline points="16 17 21 12 16 7"></polyline>
                <line x1="21" y1="12" x2="9" y2="12"></line>
              </svg>
            </button>
          </motion.div>
        </div>

        <motion.div 
          className="flex mb-8 border-b border-router-gray"
          initial={{ y: 10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.4 }}
        >
          {['Basic Settings', 'WPA3 Security', 'Advanced Features', 'Protection', 'Verification'].map((step, index) => (
            <button
              key={index}
              className={`py-4 px-6 relative text-sm font-medium transition-colors ${
                currentStep === index
                  ? 'text-router-blue'
                  : 'text-router-gray-dark hover:text-router-black'
              }`}
              onClick={() => setCurrentStep(index)}
            >
              {step}
              {currentStep === index && (
                <motion.div
                  className="absolute bottom-0 left-0 right-0 h-0.5 bg-router-blue"
                  layoutId="activeTab"
                  transition={{ duration: 0.3 }}
                />
              )}
            </button>
          ))}
        </motion.div>

        <div className="space-y-8">
          <ConfigurationStep
            step={0}
            title="Basic Router Settings"
            description="Configure the fundamental settings of your router to establish a baseline of security."
            explanationText="Changing the default SSID and admin password is a crucial first step in securing your network. Default values are widely known and can be easily targeted by attackers."
          >
            <div className="space-y-5">
              <div>
                <label htmlFor="ssid" className="block text-sm font-medium text-router-gray-dark mb-1">
                  Network Name (SSID)
                </label>
                <input
                  id="ssid"
                  type="text"
                  value={configurations.ssid}
                  onChange={(e) => updateConfiguration('ssid', e.target.value)}
                  className="router-input w-full"
                  placeholder="Enter network name"
                />
                <p className="text-xs text-router-gray-medium mt-1">
                  Choose a unique name that doesn't reveal personal information
                </p>
              </div>
              
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
          </ConfigurationStep>

          <ConfigurationStep
            step={1}
            title="WPA3 Security Configuration"
            description="Configure the encryption and authentication settings for your WiFi network."
            explanationText="WPA3 is the latest security protocol for WiFi networks, offering stronger encryption and protection against offline dictionary attacks. The SAE feature provides individualized data encryption, while AES is the strongest encryption standard available."
          >
            <div className="space-y-5">
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
              
              <div className="flex items-center">
                <input
                  id="wpa3Sae"
                  type="checkbox"
                  checked={configurations.wpa3Sae}
                  onChange={(e) => updateConfiguration('wpa3Sae', e.target.checked)}
                  className="h-4 w-4 text-router-blue rounded border-router-gray focus:ring-router-blue"
                />
                <label htmlFor="wpa3Sae" className="ml-2 block text-sm text-router-gray-dark">
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
                />
                <label htmlFor="wpa3Aes" className="ml-2 block text-sm text-router-gray-dark">
                  Enable WPA3-AES (Advanced Encryption Standard)
                </label>
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
          </ConfigurationStep>

          <ConfigurationStep
            step={2}
            title="Advanced Security Features"
            description="Configure additional security measures to further strengthen your network."
            explanationText="Advanced security features provide multiple layers of protection. WPA3 Enterprise uses individual encryption keys for each user. MAC filtering restricts access to specific devices, while IPv6 security protects against newer attack vectors. Disabling older protocols prevents attackers from exploiting known vulnerabilities."
          >
            <div className="space-y-5">
              <div className="flex items-center">
                <input
                  id="wpa3Enterprise"
                  type="checkbox"
                  checked={configurations.wpa3Enterprise}
                  onChange={(e) => updateConfiguration('wpa3Enterprise', e.target.checked)}
                  className="h-4 w-4 text-router-blue rounded border-router-gray focus:ring-router-blue"
                />
                <label htmlFor="wpa3Enterprise" className="ml-2 block text-sm text-router-gray-dark">
                  Enable WPA3 Enterprise (for business networks)
                </label>
              </div>
              
              <div className="flex items-center">
                <input
                  id="macFiltering"
                  type="checkbox"
                  checked={configurations.macFiltering}
                  onChange={(e) => updateConfiguration('macFiltering', e.target.checked)}
                  className="h-4 w-4 text-router-blue rounded border-router-gray focus:ring-router-blue"
                />
                <label htmlFor="macFiltering" className="ml-2 block text-sm text-router-gray-dark">
                  Enable MAC Address Filtering
                </label>
              </div>
              
              <div className="flex items-center">
                <input
                  id="ipv6Security"
                  type="checkbox"
                  checked={configurations.ipv6Security}
                  onChange={(e) => updateConfiguration('ipv6Security', e.target.checked)}
                  className="h-4 w-4 text-router-blue rounded border-router-gray focus:ring-router-blue"
                />
                <label htmlFor="ipv6Security" className="ml-2 block text-sm text-router-gray-dark">
                  Enable IPv6 Security
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
          </ConfigurationStep>

          <ConfigurationStep
            step={3}
            title="Protection Against Attacks"
            description="Configure additional measures to protect against specific attack vectors."
            explanationText="DHCP lease time limits prevent attackers from obtaining multiple IP addresses. Network isolation (client isolation) prevents connected devices from communicating with each other, limiting the spread of malware or lateral movement by attackers who gain access to one device."
          >
            <div className="space-y-5">
              <div className="flex items-center">
                <input
                  id="dhcpLeaseTimeLimit"
                  type="checkbox"
                  checked={configurations.dhcpLeaseTimeLimit}
                  onChange={(e) => updateConfiguration('dhcpLeaseTimeLimit', e.target.checked)}
                  className="h-4 w-4 text-router-blue rounded border-router-gray focus:ring-router-blue"
                />
                <label htmlFor="dhcpLeaseTimeLimit" className="ml-2 block text-sm text-router-gray-dark">
                  Enable DHCP Lease Time Limits
                </label>
              </div>
              
              <div className="flex items-center">
                <input
                  id="networkIsolation"
                  type="checkbox"
                  checked={configurations.networkIsolation}
                  onChange={(e) => updateConfiguration('networkIsolation', e.target.checked)}
                  className="h-4 w-4 text-router-blue rounded border-router-gray focus:ring-router-blue"
                />
                <label htmlFor="networkIsolation" className="ml-2 block text-sm text-router-gray-dark">
                  Enable Network Isolation (Client Isolation)
                </label>
              </div>
              
              <div className="bg-router-blue/10 rounded-lg p-4 text-sm text-router-gray-dark">
                <div className="flex">
                  <svg className="h-5 w-5 text-router-blue mr-2 flex-shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="10"></circle>
                    <line x1="12" y1="16" x2="12" y2="12"></line>
                    <line x1="12" y1="8" x2="12.01" y2="8"></line>
                  </svg>
                  <p>
                    Protection against offline dictionary attacks is a key feature of WPA3. By implementing additional 
                    measures like DHCP constraints and network isolation, you create multiple layers of security.
                  </p>
                </div>
              </div>
            </div>
          </ConfigurationStep>

          <ConfigurationStep
            step={4}
            title="Verify and Apply Settings"
            description="Review your security settings and apply the changes to your router."
            explanationText="The final verification step ensures all security measures are properly configured. A high security score indicates a well-protected network that follows best practices for WiFi security."
          >
            <div className="space-y-6">
              <div>
                <h4 className="font-medium text-router-black mb-2">Security Summary</h4>
                <div className="bg-router-gray-light rounded-lg p-5">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-medium text-router-gray-dark">Security Score</span>
                    <span className="text-sm font-bold text-router-blue">{securityScore}/100</span>
                  </div>
                  <div className="h-2 bg-white rounded-full overflow-hidden">
                    <div 
                      className={`h-full ${
                        securityScore >= 90
                          ? "bg-router-green"
                          : securityScore >= 70
                          ? "bg-router-blue"
                          : "bg-router-yellow"
                      }`}
                      style={{ width: `${securityScore}%` }}
                    />
                  </div>
                  
                  <div className="mt-4 text-sm text-router-gray-dark">
                    {securityScore >= 90 ? (
                      <span>Your network configuration provides excellent protection against threats!</span>
                    ) : securityScore >= 70 ? (
                      <span>Your network is secure, but could be improved further.</span>
                    ) : (
                      <span>Your network security needs significant improvements.</span>
                    )}
                  </div>
                </div>
              </div>
              
              <div className="bg-white rounded-lg border border-router-gray p-5">
                <h4 className="font-medium text-router-black mb-3">Configuration Overview</h4>
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span className="text-router-gray-dark">Network Name (SSID)</span>
                    <span className="font-medium text-router-black">{configurations.ssid}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-router-gray-dark">Encryption Type</span>
                    <span className="font-medium text-router-black">{configurations.encryptionType}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-router-gray-dark">WPA3-SAE</span>
                    <span className="font-medium text-router-black">{configurations.wpa3Sae ? 'Enabled' : 'Disabled'}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-router-gray-dark">WPA3-AES</span>
                    <span className="font-medium text-router-black">{configurations.wpa3Aes ? 'Enabled' : 'Disabled'}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-router-gray-dark">Advanced Security Features</span>
                    <span className="font-medium text-router-black">
                      {[
                        configurations.wpa3Enterprise && 'Enterprise',
                        configurations.macFiltering && 'MAC Filter',
                        configurations.ipv6Security && 'IPv6 Security'
                      ].filter(Boolean).join(', ') || 'None'}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-router-gray-dark">Protection Measures</span>
                    <span className="font-medium text-router-black">
                      {[
                        configurations.dhcpLeaseTimeLimit && 'DHCP Limits',
                        configurations.networkIsolation && 'Network Isolation'
                      ].filter(Boolean).join(', ') || 'None'}
                    </span>
                  </div>
                </div>
              </div>
              
              <div className="text-center pt-4">
                <button
                  onClick={checkCompletion}
                  className="router-button px-8"
                >
                  Apply and Save Settings
                </button>
                <p className="text-xs text-router-gray-medium mt-3">
                  Your router will reboot to apply these settings
                </p>
              </div>
            </div>
          </ConfigurationStep>
        </div>
      </motion.div>
      
      <SecurityExplanation />
      <FlagReveal />
    </div>
  );
};

export default RouterInterface;
