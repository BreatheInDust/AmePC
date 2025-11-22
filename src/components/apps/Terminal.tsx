import { useState, useRef, useEffect } from 'react';

export function Terminal() {
  const [history, setHistory] = useState<Array<{ type: 'input' | 'output'; text: string }>>([
    { type: 'output', text: 'AmePC Terminal v1.0.0' },
    { type: 'output', text: 'Type "help" for available commands.' },
    { type: 'output', text: '' },
  ]);
  const [input, setInput] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);
  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [history]);

  const commands: Record<string, () => string[]> = {
    help: () => [
      'Available commands:',
      '  help      - Show this help message',
      '  about     - About AmePC',
      '  date      - Show current date and time',
      '  clear     - Clear terminal',
      '  echo      - Echo text',
      '  whoami    - Display current user',
      '  sysinfo   - Display system information',
      '  ls        - List files',
      '  calc      - Basic calculator (e.g., calc 2 + 2)',
    ],
    about: () => [
      'AmePC Operating System',
      'Version: 16.0',
      'Built with modern web technologies',
      'Created for demonstration purposes',
    ],
    date: () => [new Date().toString()],
    clear: () => {
      setHistory([]);
      return [];
    },
    whoami: () => ['AmePC User'],
    sysinfo: () => [
      'System Information:',
      '  OS: AmePC 16',
      '  Browser: Modern Web Browser',
      `  Resolution: ${window.innerWidth}x${window.innerHeight}`,
      `  Platform: ${navigator.platform}`,
    ],
    ls: () => [
      'Desktop/',
      'Documents/',
      'Downloads/',
      'Pictures/',
      'Videos/',
      'Music/',
      'Projects/',
    ],
  };

  const handleCommand = (cmd: string) => {
    const trimmedCmd = cmd.trim();
    if (!trimmedCmd) return;

    setHistory((prev) => [...prev, { type: 'input', text: `$ ${trimmedCmd}` }]);

    const [command, ...args] = trimmedCmd.split(' ');

    if (command === 'echo') {
      const output = args.join(' ') || '';
      setHistory((prev) => [...prev, { type: 'output', text: output }]);
    } else if (command === 'calc') {
      try {
        const expression = args.join(' ');
        const result = eval(expression);
        setHistory((prev) => [...prev, { type: 'output', text: `${result}` }]);
      } catch (error) {
        setHistory((prev) => [...prev, { type: 'output', text: 'Error: Invalid expression' }]);
      }
    } else if (commands[command]) {
      const output = commands[command]();
      output.forEach((line) => {
        setHistory((prev) => [...prev, { type: 'output', text: line }]);
      });
    } else {
      setHistory((prev) => [
        ...prev,
        { type: 'output', text: `Command not found: ${command}. Type "help" for available commands.` },
      ]);
    }

    setInput('');
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleCommand(input);
    }
  };

  return (
    <div
      className="h-full bg-gray-900 text-green-400 p-4 overflow-auto font-mono text-sm"
      onClick={() => inputRef.current?.focus()}
    >
      {history.map((item, index) => (
        <div key={index} className={item.type === 'input' ? 'text-green-400' : 'text-gray-400'}>
          {item.text}
        </div>
      ))}
      <div className="flex items-center">
        <span className="text-green-400">$ </span>
        <input
          ref={inputRef}
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          className="flex-1 bg-transparent outline-none text-green-400 ml-1"
          autoFocus
        />
      </div>
      <div ref={endRef} />
    </div>
  );
}
