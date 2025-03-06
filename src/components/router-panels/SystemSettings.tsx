
import React from 'react';
import { useRouter } from '@/context/RouterContext';

const SystemSettings: React.FC = () => {
  const { configurations, updateConfiguration, setShowExplanation, setCurrentExplanation, rebootRouter } = useRouter();

  const handleShowExplanation = (text: string) => {
    setCurrentExplanation(text);
    setShowExplanation(true);
  };

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
        <div className="bg-gray-50 px-4 py-3 border-b border-gray-200 flex justify-between items-center">
          <h3 className="text-lg font-medium text-router-black">Firmware</h3>
          <button
            onClick={() => handleShowExplanation("Keeping your router's firmware updated is essential for security. Updates often include patches for known vulnerabilities.")}
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
          <div className="flex justify-between items-center">
            <div>
              <h4 className="text-sm font-medium text-router-black">Current Version</h4>
              <p className="text-sm text-router-gray-dark">{configurations.firmwareVersion}</p>
            </div>
            <button
              className="px-4 py-2 bg-router-blue text-white rounded-md hover:bg-router-blue-light transition-colors"
            >
              Check for Updates
            </button>
          </div>
          
          <div className="flex items-center pt-3">
            <input
              id="autoUpdate"
              type="checkbox"
              checked={configurations.autoUpdate}
              onChange={(e) => updateConfiguration('autoUpdate', e.target.checked)}
              className="h-4 w-4 text-router-blue rounded border-router-gray focus:ring-router-blue"
            />
            <label htmlFor="autoUpdate" className="ml-2 block text-sm text-router-gray-dark">
              Enable Automatic Updates
            </label>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
        <div className="bg-gray-50 px-4 py-3 border-b border-gray-200 flex justify-between items-center">
          <h3 className="text-lg font-medium text-router-black">Date & Time</h3>
          <button
            onClick={() => handleShowExplanation("Keeping your router's time synchronized is important for proper logging and security certificate validation.")}
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
              id="ntp"
              type="checkbox"
              checked={configurations.ntp}
              onChange={(e) => updateConfiguration('ntp', e.target.checked)}
              className="h-4 w-4 text-router-blue rounded border-router-gray focus:ring-router-blue"
            />
            <label htmlFor="ntp" className="ml-2 block text-sm text-router-gray-dark">
              Synchronize with Internet Time Servers (NTP)
            </label>
          </div>
          
          <div>
            <label htmlFor="timezone" className="block text-sm font-medium text-router-gray-dark mb-1">
              Time Zone
            </label>
            <select
              id="timezone"
              value={configurations.timezone}
              onChange={(e) => updateConfiguration('timezone', e.target.value)}
              className="router-input w-full"
            >
              <option value="UTC">UTC</option>
              <option value="UTC-12">UTC-12</option>
              <option value="UTC-11">UTC-11</option>
              <option value="UTC-10">UTC-10</option>
              <option value="UTC-9">UTC-9</option>
              <option value="UTC-8">UTC-8 (Pacific Time)</option>
              <option value="UTC-7">UTC-7 (Mountain Time)</option>
              <option value="UTC-6">UTC-6 (Central Time)</option>
              <option value="UTC-5">UTC-5 (Eastern Time)</option>
              <option value="UTC-4">UTC-4</option>
              <option value="UTC-3">UTC-3</option>
              <option value="UTC-2">UTC-2</option>
              <option value="UTC-1">UTC-1</option>
              <option value="UTC+1">UTC+1</option>
              <option value="UTC+2">UTC+2</option>
              <option value="UTC+3">UTC+3</option>
              <option value="UTC+4">UTC+4</option>
              <option value="UTC+5">UTC+5</option>
              <option value="UTC+6">UTC+6</option>
              <option value="UTC+7">UTC+7</option>
              <option value="UTC+8">UTC+8</option>
              <option value="UTC+9">UTC+9</option>
              <option value="UTC+10">UTC+10</option>
              <option value="UTC+11">UTC+11</option>
              <option value="UTC+12">UTC+12</option>
            </select>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
        <div className="bg-gray-50 px-4 py-3 border-b border-gray-200 flex justify-between items-center">
          <h3 className="text-lg font-medium text-router-black">Administration</h3>
          <button
            onClick={() => handleShowExplanation("These settings control who can access your router's administration panel and how access is managed.")}
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
          <div className="flex items-center mb-3">
            <input
              id="remoteMgmt"
              type="checkbox"
              checked={configurations.remoteMgmt}
              onChange={(e) => updateConfiguration('remoteMgmt', e.target.checked)}
              className="h-4 w-4 text-router-blue rounded border-router-gray focus:ring-router-blue"
            />
            <label htmlFor="remoteMgmt" className="ml-2 block text-sm text-router-gray-dark">
              Enable Remote Management
            </label>
          </div>
          <p className="text-xs text-router-gray-medium ml-6 text-red-500">
            Warning: Enabling remote management may pose security risks
          </p>
          
          <div className="flex items-center mb-3 pt-3">
            <input
              id="logEnabled"
              type="checkbox"
              checked={configurations.logEnabled}
              onChange={(e) => updateConfiguration('logEnabled', e.target.checked)}
              className="h-4 w-4 text-router-blue rounded border-router-gray focus:ring-router-blue"
            />
            <label htmlFor="logEnabled" className="ml-2 block text-sm text-router-gray-dark">
              Enable System Logging
            </label>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
        <div className="bg-gray-50 px-4 py-3 border-b border-gray-200">
          <h3 className="text-lg font-medium text-router-black">System Operations</h3>
        </div>
        <div className="p-4 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <button
              onClick={rebootRouter}
              className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded-md transition-colors"
            >
              Reboot Router
            </button>
            
            <button
              className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md transition-colors"
            >
              Backup Configuration
            </button>
            
            <button
              className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md transition-colors"
            >
              Factory Reset
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SystemSettings;
