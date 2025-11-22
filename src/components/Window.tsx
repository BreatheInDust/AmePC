import { useState, useEffect, useRef } from 'react';
import { X, Minus, Maximize2, Minimize2 } from 'lucide-react';
import { Resizable } from 're-resizable';

interface WindowProps {
  id: string;
  title: string;
  icon: any;
  children: React.ReactNode;
  isMinimized: boolean;
  isMaximized: boolean;
  zIndex: number;
  position: { x: number; y: number };
  size: { width: number; height: number };
  onClose: () => void;
  onMinimize: () => void;
  onMaximize: () => void;
  onFocus: () => void;
  onPositionChange: (position: { x: number; y: number }) => void;
  onSizeChange: (size: { width: number; height: number }) => void;
}

export function Window({
  id,
  title,
  icon: Icon,
  children,
  isMinimized,
  isMaximized,
  zIndex,
  position,
  size,
  onClose,
  onMinimize,
  onMaximize,
  onFocus,
  onPositionChange,
  onSizeChange,
}: WindowProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const windowRef = useRef<HTMLDivElement>(null);

  const handleMouseDown = (e: React.MouseEvent) => {
    if (isMaximized) return;
    onFocus();
    setIsDragging(true);
    setDragOffset({
      x: e.clientX - position.x,
      y: e.clientY - position.y,
    });
  };

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!isDragging || isMaximized) return;
      
      const newX = Math.max(0, Math.min(e.clientX - dragOffset.x, window.innerWidth - 100));
      const newY = Math.max(0, Math.min(e.clientY - dragOffset.y, window.innerHeight - 100));
      
      onPositionChange({ x: newX, y: newY });
    };

    const handleMouseUp = () => {
      setIsDragging(false);
    };

    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
    }

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging, dragOffset, position, isMaximized, onPositionChange]);

  if (isMinimized) return null;

  const windowStyle = isMaximized
    ? { top: 0, left: 0, width: '100%', height: 'calc(100% - 4rem)' }
    : { top: position.y, left: position.x };

  return (
    <div
      ref={windowRef}
      className="absolute"
      style={{ ...windowStyle, zIndex }}
      onMouseDown={onFocus}
    >
      <Resizable
        size={isMaximized ? { width: '100%', height: '100%' } : size}
        onResizeStop={(e, direction, ref, d) => {
          onSizeChange({
            width: size.width + d.width,
            height: size.height + d.height,
          });
        }}
        minWidth={400}
        minHeight={300}
        enable={!isMaximized}
        className="flex flex-col bg-white rounded-lg shadow-2xl overflow-hidden border border-gray-300"
      >
        {/* Title Bar */}
        <div
          className="h-10 bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-between px-3 cursor-move select-none"
          onMouseDown={handleMouseDown}
          onDoubleClick={onMaximize}
        >
          <div className="flex items-center gap-2">
            <Icon className="size-4 text-white" />
            <span className="text-white">{title}</span>
          </div>
          <div className="flex items-center gap-1">
            <button
              onClick={(e) => {
                e.stopPropagation();
                onMinimize();
              }}
              className="p-1.5 hover:bg-white/20 rounded transition-colors"
            >
              <Minus className="size-4 text-white" />
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                onMaximize();
              }}
              className="p-1.5 hover:bg-white/20 rounded transition-colors"
            >
              {isMaximized ? (
                <Minimize2 className="size-4 text-white" />
              ) : (
                <Maximize2 className="size-4 text-white" />
              )}
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                onClose();
              }}
              className="p-1.5 hover:bg-red-500 rounded transition-colors"
            >
              <X className="size-4 text-white" />
            </button>
          </div>
        </div>

        {/* Window Content */}
        <div className="flex-1 overflow-auto bg-white">
          {children}
        </div>
      </Resizable>
    </div>
  );
}
