import { useState, useRef, useEffect } from 'react';
import { Taskbar } from './components/Taskbar';
import { StartMenu } from './components/StartMenu';
import { Window } from './components/Window';
import { DesktopIcon } from './components/DesktopIcon';
import { FileExplorer } from './components/apps/FileExplorer';
import { Settings } from './components/apps/Settings';
import { Browser } from './components/apps/Browser';
import { Notepad } from './components/apps/Notepad';
import { Calculator } from './components/apps/Calculator';
import { Photos } from './components/apps/Photos';
import { Music } from './components/apps/Music';
import { Terminal } from './components/apps/Terminal';
import { 
  Folder, 
  Settings as SettingsIcon, 
  Globe, 
  FileText, 
  Calculator as CalcIcon,
  Image,
  Music as MusicIcon,
  Terminal as TerminalIcon
} from 'lucide-react';

interface WindowState {
  id: string;
  title: string;
  icon: any;
  component: React.ReactNode;
  isMinimized: boolean;
  isMaximized: boolean;
  zIndex: number;
  position: { x: number; y: number };
  size: { width: number; height: number };
}

export default function App() {
  const [windows, setWindows] = useState<WindowState[]>([]);
  const [isStartMenuOpen, setIsStartMenuOpen] = useState(false);
  const [currentTime, setCurrentTime] = useState(new Date());
  const maxZIndex = useRef(1000);

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const apps = [
    { id: 'explorer', name: 'File Explorer', icon: Folder, component: FileExplorer },
    { id: 'settings', name: 'Settings', icon: SettingsIcon, component: Settings },
    { id: 'browser', name: 'Browser', icon: Globe, component: Browser },
    { id: 'notepad', name: 'Notepad', icon: FileText, component: Notepad },
    { id: 'calculator', name: 'Calculator', icon: CalcIcon, component: Calculator },
    { id: 'photos', name: 'Photos', icon: Image, component: Photos },
    { id: 'music', name: 'Music', icon: MusicIcon, component: Music },
    { id: 'terminal', name: 'Terminal', icon: TerminalIcon, component: Terminal },
  ];

  const openApp = (appId: string) => {
    const app = apps.find(a => a.id === appId);
    if (!app) return;

    // Check if window already exists
    const existingWindow = windows.find(w => w.id === appId);
    if (existingWindow) {
      // Bring to front and unminimize
      bringToFront(appId);
      if (existingWindow.isMinimized) {
        toggleMinimize(appId);
      }
      return;
    }

    maxZIndex.current += 1;
    const newWindow: WindowState = {
      id: appId,
      title: app.name,
      icon: app.icon,
      component: <app.component />,
      isMinimized: false,
      isMaximized: false,
      zIndex: maxZIndex.current,
      position: { 
        x: 100 + windows.length * 30, 
        y: 50 + windows.length * 30 
      },
      size: { width: 800, height: 600 },
    };

    setWindows([...windows, newWindow]);
    setIsStartMenuOpen(false);
  };

  const closeWindow = (id: string) => {
    setWindows(windows.filter(w => w.id !== id));
  };

  const toggleMinimize = (id: string) => {
    setWindows(windows.map(w => 
      w.id === id ? { ...w, isMinimized: !w.isMinimized } : w
    ));
  };

  const toggleMaximize = (id: string) => {
    setWindows(windows.map(w => 
      w.id === id ? { ...w, isMaximized: !w.isMaximized } : w
    ));
  };

  const bringToFront = (id: string) => {
    maxZIndex.current += 1;
    setWindows(windows.map(w => 
      w.id === id ? { ...w, zIndex: maxZIndex.current } : w
    ));
  };

  const updateWindowPosition = (id: string, position: { x: number; y: number }) => {
    setWindows(windows.map(w => 
      w.id === id ? { ...w, position } : w
    ));
  };

  const updateWindowSize = (id: string, size: { width: number; height: number }) => {
    setWindows(windows.map(w => 
      w.id === id ? { ...w, size } : w
    ));
  };

  const desktopApps = [
    { id: 'explorer', name: 'File Explorer', icon: Folder },
    { id: 'browser', name: 'Browser', icon: Globe },
    { id: 'notepad', name: 'Notepad', icon: FileText },
    { id: 'photos', name: 'Photos', icon: Image },
  ];

  return (
    <div className="h-screen w-screen overflow-hidden bg-gradient-to-br from-blue-400 via-purple-400 to-pink-400 relative">
      {/* Desktop Area */}
      <div 
        className="absolute inset-0 pb-16"
        onClick={() => setIsStartMenuOpen(false)}
      >
        {/* Desktop Icons */}
        <div className="p-4 grid grid-cols-1 gap-4 w-32">
          {desktopApps.map((app, index) => (
            <DesktopIcon
              key={app.id}
              icon={app.icon}
              label={app.name}
              onClick={() => openApp(app.id)}
            />
          ))}
        </div>

        {/* Windows */}
        {windows.map((window) => (
          <Window
            key={window.id}
            id={window.id}
            title={window.title}
            icon={window.icon}
            isMinimized={window.isMinimized}
            isMaximized={window.isMaximized}
            zIndex={window.zIndex}
            position={window.position}
            size={window.size}
            onClose={() => closeWindow(window.id)}
            onMinimize={() => toggleMinimize(window.id)}
            onMaximize={() => toggleMaximize(window.id)}
            onFocus={() => bringToFront(window.id)}
            onPositionChange={(pos) => updateWindowPosition(window.id, pos)}
            onSizeChange={(size) => updateWindowSize(window.id, size)}
          >
            {window.component}
          </Window>
        ))}
      </div>

      {/* Start Menu */}
      {isStartMenuOpen && (
        <StartMenu 
          apps={apps}
          onAppClick={openApp}
          onClose={() => setIsStartMenuOpen(false)}
        />
      )}

      {/* Taskbar */}
      <Taskbar
        windows={windows}
        onStartClick={() => setIsStartMenuOpen(!isStartMenuOpen)}
        onWindowClick={(id) => {
          bringToFront(id);
          toggleMinimize(id);
        }}
        currentTime={currentTime}
        isStartMenuOpen={isStartMenuOpen}
      />
    </div>
  );
}
