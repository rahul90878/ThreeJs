import { useRef, useEffect, useState } from 'react';

function App() {
  const canvasRef = useRef(null); // Ref to attach our canvas to the DOM
  const [speedText1, setSpeedText1] = useState(2); // Speed for the first text
  const [speedText2, setSpeedText2] = useState(3); // Speed for the second text
  const [animationPaused, setAnimationPaused] = useState(false); // To control pause/resume
  const [stopAtMiddle, setStopAtMiddle] = useState(false); // To control stopping at the middle

  const middleX = 0; // Define the middle as X = 0 in the 2D canvas context

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let text1PosX = -150; // Initial x position for text1 (off-screen)
    let text2PosX = -150; // Initial x position for text2 (off-screen)
    let text1Paused = false;
    let text2Paused = false;

    // Function to draw the texts and handle movement
    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height); // Clear canvas

      // Draw and update position of text1
      if (!text1Paused) {
        ctx.font = '40px Arial';
        ctx.fillStyle = 'green';
        ctx.fillText('Hello World 1', text1PosX, 100); // Draw text1 at y = 100
        text1PosX += speedText1; // Update x position of text1
      }

      // Draw and update position of text2
      if (!text2Paused) {
        ctx.font = '40px Arial';
        ctx.fillStyle = 'blue';
        ctx.fillText('Hello World 2', text2PosX, 200); // Draw text2 at y = 200
        text2PosX += speedText2; // Update x position of text2
      }

      // Check if text1 should stop at the middle
      if (stopAtMiddle && Math.abs(canvas.width / 2 - text1PosX) <= 2) {
        text1Paused = true;
      }

      // Check if text2 should stop at the middle
      if (stopAtMiddle && Math.abs(canvas.width / 2 - text2PosX) <= 2) {
        text2Paused = true;
      }

      if (!animationPaused) {
        requestAnimationFrame(draw); // Continue the animation loop if not paused
      }
    };

    draw(); // Start the drawing loop

    return () => {
      // Cleanup function to stop animation when component unmounts
      text1Paused = true;
      text2Paused = true;
    };
  }, [speedText1, speedText2, stopAtMiddle, animationPaused]);

  // Handle speed change for text 1
  const handleSpeedChange1 = (e) => {
    setSpeedText1(Number(e.target.value));
  };

  // Handle speed change for text 2
  const handleSpeedChange2 = (e) => {
    setSpeedText2(Number(e.target.value));
  };

  // Toggle animation pause
  const togglePause = () => {
    setAnimationPaused((prev) => !prev);
  };

  // Toggle stop at middle
  const handleStopAtMiddle = () => {
    setStopAtMiddle(true);
  };

  return (
    <div>
      <canvas
        ref={canvasRef}
        width={window.innerWidth}
        height={300}
        className="border mx-auto"
      ></canvas>

      {/* Controls */}
      <div className="controls w-1/2 mx-auto bg-white shadow-lg rounded-lg flex flex-col p-4 space-y-4">
        {/* Speed Control for Text 1 */}
        <div className="mb-4">
          <label className="block font-semibold">Set Speed for Text 1 (X movement step):</label>
          <input
            type="number"
            value={speedText1}
            onChange={handleSpeedChange1}
            step={1}
            className="border border-gray-300 rounded p-2 w-full"
          />
        </div>

        {/* Speed Control for Text 2 */}
        <div className="mb-4">
          <label className="block font-semibold">Set Speed for Text 2 (X movement step):</label>
          <input
            type="number"
            value={speedText2}
            onChange={handleSpeedChange2}
            step={1}
            className="border border-gray-300 rounded p-2 w-full"
          />
        </div>

        <button  
          onClick={togglePause}
          className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition duration-200"
        >
          {animationPaused ? 'Resume' : 'Pause'} Animation
        </button>

        <button  
          onClick={handleStopAtMiddle}
          className="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600 transition duration-200"
        >
          Stop at Middle
        </button>
      </div>
    </div>
  );
}

export default App;
