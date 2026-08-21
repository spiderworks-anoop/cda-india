import { useRef, useEffect } from 'react';


const Noise = ({
  patternSize = 250,
  patternScaleX = 1,
  patternScaleY = 1,
  patternRefreshInterval = 2,
  patternAlpha = 15,
}) => {
  const grainRef = useRef(null);

  useEffect(() => {
    const canvas = grainRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d', { alpha: true });
    let frame = 0;
    let rafId = null;
    let visible = false;
    let teardownObservers = null;

    const reduceMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches;

    const patternCanvas = document.createElement('canvas');
    patternCanvas.width = patternSize;
    patternCanvas.height = patternSize;
    const patternCtx = patternCanvas.getContext('2d');
    const patternData = patternCtx.createImageData(patternSize, patternSize);
    const patternPixelDataLength = patternSize * patternSize * 4;

    const resize = () => {
      // The grain is random noise, so there is nothing to gain from rendering
      // it at devicePixelRatio - on a 3x phone that was ~3 million pixels
      // repainted every frame. Size to the element, not the viewport.
      const rect = canvas.getBoundingClientRect();
      canvas.width = Math.max(1, Math.ceil(rect.width));
      canvas.height = Math.max(1, Math.ceil(rect.height));

      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.scale(patternScaleX, patternScaleY);
    };

    const updatePattern = () => {
      for (let i = 0; i < patternPixelDataLength; i += 4) {
        const value = Math.random() * 255;
        patternData.data[i] = value;
        patternData.data[i + 1] = value;
        patternData.data[i + 2] = value;
        patternData.data[i + 3] = patternAlpha;
      }
      patternCtx.putImageData(patternData, 0, 0);
    };

    const drawGrain = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = ctx.createPattern(patternCanvas, 'repeat');
      ctx.fillRect(0, 0, canvas.width, canvas.height);
    };

    const loop = () => {
      if (frame % patternRefreshInterval === 0) {
        updatePattern();
        drawGrain();
      }
      frame++;
      rafId = window.requestAnimationFrame(loop);
    };

    const start = () => {
      if (rafId === null) rafId = window.requestAnimationFrame(loop);
    };

    const stop = () => {
      if (rafId !== null) {
        window.cancelAnimationFrame(rafId);
        rafId = null;
      }
    };

    resize();

    if (reduceMotion) {
      // Draw a single static grain frame and leave it there.
      updatePattern();
      drawGrain();
    } else {
      // Only burn frames while the section is actually on screen.
      const observer = new IntersectionObserver(
        ([entry]) => {
          visible = entry.isIntersecting;
          if (visible) start();
          else stop();
        },
        { rootMargin: '100px' }
      );
      observer.observe(canvas);

      const onVisibilityChange = () => {
        if (document.hidden) stop();
        else if (visible) start();
      };
      document.addEventListener('visibilitychange', onVisibilityChange);

      teardownObservers = () => {
        observer.disconnect();
        document.removeEventListener('visibilitychange', onVisibilityChange);
      };
    }

    window.addEventListener('resize', resize);

    return () => {
      stop();
      window.removeEventListener('resize', resize);
      if (typeof teardownObservers === 'function') teardownObservers();
    };
  }, [patternSize, patternScaleX, patternScaleY, patternRefreshInterval, patternAlpha]);

  return <canvas className="noise-overlay" ref={grainRef} />;
};

export default Noise;
