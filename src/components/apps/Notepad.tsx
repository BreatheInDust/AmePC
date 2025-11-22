import { useState } from 'react';
import { Save, FileText, Download, Printer, Bold, Italic, Underline, AlignLeft, AlignCenter, AlignRight } from 'lucide-react';

export function Notepad() {
  const [content, setContent] = useState('Welcome to AmePC Notepad!\n\nStart typing your notes here...');

  return (
    <div className="flex flex-col h-full">
      {/* Toolbar */}
      <div className="bg-gray-50 border-b border-gray-200 p-2">
        <div className="flex items-center gap-1">
          <button className="p-2 hover:bg-gray-200 rounded transition-colors" title="Save">
            <Save className="size-4" />
          </button>
          <button className="p-2 hover:bg-gray-200 rounded transition-colors" title="New File">
            <FileText className="size-4" />
          </button>
          <button className="p-2 hover:bg-gray-200 rounded transition-colors" title="Download">
            <Download className="size-4" />
          </button>
          <button className="p-2 hover:bg-gray-200 rounded transition-colors" title="Print">
            <Printer className="size-4" />
          </button>
          
          <div className="w-px h-6 bg-gray-300 mx-2"></div>

          <button className="p-2 hover:bg-gray-200 rounded transition-colors" title="Bold">
            <Bold className="size-4" />
          </button>
          <button className="p-2 hover:bg-gray-200 rounded transition-colors" title="Italic">
            <Italic className="size-4" />
          </button>
          <button className="p-2 hover:bg-gray-200 rounded transition-colors" title="Underline">
            <Underline className="size-4" />
          </button>

          <div className="w-px h-6 bg-gray-300 mx-2"></div>

          <button className="p-2 hover:bg-gray-200 rounded transition-colors" title="Align Left">
            <AlignLeft className="size-4" />
          </button>
          <button className="p-2 hover:bg-gray-200 rounded transition-colors" title="Align Center">
            <AlignCenter className="size-4" />
          </button>
          <button className="p-2 hover:bg-gray-200 rounded transition-colors" title="Align Right">
            <AlignRight className="size-4" />
          </button>

          <div className="w-px h-6 bg-gray-300 mx-2"></div>

          <select className="px-2 py-1 text-sm border border-gray-300 rounded">
            <option>Arial</option>
            <option>Times New Roman</option>
            <option>Courier New</option>
            <option>Georgia</option>
          </select>

          <select className="px-2 py-1 text-sm border border-gray-300 rounded ml-2">
            <option>12</option>
            <option>14</option>
            <option>16</option>
            <option>18</option>
            <option>20</option>
          </select>
        </div>
      </div>

      {/* Text Area */}
      <div className="flex-1 bg-white p-6">
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="w-full h-full resize-none outline-none"
          spellCheck="false"
        />
      </div>

      {/* Status Bar */}
      <div className="bg-gray-50 border-t border-gray-200 px-4 py-2 flex items-center justify-between text-sm text-gray-600">
        <span>Lines: {content.split('\n').length}</span>
        <span>Characters: {content.length}</span>
        <span>Words: {content.split(/\s+/).filter(word => word.length > 0).length}</span>
      </div>
    </div>
  );
}
