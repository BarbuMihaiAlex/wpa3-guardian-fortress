
import React from 'react';
import { useRouter } from '@/context/RouterContext';

const AdvancedSettings: React.FC = () => {
  const { configurations, updateConfiguration, setShowExplanation, setCurrentExplanation } = useRouter();

  const handleShowExplanation = (text: string) => {
    setCurrentExplanation(text);
    setShowExplanation(true);
  };

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
        <div className="bg-gray-50 px-4 py-3 border-b border-gray-200 flex justify-between items-center">
          <h3 className="text-lg font-medium text-router-black">Port Forwarding</h3>
          <button
            onClick={() => handleShowExplanation("Port forwarding allows remote devices to connect to a specific device on your local network. Only enable this if you need to access specific services remotely.")}
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
          <div className="text-sm text-router-gray-dark p-4 bg-blue-50 rounded-md">
            <p>Port forwarding rules can be added here. For security purposes, only add port forwarding rules that are absolutely necessary.</p>
          </div>
          
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-router-gray-dark uppercase tracking-wider">Name</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-router-gray-dark uppercase tracking-wider">Internal IP</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-router-gray-dark uppercase tracking-wider">Internal Port</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-router-gray-dark uppercase tracking-wider">External Port</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-router-gray-dark uppercase tracking-wider">Protocol</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              <tr>
                <td className="px-6 py-4 text-sm text-router-gray-medium text-center" colSpan={5}>
                  No port forwarding rules configured
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
        <div className="bg-gray-50 px-4 py-3 border-b border-gray-200 flex justify-between items-center">
          <h3 className="text-lg font-medium text-router-black">UPnP & DMZ</h3>
          <button
            onClick={() => handleShowExplanation("UPnP allows devices to automatically open ports on your router. DMZ exposes a device to the internet without any firewall protection. Both features can pose security risks if not carefully configured.")}
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
        <div className="p-4 space-y-5">
          <div className="flex items-center">
            <input
              id="upnpEnabled"
              type="checkbox"
              checked={configurations.upnpEnabled}
              onChange={(e) => updateConfiguration('upnpEnabled', e.target.checked)}
              className="h-4 w-4 text-router-blue rounded border-router-gray focus:ring-router-blue"
            />
            <label htmlFor="upnpEnabled" className="ml-2 block text-sm text-router-gray-dark">
              Enable UPnP (Universal Plug and Play)
            </label>
          </div>
          <p className="text-xs text-router-gray-medium ml-6">
            Allows devices to automatically configure port forwarding rules
          </p>
          
          <div className="pt-4 border-t border-gray-100">
            <div className="flex items-center mb-3">
              <input
                id="dmzEnabled"
                type="checkbox"
                checked={configurations.dmzEnabled}
                onChange={(e) => updateConfiguration('dmzEnabled', e.target.checked)}
                className="h-4 w-4 text-router-blue rounded border-router-gray focus:ring-router-blue"
              />
              <label htmlFor="dmzEnabled" className="ml-2 block text-sm text-router-gray-dark">
                Enable DMZ (Demilitarized Zone)
              </label>
            </div>
            
            {configurations.dmzEnabled && (
              <div className="pl-6">
                <label htmlFor="dmzIp" className="block text-sm font-medium text-router-gray-dark mb-1">
                  DMZ IP Address
                </label>
                <input
                  id="dmzIp"
                  type="text"
                  value={configurations.dmzIp}
                  onChange={(e) => updateConfiguration('dmzIp', e.target.value)}
                  className="router-input w-full"
                  placeholder="192.168.1.x"
                />
                <p className="text-xs text-router-gray-medium mt-1">
                  Warning: This device will be exposed to the internet without firewall protection
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
        <div className="bg-gray-50 px-4 py-3 border-b border-gray-200 flex justify-between items-center">
          <h3 className="text-lg font-medium text-router-black">QoS Settings</h3>
          <button
            onClick={() => handleShowExplanation("Quality of Service (QoS) allows you to prioritize certain types of network traffic or limit bandwidth usage.")}
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
              id="qosEnabled"
              type="checkbox"
              checked={configurations.qosEnabled}
              onChange={(e) => updateConfiguration('qosEnabled', e.target.checked)}
              className="h-4 w-4 text-router-blue rounded border-router-gray focus:ring-router-blue"
            />
            <label htmlFor="qosEnabled" className="ml-2 block text-sm text-router-gray-dark">
              Enable QoS (Quality of Service)
            </label>
          </div>
          
          {configurations.qosEnabled && (
            <div className="pl-6 space-y-4">
              <div className="flex items-center mb-3">
                <input
                  id="bandwidthLimit"
                  type="checkbox"
                  checked={configurations.bandwidthLimit}
                  onChange={(e) => updateConfiguration('bandwidthLimit', e.target.checked)}
                  className="h-4 w-4 text-router-blue rounded border-router-gray focus:ring-router-blue"
                />
                <label htmlFor="bandwidthLimit" className="ml-2 block text-sm text-router-gray-dark">
                  Enable Bandwidth Limit
                </label>
              </div>
              
              {configurations.bandwidthLimit && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="downloadBandwidth" className="block text-sm font-medium text-router-gray-dark mb-1">
                      Download Bandwidth (Mbps)
                    </label>
                    <input
                      id="downloadBandwidth"
                      type="number"
                      value={configurations.downloadBandwidth}
                      onChange={(e) => updateConfiguration('downloadBandwidth', Number(e.target.value))}
                      className="router-input w-full"
                      min="1"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="uploadBandwidth" className="block text-sm font-medium text-router-gray-dark mb-1">
                      Upload Bandwidth (Mbps)
                    </label>
                    <input
                      id="uploadBandwidth"
                      type="number"
                      value={configurations.uploadBandwidth}
                      onChange={(e) => updateConfiguration('uploadBandwidth', Number(e.target.value))}
                      className="router-input w-full"
                      min="1"
                    />
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
        <div className="bg-gray-50 px-4 py-3 border-b border-gray-200 flex justify-between items-center">
          <h3 className="text-lg font-medium text-router-black">VPN Passthrough</h3>
          <button
            onClick={() => handleShowExplanation("VPN Passthrough allows VPN client connections from devices on your network to pass through the router to VPN servers on the Internet.")}
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
          <div className="flex items-center">
            <input
              id="vpnPassthrough"
              type="checkbox"
              checked={configurations.vpnPassthrough}
              onChange={(e) => updateConfiguration('vpnPassthrough', e.target.checked)}
              className="h-4 w-4 text-router-blue rounded border-router-gray focus:ring-router-blue"
            />
            <label htmlFor="vpnPassthrough" className="ml-2 block text-sm text-router-gray-dark">
              Enable VPN Passthrough
            </label>
          </div>
          <p className="text-xs text-router-gray-medium ml-6">
            Allows devices to establish VPN connections through this router
          </p>
        </div>
      </div>
    </div>
  );
};

export default AdvancedSettings;
