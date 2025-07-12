'use client';
import React, { useState, useEffect, useRef } from 'react';
import { GoogleGenAI } from "@google/genai";
import { Chat } from "@google/genai";
import { getPortfolioContext } from '../constant';
import type { ChatMessage } from '../sectionType';

const ChatIcon = (props: React.SVGProps<SVGSVGElement>) => (
    // <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
    //     <path strokeLinecap="round" strokeLinejoin="round" d="M8.625 12a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H8.25m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H12m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 01-2.555-.337A5.972 5.972 0 015.41 20.97a5.969 5.969 0 01-.474-.065 4.48 4.48 0 00.978-2.025c.09-.455.09-.934.09-1.425v-2.134c0-2.639 3.13-4.75 7-4.75h1.5a.75.75 0 01.75.75v3.375c0 .621.504 1.125 1.125 1.125h2.25c.621 0 1.125-.504 1.125-1.125v-2.25s.008-.018.008-.026zM12 3c5.18 0 9.448 3.013 9.448 6.75 0 1.413-.468 2.723-1.258 3.795a.75.75 0 01-1.233-.736V12a4.5 4.5 0 00-4.5-4.5h-1.5a4.5 4.5 0 00-4.5 4.5v2.134c0 .561.096 1.11.267 1.625a.75.75 0 01-1.233.736A10.43 10.43 0 013 12c0-3.737 4.268-6.75 9-6.75z" />
    // </svg>
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
  <path strokeLinecap="round" strokeLinejoin="round" d="M4.804 21.644A6.707 6.707 0 0 0 6 21.75a6.721 6.721 0 0 0 3.583-1.029c.774.182 1.584.279 2.417.279 5.322 0 9.75-3.97 9.75-9 0-5.03-4.428-9-9.75-9s-9.75 3.97-9.75 9c0 2.409 1.025 4.587 2.674 6.192.232.226.277.428.254.543a3.73 3.73 0 0 1-.814 1.686.75.75 0 0 0 .44 1.223ZM8.25 10.875a1.125 1.125 0 1 0 0 2.25 1.125 1.125 0 0 0 0-2.25ZM10.875 12a1.125 1.125 0 1 1 2.25 0 1.125 1.125 0 0 1-2.25 0Zm4.875-1.125a1.125 1.125 0 1 0 0 2.25 1.125 1.125 0 0 0 0-2.25Z"/>
</svg>

);

const CloseIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
    </svg>
);

const SendIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" {...props}>
        <path d="M3.105 3.105a1.5 1.5 0 011.895-.288L19.49 9.49a1.5 1.5 0 010 2.522L5.001 17.184A1.5 1.5 0 013.105 14.895v-4.529a.75.75 0 011.085-.688L10.5 12l-6.31-2.688a.75.75 0 01-1.085-.688v-4.529z" />
    </svg>
);

