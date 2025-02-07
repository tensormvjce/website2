import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface TeamSectionProps {
  title: string;
  description: string;
  items: string[];
}

const TeamSection = ({ title, description, items }: TeamSectionProps) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [displayText, setDisplayText] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  useEffect(() => {
    if (isExpanded && description) {
      setIsTyping(true);
      let currentText = '';
      let currentIndex = 0;

      const typingInterval = setInterval(() => {
        if (currentIndex < description.length) {
          currentText += description[currentIndex];
          setDisplayText(currentText);
          currentIndex++;
        } else {
          setIsTyping(false);
          clearInterval(typingInterval);
        }
      }, 30);

      return () => clearInterval(typingInterval);
    } else {
      setDisplayText('');
    }
  }, [isExpanded, description]);

  const renderThemedContent = () => {
    switch (title) {
      case "Technical Team":
        return (
          <div className="bg-[#1e1e1e] rounded-lg p-6 font-mono">
            <div className="flex items-center gap-2 mb-6 border-b border-gray-700 pb-3">
              <div className="flex gap-2">
                <div className="w-3 h-3 rounded-full bg-red-500" />
                <div className="w-3 h-3 rounded-full bg-yellow-500" />
                <div className="w-3 h-3 rounded-full bg-green-500" />
              </div>
              <span className="text-gray-400 text-sm ml-2">bash ~ tensor-club</span>
            </div>
            <div className="text-green-400 text-sm">$ tensor info</div>
            <div className="text-gray-300 mt-4 pl-4 border-l-2 border-gray-700">
              <span className="text-purple-400">→</span> {displayText}
              {isTyping && (
                <span className="inline-block w-2 h-4 bg-gray-400 ml-1 animate-blink" />
              )}
            </div>
            <div className="mt-6 space-y-3 pl-4">
              {items.map((item, index) => (
                <motion.div
                  key={item}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="text-blue-400 text-sm"
                >
                  <span className="text-gray-500">$</span> {item}
                </motion.div>
              ))}
            </div>
          </div>
        );

      case "Content Team":
        return (
          <div className="bg-white rounded-lg overflow-hidden">
            {/* Word Top Bar */}
            <div className="bg-[#185ABD] px-4 py-2 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <img src="/word-icon.png" alt="Word" className="w-5 h-5" onError={(e) => e.currentTarget.style.display = 'none'} />
                <span className="text-white text-sm">Content Strategy.docx - Word</span>
              </div>
              <div className="flex gap-3">
                <div className="w-3 h-3 rounded-full bg-yellow-400" />
                <div className="w-3 h-3 rounded-full bg-gray-300" />
                <div className="w-3 h-3 rounded-full bg-red-500" />
              </div>
            </div>

            {/* Word Ribbon */}
            <div className="bg-[#F3F2F1] border-b border-gray-300">
              <div className="flex gap-6 px-4 py-1 text-xs text-gray-700">
                <span className="hover:bg-gray-200 px-2 py-1 rounded cursor-pointer">File</span>
                <span className="hover:bg-gray-200 px-2 py-1 rounded cursor-pointer">Home</span>
                <span className="hover:bg-gray-200 px-2 py-1 rounded cursor-pointer">Insert</span>
                <span className="hover:bg-gray-200 px-2 py-1 rounded cursor-pointer">Layout</span>
                <span className="hover:bg-gray-200 px-2 py-1 rounded cursor-pointer">References</span>
                <span className="hover:bg-gray-200 px-2 py-1 rounded cursor-pointer">Review</span>
                <span className="hover:bg-gray-200 px-2 py-1 rounded cursor-pointer">View</span>
              </div>
              <div className="flex items-center gap-4 px-4 py-2 border-t border-gray-300">
                <div className="flex items-center gap-2">
                  <span className="text-sm text-gray-700">Calibri</span>
                  <svg className="w-3 h-3 text-gray-500" viewBox="0 0 24 24">
                    <path fill="currentColor" d="M7 10l5 5 5-5H7z"/>
                  </svg>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-sm text-gray-700">11</span>
                  <svg className="w-3 h-3 text-gray-500" viewBox="0 0 24 24">
                    <path fill="currentColor" d="M7 10l5 5 5-5H7z"/>
                  </svg>
                </div>
                <div className="flex gap-2">
                  <button className="p-1 hover:bg-gray-200 rounded">
                    <svg className="w-4 h-4 text-gray-700" viewBox="0 0 24 24">
                      <path fill="currentColor" d="M8 3h8v3H8V3m0 15h8v3H8v-3m-2-4h12v3H6v-3m0-4h12v3H6V10m0-4h12v3H6V6z"/>
                    </svg>
                  </button>
                  <button className="p-1 hover:bg-gray-200 rounded">
                    <svg className="w-4 h-4 text-gray-700" viewBox="0 0 24 24">
                      <path fill="currentColor" d="M3 3h18v3H3V3m0 15h18v3H3v-3m0-4h12v3H3v-3m0-4h12v3H3V10m0-4h12v3H3V6z"/>
                    </svg>
                  </button>
                </div>
              </div>
            </div>

            {/* Document Content */}
            <div className="bg-white p-8">
              <div className="max-w-2xl mx-auto">
                <p className="text-gray-800 mb-6 leading-relaxed font-['Calibri']">
                  {displayText}
                  {isTyping && (
                    <span className="inline-block w-0.5 h-4 bg-black ml-0.5 animate-blink" />
                  )}
                </p>
                <ul className="list-disc pl-8 space-y-3 font-['Calibri']">
                  {items.map((item, index) => (
                    <motion.li
                      key={item}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="text-gray-700"
                    >
                      {item}
                    </motion.li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        );

      case "Media Team":
        return (
          <div className="flex justify-center p-8 rounded-lg">
            {/* Phone Frame */}
            <div className="w-[300px] h-[600px] bg-black rounded-[3rem] border-[14px] border-black relative overflow-hidden shadow-2xl">
              {/* Phone Screen */}
              <div className="relative h-full w-full bg-gradient-to-b from-gray-900 to-black rounded-[2rem] overflow-hidden">
                {/* Status Bar */}
                <div className="absolute top-0 inset-x-0 h-7 px-6 flex justify-between items-center bg-transparent z-20">
                  <span className="text-white text-sm">9:41</span>
                  <div className="flex items-center gap-2">
                    <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8z"/>
                    </svg>
                    <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M2 22h20V2z"/>
                    </svg>
                  </div>
                </div>

                {/* App Content */}
                <div className="h-full overflow-y-auto no-scrollbar">
                  {/* App Header */}
                  <div className="pt-10 px-4 pb-3 bg-gradient-to-b from-black to-transparent sticky top-0 z-10">
                    <div className="flex items-center justify-between">
                      <span className="text-white text-xl font-semibold">Media</span>
                      <div className="flex items-center gap-4">
                        <svg className="w-6 h-6 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 4v16m8-8H4"/>
                        </svg>
                        <svg className="w-6 h-6 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-4l-4 4-4-4z"/>
                        </svg>
                      </div>
                    </div>
                  </div>

                  {/* Description */}
                  <div className="px-4 py-3 text-gray-300 text-sm bg-gradient-to-b from-black/50 to-transparent">
                    {displayText}
                    {isTyping && (
                      <span className="inline-block w-2 h-4 bg-purple-400 ml-1 animate-blink" />
                    )}
                  </div>

                  {/* Content Feed */}
                  <div className="px-4 space-y-4">
                    {items.map((item, index) => (
                      <motion.div
                        key={item}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="bg-gray-800/50 backdrop-blur-sm rounded-xl overflow-hidden"
                      >
                        {/* Post Header */}
                        <div className="p-3 flex items-center gap-3">
                          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-500 to-blue-500 p-0.5">
                            <div className="w-full h-full rounded-full bg-black flex items-center justify-center">
                              <span className="text-white font-medium">{item.charAt(0)}</span>
                            </div>
                          </div>
                          <div>
                            <div className="text-white text-sm font-medium">{item}</div>
                            <div className="text-gray-400 text-xs">Media Team • Following</div>
                          </div>
                          <button className="ml-auto text-blue-400 text-sm font-medium">
                            Connect
                          </button>
                        </div>

                        {/* Post Content */}
                        <div className="aspect-square bg-gradient-to-br from-purple-500/10 to-blue-500/10 relative">
                          <div className="absolute inset-0 flex items-center justify-center">
                            <div className="text-white text-lg font-medium">{item}</div>
                          </div>
                        </div>

                        {/* Post Actions */}
                        <div className="p-3 flex items-center justify-between">
                          <div className="flex items-center gap-6">
                            <button className="text-white hover:text-gray-300">
                              <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
                              </svg>
                            </button>
                            <button className="text-white hover:text-gray-300">
                              <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M21.99 4c0-1.1-.89-2-1.99-2H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h14l4 4-.01-18z"/>
                              </svg>
                            </button>
                            <button className="text-white hover:text-gray-300">
                              <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M16 5l-1.42 1.42-1.59-1.59V16h-1.98V4.83L9.42 6.42 8 5l4-4 4 4zm4 5v11c0 1.1-.9 2-2 2H6c-1.11 0-2-.9-2-2V10c0-1.11.89-2 2-2h3v2H6v11h12V10h-3V8h3c1.1 0 2 .89 2 2z"/>
                              </svg>
                            </button>
                          </div>
                          <button className="text-white hover:text-gray-300">
                            <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
                              <path d="M17 3H7c-1.1 0-1.99.9-1.99 2L5 21l7-3 7 3V5c0-1.1-.9-2-2-2z"/>
                            </svg>
                          </button>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>

                {/* Bottom Navigation */}
                <div className="absolute bottom-0 inset-x-0 h-16 bg-gradient-to-t from-black to-transparent flex justify-around items-center px-6">
                  <button className="text-white">
                    <svg className="w-7 h-7" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z"/>
                    </svg>
                  </button>
                  <button className="text-gray-500">
                    <svg className="w-7 h-7" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5z"/>
                    </svg>
                  </button>
                  <button className="text-gray-500">
                    <svg className="w-7 h-7" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M19 3H5c-1.11 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-2 10h-4v4h-2v-4H7v-2h4V7h2v4h4v2z"/>
                    </svg>
                  </button>
                  <button className="text-gray-500">
                    <svg className="w-7 h-7" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </div>
        );

      case "Design Team":
        return (
          <div className="bg-[#2c2c2c] rounded-lg overflow-hidden">
            {/* Figma Top Bar */}
            <div className="bg-[#1e1e1e] px-6 py-3 flex items-center justify-between border-b border-[#383838]">
              <div className="flex items-center gap-3">
                <div className="flex gap-2">
                  <div className="w-3 h-3 rounded-full bg-red-500" />
                  <div className="w-3 h-3 rounded-full bg-yellow-500" />
                  <div className="w-3 h-3 rounded-full bg-green-500" />
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="text-gray-400 text-sm">Tensor Design System</div>
                <div className="text-gray-500 text-xs px-2 py-1 rounded bg-[#383838]">Main</div>
              </div>
              <div className="flex gap-4">
                <div className="w-4 h-4 rounded-full bg-[#383838]" />
                <div className="w-4 h-4 rounded-full bg-[#383838]" />
              </div>
            </div>

            {/* Figma Main Interface */}
            <div className="flex h-[500px]">
              {/* Left Sidebar */}
              <div className="w-12 bg-[#1e1e1e] flex flex-col items-center py-6 gap-6 border-r border-[#383838]">
                <div className="w-6 h-6 rounded bg-[#383838] flex items-center justify-center">
                  <div className="w-3 h-3 rounded-sm bg-purple-400" />
                </div>
                <div className="w-6 h-6 rounded bg-[#2c2c2c] flex items-center justify-center">
                  <div className="w-3 h-3 rounded-sm bg-gray-400" />
                </div>
                <div className="w-6 h-6 rounded bg-[#2c2c2c] flex items-center justify-center">
                  <div className="w-3 h-3 rounded-sm bg-gray-400" />
                </div>
              </div>

              {/* Layers Panel */}
              <div className="w-64 bg-[#252525] border-r border-[#383838] p-6">
                <div className="flex items-center justify-between mb-6">
                  <span className="text-gray-300 text-sm font-medium">Layers</span>
                  <div className="text-gray-400">
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </div>
                <div className="space-y-2">
                  {items.map((item, index) => (
                    <motion.div
                      key={item}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="flex items-center gap-3 py-2 px-3 rounded hover:bg-[#383838] group cursor-pointer"
                    >
                      <div className="w-2 h-2 rounded-sm bg-purple-400" />
                      <span className="text-gray-300 text-sm">{item}</span>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Main Canvas */}
              <div className="flex-1 bg-[#202020] p-6">
                <div className="bg-[#2c2c2c] rounded-lg p-4 h-full">
                  <div className="text-gray-300 mb-4 pl-4 border-l-2 border-purple-500/50">
                    {displayText}
                    {isTyping && (
                      <span className="inline-block w-2 h-4 bg-purple-400 ml-1 animate-blink" />
                    )}
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    {items.map((item, index) => (
                      <motion.div
                        key={item}
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: index * 0.2 }}
                        className="group cursor-pointer"
                      >
                        <div className="bg-[#383838] rounded-lg hover:ring-1 hover:ring-purple-500/30 transition-all overflow-hidden">
                          <div className="relative">
                            <div className="h-24 bg-gradient-to-br from-purple-500/20 to-blue-500/20 group-hover:from-purple-500/30 group-hover:to-blue-500/30 transition-colors">
                              {/* Figma-style grid overlay */}
                              <div className="absolute inset-0 bg-[#202020] opacity-5 bg-grid-white/[0.2] bg-[length:8px_8px]" />
                            </div>
                            {/* Component preview overlay */}
                            <div className="absolute inset-0 flex items-center justify-center">
                              <div className="w-12 h-12 bg-white/5 rounded-lg border border-white/10 flex items-center justify-center">
                                <div className="w-6 h-6 rounded bg-purple-500/20 flex items-center justify-center">
                                  <div className="w-3 h-3 rounded-sm bg-purple-400" />
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="p-3">
                            <div className="flex items-center justify-between mb-1.5">
                              <div className="flex items-center gap-2">
                                <div className="w-1.5 h-1.5 rounded-sm bg-purple-400" />
                                <span className="text-xs text-gray-300 font-medium truncate max-w-[100px]">{item}</span>
                              </div>
                              <div className="flex items-center gap-1.5">
                                <div className="w-3.5 h-3.5 rounded-full bg-[#2c2c2c] flex items-center justify-center">
                                  <div className="w-1 h-1 rounded-sm bg-gray-400" />
                                </div>
                                <div className="w-3.5 h-3.5 rounded-full bg-[#2c2c2c] flex items-center justify-center">
                                  <div className="w-1 h-1 rounded-sm bg-gray-400" />
                                </div>
                              </div>
                            </div>
                            <div className="flex items-center justify-between">
                              <div className="text-[10px] text-gray-500">Component</div>
                              <div className="flex items-center gap-1">
                                <div className="text-[10px] text-gray-500 px-1 py-0.5 rounded bg-[#2c2c2c]">Main</div>
                                <div className="text-[10px] text-purple-400 px-1 py-0.5 rounded bg-purple-400/10">Published</div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <motion.div
      layout
      className="w-full"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full text-left bg-black/50 px-8 py-6 rounded-xl backdrop-blur-sm ring-1 ring-white/10 hover:ring-white/20 transition-all duration-300"
      >
        <div className="flex items-center justify-between">
          <h3 className="text-xl font-semibold text-gradient-purple glow-text">
            {title}
          </h3>
          <motion.div
            animate={{ rotate: isExpanded ? 180 : 0 }}
            transition={{ duration: 0.3 }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 text-purple-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </motion.div>
        </div>
      </button>

      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <div className="mt-2">
              {renderThemedContent()}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default TeamSection; 