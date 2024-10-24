import { useState, useRef, useEffect } from 'react';
import './App.css';
import { log } from 'three/webgpu';

function App() {
  const [isAnimating, setIsAnimating] = useState(false);
  const [isAnimating1, setIsAnimating1] = useState(false);
  const [isAnimating2, setIsAnimating2] = useState(false);
  const containerRef = useRef(null);
  const textRef = useRef(null);
  const textRef1 = useRef(null);
  const textRef2 = useRef(null);
  const [animationSettings, setAnimationSettings] = useState({
    speed: 4,
    delay: 0,
    startPosition: 0,
    endPosition: 100,
    text: "Animation 1"
  });
  const [animationSettings1, setAnimationSettings1] = useState({
    speed: 6,
    delay: 0,
    startPosition: 0,
    endPosition: 100,
    text: "Animation 2"
  });
  const [animationSettings2, setAnimationSettings2] = useState({
    speed: 2,
    delay: 0,
    startPosition: 0,
    endPosition: 100,
    text: "Animation 3"
  });



  const startAnimation = () => {
    setIsAnimating(!isAnimating);
    setIsAnimating1(false);
    setIsAnimating2(false);

  };


  const handleInputChange = (field) => (event) => {
    const value = Number(event.target.value);
    setAnimationSettings((prev) => ({
      ...prev,
      [field]: value >= 0 ? value : prev[field],
    }));
  };

  const handleInputChange2 = (field) => (event) => {
    const value = Number(event.target.value);
    setAnimationSettings1((prev) => ({
      ...prev,
      [field]: value >= 0 ? value : prev[field],
    }));
  };

  const handleInputChange3 = (field) => (event) => {
    const value = Number(event.target.value);
    setAnimationSettings2((prev) => ({
      ...prev,
      [field]: value >= 0 ? value : prev[field],
    }));
  };


  const getTextWidth = (text, font = '4px Arial') => {
    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d');
    context.font = font;
    // console.log(context.measureText(text).width,"text-width");

    return context.measureText(text).width;
  };
  useEffect(() => {
    let intervalId;

    if (isAnimating) {
      intervalId = setInterval(() => {
        if (textRef.current && isAnimating) {
          const rect = textRef.current.getBoundingClientRect(); // Get the position of the text element
          const parentRect = textRef.current.parentElement.getBoundingClientRect(); // Get the parent container position

          // Calculate the percentage position of the text relative to its parent
          const currentPosition = Math.floor(((rect.left - parentRect.left) / parentRect.width) * 100);
          const endPostion = Math.floor(animationSettings.endPosition - getTextWidth(animationSettings.text))
          if (currentPosition == endPostion) {
            setIsAnimating1(true)
          }

          // console.log(`Current Position Percentage: ${currentPosition}% --`,animationSettings.endPosition-getTextWidth(animationSettings.text));
        }
        if (textRef1.current && isAnimating) {
          const rect = textRef1.current.getBoundingClientRect(); // Get the position of the text element
          const parentRect = textRef1.current.parentElement.getBoundingClientRect(); // Get the parent container position

          // Calculate the percentage position of the text relative to its parent
          const currentPosition = Math.floor(((rect.left - parentRect.left) / parentRect.width) * 100);
          const endPostion = Math.floor(animationSettings1.endPosition - getTextWidth(animationSettings1.text))
          if (currentPosition == endPostion) {
            setIsAnimating2(true)
          }


        }
      }, 100);
    }

    // Cleanup function to clear the interval when the component unmounts or when isAnimating changes
    return () => {
      clearInterval(intervalId);
    };
  }, [isAnimating]);

  return (
    <div className="bg-gray-100 md:h-screen flex flex-wrap md:flex-col items-center justify-center">
      <div
        ref={containerRef}
        className="md:w-1/2 my-5 h-52 w-full py-4 rounded-xl shadow-lg relative overflow-hidden app-container"
      >
        <p
          className={`text-animation ${isAnimating ? 'animate' : ''} whitespace-nowrap text-rose-600`}
          style={{
            '--end-position': `${animationSettings.endPosition - getTextWidth(animationSettings.text)}%`,
            animationDuration: `${animationSettings.speed}s`,
            animationDelay: `${animationSettings.delay}s`,
          }}
          ref={textRef}
        >
          {animationSettings.text}
        </p>
        <p
          className={`text-animation1 text-yellow-500 ${isAnimating1 ? 'animate' : ''} whitespace-nowrap`}
          style={{
            '--end-position': `${animationSettings1.endPosition - getTextWidth(animationSettings1.text)}%`,
            animationDuration: `${animationSettings1.speed}s`,
            animationDelay: `${animationSettings1.delay}s`,
          }}
          ref={textRef1}
        >
          {animationSettings1.text}
        </p>
        <p
          className={`text-animation2 text-green-700 ${isAnimating2 ? 'animate' : ''} whitespace-nowrap`}
          style={{
            '--end-position': `${animationSettings2.endPosition - getTextWidth(animationSettings2.text)}%`,
            animationDuration: `${animationSettings2.speed}s`,
            animationDelay: `${animationSettings2.delay}s`,
          }}
          ref={textRef2}
        >
          {animationSettings2.text}
        </p>
      </div>

      <div className="controls md:w-1/2 w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 bg-white shadow-lg rounded-lg p-4 space-y-4">
        <div className="lg:col-span-1 md:col-span-2 col-span-3">
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
        </div>

        <div className="lg:col-span-1 md:col-span-2 col-span-3">
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
        </div>

        <div className="lg:col-span-1 md:col-span-2 col-span-3">
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
        </div>
        <div className="col-span-3">
          <button
            onClick={startAnimation}
            className="bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition duration-200 w-full"
          >
            {
              isAnimating ? "Running" : "Start Animation"
            }

          </button>

        </div>
      </div>
    </div>
  );
}

export default App;
