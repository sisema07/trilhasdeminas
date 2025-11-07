import React, { useState, useEffect } from 'react';

const Info: React.FC = () => {
  const [installPrompt, setInstallPrompt] = useState<any>(null);

  useEffect(() => {
    const handler = (e: Event) => {
      e.preventDefault();
      setInstallPrompt(e);
    };
    window.addEventListener('beforeinstallprompt', handler);
    return () => window.removeEventListener('beforeinstallprompt', handler);
  }, []);

  const handleInstallClick = () => {
    if (installPrompt) {
      installPrompt.prompt();
      installPrompt.userChoice.then((choiceResult: { outcome: string }) => {
        if (choiceResult.outcome === 'accepted') {
          console.log('User accepted the install prompt');
        } else {
          console.log('User dismissed the install prompt');
        }
        setInstallPrompt(null);
      });
    }
  };

  return (
    <div className="container mx-auto">
      <div className="space-y-6">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-bold text-emerald-700 mb-3">Sobre o App</h2>
          <p className="text-gray-700">
            O "Trilhas de Minas – Explore & Conquiste" é seu guia digital para os parques estaduais de Minas Gerais.
            Explore trilhas, faça check-in com QR codes nos locais e colecione badges exclusivos para comemorar suas conquistas.
            Este aplicativo foi projetado para funcionar offline, garantindo que você tenha acesso às informações mesmo em áreas remotas.
          </p>
          {installPrompt && (
            <div className="mt-4 border-t pt-4">
               <h3 className="text-lg font-semibold text-gray-800">Explore Minas offline!</h3>
               <p className="text-gray-600 mb-3">Instale o app para uma experiência completa e acesso rápido.</p>
               <button 
                onClick={handleInstallClick} 
                className="bg-emerald-500 text-white font-bold py-2 px-4 rounded-lg hover:bg-emerald-600 transition-colors"
                >
                    Adicionar à Tela Inicial
                </button>
            </div>
          )}
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-bold text-emerald-700 mb-3">Dicas de Segurança</h2>
          <ul className="list-disc list-inside text-gray-700 space-y-2">
            <li>Sempre verifique a previsão do tempo antes de sair.</li>
            <li>Leve água suficiente e lanches.</li>
            <li>Use roupas e calçados apropriados para trilha.</li>
            <li>Informe a alguém sobre seu roteiro e horário previsto de retorno.</li>
            <li>Não deixe lixo na trilha. Leve tudo de volta com você.</li>
            <li>Respeite a fauna e a flora local.</li>
          </ul>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-bold text-emerald-700 mb-3">Contato e Suporte</h2>
          <p className="text-gray-700">
            Encontrou algum problema ou tem sugestões? Entre em contato conosco pelo e-mail: <a href="mailto:suporte@trilhasdeminas.com" className="text-emerald-600 hover:underline">suporte@trilhasdeminas.com</a>.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Info;