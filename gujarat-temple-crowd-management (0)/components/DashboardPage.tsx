
import React, { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { TEMPLES_DATA, CROWD_PREDICTION_DATA, CROWD_LEVEL_COLORS } from '../constants';
// Fix: Changed 'import type' to a regular 'import' because TempleName is an enum used as a value at runtime (e.g., for Object.values).
import { TempleName, TempleData } from '../types';
import { UsersIcon, ClockIcon, CarIcon } from './icons';

const MetricCard: React.FC<{ icon: React.ReactNode; label: string; value: string | number; color: string; }> = ({ icon, label, value, color }) => (
    <div className="bg-white p-6 rounded-xl shadow-md flex items-center space-x-4">
        <div className={`p-3 rounded-full ${color}`}>
            {icon}
        </div>
        <div>
            <p className="text-gray-500">{label}</p>
            <p className="text-2xl font-bold text-gray-800">{value}</p>
        </div>
    </div>
);


const Heatmap: React.FC = () => {
    // Mock heatmap data
    const grid = Array.from({ length: 10 }, () => Array.from({ length: 20 }, () => Math.random()));

    const getColor = (value: number) => {
        if (value > 0.9) return 'bg-red-600';
        if (value > 0.7) return 'bg-orange-500';
        if (value > 0.4) return 'bg-yellow-400';
        return 'bg-green-400';
    };

    return (
        <div className="bg-gray-800 p-4 rounded-xl shadow-lg">
             <h3 className="text-lg font-bold text-white mb-4">Real-Time Crowd Heatmap</h3>
            <div className="grid grid-cols-20 gap-1">
                {grid.flat().map((value, i) => (
                    <div key={i} className={`w-full aspect-square rounded ${getColor(value)} opacity-75`}></div>
                ))}
            </div>
            <div className="flex justify-end space-x-4 mt-4 text-xs text-white">
                <div className="flex items-center"><span className="w-3 h-3 rounded-full bg-green-400 mr-2"></span>Low</div>
                <div className="flex items-center"><span className="w-3 h-3 rounded-full bg-yellow-400 mr-2"></span>Moderate</div>
                <div className="flex items-center"><span className="w-3 h-3 rounded-full bg-orange-500 mr-2"></span>High</div>
                <div className="flex items-center"><span className="w-3 h-3 rounded-full bg-red-600 mr-2"></span>Critical</div>
            </div>
        </div>
    );
};


const DashboardPage: React.FC = () => {
    const [selectedTempleName, setSelectedTempleName] = useState<TempleName>(TempleName.Somnath);
    const [selectedTemple, setSelectedTemple] = useState<TempleData>(TEMPLES_DATA[selectedTempleName]);
    
    useEffect(() => {
        setSelectedTemple(TEMPLES_DATA[selectedTempleName]);
    }, [selectedTempleName]);

    return (
        <div className="bg-amber-50 min-h-screen p-4 sm:p-6 lg:p-8">
            <div className="container mx-auto">
                <h1 className="text-3xl md:text-4xl font-bold font-decorative text-amber-800 mb-6">Live Crowd Dashboard</h1>
                
                {/* Temple Selector */}
                <div className="flex space-x-2 mb-8 bg-white p-2 rounded-full shadow-sm max-w-max">
                    {Object.values(TempleName).map(name => (
                        <button 
                            key={name} 
                            onClick={() => setSelectedTempleName(name)}
                            className={`px-4 py-2 text-sm md:px-6 md:py-3 md:text-base font-semibold rounded-full transition-colors ${selectedTempleName === name ? 'bg-orange-500 text-white shadow-md' : 'text-gray-600 hover:bg-amber-100'}`}
                        >
                            {name}
                        </button>
                    ))}
                </div>

                {/* Main Dashboard Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Left Column: Metrics & Predictions */}
                    <div className="lg:col-span-2 space-y-8">
                        {/* Current Metrics Panel */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            <MetricCard icon={<UsersIcon className="w-6 h-6 text-white"/>} label="Live Visitor Count" value={selectedTemple.liveStatus.visitorCount.toLocaleString()} color="bg-blue-500" />
                            <MetricCard icon={<ClockIcon className="w-6 h-6 text-white"/>} label="Queue Length (mins)" value={selectedTemple.liveStatus.waitTime} color="bg-purple-500"/>
                            <MetricCard icon={<CarIcon className="w-6 h-6 text-white"/>} label="Available Parking" value={selectedTemple.liveStatus.parkingSlots} color="bg-teal-500"/>
                        </div>
                        
                        {/* Predictive Analytics */}
                        <div className="bg-white p-6 rounded-xl shadow-md">
                             <h3 className="text-xl font-bold text-gray-800 mb-4">Crowd Trend & Prediction</h3>
                            <ResponsiveContainer width="100%" height={300}>
                                <LineChart data={CROWD_PREDICTION_DATA} margin={{ top: 5, right: 20, left: -10, bottom: 5 }}>
                                    <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
                                    <XAxis dataKey="name" stroke="#888888" fontSize={12} />
                                    <YAxis stroke="#888888" fontSize={12}/>
                                    <Tooltip wrapperClassName="rounded-md border-gray-300 shadow-lg" />
                                    <Legend />
                                    <Line type="monotone" dataKey="visitors" stroke="#F97316" strokeWidth={2} dot={{ r: 4 }} activeDot={{ r: 8 }}/>
                                </LineChart>
                            </ResponsiveContainer>
                             <div className="mt-4 text-center">
                                <h4 className="font-semibold text-gray-700">Best Time to Visit (Next 24h)</h4>
                                <p className="text-orange-600 font-bold text-lg">Tomorrow, 7 AM - 9 AM</p>
                                <p className="text-sm text-gray-500">Reason: AI predicts lower visitor traffic based on historical data.</p>
                            </div>
                        </div>
                    </div>

                    {/* Right Column: Heatmap & Info */}
                    <div className="space-y-8">
                        <div className="bg-white p-6 rounded-xl shadow-md">
                            <h3 className="text-xl font-bold text-gray-800 mb-2">{selectedTemple.name} Status</h3>
                            <div className="flex items-center space-x-3">
                                <span className={`w-5 h-5 rounded-full ${CROWD_LEVEL_COLORS[selectedTemple.liveStatus.crowdLevel]}`}></span>
                                <span className="text-lg font-semibold">{selectedTemple.liveStatus.crowdLevel} Crowd</span>
                            </div>
                             <div className="mt-4 flex items-center text-gray-600">
                                <selectedTemple.weather.icon className="w-8 h-8 mr-3 text-amber-500" />
                                <div>
                                    <p className="font-semibold text-lg">{selectedTemple.weather.temp}°C</p>
                                    <p>{selectedTemple.weather.condition}</p>
                                </div>
                            </div>
                            <div className="mt-4 bg-orange-100 border-l-4 border-orange-500 text-orange-700 p-4 rounded-r-lg">
                                <p className="font-bold">Special Alert!</p>
                                <p className="text-sm">Evening Aarti ceremony starts at 7:00 PM. Expect higher crowds.</p>
                            </div>
                        </div>
                        <Heatmap />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DashboardPage;