const Chatbot: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState<ChatMessage[]>([]);
    const [input, setInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [chat, setChat] = useState<Chat | null>(null);
    const [error, setError] = useState<string | null>(null);
    const messagesEndRef = useRef<null | HTMLDivElement>(null);
    const inputRef = useRef<null | HTMLInputElement>(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(scrollToBottom, [messages]);

    useEffect(() => {
        if (isOpen && inputRef.current) {
            inputRef.current.focus();
        }
    }, [isOpen]);

    useEffect(() => {
        if (!isOpen || chat) return;

        const initChat = async () => {
            setIsLoading(true);
            setError(null);
            try {
                
                const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
                console.log("checking", process.env.GEMINI_API_KEY);
                const portfolioContext = getPortfolioContext();
                
                const systemInstruction = `You are a helpful, friendly, and professional AI assistant for Hemant's portfolio website. Your purpose is to answer questions about Hemant based on the detailed portfolio information provided in an effective and engaging manner. Be conversational and engaging. If a question is outside the scope of the provided context, politely state that you can only answer questions related to Hemant's professional profile. Do not invent information. Here is the portfolio data: ${portfolioContext}`;
                
                const newChat = ai.chats.create({
                    model: 'gemini-2.0-flash',
                    config: { systemInstruction }
                });

                setChat(newChat);
                setMessages([{
                    sender: 'ai',
                    text: "Hello! I'm Hemant's AI assistant. How can I help you today? Feel free to ask about his skills, projects, or experience."
                }]);
            // } catch (e) {
            //     console.error("Failed to initialize chat:", e);
            //     setError("Sorry, the AI assistant is currently unavailable. Please try again later.");
             } 
            finally {
                setIsLoading(false);
            }
        };

        initChat();
    }, [isOpen, chat]);


    const handleSendMessage = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!input.trim() || isLoading || !chat) return;

        const userMessage: ChatMessage = { sender: 'user', text: input };
        setMessages(prev => [...prev, userMessage]);
        const currentInput = input;
        setInput('');
        setIsLoading(true);
        setError(null);

        try {
            const response = await chat.sendMessage({ message: currentInput });
            const aiMessage: ChatMessage = { sender: 'ai', text: response.text || "" };
            setMessages(prev => [...prev, aiMessage]);
        } catch (e) {
            console.error("Error sending message:", e);
            const errorMessage: ChatMessage = { sender: 'ai', text: "I'm sorry, I encountered an error. Please try again." };
            setMessages(prev => [...prev, errorMessage]);
        } finally {
            setIsLoading(false);
        }
    };
    
   return (
        <>
            {/* Chat Window */}
            <div className={`fixed bottom-0 right-0 z-50 m-4 md:m-8 transition-all duration-500 ease-in-out
                ${isOpen ? 'w-[calc(100%-2rem)] h-[calc(100%-5rem)] md:w-[400px] md:h-[600px] opacity-100' : 'w-0 h-0 opacity-0'}`}
                style={{ transformOrigin: 'bottom right' }}
            >
                <div className="bg-gray-800 border border-gray-700/80 w-full h-full rounded-2xl shadow-2xl flex flex-col overflow-hidden">
                    {/* Header */}
                    <div className="bg-gray-900/80 p-4 flex justify-between items-center border-b border-gray-700 flex-shrink-0">
                        <h3 className="text-lg font-bold text-white">AI Assistant</h3>
                        <button onClick={() => setIsOpen(false)} className="text-gray-400 hover:text-white transition-colors" aria-label="Close chat">
                            <CloseIcon className="w-6 h-6" />
                        </button>
                    </div>

                    {/* Messages */}
                    <div className="flex-grow p-4 overflow-y-auto bg-gray-800/50 space-y-4">
                        {messages.map((msg, index) => (
                            <div key={index} className={`flex items-end gap-2 ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                                {msg.sender === 'ai' && <div className="w-8 h-8 rounded-full bg-cyan-500 flex items-center justify-center flex-shrink-0 text-white font-bold text-sm">AI</div>}
                                <div className={`max-w-[80%] p-3 rounded-2xl ${
                                    msg.sender === 'user'
                                        ? 'bg-cyan-600 text-white rounded-br-lg'
                                        : 'bg-gray-700 text-gray-200 rounded-bl-lg'
                                }`}>
                                    <p className="text-sm leading-relaxed">{msg.text}</p>
                                </div>
                            </div>
                        ))}
                        {isLoading && (
                            <div className="flex items-end gap-2 justify-start">
                                <div className="w-8 h-8 rounded-full bg-cyan-500 flex items-center justify-center flex-shrink-0 text-white font-bold text-sm">AI</div>
                                <div className="max-w-[80%] p-3 rounded-2xl bg-gray-700 text-gray-200 rounded-bl-lg">
                                    <div className="flex items-center gap-1">
                                        <span className="w-2 h-2 bg-cyan-400 rounded-full animate-bounce" style={{animationDelay: '0s'}}></span>
                                        <span className="w-2 h-2 bg-cyan-400 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></span>
                                        <span className="w-2 h-2 bg-cyan-400 rounded-full animate-bounce" style={{animationDelay: '0.4s'}}></span>
                                    </div>
                                </div>
                            </div>
                        )}
                        {error && (
                            <div className="bg-red-500/20 text-red-300 p-3 rounded-lg text-sm">{error}</div>
                        )}
                        <div ref={messagesEndRef} />
                    </div>

                    {/* Input Form */}
                    <div className="p-4 border-t border-gray-700 bg-gray-900/80 flex-shrink-0">
                        <form onSubmit={handleSendMessage} className="flex items-center gap-2">
                            <input
                                ref={inputRef}
                                type="text"
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                placeholder="Type your message..."
                                disabled={isLoading || error !== null}
                                className="w-full bg-gray-700/50 border border-gray-600 rounded-lg py-2 px-3 text-white focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 transition-colors disabled:opacity-50"
                                aria-label="Chat input"
                            />
                            <button type="submit" disabled={isLoading || !input.trim()} className="bg-cyan-500 text-white rounded-lg p-2 transition-colors duration-300 hover:bg-cyan-600 disabled:bg-gray-600 disabled:cursor-not-allowed" aria-label="Send message">
                                <SendIcon className="w-5 h-5" />
                            </button>
                        </form>
                    </div>
                </div>
            </div>

            {/* Floating Action Button with Tooltip */}
             <div className={`fixed bottom-8 right-8 z-40 group flex items-center transition-all duration-300 ease-in-out ${isOpen ? 'scale-0 opacity-0' : 'scale-100 opacity-100'}`}>
                <button
                    onClick={() => setIsOpen(!isOpen)}
                    className="w-16 h-16 rounded-full bg-cyan-500 text-white flex items-center justify-center shadow-lg transition-all duration-300 ease-in-out hover:bg-cyan-600 group-hover:scale-110 focus:outline-none focus:ring-4 focus:ring-cyan-500/50"
                    aria-label="Toggle chat window"
                    aria-describedby="chatbot-tooltip"
                >
                    <ChatIcon className="w-8 h-8" />
                </button>
                <div 
                    id="chatbot-tooltip"
                    role="tooltip"
                    className="absolute top-1/2 right-full mr-4 -translate-y-1/2 w-max whitespace-nowrap bg-gray-700 text-white text-sm px-3 py-1.5 rounded-lg shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                >
                    Chat with my Assistant!
                </div>
            </div>
        </>
    );
};

export default Chatbot;
