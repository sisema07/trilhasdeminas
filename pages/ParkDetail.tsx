import React, { useState } from 'react';
import type { Park, Badge } from '../types';
import { BADGES } from '../data/mockData';
import Quiz from './Quiz';
import { BadgeCheckIcon } from '../components/Icons';

interface ParkDetailProps {
    park: Park;
    collectedBadgeIds: string[];
    onBack: () => void;
}

type ParkDetailTab = 'info' | 'badges' | 'quiz';

const ParkDetail: React.FC<ParkDetailProps> = ({ park, collectedBadgeIds, onBack }) => {
    const [activeTab, setActiveTab] = useState<ParkDetailTab>('badges');
    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    const parkBadges = park.badgeIds.map(id => BADGES.find(b => b.id === id)).filter(Boolean) as Badge[];

    const nextImage = () => setCurrentImageIndex(prev => (prev + 1) % park.images.length);
    const prevImage = () => setCurrentImageIndex(prev => (prev - 1 + park.images.length) % park.images.length);

    return (
        <div>
            <div className="relative h-64 w-full overflow-hidden">
                {/* Image Carousel */}
                <div className="flex transition-transform duration-500 ease-in-out h-full" style={{ transform: `translateX(-${currentImageIndex * 100}%)` }}>
                    {park.images.map((src, index) => (
                        <img key={index} src={src} alt={`${park.name} ${index + 1}`} className="w-full h-full object-cover flex-shrink-0" />
                    ))}
                </div>

                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                
                {/* Carousel Controls */}
                 {park.images.length > 1 && (
                    <>
                        <button onClick={prevImage} className="absolute top-1/2 left-2 -translate-y-1/2 bg-white/50 text-gray-800 rounded-full p-1 hover:bg-white transition-colors">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" /></svg>
                        </button>
                        <button onClick={nextImage} className="absolute top-1/2 right-2 -translate-y-1/2 bg-white/50 text-gray-800 rounded-full p-1 hover:bg-white transition-colors">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" /></svg>
                        </button>
                        <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex space-x-2">
                            {park.images.map((_, index) => (
                                <div key={index} className={`w-2 h-2 rounded-full ${index === currentImageIndex ? 'bg-white' : 'bg-white/50'}`}></div>
                            ))}
                        </div>
                    </>
                 )}

                <div className="absolute bottom-0 left-0 p-4 text-white">
                    <h1 className="text-3xl font-bold drop-shadow-lg">{park.name}</h1>
                    <p className="text-md drop-shadow-lg">{park.location}</p>
                </div>
            </div>

            <div className="p-4">
                <div className="bg-white p-4 rounded-lg shadow-md mb-4">
                    <p className="text-gray-700">{park.description}</p>
                     <div className="mt-4 flex justify-between items-center text-sm text-gray-500">
                        <span className={`px-3 py-1 rounded-full font-medium ${
                            park.difficulty === 'Fácil' ? 'bg-green-100 text-green-800' :
                            park.difficulty === 'Moderada' ? 'bg-yellow-100 text-yellow-800' :
                            'bg-red-100 text-red-800'
                        }`}>{park.difficulty}</span>
                        <span>{park.duration}</span>
                    </div>
                </div>

                <div className="flex border-b mb-4">
                    <button onClick={() => setActiveTab('badges')} className={`flex-1 py-2 text-center font-semibold ${activeTab === 'badges' ? 'border-b-2 border-emerald-500 text-emerald-600' : 'text-gray-500'}`}>
                        Atividades (Badges)
                    </button>
                    <button onClick={() => setActiveTab('quiz')} className={`flex-1 py-2 text-center font-semibold ${activeTab === 'quiz' ? 'border-b-2 border-emerald-500 text-emerald-600' : 'text-gray-500'}`}>
                        Quiz
                    </button>
                </div>

                <div>
                    {activeTab === 'badges' && (
                        <div className="space-y-3">
                             <h2 className="text-2xl font-bold text-gray-800 mb-2">Atividades e Conquistas</h2>
                             <p className="text-gray-600 mb-4 -mt-2">Escaneie o QR e libere a conquista!</p>
                             {parkBadges.length > 0 ? parkBadges.map(badge => {
                                const isCollected = collectedBadgeIds.includes(badge.id);
                                return (
                                    <div key={badge.id} className={`p-4 rounded-lg flex items-center transition-all ${isCollected ? 'bg-emerald-50 border-l-4 border-emerald-500' : 'bg-gray-100'}`}>
                                        <img src={badge.icon} alt={badge.name} className={`w-16 h-16 rounded-full mr-4 ${!isCollected && 'grayscale'}`}/>
                                        <div>
                                            <h3 className={`font-bold ${isCollected ? 'text-emerald-800' : 'text-gray-700'}`}>{badge.name}</h3>
                                            <p className="text-sm text-gray-600">{badge.description}</p>
                                        </div>
                                        {isCollected && <BadgeCheckIcon className="h-8 w-8 text-emerald-500 ml-auto" />}
                                    </div>
                                );
                             }) : <p className="text-gray-600">Nenhum badge específico para este parque ainda.</p>}
                        </div>
                    )}

                    {activeTab === 'quiz' && (
                        <div>
                            {park.quiz.length > 0 ? <Quiz questions={park.quiz} /> : <p className="text-gray-600">Nenhum quiz disponível para este parque.</p>}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default ParkDetail;