'use client';
import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import type { ChatMessage } from '../sectionType';

// ─── Icons ───────────────────────────────────────────────────────────────────

const ChatIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M4.804 21.644A6.707 6.707 0 0 0 6 21.75a6.721 6.721 0 0 0 3.583-1.029c.774.182 1.584.279 2.417.279 5.322 0 9.75-3.97 9.75-9 0-5.03-4.428-9-9.75-9s-9.75 3.97-9.75 9c0 2.409 1.025 4.587 2.674 6.192.232.226.277.428.254.543a3.73 3.73 0 0 1-.814 1.686.75.75 0 0 0 .44 1.223Z" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 10.875a1.125 1.125 0 1 0 0 2.25 1.125 1.125 0 0 0 0-2.25Zm4.875-1.125a1.125 1.125 0 1 1 2.25 0 1.125 1.125 0 0 1-2.25 0Zm-1.5 1.125a1.125 1.125 0 1 0 0 2.25 1.125 1.125 0 0 0 0-2.25Z" />
  </svg>
);

const CloseIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
  </svg>
);

const SendIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" {...props}>
    <path d="M3.105 3.105a1.5 1.5 0 011.895-.288L19.49 9.49a1.5 1.5 0 010 2.522L5.001 17.184A1.5 1.5 0 013.105 14.895v-4.529a.75.75 0 011.085-.688L10.5 12l-6.31-2.688a.75.75 0 01-1.085-.688v-4.529z" />
  </svg>
);

const TrashIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
  </svg>
);

// ─── Suggested questions ──────────────────────────────────────────────────────

const SUGGESTED_QUESTIONS = [
  { label: 'Core AI skills', q: 'What are his core AI and LLM engineering skills?' },
  { label: 'Recent projects', q: 'Tell me about his most recent AI projects.' },
  { label: 'Work experience', q: 'What is his work experience?' },
  { label: 'Available to hire?', q: 'Is he available to hire and what is his visa status?' },
  { label: 'Education', q: 'What is his educational background?' },
  { label: 'Tech stack', q: 'What is his primary technology stack?' },
];

// ─── Text renderer ────────────────────────────────────────────────────────────

function renderInline(text: string): React.ReactNode {
  const parts = text.split(/(\*\*[^*]+\*\*)/g);
  return parts.map((part, i) => {
    if (part.startsWith('**') && part.endsWith('**')) {
      return <strong key={i} className="font-semibold text-white">{part.slice(2, -2)}</strong>;
    }
    return part;
  });
}

const SECTION_HEADINGS = new Set([
  'Quick Answer', 'Core Skills', 'Proven In',
  'Problem', 'Architecture', 'Outcome', 'Stack',
  'Key Points', 'Impact / Outcomes', 'Tech Stack', 'Source Confidence',
]);

function renderAiText(text: string) {
  const lines = text.split('\n').map((l) => l.trim()).filter((l) => l.length > 0);
  const blocks: React.ReactNode[] = [];
  let listItems: string[] = [];
  let key = 0;

  const flushList = () => {
    if (listItems.length === 0) return;
    blocks.push(
      <ul key={key++} className="space-y-1 my-1">
        {listItems.map((item, i) => (
          <li key={i} className="flex items-start gap-2">
            <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-cyan-400 shrink-0" />
            <span>{renderInline(item)}</span>
          </li>
        ))}
      </ul>
    );
    listItems = [];
  };

  for (const line of lines) {
    if (line.startsWith('- ') || line.startsWith('• ')) {
      listItems.push(line.slice(2).trim());
      continue;
    }
    flushList();

    const suggestedMatch = line.match(/^Suggested:\s*(.+)/i);
    if (suggestedMatch) {
      blocks.push(
        <div key={key++} className="mt-2 pt-2 border-t border-gray-600/50">
          <span className="text-xs text-gray-400">Try asking: </span>
          <span className="text-xs text-cyan-400 italic">{suggestedMatch[1]}</span>
        </div>
      );
      continue;
    }

    const headingMatch = line.match(/^([A-Za-z /]+?):\s*(.*)/);
    if (headingMatch && SECTION_HEADINGS.has(headingMatch[1].trim())) {
      blocks.push(
        <div key={key++} className="mt-2">
          <span className="text-xs font-semibold uppercase tracking-wider text-cyan-400">{headingMatch[1]}: </span>
          {headingMatch[2] && <span className="text-sm">{renderInline(headingMatch[2])}</span>}
        </div>
      );
      continue;
    }

    if (line.includes(' — ') && line.length < 100) {
      blocks.push(
        <p key={key++} className="font-semibold text-white text-sm mt-1">{renderInline(line)}</p>
      );
      continue;
    }

    blocks.push(
      <p key={key++} className="text-sm leading-relaxed">{renderInline(line)}</p>
    );
  }

  flushList();
  return blocks.length === 0
    ? <p className="text-sm leading-relaxed">{text}</p>
    : <div className="space-y-1">{blocks}</div>;
}

