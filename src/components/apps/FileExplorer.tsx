import { useState } from 'react';
import { ChevronLeft, ChevronRight, Home, Folder, File, Image, Music, Video, FolderOpen } from 'lucide-react';

export function FileExplorer() {
  const [currentPath, setCurrentPath] = useState(['This PC', 'Documents']);
  const [selectedItem, setSelectedItem] = useState<string | null>(null);

  const folders = [
    { name: 'Desktop', icon: Folder, items: 12 },
    { name: 'Downloads', icon: FolderOpen, items: 45 },
    { name: 'Pictures', icon: Folder, items: 234 },
    { name: 'Videos', icon: Folder, items: 18 },
    { name: 'Music', icon: Folder, items: 156 },
    { name: 'Projects', icon: Folder, items: 8 },
  ];

  const files = [
    { name: 'Report.pdf', icon: File, size: '2.4 MB', type: 'PDF Document' },
    { name: 'Presentation.pptx', icon: File, size: '5.1 MB', type: 'PowerPoint' },
    { name: 'Budget.xlsx', icon: File, size: '1.2 MB', type: 'Excel Spreadsheet' },
    { name: 'Photo.jpg', icon: Image, size: '3.8 MB', type: 'JPEG Image' },
    { name: 'Song.mp3', icon: Music, size: '4.5 MB', type: 'MP3 Audio' },
    { name: 'Video.mp4', icon: Video, size: '45.2 MB', type: 'MP4 Video' },
  ];

  return (
    <div className="flex h-full">
      {/* Sidebar */}
      <div className="w-48 bg-gray-50 border-r border-gray-200 p-3">
        <div className="space-y-1">
          <button className="w-full flex items-center gap-2 px-3 py-2 rounded hover:bg-gray-200 transition-colors">
            <Home className="size-4" />
            <span className="text-sm">Home</span>
          </button>
          <button className="w-full flex items-center gap-2 px-3 py-2 rounded bg-blue-50 text-blue-600">
            <Folder className="size-4" />
            <span className="text-sm">Documents</span>
          </button>
          <button className="w-full flex items-center gap-2 px-3 py-2 rounded hover:bg-gray-200 transition-colors">
            <Image className="size-4" />
            <span className="text-sm">Pictures</span>
          </button>
          <button className="w-full flex items-center gap-2 px-3 py-2 rounded hover:bg-gray-200 transition-colors">
            <Music className="size-4" />
            <span className="text-sm">Music</span>
          </button>
          <button className="w-full flex items-center gap-2 px-3 py-2 rounded hover:bg-gray-200 transition-colors">
            <Video className="size-4" />
            <span className="text-sm">Videos</span>
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Navigation Bar */}
        <div className="h-12 bg-white border-b border-gray-200 flex items-center px-4 gap-2">
          <button className="p-1 hover:bg-gray-100 rounded">
            <ChevronLeft className="size-5" />
          </button>
          <button className="p-1 hover:bg-gray-100 rounded">
            <ChevronRight className="size-5" />
          </button>
          <div className="flex-1 flex items-center bg-gray-100 rounded px-3 py-1.5">
            {currentPath.map((path, index) => (
              <span key={index} className="text-sm">
                {index > 0 && <span className="mx-2 text-gray-400">/</span>}
                {path}
              </span>
            ))}
          </div>
        </div>

        {/* Content Area */}
        <div className="flex-1 overflow-auto p-6">
          {/* Folders */}
          <div className="mb-6">
            <h3 className="text-xs text-gray-500 mb-2">Folders</h3>
            <div className="grid grid-cols-4 gap-4">
              {folders.map((folder) => {
                const Icon = folder.icon;
                return (
                  <button
                    key={folder.name}
                    onClick={() => setSelectedItem(folder.name)}
                    className={`p-4 rounded-lg border-2 transition-all ${
                      selectedItem === folder.name
                        ? 'border-blue-500 bg-blue-50'
                        : 'border-transparent hover:bg-gray-50'
                    }`}
                  >
                    <Icon className="size-12 text-blue-500 mb-2" />
                    <div className="text-sm">{folder.name}</div>
                    <div className="text-xs text-gray-500">{folder.items} items</div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Files */}
          <div>
            <h3 className="text-xs text-gray-500 mb-2">Files</h3>
            <div className="space-y-1">
              {files.map((file) => {
                const Icon = file.icon;
                return (
                  <button
                    key={file.name}
                    onClick={() => setSelectedItem(file.name)}
                    className={`w-full flex items-center gap-3 p-3 rounded-lg transition-all ${
                      selectedItem === file.name
                        ? 'bg-blue-50 border-2 border-blue-500'
                        : 'hover:bg-gray-50 border-2 border-transparent'
                    }`}
                  >
                    <Icon className="size-8 text-gray-600" />
                    <div className="flex-1 text-left">
                      <div className="text-sm">{file.name}</div>
                      <div className="text-xs text-gray-500">{file.type}</div>
                    </div>
                    <div className="text-xs text-gray-500">{file.size}</div>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
