import { useState, useRef, useEffect } from 'react';
import './App.css';

function App() {
  const canvasRef = useRef(null);
  const [isAnimating, setIsAnimating] = useState(false);
  const [isAnimating1, setIsAnimating1] = useState(false);
  const [isAnimating2, setIsAnimating2] = useState(false);
  
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

  const startAnimation = () => {
    setIsAnimating(true);
    setIsAnimating1(false);
    setIsAnimating2(false);
  };

  const getTextWidth = (context, text, font = '16px Arial') => {
    context.font = font;
    return context.measureText(text).width;
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');

    let startX = animationSettings.startPosition;
    let startX1 = animationSettings1.startPosition;
    let startX2 = animationSettings2.startPosition;

    let animationFrameId;

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height); // Clear the canvas

      // Draw first animation text
      ctx.fillStyle = 'red';
      ctx.font = '20px Arial';
      ctx.fillText(animationSettings.text, startX, 50);
      if (startX < canvas.width - getTextWidth(ctx, animationSettings.text)) {
        startX += animationSettings.speed; // Move text to the right
      } else {
        setIsAnimating1(true);
      }

      // Draw second animation text
      if (isAnimating1) {
        ctx.fillStyle = 'yellow';
        ctx.fillText(animationSettings1.text, startX1, 100);
        if (startX1 < canvas.width - getTextWidth(ctx, animationSettings1.text)) {
          startX1 += animationSettings1.speed;
        } else {
          setIsAnimating2(true);
        }
      }

      // Draw third animation text
      if (isAnimating2) {
        ctx.fillStyle = 'green';
        ctx.fillText(animationSettings2.text, startX2, 150);
        if (startX2 < canvas.width - getTextWidth(ctx, animationSettings2.text)) {
          startX2 += animationSettings2.speed;
        }
      }

      animationFrameId = requestAnimationFrame(draw);
    };

    if (isAnimating) {
      animationFrameId = requestAnimationFrame(draw);
    }

    // Cleanup
    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [isAnimating, isAnimating1, isAnimating2, animationSettings, animationSettings1, animationSettings2]);

  return (
    <div className="bg-gray-100 md:h-screen flex flex-wrap md:flex-col items-center justify-center">
      <canvas ref={canvasRef} width={600} height={300} className="border border-black"></canvas>

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
            {isAnimating ? "Running" : "Start Animation"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;
