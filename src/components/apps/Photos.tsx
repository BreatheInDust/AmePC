import { useState } from 'react';
import { Grid3x3, Image, Folder, Heart, Trash2, Share2, Download, ZoomIn } from 'lucide-react';
import { ImageWithFallback } from '../figma/ImageWithFallback';

export function Photos() {
  const [selectedPhoto, setSelectedPhoto] = useState<number | null>(null);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  const photos = [
    {
      id: 1,
      url: 'https://images.unsplash.com/photo-1617634667039-8e4cb277ab46?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxuYXR1cmUlMjBsYW5kc2NhcGV8ZW58MXx8fHwxNzYzODMyMzA1fDA&ixlib=rb-4.1.0&q=80&w=1080',
      name: 'Nature Landscape',
      date: '2024-11-20',
      size: '2.4 MB'
    },
    {
      id: 2,
      url: 'https://images.unsplash.com/photo-1616036740257-9449ea1f6605?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdW5zZXQlMjBiZWFjaHxlbnwxfHx8fDE3NjM4MDMzNzR8MA&ixlib=rb-4.1.0&q=80&w=1080',
      name: 'Sunset Beach',
      date: '2024-11-19',
      size: '3.1 MB'
    },
    {
      id: 3,
      url: 'https://images.unsplash.com/photo-1603979649806-5299879db16b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb3VudGFpbiUyMGxha2V8ZW58MXx8fHwxNzYzODM4MDQ3fDA&ixlib=rb-4.1.0&q=80&w=1080',
      name: 'Mountain Lake',
      date: '2024-11-18',
      size: '2.8 MB'
    },
    {
      id: 4,
      url: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmb3Jlc3QlMjB0cmVlc3xlbnwxfHx8fDE3NjM3NzYzNTF8MA&ixlib=rb-4.1.0&q=80&w=1080',
      name: 'Forest Trees',
      date: '2024-11-17',
      size: '3.5 MB'
    },
    {
      id: 5,
      url: 'https://images.unsplash.com/photo-1493134799591-2c9eed26201a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjaXR5JTIwc2t5bGluZXxlbnwxfHx8fDE3NjM3MTg0ODd8MA&ixlib=rb-4.1.0&q=80&w=1080',
      name: 'City Skyline',
      date: '2024-11-16',
      size: '2.9 MB'
    },
    {
      id: 6,
      url: 'https://images.unsplash.com/photo-1483347756197-71ef80e95f73?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxub3J0aGVybiUyMGxpZ2h0c3xlbnwxfHx8fDE3NjM4MzgwNDh8MA&ixlib=rb-4.1.0&q=80&w=1080',
      name: 'Northern Lights',
      date: '2024-11-15',
      size: '4.2 MB'
    }
  ];

  return (
    <div className="flex h-full">
      {/* Sidebar */}
      <div className="w-56 bg-gray-50 border-r border-gray-200 p-4">
        <div className="space-y-2">
          <button className="w-full flex items-center gap-3 px-3 py-2 bg-blue-50 text-blue-600 rounded-lg">
            <Image className="size-5" />
            <span className="text-sm">All Photos</span>
            <span className="ml-auto text-xs">234</span>
          </button>
          <button className="w-full flex items-center gap-3 px-3 py-2 hover:bg-gray-100 rounded-lg transition-colors">
            <Heart className="size-5" />
            <span className="text-sm">Favorites</span>
            <span className="ml-auto text-xs">12</span>
          </button>
          <button className="w-full flex items-center gap-3 px-3 py-2 hover:bg-gray-100 rounded-lg transition-colors">
            <Folder className="size-5" />
            <span className="text-sm">Albums</span>
            <span className="ml-auto text-xs">8</span>
          </button>
        </div>

        <div className="mt-8">
          <h3 className="text-xs text-gray-500 mb-2">Albums</h3>
          <div className="space-y-1">
            <button className="w-full text-left px-3 py-2 hover:bg-gray-100 rounded-lg transition-colors text-sm">
              Vacation 2024
            </button>
            <button className="w-full text-left px-3 py-2 hover:bg-gray-100 rounded-lg transition-colors text-sm">
              Family
            </button>
            <button className="w-full text-left px-3 py-2 hover:bg-gray-100 rounded-lg transition-colors text-sm">
              Nature
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Toolbar */}
        <div className="h-14 bg-white border-b border-gray-200 flex items-center justify-between px-4">
          <div className="flex items-center gap-2">
            <button
              onClick={() => setViewMode('grid')}
              className={`p-2 rounded transition-colors ${
                viewMode === 'grid' ? 'bg-blue-50 text-blue-600' : 'hover:bg-gray-100'
              }`}
            >
              <Grid3x3 className="size-5" />
            </button>
          </div>

          <div className="flex items-center gap-2">
            <button className="p-2 hover:bg-gray-100 rounded transition-colors" title="Zoom In">
              <ZoomIn className="size-5" />
            </button>
            <button className="p-2 hover:bg-gray-100 rounded transition-colors" title="Share">
              <Share2 className="size-5" />
            </button>
            <button className="p-2 hover:bg-gray-100 rounded transition-colors" title="Download">
              <Download className="size-5" />
            </button>
            <button className="p-2 hover:bg-red-100 text-red-600 rounded transition-colors" title="Delete">
              <Trash2 className="size-5" />
            </button>
          </div>
        </div>

        {/* Photo Grid */}
        <div className="flex-1 overflow-auto bg-gray-50 p-6">
          <div className="grid grid-cols-3 gap-4">
            {photos.map((photo) => (
              <div
                key={photo.id}
                onClick={() => setSelectedPhoto(photo.id)}
                className={`relative aspect-square rounded-lg overflow-hidden cursor-pointer group ${
                  selectedPhoto === photo.id ? 'ring-4 ring-blue-500' : ''
                }`}
              >
                <ImageWithFallback
                  src={photo.url}
                  alt={photo.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
                  <div className="absolute bottom-0 left-0 right-0 p-3 text-white">
                    <div className="text-sm">{photo.name}</div>
                    <div className="text-xs text-white/80">{photo.date}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
