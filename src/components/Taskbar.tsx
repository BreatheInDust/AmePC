import { Cpu, Wifi, Volume2, Battery } from 'lucide-react';

interface TaskbarProps {
  windows: any[];
  onStartClick: () => void;
  onWindowClick: (id: string) => void;
  currentTime: Date;
  isStartMenuOpen: boolean;
}

export function Taskbar({
  windows,
  onStartClick,
  onWindowClick,
  currentTime,
  isStartMenuOpen,
}: TaskbarProps) {
  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('en-US', { 
      hour: 'numeric', 
      minute: '2-digit',
      hour12: true 
    });
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric',
      year: 'numeric'
    });
  };

  return (
    <div className="absolute bottom-0 left-0 right-0 h-16 bg-gray-900/95 backdrop-blur-md border-t border-gray-700 flex items-center px-2 gap-2">
      {/* Start Button */}
      <button
        onClick={onStartClick}
        className={`h-12 px-4 rounded-lg flex items-center gap-2 transition-all ${
          isStartMenuOpen 
            ? 'bg-blue-500 text-white' 
            : 'bg-gray-800 text-white hover:bg-gray-700'
        }`}
      >
        <div className="size-6 bg-gradient-to-br from-blue-400 to-purple-500 rounded-lg flex items-center justify-center">
          <Cpu className="size-4 text-white" />
        </div>
        <span>AmePC</span>
      </button>

      {/* Search Bar */}
      <div className="h-12 flex-1 max-w-md bg-gray-800 rounded-lg flex items-center px-3 text-gray-400">
        <input 
          type="text" 
          placeholder="Search apps, files, settings..." 
          className="bg-transparent flex-1 outline-none text-white placeholder-gray-500"
        />
      </div>

      {/* Open Windows */}
      <div className="flex gap-1 flex-1 overflow-x-auto">
        {windows.map((window) => {
          const Icon = window.icon;
          return (
            <button
              key={window.id}
              onClick={() => onWindowClick(window.id)}
              className={`h-12 px-3 rounded-lg flex items-center gap-2 transition-all min-w-fit ${
                window.isMinimized 
                  ? 'bg-gray-800 text-gray-400' 
                  : 'bg-gray-700 text-white'
              } hover:bg-gray-600`}
            >
              <Icon className="size-4" />
              <span className="max-w-[150px] truncate">{window.title}</span>
            </button>
          );
        })}
      </div>

      {/* System Tray */}
      <div className="flex items-center gap-3 text-white">
        <button className="p-2 hover:bg-gray-800 rounded transition-colors">
          <Wifi className="size-5" />
        </button>
        <button className="p-2 hover:bg-gray-800 rounded transition-colors">
          <Volume2 className="size-5" />
        </button>
        <button className="p-2 hover:bg-gray-800 rounded transition-colors">
          <Battery className="size-5" />
        </button>
        <div className="text-right pl-3 border-l border-gray-700">
          <div className="text-sm">{formatTime(currentTime)}</div>
          <div className="text-xs text-gray-400">{formatDate(currentTime)}</div>
        </div>
      </div>
    </div>
  );
}
