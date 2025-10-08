
import React, { useState } from 'react';
import { ChevronDownIcon } from './icons';

interface HeaderProps {
    setCurrentView: (view: 'landing' | 'dashboard') => void;
}

const Header: React.FC<HeaderProps> = ({ setCurrentView }) => {
    const [langDropdownOpen, setLangDropdownOpen] = useState(false);

    return (
        <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-lg shadow-md">
            <div className="container mx-auto px-6 py-3 flex justify-between items-center">
                <div className="flex items-center space-x-2 cursor-pointer" onClick={() => setCurrentView('landing')}>
                    <span className="text-2xl text-orange-600">🕉️</span>
                    <h1 className="text-xl font-bold font-decorative text-amber-700">Gujarat Darshan</h1>
                </div>
                <nav className="hidden md:flex items-center space-x-8">
                    <button onClick={() => setCurrentView('landing')} className="text-gray-600 hover:text-amber-600 transition-colors">Home</button>
                    <button onClick={() => setCurrentView('dashboard')} className="text-gray-600 hover:text-amber-600 transition-colors">Live Dashboard</button>
                    <button className="text-gray-600 hover:text-amber-600 transition-colors">Book Darshan</button>
                    <button className="text-gray-600 hover:text-amber-600 transition-colors">About</button>
                </nav>
                <div className="flex items-center space-x-4">
                    <div className="relative">
                        <button onClick={() => setLangDropdownOpen(!langDropdownOpen)} className="flex items-center text-gray-600 hover:text-amber-600 transition-colors">
                            <span>English</span>
                            <ChevronDownIcon className="w-4 h-4 ml-1" />
                        </button>
                        {langDropdownOpen && (
                            <div className="absolute right-0 mt-2 w-40 bg-white rounded-md shadow-lg py-1">
                                <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-amber-100">English</a>
                                <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-amber-100">ગુજરાતી</a>
                                <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-amber-100">हिन्दी</a>
                            </div>
                        )}
                    </div>
                     <button className="bg-orange-500 text-white px-4 py-2 rounded-full hover:bg-orange-600 transition-all shadow-sm hover:shadow-md hidden md:block">
                        Login
                    </button>
                </div>
            </div>
        </header>
    );
};

export default Header;
