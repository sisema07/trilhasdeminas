
import React, { useState, useRef, useCallback } from 'react';
import type { Badge } from '../types';
import { CameraIcon, DownloadIcon, ShareIcon } from './Icons';


interface PhotoStamperProps {
  badge: Badge;
}

const PhotoStamper: React.FC<PhotoStamperProps> = ({ badge }) => {
  const [userImage, setUserImage] = useState<string | null>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const drawCanvas = useCallback((image: HTMLImageElement) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const canvasWidth = 800;
    const aspectRatio = image.height / image.width;
    const canvasHeight = canvasWidth * aspectRatio;

    canvas.width = canvasWidth;
    canvas.height = canvasHeight;

    // Draw user image
    ctx.drawImage(image, 0, 0, canvas.width, canvas.height);
    
    // Draw semi-transparent overlay at the bottom
    const gradient = ctx.createLinearGradient(0, canvas.height - 150, 0, canvas.height);
    gradient.addColorStop(0, 'rgba(0,0,0,0)');
    gradient.addColorStop(1, 'rgba(0,0,0,0.7)');
    ctx.fillStyle = gradient;
    ctx.fillRect(0, canvas.height - 150, canvas.width, 150);

    // Draw Badge
    const badgeImg = new Image();
    badgeImg.crossOrigin = 'Anonymous';
    badgeImg.src = badge.icon;
    badgeImg.onload = () => {
        ctx.drawImage(badgeImg, 30, canvas.height - 120, 100, 100);
        
        // Draw Text
        ctx.fillStyle = 'white';
        ctx.font = 'bold 32px sans-serif';
        ctx.fillText(badge.name, 150, canvas.height - 85);

        ctx.font = '24px sans-serif';
        ctx.fillText(`Conquistado em: ${new Date().toLocaleDateString('pt-BR')}`, 150, canvas.height - 45);
    }
  }, [badge]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const imgSrc = event.target?.result as string;
        setUserImage(imgSrc);
        const img = new Image();
        img.src = imgSrc;
        img.onload = () => drawCanvas(img);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDownload = () => {
    const canvas = canvasRef.current;
    if (canvas) {
      const link = document.createElement('a');
      link.download = `trilhas-de-minas-${badge.id}.png`;
      link.href = canvas.toDataURL();
      link.click();
    }
  };

  const handleShare = async () => {
      const canvas = canvasRef.current;
      if (canvas && navigator.share) {
          canvas.toBlob(async (blob) => {
              if (!blob) return;
              const file = new File([blob], `trilhas-de-minas-${badge.id}.png`, { type: 'image/png' });
              try {
                  await navigator.share({
                      title: `Conquistei o badge ${badge.name}!`,
                      text: `Eu explorei os parques de Minas Gerais e ganhei o badge "${badge.name}" com o app Trilhas de Minas! #TrilhasDeMinas`,
                      files: [file],
                  });
              } catch (error) {
                  console.error('Error sharing:', error);
              }
          }, 'image/png');
      } else {
          alert('A API de compartilhamento não é suportada neste navegador. Tente baixar a imagem.');
      }
  };

  return (
    <div className="w-full mt-4 p-4 border-t border-gray-200">
      <h3 className="text-lg font-semibold text-gray-700 mb-2">Carimbe sua Foto</h3>
      {!userImage ? (
        <div 
            onClick={() => fileInputRef.current?.click()}
            className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center cursor-pointer hover:bg-gray-50"
        >
          <CameraIcon className="mx-auto h-12 w-12 text-gray-400" />
          <p className="mt-2 text-sm text-gray-600">Selecione uma foto sua na trilha para carimbar</p>
          <input type="file" accept="image/*" ref={fileInputRef} onChange={handleFileChange} className="hidden" />
        </div>
      ) : (
        <div>
          <canvas ref={canvasRef} className="w-full h-auto rounded-lg shadow-md" />
          <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-3">
              <button onClick={handleDownload} className="flex items-center justify-center w-full bg-blue-500 text-white font-bold py-3 px-4 rounded-lg hover:bg-blue-600 transition-colors">
                  <DownloadIcon className="h-5 w-5 mr-2"/>
                  Baixar Foto
              </button>
              {navigator.share && (
                <button onClick={handleShare} className="flex items-center justify-center w-full bg-green-500 text-white font-bold py-3 px-4 rounded-lg hover:bg-green-600 transition-colors">
                    <ShareIcon className="h-5 w-5 mr-2" />
                    Compartilhar
                </button>
              )}
          </div>
        </div>
      )}
    </div>
  );
};

export default PhotoStamper;
