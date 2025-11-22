import { useState, useRef } from 'react';
import { Search, Lock, RefreshCw, Home, Star, MoreVertical, ChevronLeft, ChevronRight, Globe } from 'lucide-react';

export function Browser() {
  const [url, setUrl] = useState('https://www.example.com');
  const [inputUrl, setInputUrl] = useState('https://www.example.com');
  const [isLoading, setIsLoading] = useState(false);
  const [canGoBack, setCanGoBack] = useState(false);
  const [canGoForward, setCanGoForward] = useState(false);
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const historyRef = useRef<string[]>(['https://www.example.com']);
  const historyIndexRef = useRef(0);

  const bookmarks = [
    { name: 'Example', url: 'https://www.example.com' },
    { name: 'Wikipedia', url: 'https://www.wikipedia.org' },
    { name: 'GitHub', url: 'https://www.github.com' },
    { name: 'MDN', url: 'https://developer.mozilla.org' },
  ];

  const navigateTo = (newUrl: string) => {
    let finalUrl = newUrl.trim();
    
    // Add https:// if no protocol is specified
    if (!finalUrl.startsWith('http://') && !finalUrl.startsWith('https://')) {
      // Check if it looks like a URL or a search query
      if (finalUrl.includes('.') && !finalUrl.includes(' ')) {
        finalUrl = 'https://' + finalUrl;
      } else {
        // Treat as search query
        finalUrl = `https://www.google.com/search?q=${encodeURIComponent(finalUrl)}`;
      }
    }
    
    setUrl(finalUrl);
    setInputUrl(finalUrl);
    setIsLoading(true);
    
    // Add to history
    if (historyIndexRef.current < historyRef.current.length - 1) {
      // Remove forward history if we're navigating from middle of history
      historyRef.current = historyRef.current.slice(0, historyIndexRef.current + 1);
    }
    historyRef.current.push(finalUrl);
    historyIndexRef.current = historyRef.current.length - 1;
    
    updateNavigationButtons();
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      navigateTo(inputUrl);
    }
  };

  const goBack = () => {
    if (canGoBack && historyIndexRef.current > 0) {
      historyIndexRef.current--;
      const previousUrl = historyRef.current[historyIndexRef.current];
      setUrl(previousUrl);
      setInputUrl(previousUrl);
      setIsLoading(true);
      updateNavigationButtons();
    }
  };

  const goForward = () => {
    if (canGoForward && historyIndexRef.current < historyRef.current.length - 1) {
      historyIndexRef.current++;
      const nextUrl = historyRef.current[historyIndexRef.current];
      setUrl(nextUrl);
      setInputUrl(nextUrl);
      setIsLoading(true);
      updateNavigationButtons();
    }
  };

  const refresh = () => {
    setIsLoading(true);
    if (iframeRef.current) {
      iframeRef.current.src = url;
    }
  };

  const goHome = () => {
    navigateTo('https://www.example.com');
  };

  const updateNavigationButtons = () => {
    setCanGoBack(historyIndexRef.current > 0);
    setCanGoForward(historyIndexRef.current < historyRef.current.length - 1);
  };

  const handleIframeLoad = () => {
    setIsLoading(false);
    try {
      // Try to update URL from iframe (will fail for cross-origin)
      if (iframeRef.current?.contentWindow?.location.href) {
        const iframeUrl = iframeRef.current.contentWindow.location.href;
        if (iframeUrl !== 'about:blank') {
          setInputUrl(iframeUrl);
        }
      }
    } catch (e) {
      // Cross-origin, can't access iframe location
    }
  };

  const isSecure = url.startsWith('https://');

  return (
    <div className="flex flex-col h-full bg-white">
      {/* Browser Toolbar */}
      <div className="flex items-center gap-2 p-3 bg-gray-50 border-b border-gray-200">
        <div className="flex gap-1">
          <button 
            onClick={goBack}
            disabled={!canGoBack}
            className={`p-2 rounded transition-colors ${
              canGoBack ? 'hover:bg-gray-200' : 'opacity-30 cursor-not-allowed'
            }`}
          >
            <ChevronLeft className="size-4" />
          </button>
          <button 
            onClick={goForward}
            disabled={!canGoForward}
            className={`p-2 rounded transition-colors ${
              canGoForward ? 'hover:bg-gray-200' : 'opacity-30 cursor-not-allowed'
            }`}
          >
            <ChevronRight className="size-4" />
          </button>
          <button 
            onClick={refresh}
            className={`p-2 hover:bg-gray-200 rounded transition-all ${
              isLoading ? 'animate-spin' : ''
            }`}
          >
            <RefreshCw className="size-4" />
          </button>
          <button 
            onClick={goHome}
            className="p-2 hover:bg-gray-200 rounded transition-colors"
          >
            <Home className="size-4" />
          </button>
        </div>

        {/* URL Bar */}
        <div className="flex-1 flex items-center gap-2 bg-white border border-gray-300 rounded-full px-4 py-2">
          {isSecure ? (
            <Lock className="size-4 text-green-600" />
          ) : (
            <Globe className="size-4 text-gray-400" />
          )}
          <input
            type="text"
            value={inputUrl}
            onChange={(e) => setInputUrl(e.target.value)}
            onKeyDown={handleKeyDown}
            onFocus={(e) => e.target.select()}
            className="flex-1 outline-none text-sm"
            placeholder="Search or enter address"
          />
          <Search className="size-4 text-gray-400" />
        </div>

        <div className="flex gap-1">
          <button className="p-2 hover:bg-gray-200 rounded transition-colors">
            <Star className="size-4" />
          </button>
          <button className="p-2 hover:bg-gray-200 rounded transition-colors">
            <MoreVertical className="size-4" />
          </button>
        </div>
      </div>

      {/* Bookmarks Bar */}
      <div className="flex items-center gap-2 px-3 py-2 bg-gray-50 border-b border-gray-200">
        {bookmarks.map((bookmark) => (
          <button
            key={bookmark.name}
            onClick={() => navigateTo(bookmark.url)}
            className="px-3 py-1 text-sm hover:bg-gray-200 rounded transition-colors"
          >
            {bookmark.name}
          </button>
        ))}
      </div>

      {/* Loading Bar */}
      {isLoading && (
        <div className="h-1 bg-gray-200 overflow-hidden">
          <div className="h-full bg-blue-500 animate-pulse" style={{ width: '70%' }}></div>
        </div>
      )}

      {/* Browser Content - Iframe */}
      <div className="flex-1 relative bg-white">
        <iframe
          ref={iframeRef}
          src={url}
          onLoad={handleIframeLoad}
          className="w-full h-full border-none"
          sandbox="allow-same-origin allow-scripts allow-forms allow-popups allow-popups-to-escape-sandbox allow-downloads"
          title="Browser content"
        />
        
        {/* Fallback message overlay (shows briefly while loading) */}
        {isLoading && (
          <div className="absolute inset-0 flex items-center justify-center bg-white">
            <div className="text-center">
              <div className="inline-flex items-center justify-center size-16 bg-gradient-to-br from-blue-500 to-purple-500 rounded-2xl mb-4 animate-pulse">
                <Globe className="size-8 text-white" />
              </div>
              <p className="text-gray-600">Loading...</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}