
import React, { useState, useRef, useEffect } from 'react';
import type { ChatMessage } from '../types';
import { getChatbotResponse } from '../services/geminiService';
import { INITIAL_CHAT_MESSAGE } from '../constants';
import { ChatBubbleIcon, XMarkIcon, PaperAirplaneIcon, MicrophoneIcon } from './icons';

const Chatbot: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState<ChatMessage[]>([INITIAL_CHAT_MESSAGE]);
    const [userInput, setUserInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const chatboxRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (chatboxRef.current) {
            chatboxRef.current.scrollTop = chatboxRef.current.scrollHeight;
        }
    }, [messages]);

    const handleSendMessage = async () => {
        if (userInput.trim() === '' || isLoading) return;

        const newUserMessage: ChatMessage = { sender: 'user', text: userInput };
        setMessages(prev => [...prev, newUserMessage]);
        setUserInput('');
        setIsLoading(true);

        try {
            const botResponseText = await getChatbotResponse(userInput);
            const newBotMessage: ChatMessage = { sender: 'bot', text: botResponseText };
            setMessages(prev => [...prev, newBotMessage]);
        } catch (error) {
            console.error("Error getting bot response:", error);
            const errorMessage: ChatMessage = { sender: 'bot', text: "Sorry, I'm having trouble connecting right now." };
            setMessages(prev => [...prev, errorMessage]);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <>
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="fixed bottom-6 right-6 bg-amber-500 text-white w-16 h-16 rounded-full shadow-xl flex items-center justify-center transform hover:scale-110 transition-transform z-50"
                aria-label="Open chatbot"
            >
                {isOpen ? <XMarkIcon className="w-8 h-8" /> : <ChatBubbleIcon className="w-8 h-8" />}
            </button>

            {isOpen && (
                <div className="fixed bottom-24 right-6 w-80 h-[28rem] bg-white rounded-xl shadow-2xl flex flex-col z-50 animate-fade-in-up">
                    <div className="bg-gradient-to-r from-amber-500 to-orange-500 p-4 text-white rounded-t-xl">
                        <h3 className="font-bold text-lg">Darshan Assistant</h3>
                        <p className="text-xs">Powered by AI</p>
                    </div>

                    <div ref={chatboxRef} className="flex-1 p-4 overflow-y-auto space-y-4">
                        {messages.map((msg, index) => (
                            <div key={index} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                                <div className={`max-w-[80%] p-3 rounded-lg ${msg.sender === 'user' ? 'bg-orange-500 text-white' : 'bg-gray-200 text-gray-800'}`}>
                                    <p className="text-sm">{msg.text}</p>
                                </div>
                            </div>
                        ))}
                        {isLoading && (
                            <div className="flex justify-start">
                                <div className="bg-gray-200 text-gray-800 p-3 rounded-lg">
                                    <div className="flex items-center space-x-1">
                                        <span className="w-2 h-2 bg-gray-500 rounded-full animate-pulse"></span>
                                        <span className="w-2 h-2 bg-gray-500 rounded-full animate-pulse delay-75"></span>
                                        <span className="w-2 h-2 bg-gray-500 rounded-full animate-pulse delay-150"></span>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                    
                    <div className="p-3 border-t border-gray-200 bg-white rounded-b-xl">
                        <div className="flex items-center bg-gray-100 rounded-full">
                            <input
                                type="text"
                                value={userInput}
                                onChange={(e) => setUserInput(e.target.value)}
                                onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                                placeholder="Ask a question..."
                                className="flex-1 bg-transparent px-4 py-2 text-sm outline-none"
                                disabled={isLoading}
                            />
                            <button className="p-2 text-gray-500 hover:text-orange-500">
                                <MicrophoneIcon className="w-5 h-5" />
                            </button>
                            <button onClick={handleSendMessage} disabled={isLoading} className="p-2 text-white bg-orange-500 rounded-full m-1 hover:bg-orange-600 disabled:bg-gray-400">
                                <PaperAirplaneIcon className="w-5 h-5" />
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default Chatbot;

