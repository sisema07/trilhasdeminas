
import React from 'react';
import useLocalStorage from '../hooks/useLocalStorage';

interface ProfileProps {
    collectedCount: number;
    totalCount: number;
}

const Profile: React.FC<ProfileProps> = ({ collectedCount, totalCount }) => {
    const [userName, setUserName] = useLocalStorage('userName', 'Aventureiro(a)');
    const progress = totalCount > 0 ? (collectedCount / totalCount) * 100 : 0;

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-4xl font-bold text-center text-gray-800 my-6">Meu Perfil</h1>
            
            <div className="bg-white p-6 rounded-lg shadow-lg max-w-md mx-auto">
                <div className="flex flex-col items-center">
                    <div className="relative">
                        <img 
                            src={`https://i.pravatar.cc/150?u=${userName}`} 
                            alt="Avatar do usuário" 
                            className="w-32 h-32 rounded-full border-4 border-emerald-400"
                        />
                    </div>

                    <input 
                        type="text" 
                        value={userName} 
                        onChange={(e) => setUserName(e.target.value)}
                        className="mt-4 text-3xl font-bold text-center text-gray-800 bg-transparent focus:bg-gray-100 rounded-lg p-2 outline-none focus:ring-2 focus:ring-emerald-400"
                    />
                </div>

                <div className="mt-8">
                    <h2 className="text-xl font-semibold text-gray-700 mb-2">Progresso dos Badges</h2>
                    <div className="flex justify-between items-center text-sm text-gray-600 mb-1">
                        <span>{collectedCount} Conquistados</span>
                        <span>{totalCount} Total</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-4">
                        <div 
                            className="bg-emerald-500 h-4 rounded-full transition-all duration-500" 
                            style={{ width: `${progress}%` }}
                        ></div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Profile;