// ─── Typing indicator ─────────────────────────────────────────────────────────

function TypingDots() {
  return (
    <div className="flex items-center gap-1.5 px-1 py-0.5">
      {[0, 1, 2].map((i) => (
        <motion.span
          key={i}
          className="w-1.5 h-1.5 bg-cyan-400 rounded-full"
          animate={{ y: [0, -5, 0] }}
          transition={{
            duration: 0.65,
            repeat: Infinity,
            delay: i * 0.18,
            ease: 'easeInOut',
          }}
        />
      ))}
    </div>
  );
}

// ─── Component ────────────────────────────────────────────────────────────────

const WELCOME_MESSAGE = `Hi! I'm Hemant's AI assistant — I can answer questions about his skills, projects, experience, availability, and more. What would you like to know?`;

const Chatbot: React.FC = () => {
  const [isOpen, setIsOpen]       = useState(false);
  const [messages, setMessages]   = useState<ChatMessage[]>([]);
  const [input, setInput]         = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError]         = useState<string | null>(null);
  const messagesEndRef  = useRef<HTMLDivElement>(null);
  const inputRef        = useRef<HTMLInputElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading]);

  useEffect(() => {
    if (isOpen && inputRef.current) inputRef.current.focus();
  }, [isOpen]);

  useEffect(() => {
    if (isOpen && messages.length === 0) {
      setMessages([{ sender: 'ai', text: WELCOME_MESSAGE }]);
    }
  }, [isOpen, messages.length]);

  const sendMessage = async (text: string) => {
    if (!text.trim() || isLoading) return;

    const userMsg: ChatMessage = { sender: 'user', text };
    const updated = [...messages, userMsg];
    setMessages(updated);
    setInput('');
    setIsLoading(true);
    setError(null);

    try {
      const apiMessages = updated.map((m) => ({
        role: m.sender === 'user' ? 'user' : 'assistant',
        content: m.text,
      }));

      const res = await fetch('/api/ai/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: apiMessages }),
      });

      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        throw new Error(body?.error || 'Failed to get a response.');
      }

      const data = await res.json();
      const reply = data?.response?.toString()?.trim();
      if (reply) {
        setMessages((prev) => [
          ...prev,
          {
            sender: 'ai',
            text: reply,
            ragMeta: data?.rag
              ? {
                  mode: data.rag.mode,
                  entitiesMatched: data.rag.entitiesMatched,
                  communitiesUsed: data.rag.communitiesUsed,
                }
              : undefined,
          },
        ]);
      } else {
        throw new Error('Received an empty response.');
      }
    } catch (e) {
      const msg = e instanceof Error ? e.message : 'Assistant is temporarily unavailable.';
      setError(msg);
      setMessages((prev) => [...prev, { sender: 'ai', text: msg }]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    sendMessage(input);
  };

  const clearChat = () => {
    setMessages([{ sender: 'ai', text: WELCOME_MESSAGE }]);
    setError(null);
  };

  const showSuggestions = messages.length <= 1;

  return (
    <>
      {/* ── Chat window (AnimatePresence for smooth open/close) ── */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            key="chat-window"
            initial={{ opacity: 0, scale: 0.88, y: 24 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.88, y: 24 }}
            transition={{ type: 'spring', stiffness: 320, damping: 28 }}
            style={{ transformOrigin: 'bottom right' }}
            className="fixed bottom-0 right-0 z-50 m-4 md:m-8 w-[calc(100%-2rem)] h-[calc(100%-5rem)] md:w-[420px] md:h-[620px]"
          >
            <div className="bg-gray-900 border border-gray-700/70 w-full h-full rounded-2xl shadow-2xl flex flex-col overflow-hidden">

              {/* Header */}
              <motion.div
                className="px-4 py-3 flex items-center justify-between border-b border-gray-700/60 bg-gray-900/95 shrink-0"
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1, duration: 0.3 }}
              >
                <div className="flex items-center gap-3">
                  <motion.div
                    className="w-8 h-8 rounded-full bg-gradient-to-br from-cyan-500 to-cyan-700 flex items-center justify-center text-white text-xs font-bold shrink-0"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: 'spring', stiffness: 400, damping: 20, delay: 0.15 }}
                  >
                    HK
                  </motion.div>
                  <div>
                    <p className="text-sm font-semibold text-white leading-none">Hemant&apos;s Assistant</p>
                    <p className="text-xs text-gray-400 mt-0.5">Powered by GraphRAG + Gemini</p>
                  </div>
                </div>
                <div className="flex items-center gap-1">
                  <motion.button
                    onClick={clearChat}
                    className="p-1.5 rounded-lg text-gray-400 hover:text-gray-200 hover:bg-gray-700/50 transition-colors"
                    aria-label="Clear conversation"
                    title="Clear chat"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <TrashIcon className="w-4 h-4" />
                  </motion.button>
                  <motion.button
                    onClick={() => setIsOpen(false)}
                    className="p-1.5 rounded-lg text-gray-400 hover:text-gray-200 hover:bg-gray-700/50 transition-colors"
                    aria-label="Close chat"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <CloseIcon className="w-4 h-4" />
                  </motion.button>
                </div>
              </motion.div>

              {/* Messages */}
              <div className="flex-1 overflow-y-auto px-4 py-4 space-y-4 bg-gray-900/80">
                <AnimatePresence initial={false}>
                  {messages.map((msg, i) => (
                    <motion.div
                      key={i}
                      initial={{
                        opacity: 0,
                        y: 10,
                        x: msg.sender === 'user' ? 16 : -16,
                      }}
                      animate={{ opacity: 1, y: 0, x: 0 }}
                      transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                      className={`flex items-end gap-2 ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                    >
                      {msg.sender === 'ai' && (
                        <motion.div
                          className="w-7 h-7 rounded-full bg-gradient-to-br from-cyan-500 to-cyan-700 flex items-center justify-center text-white text-xs font-bold shrink-0 mb-0.5"
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          transition={{ type: 'spring', stiffness: 400, damping: 20, delay: 0.05 }}
                        >
                          HK
                        </motion.div>
                      )}
                      <motion.div
                        className={`max-w-[85%] px-3.5 py-2.5 rounded-2xl text-sm ${
                          msg.sender === 'user'
                            ? 'bg-cyan-600 text-white rounded-br-sm'
                            : 'bg-gray-800 text-gray-200 rounded-bl-sm border border-gray-700/50'
                        }`}
                        initial={{ scale: 0.94 }}
                        animate={{ scale: 1 }}
                        transition={{ duration: 0.25, ease: 'easeOut' }}
                      >
                        {msg.sender === 'ai' ? (
                          <>
                            {renderAiText(msg.text)}
                            {msg.ragMeta?.mode &&
                              msg.ragMeta.mode !== 'fallback_full_context' && (
                                <div className="mt-1.5 pt-1.5 border-t border-gray-700/40 flex flex-wrap gap-1 items-center">
                                  <span className="text-[10px] text-gray-500">
                                    via{' '}
                                    {msg.ragMeta.mode.startsWith('graphrag')
                                      ? 'GraphRAG'
                                      : 'RAG'}
                                  </span>
                                  {msg.ragMeta.entitiesMatched &&
                                    msg.ragMeta.entitiesMatched.length > 0 && (
                                      <span className="text-[10px] text-cyan-600/70">
                                        · {msg.ragMeta.entitiesMatched.slice(0, 3).join(', ')}
                                      </span>
                                    )}
                                  {msg.ragMeta.communitiesUsed &&
                                    msg.ragMeta.communitiesUsed.length > 0 && (
                                      <span className="text-[10px] text-purple-500/60">
                                        · {msg.ragMeta.communitiesUsed[0]}
                                      </span>
                                    )}
                                </div>
                              )}
                          </>
                        ) : (
                          <p className="leading-relaxed">{msg.text}</p>
                        )}
                      </motion.div>
                    </motion.div>
                  ))}
                </AnimatePresence>

                {/* Suggested question chips — staggered entrance */}
                <AnimatePresence>
                  {showSuggestions && !isLoading && (
                    <motion.div
                      key="suggestions"
                      className="pl-9"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0, y: -8 }}
                      transition={{ duration: 0.25 }}
                    >
                      <p className="text-xs text-gray-500 mb-2">Quick questions:</p>
                      <motion.div
                        className="flex flex-wrap gap-2"
                        initial="hidden"
                        animate="visible"
                        variants={{
                          visible: { transition: { staggerChildren: 0.07, delayChildren: 0.15 } },
                        }}
                      >
                        {SUGGESTED_QUESTIONS.map((sq) => (
                          <motion.button
                            key={sq.label}
                            onClick={() => sendMessage(sq.q)}
                            className="text-xs px-3 py-1.5 rounded-full border border-cyan-500/30 text-cyan-400 bg-cyan-500/5 hover:bg-cyan-500/15 hover:border-cyan-500/60 transition-colors duration-200"
                            variants={{
                              hidden: { opacity: 0, y: 8, scale: 0.92 },
                              visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.3 } },
                            }}
                            whileHover={{ scale: 1.06, transition: { duration: 0.15 } }}
                            whileTap={{ scale: 0.94 }}
                          >
                            {sq.label}
                          </motion.button>
                        ))}
                      </motion.div>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Typing indicator */}
                <AnimatePresence>
                  {isLoading && (
                    <motion.div
                      key="loading"
                      className="flex items-end gap-2 justify-start"
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 4 }}
                      transition={{ duration: 0.2 }}
                    >
                      <div className="w-7 h-7 rounded-full bg-gradient-to-br from-cyan-500 to-cyan-700 flex items-center justify-center text-white text-xs font-bold shrink-0">HK</div>
                      <div className="px-4 py-3 rounded-2xl rounded-bl-sm bg-gray-800 border border-gray-700/50">
                        <TypingDots />
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                {error && (
                  <motion.div
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-red-500/10 border border-red-500/20 text-red-300 px-3 py-2 rounded-lg text-xs"
                  >
                    {error}
                  </motion.div>
                )}

                <div ref={messagesEndRef} />
              </div>

              {/* Input */}
              <motion.div
                className="px-4 py-3 border-t border-gray-700/60 bg-gray-900/95 shrink-0"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.15, duration: 0.3 }}
              >
                <form onSubmit={handleSubmit} className="flex items-center gap-2">
                  <input
                    ref={inputRef}
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Ask about skills, projects, availability..."
                    disabled={isLoading}
                    className="flex-1 bg-gray-800 border border-gray-700 rounded-xl px-3.5 py-2 text-sm text-white placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-cyan-500 focus:border-cyan-500 disabled:opacity-50 transition-colors"
                    aria-label="Chat input"
                  />
                  <motion.button
                    type="submit"
                    disabled={isLoading || !input.trim()}
                    className="bg-cyan-600 hover:bg-cyan-500 text-white rounded-xl p-2.5 transition-colors disabled:bg-gray-700 disabled:cursor-not-allowed shrink-0"
                    aria-label="Send message"
                    whileHover={{ scale: 1.08 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <SendIcon className="w-4 h-4" />
                  </motion.button>
                </form>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── FAB (AnimatePresence for scale in/out) ── */}
      <AnimatePresence>
        {!isOpen && (
          <motion.div
            key="fab"
            className="fixed bottom-8 right-8 z-40 group flex items-center"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 380, damping: 22 }}
          >
            {/* Pulse ring */}
            <motion.span
              className="absolute inset-0 rounded-full bg-cyan-500/30"
              animate={{ scale: [1, 1.55, 1], opacity: [0.5, 0, 0.5] }}
              transition={{ duration: 2.8, repeat: Infinity, ease: 'easeInOut' }}
            />

            <motion.button
              onClick={() => setIsOpen(true)}
              className="relative w-14 h-14 rounded-full bg-gradient-to-br from-cyan-500 to-cyan-700 text-white flex items-center justify-center shadow-lg shadow-cyan-900/40 focus:outline-none focus:ring-4 focus:ring-cyan-500/40"
              aria-label="Open AI assistant"
              whileHover={{
                scale: 1.12,
                boxShadow: '0 8px 30px rgba(6,182,212,0.5)',
                transition: { duration: 0.2 },
              }}
              whileTap={{ scale: 0.94 }}
            >
              <ChatIcon className="w-7 h-7" />
            </motion.button>

            {/* Tooltip */}
            <div className="absolute bottom-full mb-2 right-0 w-max whitespace-nowrap bg-gray-800 border border-gray-700 text-white text-xs px-3 py-1.5 rounded-lg shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none">
              Ask Hemant&apos;s AI assistant
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Chatbot;
