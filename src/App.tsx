import { useId, useRef, useState, type FC } from 'react';
import { useErrorBoundary } from 'react-error-boundary';
import screenfull from 'screenfull';

export const App: FC = () => {
  const id = useId();
  const inputColorId = `${id}-input-color`;
  
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  const [selectedColor, setSelectedColor] = useState('#000000');

  const { showBoundary } = useErrorBoundary();

  return (
    <>
      <h1>React full screen video element test</h1>

      {!screenfull.isEnabled && (
        <strong>Warning: full screen detection failed</strong>
      )}

      <h2>Input color</h2>

      <input
        id={inputColorId}
        type="color"
        onInput={(e) => {
          setSelectedColor(e.currentTarget.value);
        }}
      />

      {' '}

      <output htmlFor={inputColorId}>{selectedColor}</output>

      <h2>Canvas</h2>

      <canvas
        ref={canvasRef}
        width={100}
        height={100}
        style={{
          width: '6rem',
          height: '6rem',
          border: '2px inset #888',
          background: `#eee url("data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 2 2'><path fill='%23fff' d='M0 0H1V2H2V1H0Z'/></svg>") 0 0/2rem`,
        }}
      />

      <div>
        <button type="button" onClick={async () => {
          try {
            const canvas = canvasRef.current;
            if (!canvas) throw new Error('Expected canvas ref to not be empty');
            
            const ctx = canvas.getContext('2d');
            if (!ctx) throw new Error('Failed to get canvas rendering context');
                
            ctx.fillStyle = selectedColor;
            ctx.fillRect(0, 0, canvas.width, canvas.height);
          } catch (err) {
            showBoundary(err);
          }
        }}>
          Fill with input color
        </button>

        <br />
        <br />

        <button type="button" onClick={async () => {
          try {
            const canvas = canvasRef.current;
            if (!canvas) throw new Error('Expected canvas ref to not be empty');

            await screenfull.request(canvasRef.current!);
          } catch (err) {
            showBoundary(err);
          }
        }}>
          Request fullscreen (screenfull)
        </button>
      </div>

      <h2>Video</h2>

      <video
        ref={videoRef}
        width={100}
        height={100}
        autoPlay
        style={{
          width: '6rem',
          height: '6rem',
          border: '2px inset #888',
          background: `#eee url("data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 2 2'><path fill='%23fff' d='M0 0H1V2H2V1H0Z'/></svg>") 0 0/2rem`,
        }}
      />

      <div>
        <button type="button" onClick={() => {
          try {
            const canvas = canvasRef.current;
            if (!canvas) throw new Error('Expected canvas ref to not be empty');
            
            const video = videoRef.current;
            if (!video) throw new Error('Expected video ref to not be empty');
            
            const stream = canvas.captureStream(0);
            const [track] = stream.getVideoTracks() as CanvasCaptureMediaStreamTrack[];
            track.requestFrame();
        
            video.srcObject = new MediaStream([track]);
          } catch (err) {
            showBoundary(err);
          }
        }}>
          Set video stream
        </button>

        <br />

        <button type="button" onClick={() => {
          try {
            const canvas = canvasRef.current;
            if (!canvas) throw new Error('Expected canvas ref to not be empty');

            const video = videoRef.current;
            if (!video) throw new Error('Expected video ref to not be empty');

            const ctx = canvas.getContext('2d');
            if (!ctx) throw new Error('Failed to get canvas rendering context');

            ctx.fillStyle = selectedColor;
            ctx.fillRect(0, 0, canvas.width, canvas.height);
        
            const stream = canvas.captureStream(0);
            const [track] = stream.getVideoTracks() as CanvasCaptureMediaStreamTrack[];
            track.requestFrame();
        
            video.srcObject = new MediaStream([track]);
          } catch (err) {
            showBoundary(err);
          }
        }}>
          Paint and capture
        </button>

        <br />

        <button type="button" onClick={() => {
          try {
            const video = videoRef.current;
            if (!video) throw new Error('Expected video ref to not be empty');
            
            video.play();
          } catch (err) {
            showBoundary(err);
          }
        }}>
          Play video
        </button>

        <br />
        <br />

        <button type="button" onClick={async () => {
          try {
            const video = videoRef.current;
            if (!video) throw new Error('Expected video ref to not be empty');

            await screenfull.request(videoRef.current!);
          } catch (err) {
            showBoundary(err);
          }
        }}>
          Request fullscreen (screenfull)
        </button>

        <br />

        <button type="button" onClick={() => {
          try {
            const video = videoRef.current as HTMLVideoElement & {
              webkitEnterFullscreen?: () => void;
            };
            if (!video) throw new Error('Expected video ref to not be empty');

            if (typeof video.webkitEnterFullscreen !== 'function') {
              throw new Error('Webkit enter fullscreen API not available');
            }

            video.webkitEnterFullscreen();
          } catch (err) {
            showBoundary(err);
          }
        }}>
          Request fullscreen (webkit sync)
        </button>

        <br />

        <button type="button" onClick={async () => {
          try {
            const video = videoRef.current as HTMLVideoElement & {
              webkitEnterFullscreen?: () => void;
            };
            if (!video) throw new Error('Expected video ref to not be empty');

            if (typeof video.webkitEnterFullscreen !== 'function') {
              throw new Error('Webkit enter fullscreen API not available');
            }

            video.webkitEnterFullscreen();
          } catch (err) {
            showBoundary(err);
          }
        }}>
          Request fullscreen (webkit async)
        </button>

        <br />

        <button type="button" onClick={async () => {
          try {
            const video = videoRef.current as HTMLVideoElement & {
              webkitEnterFullscreen?: () => void;
            };
            if (!video) throw new Error('Expected video ref to not be empty');

            if (typeof video.webkitEnterFullscreen !== 'function') {
              throw new Error('Webkit enter fullscreen API not available');
            }

            await video.webkitEnterFullscreen();
          } catch (err) {
            showBoundary(err);
          }
        }}>
          Request fullscreen (webkit async/await)
        </button>
      </div>
    </>
  );
};
