
import React, { useRef, useEffect, useCallback } from 'react';

declare const jsQR: any;

interface QrScannerProps {
  onScan: (data: string) => void;
  onCancel: () => void;
}

const QrScanner: React.FC<QrScannerProps> = ({ onScan, onCancel }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const streamRef = useRef<MediaStream | null>(null);

  const tick = useCallback(() => {
    if (videoRef.current && videoRef.current.readyState === videoRef.current.HAVE_ENOUGH_DATA) {
      const video = videoRef.current;
      const canvas = canvasRef.current;
      if (canvas) {
        const ctx = canvas.getContext('2d');
        canvas.height = video.videoHeight;
        canvas.width = video.videoWidth;
        ctx?.drawImage(video, 0, 0, canvas.width, canvas.height);
        const imageData = ctx?.getImageData(0, 0, canvas.width, canvas.height);
        if (imageData) {
          const code = jsQR(imageData.data, imageData.width, imageData.height, {
            inversionAttempts: "dontInvert",
          });
          if (code) {
            onScan(code.data);
            return; 
          }
        }
      }
    }
    requestAnimationFrame(tick);
  }, [onScan]);

  useEffect(() => {
    navigator.mediaDevices.getUserMedia({ video: { facingMode: "environment" } })
      .then(stream => {
        streamRef.current = stream;
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
          videoRef.current.setAttribute("playsinline", "true"); 
          videoRef.current.play();
          requestAnimationFrame(tick);
        }
      })
      .catch(err => {
        console.error("Error accessing camera:", err);
        alert("Não foi possível acessar a câmera. Por favor, verifique as permissões.");
        onCancel();
      });

    return () => {
      if (streamRef.current) {
        streamRef.current.getTracks().forEach(track => track.stop());
      }
    };
  }, [tick, onCancel]);

  return (
    <div className="fixed inset-0 bg-black z-50 flex flex-col items-center justify-center">
      <video ref={videoRef} className="absolute top-0 left-0 w-full h-full object-cover" />
      <canvas ref={canvasRef} style={{ display: 'none' }} />
      <div className="absolute inset-0 bg-black bg-opacity-50" />
      <div className="relative z-10 text-white text-center p-4">
        <h2 className="text-2xl font-bold mb-2">Aponte para o QR Code</h2>
        <p>Alinhe o código dentro da área marcada.</p>
        <div className="w-64 h-64 border-4 border-dashed border-emerald-400 rounded-lg mt-8 bg-black bg-opacity-25" />
      </div>
      <button 
        onClick={onCancel} 
        className="absolute bottom-10 z-20 bg-white text-gray-800 font-bold py-3 px-6 rounded-full shadow-lg"
      >
        Cancelar
      </button>
    </div>
  );
};

export default QrScanner;
