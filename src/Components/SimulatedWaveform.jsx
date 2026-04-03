import React, { useEffect, useRef } from 'react';

const SimulatedWaveform = ({ isPlaying }) => {
  const canvasRef = useRef(null);
  const animationRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    let width = canvas.width;
    let height = canvas.height;
    
    // Set internal resolution for crisp lines
    const updateSize = () => {
      const parent = canvas.parentElement;
      if (parent) {
        width = parent.clientWidth;
        height = parent.clientHeight;
        canvas.width = width * 2; // Retina display support
        canvas.height = height * 2;
        ctx.scale(2, 2);
      }
    };
    updateSize();
    window.addEventListener('resize', updateSize);

    // Number of bars
    const BAR_COUNT = 80;
    const bars = Array.from({ length: BAR_COUNT }, () => ({
      targetHeight: 5,
      currentHeight: 5,
      speed: Math.random() * 0.1 + 0.05
    }));

    let time = 0;

    const render = () => {
      ctx.clearRect(0, 0, width, height);
      
      const barWidth = (width / BAR_COUNT) * 0.6;
      const gap = (width / BAR_COUNT) * 0.4;
      
      time += 0.02;

      bars.forEach((bar, i) => {
        // Only jump if playing
        if (isPlaying) {
          if (Math.abs(bar.currentHeight - bar.targetHeight) < 2) {
            // New target based on sin wave + random noise to look like music
            const noise = Math.random() * 30;
            const wave = Math.sin(time * 5 + i * 0.2) * 20;
            bar.targetHeight = Math.max(5, height * 0.2 + noise + wave);
          }
        } else {
          bar.targetHeight = 2; // Flatline when paused
        }

        // Smoothly interpolate to target height
        bar.currentHeight += (bar.targetHeight - bar.currentHeight) * bar.speed;

        // Draw bar
        const x = i * (barWidth + gap);
        const y = height - bar.currentHeight;

        // Gradient based on height
        const gradient = ctx.createLinearGradient(0, height, 0, height - 60);
        gradient.addColorStop(0, 'rgba(139, 92, 246, 0.2)'); // Violet base
        gradient.addColorStop(1, 'rgba(56, 189, 248, 0.8)'); // Cyan tip

        ctx.fillStyle = gradient;
        ctx.shadowBlur = 15;
        ctx.shadowColor = 'rgba(139, 92, 246, 0.4)';
        
        ctx.beginPath();
        ctx.roundRect(x, y, barWidth, bar.currentHeight, 4);
        ctx.fill();
      });

      animationRef.current = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', updateSize);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [isPlaying]);

  return (
    <div className='w-full h-24 absolute bottom-0 left-0 right-0 pointer-events-none opacity-60 z-0 overflow-hidden mix-blend-screen'>
      <canvas ref={canvasRef} className='w-full h-full' style={{ filter: 'blur(1px)' }} />
    </div>
  );
};

export default SimulatedWaveform;
