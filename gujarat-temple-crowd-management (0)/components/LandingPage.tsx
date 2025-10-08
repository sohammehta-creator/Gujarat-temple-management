
import React from 'react';
import { TEMPLES_DATA, CROWD_LEVEL_COLORS, CROWD_LEVEL_TEXT_COLORS } from '../constants';
import type { TempleData } from '../types';
import { MapPinIcon } from './icons';

interface LandingPageProps {
    setCurrentView: (view: 'landing' | 'dashboard') => void;
}

const HeroSection: React.FC<{ setCurrentView: (view: 'landing' | 'dashboard') => void; }> = ({ setCurrentView }) => (
    <section className="relative text-white py-20 md:py-32 bg-gradient-to-br from-amber-500 to-orange-600 overflow-hidden">
        <div className="absolute inset-0 bg-repeat bg-center opacity-10" style={{ backgroundImage: "url('data:image/svg+xml,%3Csvg width=\"52\" height=\"26\" viewBox=\"0 0 52 26\" xmlns=\"http://www.w3.org/2000/svg\"%3E%3Cg fill=\"none\" fill-rule=\"evenodd\"%3E%3Cg fill=\"%23ffffff\" fill-opacity=\"0.4\"%3E%3Cpath d=\"M10 10c0-2.21-1.79-4-4-4-3.314 0-6-2.686-6-6h2c0 2.21 1.79 4 4 4 3.314 0 6 2.686 6 6 0 2.21 1.79 4 4 4 3.314 0 6 2.686 6 6 0 2.21 1.79 4 4 4v2c-3.314 0-6-2.686-6-6 0-2.21-1.79-4-4-4-3.314 0-6-2.686-6-6zm25.464-1.95l8.486 8.486-1.414 1.414-8.486-8.486 1.414-1.414z\" /%3E%3C/g%3E%3C/g%3E%3C/svg%3E')" }}></div>
        <div className="container mx-auto px-6 text-center relative z-10">
            <h1 className="text-4xl md:text-6xl font-extrabold font-decorative leading-tight mb-4">
                Smart Darshan, Safe Journey
            </h1>
            <p className="text-lg md:text-2xl font-decorative mb-8">સ્માર્ટ દર્શન, સુરક્ષિત યાત્રા</p>
            <div className="flex justify-center space-x-4">
                <button className="bg-white text-orange-600 font-bold py-3 px-8 rounded-full text-lg hover:bg-orange-100 transition transform hover:scale-105 shadow-lg">
                    Book Your Darshan
                </button>
                <button onClick={() => setCurrentView('dashboard')} className="bg-transparent border-2 border-white font-bold py-3 px-8 rounded-full text-lg hover:bg-white/20 transition transform hover:scale-105">
                    Check Live Status
                </button>
            </div>
        </div>
    </section>
);

