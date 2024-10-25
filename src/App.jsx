import { useState, useRef, useEffect } from 'react';
import './App.css';

function App() {
  const canvasRef = useRef(null);
  const isAnimatingRef = useRef(false);
  const isAnimating1Ref = useRef(false);
  const isAnimating2Ref = useRef(false);

  const [isAnimating, setIsAnimating] = useState(false);

  const [animationSettings, setAnimationSettings] = useState({
    speed: 4,
    delay: 0,
    startPosition: 0,
    endPosition: 100,
    text: "Animation 1",
  });

  const [animationSettings1, setAnimationSettings1] = useState({
    speed: 6,
    delay: 0,
    startPosition: 0,
    endPosition: 100,
    text: "Animation 2",
  });

  const [animationSettings2, setAnimationSettings2] = useState({
    speed: 2,
    delay: 0,
    startPosition: 0,
    endPosition: 100,
    text: "Animation 3",
  });

  const handleInputChange = (field) => (event) => {
    const value = Number(event.target.value);
    isAnimatingRef.current = false;
    isAnimating1Ref.current = false;
    isAnimating2Ref.current = false;
    setAnimationSettings((prev) => ({
      ...prev,
      [field]: value >= 0 ? value : prev[field],
    }));
  };

  const handleInputChange2 = (field) => (event) => {
    const value = Number(event.target.value);
    isAnimatingRef.current = false;
    isAnimating1Ref.current = false;
    isAnimating2Ref.current = false;
    setAnimationSettings1((prev) => ({
      ...prev,
      [field]: value >= 0 ? value : prev[field],
    }));
  };

  const handleInputChange3 = (field) => (event) => {
    const value = Number(event.target.value);
    isAnimatingRef.current = false;
    isAnimating1Ref.current = false;
    isAnimating2Ref.current = false;
    setAnimationSettings2((prev) => ({
      ...prev,
      [field]: value >= 0 ? value : prev[field],
    }));
  };

  const startAnimation = () => {
    setIsAnimating(!isAnimating);
    isAnimatingRef.current = true;
    isAnimating1Ref.current = false;
    isAnimating2Ref.current = false;
  };

  const getTextWidth = (context, text, font = '22px Arial') => {
    context.font = font;
    return context.measureText(text).width;
  };

  const bgImage = new Image();
  bgImage.src = '../src/assets/bg.jpg'; // Replace with your image path or URL


  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let startX = animationSettings.startPosition;
    let startX1 = animationSettings1.startPosition;
    let startX2 = animationSettings2.startPosition;
    let animationFrameId;

    // Track delay start times
    let startTime = performance.now();
    let animationStart1 = startTime + animationSettings.delay * 1000;
    let animationStart2 = animationStart1 + animationSettings1.delay * 1000;
    let animationStart3 = animationStart2 + animationSettings2.delay * 1000;

    const draw = (timestamp) => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      if (bgImage.complete) {
        ctx.drawImage(bgImage, 0, 0, canvas.width, canvas.height);
      }

      // Calculate end positions in pixels
      const endX = (canvas.width * animationSettings.endPosition) / 100;
      const endX1 = (canvas.width * animationSettings1.endPosition) / 100;
      const endX2 = (canvas.width * animationSettings2.endPosition) / 100;

      // Draw the first animation text after delay
      if (timestamp >= animationStart1 && isAnimatingRef.current) {
        ctx.fillStyle = 'red';
        ctx.font = '20px Arial';
        ctx.fillText(animationSettings.text, startX, 50);

        if (startX < endX - getTextWidth(ctx, animationSettings.text)) {
          startX += animationSettings.speed;
        } else {
          // isAnimatingRef.current = false;
          isAnimating1Ref.current = true; // Move to next animation
        }
      }

      // Draw the second animation text after delay
      if (timestamp >= animationStart2 && isAnimating1Ref.current) {
        ctx.fillStyle = 'yellow';
        ctx.font = '20px Arial';
        ctx.fillText(animationSettings1.text, startX1, 100);

        if (startX1 < endX1 - getTextWidth(ctx, animationSettings1.text)) {
          startX1 += animationSettings1.speed;
        } else {
          // isAnimating1Ref.current = false;
          isAnimating2Ref.current = true; // Move to next animation
        }
      }

      // Draw the third animation text after delay
      if (timestamp >= animationStart3 && isAnimating2Ref.current) {
        ctx.fillStyle = 'green';
        ctx.font = '20px Arial';
        ctx.fillText(animationSettings2.text, startX2, 150);

        if (startX2 < endX2 - getTextWidth(ctx, animationSettings2.text)) {
          startX2 += animationSettings2.speed;
        }
      }

      animationFrameId = requestAnimationFrame(draw);
    };

  //  if(isAnimating)
      animationFrameId = requestAnimationFrame(draw);
    

    // Cleanup
    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [isAnimating, animationSettings, animationSettings1, animationSettings2]);

  return (
    <div className="bg-gray-100 md:h-screen flex flex-wrap md:flex-col items-center justify-center">
      <canvas ref={canvasRef} width={600} height={300} className="border border-black"></canvas>

      <div className="controls md:w-1/2 w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 bg-white shadow-lg rounded-lg p-4 space-y-4">
        <div>
          <label className="block font-semibold">Set Speed:</label>
          <input
            type="number"
            min="0"
            value={animationSettings.speed}
            className="border border-gray-300 rounded p-2 w-full"
            onChange={handleInputChange('speed')}
          />
          <label className="block font-semibold">End Position (%):</label>
          <input
            type="number"
            min="0"
            max="100"
            value={animationSettings.endPosition}
            className="border border-gray-300 rounded p-2 w-full"
            onChange={handleInputChange('endPosition')}
          />
          <label className="block font-semibold">Delay (seconds):</label>
          <input
            type="number"
            min="0"
            value={animationSettings.delay}
            className="border border-gray-300 rounded p-2 w-full"
            onChange={handleInputChange('delay')}
          />
        </div>

        {/* Controls for animationSettings1 */}
        <div>
          <label className="block font-semibold">Set Speed:</label>
          <input
            type="number"
            min="0"
            value={animationSettings1.speed}
            className="border border-gray-300 rounded p-2 w-full"
            onChange={handleInputChange2('speed')}
          />
          <label className="block font-semibold">End Position (%):</label>
          <input
            type="number"
            min="0"
            max="100"
            value={animationSettings1.endPosition}
            className="border border-gray-300 rounded p-2 w-full"
            onChange={handleInputChange2('endPosition')}
          />
          <label className="block font-semibold">Delay (seconds):</label>
          <input
            type="number"
            min="0"
            value={animationSettings1.delay}
            className="border border-gray-300 rounded p-2 w-full"
            onChange={handleInputChange2('delay')}
          />
        </div>

        {/* Controls for animationSettings2 */}
        <div>
          <label className="block font-semibold">Set Speed:</label>
          <input
            type="number"
            min="0"
            value={animationSettings2.speed}
            className="border border-gray-300 rounded p-2 w-full"
            onChange={handleInputChange3('speed')}
          />
          <label className="block font-semibold">End Position (%):</label>
          <input
            type="number"
            min="0"
            max="100"
            value={animationSettings2.endPosition}
            className="border border-gray-300 rounded p-2 w-full"
            onChange={handleInputChange3('endPosition')}
          />
          <label className="block font-semibold">Delay (seconds):</label>
          <input
            type="number"
            min="0"
            value={animationSettings2.delay}
            className="border border-gray-300 rounded p-2 w-full"
            onChange={handleInputChange3('delay')}
          />
        </div>

        <div className="col-span-3">
          <button
            onClick={startAnimation}
            className="bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition duration-200 w-full"
          >
            {"Start Animation"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;
