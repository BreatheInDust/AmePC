import { Power, User, Search } from 'lucide-react';

interface StartMenuProps {
  apps: any[];
  onAppClick: (appId: string) => void;
  onClose: () => void;
}

export function StartMenu({ apps, onAppClick, onClose }: StartMenuProps) {
  return (
    <div 
      className="absolute bottom-20 left-4 w-[600px] h-[700px] bg-gray-900/95 backdrop-blur-xl rounded-xl shadow-2xl border border-gray-700 overflow-hidden flex flex-col"
      onClick={(e) => e.stopPropagation()}
    >
      {/* Header */}
      <div className="p-6 bg-gradient-to-r from-blue-500 to-purple-500">
        <div className="flex items-center gap-3 mb-4">
          <div className="size-12 bg-white/20 rounded-full flex items-center justify-center">
            <User className="size-6 text-white" />
          </div>
          <div>
            <div className="text-white">Welcome</div>
            <div className="text-white/80 text-sm">AmePC User</div>
          </div>
        </div>
        
        {/* Search */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search apps..."
            className="w-full pl-10 pr-4 py-2 bg-white/20 backdrop-blur text-white placeholder-white/60 rounded-lg outline-none"
          />
        </div>
      </div>

      {/* Pinned Apps */}
      <div className="flex-1 overflow-y-auto p-6">
        <h3 className="text-white/60 mb-3">Pinned Apps</h3>
        <div className="grid grid-cols-4 gap-3">
          {apps.map((app) => {
            const Icon = app.icon;
            return (
              <button
                key={app.id}
                onClick={() => onAppClick(app.id)}
                className="flex flex-col items-center gap-2 p-4 rounded-lg hover:bg-white/10 transition-colors group"
              >
                <div className="size-12 bg-gradient-to-br from-blue-400 to-purple-500 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Icon className="size-6 text-white" />
                </div>
                <span className="text-white text-xs text-center">{app.name}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Footer */}
      <div className="p-4 border-t border-gray-700 flex justify-between items-center">
        <button className="flex items-center gap-2 px-4 py-2 text-white hover:bg-white/10 rounded-lg transition-colors">
          <User className="size-5" />
          <span>Profile</span>
        </button>
        <button className="flex items-center gap-2 px-4 py-2 text-white hover:bg-red-500/20 rounded-lg transition-colors">
          <Power className="size-5" />
          <span>Power</span>
        </button>
      </div>
    </div>
  );
}
