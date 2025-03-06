
import React from 'react';
import { useRouter } from '@/context/RouterContext';

const StatusPanel: React.FC = () => {
  const { configurations, securityScore } = useRouter();
  
  const getColorClass = (score: number) => {
    if (score >= 90) return 'text-green-500';
    if (score >= 70) return 'text-yellow-500';
    return 'text-red-500';
  };
  
  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
        <div className="bg-gray-50 px-4 py-3 border-b border-gray-200">
          <h3 className="text-lg font-medium text-router-black">Router Status</h3>
        </div>
        <div className="p-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-4">
              <div>
                <h4 className="text-sm font-medium text-router-gray-dark mb-2">Internet Connection</h4>
                <div className="flex items-center">
                  <div className="w-3 h-3 rounded-full bg-green-500 mr-2"></div>
                  <span className="text-router-black">Connected</span>
                </div>
              </div>

              <div>
                <h4 className="text-sm font-medium text-router-gray-dark mb-2">Network</h4>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-router-gray-medium">SSID:</span>
                    <span className="text-router-black font-medium">{configurations.ssid}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-router-gray-medium">Band:</span>
                    <span className="text-router-black font-medium">{configurations.band}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-router-gray-medium">Channel:</span>
                    <span className="text-router-black font-medium">{configurations.channel}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-router-gray-medium">Security:</span>
                    <span className="text-router-black font-medium">{configurations.encryptionType}</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <h4 className="text-sm font-medium text-router-gray-dark mb-2">System</h4>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-router-gray-medium">Uptime:</span>
                    <span className="text-router-black font-medium">3 days, 7 hours</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-router-gray-medium">CPU Usage:</span>
                    <span className="text-router-black font-medium">12%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-router-gray-medium">Memory Usage:</span>
                    <span className="text-router-black font-medium">34%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-router-gray-medium">Firmware:</span>
                    <span className="text-router-black font-medium">{configurations.firmwareVersion}</span>
                  </div>
                </div>
              </div>

              <div>
                <h4 className="text-sm font-medium text-router-gray-dark mb-2">Security Assessment</h4>
                <div className="mb-2">
                  <div className="flex justify-between mb-1">
                    <span className="text-router-gray-medium">Score:</span>
                    <span className={`font-bold ${getColorClass(securityScore)}`}>{securityScore}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2.5">
                    <div 
                      className={`h-2.5 rounded-full ${
                        securityScore >= 90 ? 'bg-green-500' :
                        securityScore >= 70 ? 'bg-yellow-500' :
                        'bg-red-500'
                      }`}
                      style={{ width: `${securityScore}%` }}
                    ></div>
                  </div>
                </div>
                <div className="text-sm p-3 rounded bg-blue-50 text-blue-800">
                  {securityScore >= 90 
                    ? "Your router has excellent security settings."
                    : securityScore >= 70
                    ? "Your router security is good but could be improved." 
                    : "Your router security needs significant improvements."}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
        <div className="bg-gray-50 px-4 py-3 border-b border-gray-200">
          <h3 className="text-lg font-medium text-router-black">Connected Devices</h3>
        </div>
        <div className="p-4">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-router-gray-dark uppercase tracking-wider">Device Name</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-router-gray-dark uppercase tracking-wider">IP Address</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-router-gray-dark uppercase tracking-wider">MAC Address</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-router-gray-dark uppercase tracking-wider">Connection</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                <tr>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-router-black">Admin Laptop</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-router-gray-dark">192.168.1.100</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-router-gray-dark">00:1A:2B:3C:4D:5E</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-router-gray-dark">Wi-Fi (5GHz)</td>
                </tr>
                <tr>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-router-black">John's Phone</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-router-gray-dark">192.168.1.101</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-router-gray-dark">A1:B2:C3:D4:E5:F6</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-router-gray-dark">Wi-Fi (2.4GHz)</td>
                </tr>
                <tr>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-router-black">Smart TV</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-router-gray-dark">192.168.1.105</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-router-gray-dark">FF:EE:DD:CC:BB:AA</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-router-gray-dark">Ethernet</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StatusPanel;
