interface DesktopIconProps {
  icon: any;
  label: string;
  onClick: () => void;
}

export function DesktopIcon({ icon: Icon, label, onClick }: DesktopIconProps) {
  return (
    <button
      onClick={onClick}
      onDoubleClick={onClick}
      className="flex flex-col items-center gap-1 p-2 rounded-lg hover:bg-white/20 transition-colors group cursor-pointer"
    >
      <div className="size-12 bg-white/90 backdrop-blur rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform shadow-lg">
        <Icon className="size-6 text-blue-600" />
      </div>
      <span className="text-white text-xs text-center drop-shadow-lg">{label}</span>
    </button>
  );
}
