import { useState } from 'react';
import { Delete } from 'lucide-react';

export function Calculator() {
  const [display, setDisplay] = useState('0');
  const [equation, setEquation] = useState('');
  const [waitingForOperand, setWaitingForOperand] = useState(false);

  const handleNumber = (num: string) => {
    if (waitingForOperand) {
      setDisplay(num);
      setWaitingForOperand(false);
    } else {
      setDisplay(display === '0' ? num : display + num);
    }
  };

  const handleOperator = (op: string) => {
    const value = parseFloat(display);
    
    if (equation === '') {
      setEquation(display + ' ' + op + ' ');
    } else {
      setEquation(equation + display + ' ' + op + ' ');
    }
    
    setWaitingForOperand(true);
  };

  const handleEquals = () => {
    if (equation !== '') {
      try {
        const fullEquation = equation + display;
        const result = eval(fullEquation.replace(/×/g, '*').replace(/÷/g, '/'));
        setDisplay(String(result));
        setEquation('');
        setWaitingForOperand(true);
      } catch (error) {
        setDisplay('Error');
        setEquation('');
      }
    }
  };

  const handleClear = () => {
    setDisplay('0');
    setEquation('');
    setWaitingForOperand(false);
  };

  const handleDecimal = () => {
    if (waitingForOperand) {
      setDisplay('0.');
      setWaitingForOperand(false);
    } else if (display.indexOf('.') === -1) {
      setDisplay(display + '.');
    }
  };

  const handleBackspace = () => {
    if (display.length > 1) {
      setDisplay(display.slice(0, -1));
    } else {
      setDisplay('0');
    }
  };

  const Button = ({ value, onClick, className = '', span = 1 }: any) => (
    <button
      onClick={onClick}
      className={`h-16 rounded-lg text-xl transition-all hover:brightness-110 active:scale-95 ${className}`}
      style={{ gridColumn: `span ${span}` }}
    >
      {value}
    </button>
  );

  return (
    <div className="h-full bg-gradient-to-br from-gray-900 to-gray-800 p-6">
      <div className="max-w-md mx-auto">
        {/* Display */}
        <div className="bg-gray-950 rounded-xl p-6 mb-4">
          <div className="text-gray-500 text-sm mb-2 h-6">{equation}</div>
          <div className="text-white text-right text-4xl overflow-hidden">{display}</div>
        </div>

        {/* Buttons */}
        <div className="grid grid-cols-4 gap-3">
          <Button
            value="C"
            onClick={handleClear}
            className="bg-red-500 text-white"
          />
          <Button
            value={<Delete className="size-6 mx-auto" />}
            onClick={handleBackspace}
            className="bg-gray-700 text-white"
          />
          <Button
            value="%"
            onClick={() => handleOperator('%')}
            className="bg-gray-700 text-white"
          />
          <Button
            value="÷"
            onClick={() => handleOperator('÷')}
            className="bg-blue-500 text-white"
          />

          <Button
            value="7"
            onClick={() => handleNumber('7')}
            className="bg-gray-700 text-white"
          />
          <Button
            value="8"
            onClick={() => handleNumber('8')}
            className="bg-gray-700 text-white"
          />
          <Button
            value="9"
            onClick={() => handleNumber('9')}
            className="bg-gray-700 text-white"
          />
          <Button
            value="×"
            onClick={() => handleOperator('×')}
            className="bg-blue-500 text-white"
          />

          <Button
            value="4"
            onClick={() => handleNumber('4')}
            className="bg-gray-700 text-white"
          />
          <Button
            value="5"
            onClick={() => handleNumber('5')}
            className="bg-gray-700 text-white"
          />
          <Button
            value="6"
            onClick={() => handleNumber('6')}
            className="bg-gray-700 text-white"
          />
          <Button
            value="-"
            onClick={() => handleOperator('-')}
            className="bg-blue-500 text-white"
          />

          <Button
            value="1"
            onClick={() => handleNumber('1')}
            className="bg-gray-700 text-white"
          />
          <Button
            value="2"
            onClick={() => handleNumber('2')}
            className="bg-gray-700 text-white"
          />
          <Button
            value="3"
            onClick={() => handleNumber('3')}
            className="bg-gray-700 text-white"
          />
          <Button
            value="+"
            onClick={() => handleOperator('+')}
            className="bg-blue-500 text-white"
          />

          <Button
            value="0"
            onClick={() => handleNumber('0')}
            className="bg-gray-700 text-white"
            span={2}
          />
          <Button
            value="."
            onClick={handleDecimal}
            className="bg-gray-700 text-white"
          />
          <Button
            value="="
            onClick={handleEquals}
            className="bg-green-500 text-white"
          />
        </div>
      </div>
    </div>
  );
}
