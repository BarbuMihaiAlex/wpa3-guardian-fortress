
import React from 'react';
import { useRouter } from '@/context/RouterContext';

const NetworkSettings: React.FC = () => {
  const { configurations, updateConfiguration, setShowExplanation, setCurrentExplanation } = useRouter();

  const handleShowExplanation = (text: string) => {
    setCurrentExplanation(text);
    setShowExplanation(true);
  };

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
        <div className="bg-gray-50 px-4 py-3 border-b border-gray-200 flex justify-between items-center">
          <h3 className="text-lg font-medium text-router-black">Basic Network Settings</h3>
          <button
            onClick={() => handleShowExplanation("Changing default network settings helps improve security and network performance.")}
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
              <label htmlFor="routerName" className="block text-sm font-medium text-router-gray-dark mb-1">
                Router Name
              </label>
              <input
                id="routerName"
                type="text"
                value={configurations.routerName}
                onChange={(e) => updateConfiguration('routerName', e.target.value)}
                className="router-input w-full"
                placeholder="Enter router name"
              />
              <p className="text-xs text-router-gray-medium mt-1">
                Name for your router in the local network
              </p>
            </div>
            
            <div>
              <div className="flex items-center">
                <input
                  id="broadcastSsid"
                  type="checkbox"
                  checked={configurations.broadcastSsid}
                  onChange={(e) => updateConfiguration('broadcastSsid', e.target.checked)}
                  className="h-4 w-4 text-router-blue rounded border-router-gray focus:ring-router-blue"
                />
                <label htmlFor="broadcastSsid" className="ml-2 block text-sm text-router-gray-dark">
                  Broadcast SSID
                </label>
              </div>
              <p className="text-xs text-router-gray-medium mt-1 ml-6">
                Enable to make your network visible to nearby devices
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
        <div className="bg-gray-50 px-4 py-3 border-b border-gray-200 flex justify-between items-center">
          <h3 className="text-lg font-medium text-router-black">Wireless Settings</h3>
          <button
            onClick={() => handleShowExplanation("Wireless settings affect your network's coverage, speed, and compatibility with different devices.")}
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
              <label htmlFor="band" className="block text-sm font-medium text-router-gray-dark mb-1">
                Frequency Band
              </label>
              <select
                id="band"
                value={configurations.band}
                onChange={(e) => updateConfiguration('band', e.target.value)}
                className="router-input w-full"
              >
                <option value="2.4GHz">2.4GHz</option>
                <option value="5GHz">5GHz</option>
                <option value="dual">Dual Band (2.4GHz + 5GHz)</option>
              </select>
              <p className="text-xs text-router-gray-medium mt-1">
                2.4GHz has better range, 5GHz has faster speeds
              </p>
            </div>
            
            <div>
              <label htmlFor="channel" className="block text-sm font-medium text-router-gray-dark mb-1">
                Channel
              </label>
              <select
                id="channel"
                value={configurations.channel}
                onChange={(e) => updateConfiguration('channel', Number(e.target.value))}
                className="router-input w-full"
              >
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
                <option value="6">6</option>
                <option value="7">7</option>
                <option value="8">8</option>
                <option value="9">9</option>
                <option value="10">10</option>
                <option value="11">11</option>
              </select>
              <p className="text-xs text-router-gray-medium mt-1">
                Select a channel with less interference
              </p>
            </div>
            
            <div>
              <label htmlFor="channelWidth" className="block text-sm font-medium text-router-gray-dark mb-1">
                Channel Width
              </label>
              <select
                id="channelWidth"
                value={configurations.channelWidth}
                onChange={(e) => updateConfiguration('channelWidth', e.target.value)}
                className="router-input w-full"
              >
                <option value="20MHz">20MHz</option>
                <option value="40MHz">40MHz</option>
                <option value="80MHz">80MHz</option>
                <option value="160MHz">160MHz</option>
              </select>
              <p className="text-xs text-router-gray-medium mt-1">
                Wider channels can provide more bandwidth but may cause interference
              </p>
            </div>
            
            <div>
              <label htmlFor="transmitPower" className="block text-sm font-medium text-router-gray-dark mb-1">
                Transmit Power
              </label>
              <select
                id="transmitPower"
                value={configurations.transmitPower}
                onChange={(e) => updateConfiguration('transmitPower', e.target.value)}
                className="router-input w-full"
              >
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
              </select>
              <p className="text-xs text-router-gray-medium mt-1">
                Higher power extends range but consumes more energy
              </p>
            </div>
            
            <div>
              <div className="flex items-center">
                <input
                  id="beamforming"
                  type="checkbox"
                  checked={configurations.beamforming}
                  onChange={(e) => updateConfiguration('beamforming', e.target.checked)}
                  className="h-4 w-4 text-router-blue rounded border-router-gray focus:ring-router-blue"
                />
                <label htmlFor="beamforming" className="ml-2 block text-sm text-router-gray-dark">
                  Enable Beamforming
                </label>
              </div>
              <p className="text-xs text-router-gray-medium mt-1 ml-6">
                Focuses wireless signal toward connected devices
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
        <div className="bg-gray-50 px-4 py-3 border-b border-gray-200 flex justify-between items-center">
          <h3 className="text-lg font-medium text-router-black">DHCP Settings</h3>
          <button
            onClick={() => handleShowExplanation("DHCP (Dynamic Host Configuration Protocol) automatically assigns IP addresses to devices on your network. You can customize the IP range and lease time.")}
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
              <div className="flex items-center mb-3">
                <input
                  id="dhcpEnabled"
                  type="checkbox"
                  checked={configurations.dhcpEnabled}
                  onChange={(e) => updateConfiguration('dhcpEnabled', e.target.checked)}
                  className="h-4 w-4 text-router-blue rounded border-router-gray focus:ring-router-blue"
                />
                <label htmlFor="dhcpEnabled" className="ml-2 block text-sm text-router-gray-dark">
                  Enable DHCP Server
                </label>
              </div>

              {configurations.dhcpEnabled && (
                <>
                  <div className="flex space-x-4 mb-3">
                    <div>
                      <label htmlFor="dhcpStartIp" className="block text-sm font-medium text-router-gray-dark mb-1">
                        Start IP
                      </label>
                      <input
                        id="dhcpStartIp"
                        type="text"
                        value={configurations.dhcpStartIp}
                        onChange={(e) => updateConfiguration('dhcpStartIp', e.target.value)}
                        className="router-input w-full"
                        placeholder="192.168.1.100"
                      />
                    </div>
                    <div>
                      <label htmlFor="dhcpEndIp" className="block text-sm font-medium text-router-gray-dark mb-1">
                        End IP
                      </label>
                      <input
                        id="dhcpEndIp"
                        type="text"
                        value={configurations.dhcpEndIp}
                        onChange={(e) => updateConfiguration('dhcpEndIp', e.target.value)}
                        className="router-input w-full"
                        placeholder="192.168.1.200"
                      />
                    </div>
                  </div>

                  <div className="mb-3">
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
                    <p className="text-xs text-router-gray-medium mt-1 ml-6">
                      Limits how long devices can keep their IP addresses without renewal
                    </p>
                  </div>

                  {configurations.dhcpLeaseTimeLimit && (
                    <div>
                      <label htmlFor="dhcpLeaseTime" className="block text-sm font-medium text-router-gray-dark mb-1">
                        Lease Time (minutes)
                      </label>
                      <input
                        id="dhcpLeaseTime"
                        type="number"
                        value={configurations.dhcpLeaseTime}
                        onChange={(e) => updateConfiguration('dhcpLeaseTime', Number(e.target.value))}
                        className="router-input w-full"
                        placeholder="1440"
                        min="1"
                      />
                      <p className="text-xs text-router-gray-medium mt-1">
                        Default: 1440 minutes (24 hours)
                      </p>
                    </div>
                  )}
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NetworkSettings;
