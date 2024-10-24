import { useState, useEffect, useRef } from 'react';
import './App.css';

function App() {
  const [animationSettings, setAnimationSettings] = useState({
    speed: 4,        // Default speed is 4s
    delay: 0,        // Default delay is 0s
    paused: false,
    startPosition: 0, // Start position in percentage
    endPosition: 100,  // End position in percentage
    stopMid: false,   // Flag to indicate if we want to stop at the middle
  });
  const [animationSettings1, setAnimationSettings1] = useState({
    speed: 6,        // Default speed is 6s
    delay: 0,        // Default delay is 0s
    paused: false,
    startPosition: 0, // Start position in percentage
    endPosition: 100,  // End position in percentage
    stopMid: false,   // Flag to indicate if we want to stop at the middle
  });
  const [animationSettings2, setAnimationSettings2] = useState({
    speed: 2,        // Default speed is 2s
    delay: 0,        // Default delay is 0s
    paused: false,
    startPosition: 0, // Start position in percentage
    endPosition: 100,  // End position in percentage
    stopMid: false,   // Flag to indicate if we want to stop at the middle
  });

  const textRef = useRef(null);
  const containerRef = useRef(null); // Reference for the container
  const textRef1 = useRef(null);
  const textRef2 = useRef(null);

  // Update animation key based on delay value to force reload when delay changes
  const animationKey = `animation-${animationSettings.delay}`;
  const animationKey1 = `animation1-${animationSettings1.delay}`;
  const animationKey2 = `animation2-${animationSettings2.delay}`;

  const handleInputChange = (field) => (event) => {
    const value = Number(event.target.value);
    setAnimationSettings((prev) => ({
      ...prev,
      [field]: value >= 0 ? value : prev[field], // Maintain previous value if invalid
    }));
  };
  const handleInputChange2 = (field) => (event) => {
    const value = Number(event.target.value);
    setAnimationSettings1((prev) => ({
      ...prev,
      [field]: value >= 0 ? value : prev[field], // Maintain previous value if invalid
    }));
  };
  const handleInputChange3 = (field) => (event) => {
    const value = Number(event.target.value);
    setAnimationSettings2((prev) => ({
      ...prev,
      [field]: value >= 0 ? value : prev[field], // Maintain previous value if invalid
    }));
  };

  const togglePause = () => {
    setAnimationSettings((prev) => ({
      ...prev,
      paused: !prev.paused,
      stopMid: false,
    }));
  };
  const togglePause2 = () => {
    setAnimationSettings1((prev) => ({
      ...prev,
      paused: !prev.paused,
      stopMid: false,
    }));
  };
  const togglePause3 = () => {
    setAnimationSettings2((prev) => ({
      ...prev,
      paused: !prev.paused,
      stopMid: false,
    }));
  };

  const stopAtMiddle = () => {
    setAnimationSettings((prev) => ({
      ...prev,
      stopMid: !prev.stopMid, // Toggle the stopMid state
      paused: false, // Ensure it resumes if stopping
    }));
  };
  const stopAtMiddle2 = () => {
    setAnimationSettings1((prev) => ({
      ...prev,
      stopMid: !prev.stopMid, // Toggle the stopMid state
      paused: false, // Ensure it resumes if stopping
    }));
  };
  const stopAtMiddle3 = () => {
    setAnimationSettings2((prev) => ({
      ...prev,
      stopMid: !prev.stopMid, // Toggle the stopMid state
      paused: false, // Ensure it resumes if stopping
    }));
  };

  return (
    <div className="bg-gray-100 md:h-screen flex flex-wrap md:flex-col items-center justify-center">
      <div
        ref={containerRef}
        className="md:w-1/2 my-5 h-52 w-full py-4 rounded-xl shadow-lg relative overflow-hidden app-container"
      >
        <p
          key={animationKey}  // Update key when delay changes
          className={`text-animation whitespace-nowrap ${animationSettings.paused ? 'paused-0' : ''}`}
          style={{
            '--end-position': `${animationSettings.endPosition}%`,
            animationDuration: `${animationSettings.speed}s`,
            animationDelay: `${animationSettings.delay}s`,
          }}
          ref={textRef}
        >
          Animation 1
        </p>
        <p
          key={animationKey1}  // Update key when delay changes
          className={`text-animation1 text-yellow-500 whitespace-nowrap ${animationSettings1.paused ? 'paused-1' : ''}`}
          style={{
            '--end-position': `${animationSettings1.endPosition}%`,
            animationDuration: `${animationSettings1.speed}s`,
            animationDelay: `${animationSettings1.delay}s`,
          }}
          ref={textRef1}
        >
         Animation 2
        </p>
        <p
          key={animationKey2}  // Update key when delay changes
          className={`text-animation2 text-green-700 whitespace-nowrap ${animationSettings2.paused ? 'paused-2' : ''}`}
          style={{
            '--end-position': `${animationSettings2.endPosition}%`,
            animationDuration: `${animationSettings2.speed}s`,
            animationDelay: `${animationSettings2.delay}s`,
          }}
          ref={textRef2}
        >
          Animation 3
        </p>
      </div>

      <div className="controls md:w-1/2 w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3  bg-white shadow-lg rounded-lg  p-4 space-y-4">
        <div className="col-span-1">
          <div>
            <label className="block font-semibold">Set Speed (seconds):</label>
            <input
              type="number"
              min="0"
              value={animationSettings.speed}
              className="border border-gray-300 rounded p-2 w-full"
              onChange={handleInputChange('speed')}
            />
          </div>

          <div>
            <label className="block font-semibold">Set Delay (seconds):</label>
            <input
              type="number"
              min="0"
              value={animationSettings.delay}
              className="border border-gray-300 rounded p-2 w-full"
              onChange={handleInputChange('delay')}
            />
          </div>

          <div>
            <label className="block font-semibold">End Position (%):</label>
            <input
              type="number"
              min="0"
              max="100"
              value={animationSettings.endPosition}
              className="border border-gray-300 rounded p-2 w-full"
              onChange={handleInputChange('endPosition')}
            />
          </div>
          <button
            onClick={togglePause}
            className="bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition duration-200"
          >
            {animationSettings.paused ? 'Resume' : 'Pause'}
          </button>
          <button
            onClick={stopAtMiddle}
            className="bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition duration-200"
          >
            {animationSettings.stopMid ? 'Continue' : 'Stop Mid'}
          </button>
        </div>

        <div className="col-span-1">
          <div className=''>
            <label className="block font-semibold">Set Speed (seconds):</label>
            <input
              type="number"
              min="0"
              value={animationSettings1.speed}
              className="border border-gray-300 rounded p-2 w-full"
              onChange={handleInputChange2('speed')}
            />
          </div>
          {/* Delay */}
          <div>
            <label className="block font-semibold">Set Delay (seconds):</label>
            <input
              type="number"
              min="0"
              value={animationSettings1.delay}
              className="border border-gray-300 rounded p-2 w-full"
              onChange={handleInputChange2('delay')}
            />
          </div>
          <div>
            <label className="block font-semibold">End Position (%):</label>
            <input
              type="number"
              min="0"
              max="100"
              value={animationSettings1.endPosition}
              className="border border-gray-300 rounded p-2 w-full"
              onChange={handleInputChange2('endPosition')}
            />
          </div>
          <button
            onClick={togglePause2}
            className="bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition duration-200"
          >
            {animationSettings1.paused ? 'Resume' : 'Pause'}
          </button>
          <button
            onClick={stopAtMiddle2}
            className="bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition duration-200"
          >
            {animationSettings1.stopMid ? 'Continue' : 'Stop Mid'}
          </button>

        </div>
        <div className="col-span-1">
          <div className=''>
            <label className="block font-semibold">Set Speed (seconds):</label>
            <input
              type="number"
              min="0"
              value={animationSettings2.speed}
              className="border border-gray-300 rounded p-2 w-full"
              onChange={handleInputChange3('speed')}
            />
          </div>
          {/* delay */}
          <div>
            <label className="block font-semibold">Set Delay (seconds):</label>
            <input
              type="number"
              min="0"
              value={animationSettings2.delay}
              className="border border-gray-300 rounded p-2 w-full"
              onChange={handleInputChange3('delay')}
            />
          </div>
          <div>
            <label className="block font-semibold">End Position (%):</label>
            <input
              type="number"
              min="0"
              max="100"
              value={animationSettings2.endPosition}
              className="border border-gray-300 rounded p-2 w-full"
              onChange={handleInputChange3('endPosition')}
            />
          </div>
          <button
            onClick={togglePause3}
            className="bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition duration-200"
          >
            {animationSettings2.paused ? 'Resume' : 'Pause'}
          </button>
          <button
            onClick={stopAtMiddle3}
            className="bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition duration-200"
          >
            {animationSettings2.stopMid ? 'Continue' : 'Stop Mid'}
          </button>

        </div>
      </div>
    </div>
  );
}

export default App;