const InteractiveMap: React.FC = () => (
    <section className="py-16 bg-amber-50">
        <div className="container mx-auto px-6 text-center">
            <h2 className="text-3xl md:text-4xl font-bold font-decorative text-amber-800 mb-4">Pilgrimage Sites of Gujarat</h2>
            <p className="text-lg text-gray-600 mb-12 max-w-2xl mx-auto">Click on a temple to view its live status and details.</p>
            <div className="relative max-w-3xl mx-auto">
                {/* Simplified SVG map of Gujarat */}
                <svg viewBox="0 0 200 200" className="w-full h-auto">
                    <path d="M50.7,5.5C40.2,12.4,32,23.3,27.9,35.1c-4.1,11.8-4.2,24.5,0.7,35.8c4.9,11.3,14.8,21.2,21.7,31.7c6.9,10.5,10.8,21.6,12.3,33.1c1.5,11.5-0.1,23.4-6.3,33.2c-6.2,9.8-17,17.5-28.7,20c-11.7,2.5-24.3-0.2-32.6-7.5C10,181.3-1,168.3,0.6,155.8c1.6-12.5,10.1-23.7,14.9-34.9c4.8-11.2,5.9-22.4,2.9-33.1c-3-10.7-10.1-20.8-13.8-31.5c-3.7-10.7-4-22,0.6-32.2c4.6-10.2,16.6-19.3,29-23.8C45.5-2.2,50.7,5.5,50.7,5.5z" 
                    transform="translate(50, 0) scale(0.8)" fill="#FCD34D" stroke="#FBBF24" strokeWidth="1"/>
                </svg>
                 {Object.values(TEMPLES_DATA).map(temple => (
                    <div key={temple.name} className="absolute group" style={{ left: temple.mapCoords.x, top: temple.mapCoords.y, transform: 'translate(-50%, -50%)' }}>
                        <div className={`w-4 h-4 rounded-full ${CROWD_LEVEL_COLORS[temple.liveStatus.crowdLevel]} animate-pulse`}></div>
                        <div className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 w-48 bg-white p-3 rounded-lg shadow-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none z-10">
                            <h4 className="font-bold text-amber-800">{temple.name}</h4>
                            <p className="text-sm text-gray-600">Wait Time: {temple.liveStatus.waitTime} mins</p>
                            <div className="flex items-center mt-1">
                                <span className="text-sm mr-1">Crowd:</span>
                                <span className={`text-sm font-semibold ${CROWD_LEVEL_TEXT_COLORS[temple.liveStatus.crowdLevel]}`}>{temple.liveStatus.crowdLevel}</span>
                            </div>
                            <div className="absolute left-1/2 -translate-x-1/2 bottom-[-8px] w-0 h-0 border-l-8 border-l-transparent border-r-8 border-r-transparent border-t-8 border-t-white"></div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    </section>
);


const TempleCard: React.FC<{ temple: TempleData }> = ({ temple }) => (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden transform hover:-translate-y-2 transition-transform duration-300 group">
        <div className="relative">
            <img src={temple.image} alt={temple.name} className="w-full h-48 object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
            <div className="absolute top-2 right-2">
                <span className={`px-3 py-1 text-sm font-semibold text-white rounded-full ${CROWD_LEVEL_COLORS[temple.liveStatus.crowdLevel]}`}>{temple.liveStatus.crowdLevel}</span>
            </div>
            <h3 className="absolute bottom-4 left-4 text-2xl font-bold font-decorative text-white">{temple.name}</h3>
        </div>
        <div className="p-5">
            <div className="flex items-center text-gray-600 mb-3">
                <MapPinIcon className="w-5 h-5 mr-2 text-amber-600" />
                <span>{temple.location}</span>
            </div>
            <div className="flex justify-between items-center text-sm mb-4">
                <div className="text-center">
                    <p className="font-bold text-lg text-amber-800">{temple.liveStatus.waitTime}</p>
                    <p className="text-gray-500">min wait</p>
                </div>
                <div className="text-center">
                    <p className="font-bold text-lg text-amber-800">{temple.liveStatus.visitorCount}</p>
                    <p className="text-gray-500">visitors</p>
                </div>
                 <div className="text-center">
                    <p className="font-bold text-lg text-amber-800">{temple.weather.temp}°C</p>
                    <p className="text-gray-500">{temple.weather.condition}</p>
                </div>
            </div>
            <button className="w-full bg-amber-500 text-white font-bold py-2 px-4 rounded-full hover:bg-amber-600 transition-colors group-hover:bg-orange-500">
                View Details
            </button>
        </div>
    </div>
);

const TempleGrid: React.FC = () => (
    <section className="py-16 bg-white">
        <div className="container mx-auto px-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                {Object.values(TEMPLES_DATA).map(temple => (
                    <TempleCard key={temple.name} temple={temple} />
                ))}
            </div>
        </div>
    </section>
);


const LandingPage: React.FC<LandingPageProps> = ({ setCurrentView }) => {
    return (
        <>
            <HeroSection setCurrentView={setCurrentView} />
            <InteractiveMap />
            <TempleGrid />
        </>
    );
};

export default LandingPage;
