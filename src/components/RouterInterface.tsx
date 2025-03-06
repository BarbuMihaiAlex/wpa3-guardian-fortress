
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useRouter } from '@/context/RouterContext';
import SecurityExplanation from './SecurityExplanation';
import FlagReveal from './FlagReveal';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import NetworkSettings from './router-panels/NetworkSettings';
import SecuritySettings from './router-panels/SecuritySettings';
import AdvancedSettings from './router-panels/AdvancedSettings';
import SystemSettings from './router-panels/SystemSettings';
import StatusPanel from './router-panels/StatusPanel';
import AccessControl from './router-panels/AccessControl';

const RouterInterface: React.FC = () => {
  const { 
    logout, 
    configurations,
    securityScore,
    calculateSecurityScore,
    applySettings,
    settingsApplied,
    rebootInProgress,
    rebootRouter
  } = useRouter();

  const [activeTab, setActiveTab] = useState('status');
  const [showConfirmation, setShowConfirmation] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-gray-100">
      {rebootInProgress && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center">
          <div className="bg-white p-8 rounded-lg shadow-lg max-w-md text-center">
            <div className="flex justify-center mb-4">
              <div className="animate-spin h-12 w-12 border-4 border-router-blue border-t-transparent rounded-full"></div>
            </div>
            <h2 className="text-xl font-semibold text-router-black mb-2">Router Rebooting</h2>
            <p className="text-router-gray-dark mb-4">Please wait while your router restarts...</p>
            <div className="w-full bg-gray-200 h-2 rounded-full overflow-hidden">
              <div className="bg-router-blue h-full animate-pulse"></div>
            </div>
          </div>
        </div>
      )}

      {showConfirmation && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-md">
            <h2 className="text-xl font-semibold text-router-black mb-3">Apply Changes</h2>
            <p className="text-router-gray-dark mb-4">
              Are you sure you want to apply these changes? Your router will reboot and you may lose connection temporarily.
            </p>
            <div className="flex justify-end space-x-3">
              <button 
                className="px-4 py-2 border border-router-gray text-router-gray-dark rounded-md hover:bg-router-gray-light transition-colors"
                onClick={() => setShowConfirmation(false)}
              >
                Cancel
              </button>
              <button 
                className="router-button"
                onClick={() => {
                  setShowConfirmation(false);
                  applySettings();
                  rebootRouter();
                }}
              >
                Apply and Reboot
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="container mx-auto px-4 py-6">
        <motion.div 
          className="bg-white rounded-xl shadow-lg overflow-hidden"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          {/* Router Header */}
          <div className="bg-router-blue px-6 py-4 flex justify-between items-center">
            <div className="flex items-center">
              <div className="h-10 w-10 bg-white/20 rounded-md flex items-center justify-center text-white mr-3">
                <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M5 12H19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M12 5L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M8 9C8 9 9.5 7 12 7C14.5 7 16 9 16 9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M16 15C16 15 14.5 17 12 17C9.5 17 8 15 8 15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <div>
                <h1 className="text-xl font-semibold text-white">WPA3 Guardian Fortress</h1>
                <p className="text-sm text-white/80">Router Administration Panel</p>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <div className="flex items-center bg-white/10 px-3 py-1 rounded-full">
                <span className="text-xs font-medium text-white/80 mr-2">Security:</span>
                <span className={`text-sm font-bold ${
                  securityScore >= 90 ? 'text-green-300' : 
                  securityScore >= 70 ? 'text-yellow-300' : 
                  'text-red-300'
                }`}>
                  {securityScore}%
                </span>
              </div>

              {!settingsApplied && (
                <button 
                  className="bg-white/10 hover:bg-white/20 text-white px-3 py-1 rounded-md text-sm font-medium transition-colors"
                  onClick={() => setShowConfirmation(true)}
                >
                  Apply Changes
                </button>
              )}
              
              <button 
                onClick={logout}
                className="text-white hover:text-white/80 transition-colors"
                aria-label="Logout"
              >
                <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
                  <polyline points="16 17 21 12 16 7"></polyline>
                  <line x1="21" y1="12" x2="9" y2="12"></line>
                </svg>
              </button>
            </div>
          </div>

          {/* Router Content */}
          <div className="p-6">
            <Tabs defaultValue="status" value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="w-full grid grid-cols-6 mb-6">
                <TabsTrigger value="status">Status</TabsTrigger>
                <TabsTrigger value="network">Network</TabsTrigger>
                <TabsTrigger value="security">Security</TabsTrigger>
                <TabsTrigger value="access">Access Control</TabsTrigger>
                <TabsTrigger value="advanced">Advanced</TabsTrigger>
                <TabsTrigger value="system">System</TabsTrigger>
              </TabsList>
              
              <TabsContent value="status" className="mt-0">
                <StatusPanel />
              </TabsContent>

              <TabsContent value="network" className="mt-0">
                <NetworkSettings />
              </TabsContent>

              <TabsContent value="security" className="mt-0">
                <SecuritySettings />
              </TabsContent>

              <TabsContent value="access" className="mt-0">
                <AccessControl />
              </TabsContent>

              <TabsContent value="advanced" className="mt-0">
                <AdvancedSettings />
              </TabsContent>

              <TabsContent value="system" className="mt-0">
                <SystemSettings />
              </TabsContent>
            </Tabs>
          </div>
          
          {/* Router Footer */}
          <div className="bg-gray-50 px-6 py-3 border-t border-gray-200 flex justify-between items-center text-xs text-router-gray-medium">
            <div>
              <span>Firmware: {configurations.firmwareVersion}</span>
              <span className="mx-2">|</span>
              <span>IP: 192.168.1.1</span>
            </div>
            <div>© 2023 WPA3 Guardian Fortress</div>
          </div>
        </motion.div>
      </div>
      
      <SecurityExplanation />
      <FlagReveal />
    </div>
  );
};

export default RouterInterface;
