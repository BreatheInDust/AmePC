import { useState } from 'react';
import { Play, Pause, SkipBack, SkipForward, Volume2, Shuffle, Repeat, Heart, List, Music as MusicIcon } from 'lucide-react';

export function Music() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTrack, setCurrentTrack] = useState(0);

  const tracks = [
    { id: 1, title: 'Summer Vibes', artist: 'The Chill Band', album: 'Relaxation', duration: '3:45' },
    { id: 2, title: 'Electronic Dreams', artist: 'Synth Wave', album: 'Digital', duration: '4:12' },
    { id: 3, title: 'Jazz Night', artist: 'Smooth Quartet', album: 'Late Night', duration: '5:23' },
    { id: 4, title: 'Rock Anthem', artist: 'Power Band', album: 'Energy', duration: '3:58' },
    { id: 5, title: 'Classical Morning', artist: 'Orchestra', album: 'Classics', duration: '6:15' },
    { id: 6, title: 'Pop Hit', artist: 'Chart Toppers', album: 'Now', duration: '3:32' },
    { id: 7, title: 'Indie Folk', artist: 'Acoustic Souls', album: 'Stories', duration: '4:28' },
    { id: 8, title: 'Hip Hop Beat', artist: 'Urban Flow', album: 'Street', duration: '3:19' },
  ];

  const playlists = [
    { name: 'My Favorites', count: 45 },
    { name: 'Workout Mix', count: 32 },
    { name: 'Chill Vibes', count: 28 },
    { name: 'Party Time', count: 56 },
  ];

  return (
    <div className="flex flex-col h-full bg-gradient-to-br from-purple-900 via-indigo-900 to-blue-900">
      {/* Main Content Area */}
      <div className="flex-1 flex overflow-hidden">
        {/* Sidebar */}
        <div className="w-64 bg-black/20 backdrop-blur p-4">
          <div className="space-y-6">
            <div>
              <button className="w-full flex items-center gap-3 px-3 py-2 text-white hover:bg-white/10 rounded-lg transition-colors">
                <MusicIcon className="size-5" />
                <span>Library</span>
              </button>
            </div>

            <div>
              <h3 className="text-xs text-white/60 mb-2 px-3">Playlists</h3>
              <div className="space-y-1">
                {playlists.map((playlist) => (
                  <button
                    key={playlist.name}
                    className="w-full flex items-center justify-between px-3 py-2 text-white hover:bg-white/10 rounded-lg transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <List className="size-4" />
                      <span className="text-sm">{playlist.name}</span>
                    </div>
                    <span className="text-xs text-white/60">{playlist.count}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Track List */}
        <div className="flex-1 overflow-auto p-8">
          <div className="mb-8">
            <h1 className="text-white text-3xl mb-2">Now Playing</h1>
            <p className="text-white/60">Your music collection</p>
          </div>

          <div className="bg-black/20 backdrop-blur rounded-xl overflow-hidden">
            <div className="grid grid-cols-[auto_1fr_1fr_auto_auto] gap-4 px-4 py-3 text-xs text-white/60 border-b border-white/10">
              <div className="w-12">#</div>
              <div>Title</div>
              <div>Album</div>
              <div>Duration</div>
              <div className="w-12"></div>
            </div>

            {tracks.map((track, index) => (
              <div
                key={track.id}
                onClick={() => setCurrentTrack(index)}
                className={`grid grid-cols-[auto_1fr_1fr_auto_auto] gap-4 px-4 py-3 items-center hover:bg-white/10 cursor-pointer transition-colors ${
                  currentTrack === index ? 'bg-white/20' : ''
                }`}
              >
                <div className="w-12 text-white/60">{index + 1}</div>
                <div>
                  <div className="text-white">{track.title}</div>
                  <div className="text-sm text-white/60">{track.artist}</div>
                </div>
                <div className="text-white/60">{track.album}</div>
                <div className="text-white/60">{track.duration}</div>
                <button className="w-12 flex justify-center opacity-0 hover:opacity-100 transition-opacity">
                  <Heart className="size-4 text-white" />
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Player Controls */}
      <div className="h-24 bg-black/40 backdrop-blur-xl border-t border-white/10">
        <div className="h-full flex items-center justify-between px-6">
          {/* Current Track Info */}
          <div className="flex items-center gap-4 w-64">
            <div className="size-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
              <MusicIcon className="size-8 text-white" />
            </div>
            <div>
              <div className="text-white">{tracks[currentTrack].title}</div>
              <div className="text-sm text-white/60">{tracks[currentTrack].artist}</div>
            </div>
            <button className="ml-auto">
              <Heart className="size-5 text-white/60 hover:text-white transition-colors" />
            </button>
          </div>

          {/* Playback Controls */}
          <div className="flex-1 flex flex-col items-center gap-2">
            <div className="flex items-center gap-4">
              <button className="text-white/60 hover:text-white transition-colors">
                <Shuffle className="size-5" />
              </button>
              <button className="text-white hover:scale-110 transition-transform">
                <SkipBack className="size-6" />
              </button>
              <button
                onClick={() => setIsPlaying(!isPlaying)}
                className="size-12 bg-white rounded-full flex items-center justify-center hover:scale-110 transition-transform"
              >
                {isPlaying ? (
                  <Pause className="size-6 text-black" />
                ) : (
                  <Play className="size-6 text-black ml-1" />
                )}
              </button>
              <button className="text-white hover:scale-110 transition-transform">
                <SkipForward className="size-6" />
              </button>
              <button className="text-white/60 hover:text-white transition-colors">
                <Repeat className="size-5" />
              </button>
            </div>

            {/* Progress Bar */}
            <div className="w-full max-w-2xl flex items-center gap-2">
              <span className="text-xs text-white/60">1:23</span>
              <div className="flex-1 h-1 bg-white/20 rounded-full overflow-hidden">
                <div className="w-1/3 h-full bg-white rounded-full"></div>
              </div>
              <span className="text-xs text-white/60">{tracks[currentTrack].duration}</span>
            </div>
          </div>

          {/* Volume Control */}
          <div className="flex items-center gap-2 w-64 justify-end">
            <Volume2 className="size-5 text-white" />
            <div className="w-24 h-1 bg-white/20 rounded-full overflow-hidden">
              <div className="w-2/3 h-full bg-white rounded-full"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
