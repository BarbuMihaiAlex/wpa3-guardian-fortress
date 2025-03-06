
import React, { useState } from 'react';
import { useRouter } from '@/context/RouterContext';

const AccessControl: React.FC = () => {
  const { configurations, updateConfiguration, setShowExplanation, setCurrentExplanation } = useRouter();
  const [newMacAddress, setNewMacAddress] = useState('');

  const handleShowExplanation = (text: string) => {
    setCurrentExplanation(text);
    setShowExplanation(true);
  };

  const handleAddMacAddress = () => {
    if (newMacAddress && !configurations.macAddresses.includes(newMacAddress)) {
      updateConfiguration('macAddresses', [...configurations.macAddresses, newMacAddress]);
      setNewMacAddress('');
    }
  };

  const handleRemoveMacAddress = (mac: string) => {
    updateConfiguration('macAddresses', configurations.macAddresses.filter(address => address !== mac));
  };

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
        <div className="bg-gray-50 px-4 py-3 border-b border-gray-200 flex justify-between items-center">
          <h3 className="text-lg font-medium text-router-black">MAC Address Filtering</h3>
          <button
            onClick={() => handleShowExplanation("MAC address filtering allows you to control which devices can connect to your network based on their unique hardware addresses.")}
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
          
          {configurations.macFiltering && (
            <div className="space-y-4">
              <div className="flex space-x-2">
                <input
                  type="text"
                  value={newMacAddress}
                  onChange={(e) => setNewMacAddress(e.target.value)}
                  className="router-input flex-1"
                  placeholder="00:11:22:33:44:55"
                />
                <button
                  onClick={handleAddMacAddress}
                  className="bg-router-blue text-white px-4 py-2 rounded-md hover:bg-router-blue-light transition-colors"
                >
                  Add
                </button>
              </div>
              
              <div>
                <h4 className="text-sm font-medium text-router-gray-dark mb-2">Allowed MAC Addresses</h4>
                <div className="border rounded-md overflow-hidden max-h-60 overflow-y-auto">
                  {configurations.macAddresses.length > 0 ? (
                    <table className="w-full">
                      <thead className="bg-gray-50">
                        <tr>
                          <th className="px-4 py-2 text-left text-xs font-medium text-router-gray-dark">MAC Address</th>
                          <th className="px-4 py-2 text-right text-xs font-medium text-router-gray-dark">Action</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-200">
                        {configurations.macAddresses.map((mac, index) => (
                          <tr key={index} className="hover:bg-gray-50">
                            <td className="px-4 py-3 text-sm text-router-black">{mac}</td>
                            <td className="px-4 py-3 text-right">
                              <button
                                onClick={() => handleRemoveMacAddress(mac)}
                                className="text-red-500 hover:text-red-700 transition-colors"
                              >
                                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                  <path d="M6 18L18 6M6 6l12 12" />
                                </svg>
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  ) : (
                    <div className="px-4 py-3 text-sm text-router-gray-medium text-center">
                      No MAC addresses added yet
                    </div>
                  )}
                </div>
                <p className="text-xs text-router-gray-medium mt-2">
                  Only devices with these MAC addresses will be allowed to connect
                </p>
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
        <div className="bg-gray-50 px-4 py-3 border-b border-gray-200 flex justify-between items-center">
          <h3 className="text-lg font-medium text-router-black">Network Isolation</h3>
          <button
            onClick={() => handleShowExplanation("Network isolation prevents devices on your network from communicating with each other. This enhances security by preventing lateral movement in case one device is compromised.")}
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
          <p className="text-xs text-router-gray-medium ml-6">
            Prevents connected devices from communicating with each other
          </p>
        </div>
      </div>

      <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
        <div className="bg-gray-50 px-4 py-3 border-b border-gray-200 flex justify-between items-center">
          <h3 className="text-lg font-medium text-router-black">IPv6 Security</h3>
          <button
            onClick={() => handleShowExplanation("IPv6 is the next-generation Internet Protocol. Enabling IPv6 security helps protect against attacks that target this newer protocol.")}
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
          <p className="text-xs text-router-gray-medium ml-6">
            Provides protection for IPv6 traffic and prevents IPv6-specific attacks
          </p>
        </div>
      </div>

      <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
        <div className="bg-gray-50 px-4 py-3 border-b border-gray-200 flex justify-between items-center">
          <h3 className="text-lg font-medium text-router-black">Firewall</h3>
          <button
            onClick={() => handleShowExplanation("The firewall monitors and controls incoming and outgoing network traffic based on predetermined security rules.")}
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
              id="firewallEnabled"
              type="checkbox"
              checked={configurations.firewallEnabled}
              onChange={(e) => updateConfiguration('firewallEnabled', e.target.checked)}
              className="h-4 w-4 text-router-blue rounded border-router-gray focus:ring-router-blue"
            />
            <label htmlFor="firewallEnabled" className="ml-2 block text-sm text-router-gray-dark">
              Enable Firewall
            </label>
          </div>
          <p className="text-xs text-router-gray-medium ml-6">
            Provides protection against unauthorized access and common attacks
          </p>
        </div>
      </div>
    </div>
  );
};

export default AccessControl;
