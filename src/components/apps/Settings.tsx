import { useState } from 'react';
import { 
  Monitor, 
  Wifi, 
  Bell, 
  Lock, 
  Palette, 
  Globe, 
  User, 
  HardDrive,
  Bluetooth,
  Volume2
} from 'lucide-react';

export function Settings() {
  const [activeSection, setActiveSection] = useState('display');

  const sections = [
    { id: 'display', name: 'Display', icon: Monitor },
    { id: 'network', name: 'Network & Internet', icon: Wifi },
    { id: 'notifications', name: 'Notifications', icon: Bell },
    { id: 'security', name: 'Security', icon: Lock },
    { id: 'personalization', name: 'Personalization', icon: Palette },
    { id: 'language', name: 'Language & Region', icon: Globe },
    { id: 'accounts', name: 'Accounts', icon: User },
    { id: 'storage', name: 'Storage', icon: HardDrive },
    { id: 'bluetooth', name: 'Bluetooth', icon: Bluetooth },
    { id: 'sound', name: 'Sound', icon: Volume2 },
  ];

  return (
    <div className="flex h-full bg-gray-50">
      {/* Sidebar */}
      <div className="w-64 bg-white border-r border-gray-200 overflow-y-auto">
        <div className="p-4">
          <h2 className="text-gray-600 mb-4">Settings</h2>
          <div className="space-y-1">
            {sections.map((section) => {
              const Icon = section.icon;
              return (
                <button
                  key={section.id}
                  onClick={() => setActiveSection(section.id)}
                  className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all ${
                    activeSection === section.id
                      ? 'bg-blue-50 text-blue-600'
                      : 'hover:bg-gray-100 text-gray-700'
                  }`}
                >
                  <Icon className="size-5" />
                  <span className="text-sm">{section.name}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-y-auto p-8">
        {activeSection === 'display' && (
          <div>
            <h2 className="text-2xl mb-6">Display Settings</h2>
            <div className="space-y-6">
              <div className="bg-white p-6 rounded-lg border border-gray-200">
                <h3 className="mb-4">Brightness</h3>
                <input type="range" min="0" max="100" defaultValue="80" className="w-full" />
              </div>
              
              <div className="bg-white p-6 rounded-lg border border-gray-200">
                <h3 className="mb-4">Resolution</h3>
                <select className="w-full p-2 border border-gray-300 rounded">
                  <option>1920 x 1080 (Recommended)</option>
                  <option>2560 x 1440</option>
                  <option>3840 x 2160</option>
                </select>
              </div>

              <div className="bg-white p-6 rounded-lg border border-gray-200">
                <h3 className="mb-4">Night Light</h3>
                <label className="flex items-center gap-3">
                  <input type="checkbox" className="size-4" />
                  <span>Enable night light</span>
                </label>
              </div>
            </div>
          </div>
        )}

        {activeSection === 'network' && (
          <div>
            <h2 className="text-2xl mb-6">Network & Internet</h2>
            <div className="space-y-4">
              <div className="bg-white p-6 rounded-lg border border-gray-200">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <Wifi className="size-6 text-blue-500" />
                    <div>
                      <h3>Wi-Fi</h3>
                      <p className="text-sm text-gray-500">Connected to HomeNetwork</p>
                    </div>
                  </div>
                  <label className="relative inline-block w-12 h-6">
                    <input type="checkbox" className="sr-only peer" defaultChecked />
                    <span className="absolute inset-0 bg-blue-500 rounded-full peer-checked:bg-blue-600 transition-colors"></span>
                    <span className="absolute left-1 top-1 size-4 bg-white rounded-full transition-transform peer-checked:translate-x-6"></span>
                  </label>
                </div>
              </div>

              <div className="bg-white p-6 rounded-lg border border-gray-200">
                <h3 className="mb-4">Available Networks</h3>
                <div className="space-y-2">
                  {['HomeNetwork', 'Office_WiFi', 'Guest_Network'].map((network, i) => (
                    <div key={network} className="flex items-center justify-between p-3 border border-gray-200 rounded">
                      <div className="flex items-center gap-2">
                        <Wifi className="size-4" />
                        <span>{network}</span>
                      </div>
                      {i === 0 && <span className="text-xs text-green-600">Connected</span>}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {activeSection === 'personalization' && (
          <div>
            <h2 className="text-2xl mb-6">Personalization</h2>
            <div className="space-y-6">
              <div className="bg-white p-6 rounded-lg border border-gray-200">
                <h3 className="mb-4">Theme</h3>
                <div className="grid grid-cols-3 gap-4">
                  <button className="p-4 border-2 border-blue-500 rounded-lg bg-blue-50">
                    <div className="h-20 bg-gradient-to-br from-blue-400 to-purple-400 rounded mb-2"></div>
                    <span className="text-sm">Default</span>
                  </button>
                  <button className="p-4 border-2 border-transparent rounded-lg hover:border-gray-300">
                    <div className="h-20 bg-gradient-to-br from-gray-800 to-gray-900 rounded mb-2"></div>
                    <span className="text-sm">Dark</span>
                  </button>
                  <button className="p-4 border-2 border-transparent rounded-lg hover:border-gray-300">
                    <div className="h-20 bg-gradient-to-br from-green-400 to-blue-400 rounded mb-2"></div>
                    <span className="text-sm">Nature</span>
                  </button>
                </div>
              </div>

              <div className="bg-white p-6 rounded-lg border border-gray-200">
                <h3 className="mb-4">Accent Color</h3>
                <div className="flex gap-3">
                  {['bg-blue-500', 'bg-purple-500', 'bg-pink-500', 'bg-green-500', 'bg-orange-500'].map((color) => (
                    <button key={color} className={`size-12 ${color} rounded-full hover:scale-110 transition-transform`}></button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
