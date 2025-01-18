import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, X, ChevronUp, Info } from 'lucide-react';

interface Message {
  type: 'user' | 'bot';
  content: string;
}

const ChatBot: React.FC = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [messages, setMessages] = useState<Message[]>([
    { type: 'bot', content: 'Hi! I\'m TensorBot. How can I help you today?' }
  ]);
  const [input, setInput] = useState<string>('');
  const [showScrollButton, setShowScrollButton] = useState<boolean>(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const chatContainerRef = useRef<HTMLDivElement>(null);

  const handleScroll = () => {
    if (chatContainerRef.current) {
      const { scrollTop, scrollHeight, clientHeight } = chatContainerRef.current;
      setShowScrollButton(scrollHeight - scrollTop - clientHeight > 100);
    }
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage: Message = { type: 'user', content: input };
    setMessages(prev => [...prev, userMessage]);
    setInput('');

    // Simulate bot response
    setTimeout(() => {
      const botResponse = getBotResponse(input.toLowerCase());
      setMessages(prev => [...prev, { type: 'bot', content: botResponse }]);
    }, 1000);
  };

  const getBotResponse = (query: string): string => {
    if (query.includes('hi') || query.includes('hello')) {
      return 'Hello! How can I assist you today?';
    }
    if (query.includes('club') || query.includes('tensor')) {
      return 'Tensor Club is a student-led AI research club at MVJCE. We focus on machine learning, deep learning, and their applications.';
    }
    if (query.includes('join')) {
      return 'To join Tensor Club, please fill out the application form on our website and attend our next orientation session!';
    }
    if (query.includes('project') || query.includes('work')) {
      return 'We work on various AI projects including computer vision, natural language processing, and robotics. Check out our Projects page for more details!';
    }
    if (query.includes('event') || query.includes('workshop')) {
      return 'We regularly organize workshops, hackathons, and tech talks. Visit our Events page to see upcoming events!';
    }
    if (query.includes('team') || query.includes('member')) {
      return 'Our team consists of passionate students and mentors. Visit our Team page to learn more about us!';
    }
    return "I'm not sure about that. Could you try asking something about our club, projects, events, or team?";
  };

  return (
    <>
      {/* Chat Button */}
      <motion.button
        onClick={() => setIsOpen(true)}
        className={`fixed bottom-4 right-4 p-4 bg-purple-500 text-white rounded-full shadow-lg hover:bg-purple-600 transition-colors duration-300 z-50 ${isOpen ? 'hidden' : ''}`}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        <MessageCircle size={24} />
      </motion.button>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="fixed bottom-4 right-4 w-80 h-96 bg-gray-900 rounded-lg shadow-xl overflow-hidden z-50 border border-gray-800"
          >
            {/* Chat Header */}
            <div className="p-4 bg-purple-500 flex justify-between items-center">
              <h3 className="text-white font-medium">TensorBot</h3>
              <button
                onClick={() => setIsOpen(false)}
                className="text-white hover:text-gray-200 transition-colors"
              >
                <X size={20} />
              </button>
            </div>

            {/* Chat Messages */}
            <div
              ref={chatContainerRef}
              onScroll={handleScroll}
              className="h-64 overflow-y-auto p-4 space-y-4"
            >
              {messages.map((message, index) => (
                <div
                  key={index}
                  className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[80%] p-3 rounded-lg ${
                      message.type === 'user'
                        ? 'bg-purple-500 text-white'
                        : 'bg-gray-800 text-gray-200'
                    }`}
                  >
                    {message.content}
                  </div>
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>

            {/* Scroll to Bottom Button */}
            <AnimatePresence>
              {showScrollButton && (
                <motion.button
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onClick={scrollToBottom}
                  className="absolute bottom-20 right-4 p-2 bg-purple-500 text-white rounded-full shadow-lg hover:bg-purple-600 transition-colors"
                >
                  <ChevronUp size={20} />
                </motion.button>
              )}
            </AnimatePresence>

            {/* Chat Input */}
            <form onSubmit={handleSubmit} className="p-4 bg-gray-800">
              <div className="relative">
                <input
                  type="text"
                  value={input}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => setInput(e.target.value)}
                  placeholder="Type your message..."
                  className="w-full p-2 pr-10 bg-gray-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
                <div className="absolute right-2 top-2 text-gray-400 cursor-help group">
                  <Info size={20} />
                  <div className="absolute bottom-full right-0 mb-2 w-48 p-2 bg-gray-800 text-xs text-gray-300 rounded-lg shadow-xl opacity-0 group-hover:opacity-100 transition-opacity">
                    Try asking about:
                    <ul className="mt-1 list-disc list-inside">
                      <li>Tensor Club</li>
                      <li>Our projects</li>
                      <li>Events</li>
                      <li>How to join</li>
                    </ul>
                  </div>
                </div>
              </div>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default ChatBot;
