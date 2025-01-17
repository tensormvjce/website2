import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageSquare, X, Send, MinusSquare, Info, UserPlus, Users, Calendar, Award, Phone, ChevronUp } from 'lucide-react';
import { clubData } from '../data/clubData';

interface Message {
  type: 'user' | 'bot';
  content: string;
}

const ChatBot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { type: 'bot', content: 'Hi! I\'m TensorBot 🤖 How can I help you today?' }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [showTooltip, setShowTooltip] = useState(true);  
  const [isHovering, setIsHovering] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const messagesContainerRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleScroll = () => {
    if (messagesContainerRef.current) {
      const { scrollTop } = messagesContainerRef.current;
      setShowScrollTop(scrollTop > 200);
    }
  };

  const scrollToTop = () => {
    if (messagesContainerRef.current) {
      messagesContainerRef.current.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    let tooltipTimer: NodeJS.Timeout;
    if (showTooltip && !isHovering) {
      tooltipTimer = setTimeout(() => {
        setShowTooltip(false);
      }, 5000);
    }
    return () => {
      if (tooltipTimer) {
        clearTimeout(tooltipTimer);
      }
    };
  }, [showTooltip, isHovering]);

  // Auto-hide tooltip after 5 seconds on initial load
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowTooltip(false);
    }, 5000);

    return () => clearTimeout(timer);
  }, []); 

  const findAnswer = (question: string): string => {
    const lowercaseQuestion = question.toLowerCase();
    
    // Team Members Specific Queries
    if (lowercaseQuestion.includes('design team members')) {
      return `Design Team Members:
• Leader: ${clubData.teamStructure.designTeam.leader}
• Sub-Leader: ${clubData.teamStructure.designTeam.subLeader}
• Full Team: 
${clubData.teamStructure.designTeam.members.map(member => `  - ${member}`).join('\n')}

Key Responsibilities:
${clubData.teamStructure.designTeam.responsibilities.map(resp => `  • ${resp}`).join('\n')}`;
    }

    if (lowercaseQuestion.includes('technical team members')) {
      return `Technical Team Members:
• Leader: ${clubData.teamStructure.technicalTeam.leader}
• Sub-Leader: ${clubData.teamStructure.technicalTeam.subLeader}
• Full Team: 
${clubData.teamStructure.technicalTeam.members.map(member => `  - ${member}`).join('\n')}

Key Responsibilities:
${clubData.teamStructure.technicalTeam.responsibilities.map(resp => `  • ${resp}`).join('\n')}`;
    }

    if (lowercaseQuestion.includes('media team members')) {
      return `Media Team Members:
• Leader: ${clubData.teamStructure.mediaTeam.leader}
• Sub-Leader: ${clubData.teamStructure.mediaTeam.subLeader}
• Full Team: 
${clubData.teamStructure.mediaTeam.members.map(member => `  - ${member}`).join('\n')}

Key Responsibilities:
${clubData.teamStructure.mediaTeam.responsibilities.map(resp => `  • ${resp}`).join('\n')}`;
    }

    if (lowercaseQuestion.includes('content team members')) {
      return `Content Team Members:
• Leader: ${clubData.teamStructure.contentTeam.leader}
• Sub-Leader: ${clubData.teamStructure.contentTeam.subLeader}
• Full Team: 
${clubData.teamStructure.contentTeam.members.map(member => `  - ${member}`).join('\n')}

Key Responsibilities:
${clubData.teamStructure.contentTeam.responsibilities.map(resp => `  • ${resp}`).join('\n')}`;
    }

    // Existing comprehensive responses
    if (lowercaseQuestion.includes('what is tensor about ') || lowercaseQuestion.includes('about tensor')) {
      return `About Tensor Club:
• Name: ${clubData.generalClubInfo.clubName}
• Mission: ${clubData.generalClubInfo.mission}
• Vision: ${clubData.generalClubInfo.vision}
• Core Values: ${clubData.generalClubInfo.coreValues.join(', ')}
• Brief History: ${clubData.generalClubInfo.briefHistory}
• Membership Base: ${clubData.generalClubInfo.membershipBase}`;
    }
    
    if (lowercaseQuestion.includes('how to join') || lowercaseQuestion.includes('joining process')) {
      return `Joining Tensor Club:
• Open to all students passionate about AI and Machine Learning
• No specific prerequisites required
• Selection based on enthusiasm and potential to contribute
• Membership drives announced on social media and website
• Steps to Join:
  1. Watch for membership announcements
  2. Fill out the application form
  3. Demonstrate interest in AI/ML
  4. Potential skill assessment for specific teams`;
    }
    
    if (lowercaseQuestion.includes('team structure') || lowercaseQuestion.includes('teams')) {
      return `Tensor Club Team Structure:
1. Leadership Team:
   • President: ${clubData.teamStructure.leadershipTeam.president}
   • Vice President: ${clubData.teamStructure.leadershipTeam.vicePresident}

2. Design Team:
   • Leader: ${clubData.teamStructure.designTeam.leader}
   • Sub-Leader: ${clubData.teamStructure.designTeam.subLeader}
   • Key Responsibilities: ${clubData.teamStructure.designTeam.responsibilities.join(', ')}

3. Technical Team:
   • Leader: ${clubData.teamStructure.technicalTeam.leader}
   • Sub-Leader: ${clubData.teamStructure.technicalTeam.subLeader}
   • Key Responsibilities: ${clubData.teamStructure.technicalTeam.responsibilities.join(', ')}

4. Media Team:
   • Leader: ${clubData.teamStructure.mediaTeam.leader}
   • Sub-Leader: ${clubData.teamStructure.mediaTeam.subLeader}
   • Key Responsibilities: ${clubData.teamStructure.mediaTeam.responsibilities.join(', ')}

5. Content Team:
   • Leader: ${clubData.teamStructure.contentTeam.leader}
   • Sub-Leader: ${clubData.teamStructure.contentTeam.subLeader}
   • Key Responsibilities: ${clubData.teamStructure.contentTeam.responsibilities.join(', ')}`;
    }
    
    if (lowercaseQuestion.includes('events') || lowercaseQuestion.includes('tensor events')) {
      return `Tensor Club Events:
• Regular Events:
  1. Workshops: ${clubData.clubActivities.regularEvents.workshops}
  2. Hackathons: ${clubData.clubActivities.regularEvents.hackathons}
  3. Seminars: ${clubData.clubActivities.regularEvents.seminars}

• Event Details:
  • Participation: ${clubData.clubActivities.participationRequirements}
  • Registration: ${clubData.clubActivities.eventRegistrationProcess}
  • Notifications: ${clubData.clubActivities.eventNotifications}`;
    }
    
    if (lowercaseQuestion.includes('membership') || lowercaseQuestion.includes('who can join')) {
      return `Tensor Club Membership:
• Open to all students interested in AI and Machine Learning
• No membership fees
• Diverse opportunities across different teams
• Benefits:
  1. Learn cutting-edge AI/ML technologies
  2. Participate in workshops and hackathons
  3. Collaborate on innovative projects
  4. Network with like-minded peers
  5. Develop professional skills`;
    }
    
    if (lowercaseQuestion.includes('contact') || lowercaseQuestion.includes('reach')) {
      return `Contact Tensor Club:
• Social Media:
  - Instagram: ${clubData.contact.socialMedia.instagram}
  - Twitter: ${clubData.contact.socialMedia.twitter}
• Official Website: ${clubData.contact.officialWebsite}
• Best Contact Method: ${clubData.contact.bestContactMethod}

Follow our social media for regular updates about events, workshops, and opportunities!`;
    }
    
    // General Club Information
    if (lowercaseQuestion.includes('club name')) {
      return clubData.generalClubInfo.clubName;
    }
    if (lowercaseQuestion.includes('mission')) {
      return clubData.generalClubInfo.mission;
    }
    if (lowercaseQuestion.includes('vision')) {
      return clubData.generalClubInfo.vision;
    }
    if (lowercaseQuestion.includes('core values')) {
      return clubData.generalClubInfo.coreValues.join(', ');
    }
    if (lowercaseQuestion.includes('founding date')) {
      return clubData.generalClubInfo.foundingDate;
    }
    if (lowercaseQuestion.includes('history')) {
      return clubData.generalClubInfo.briefHistory;
    }
    if (lowercaseQuestion.includes('achievements')) {
      return clubData.generalClubInfo.keyAchievements;
    }
    if (lowercaseQuestion.includes('projects')) {
      return clubData.generalClubInfo.notableProjects;
    }
    if (lowercaseQuestion.includes('membership base')) {
      return clubData.generalClubInfo.membershipBase;
    }
    
    // Club Activities and Events
    if (lowercaseQuestion.includes('workshops')) {
      return clubData.clubActivities.regularEvents.workshops;
    }
    if (lowercaseQuestion.includes('hackathons')) {
      return clubData.clubActivities.regularEvents.hackathons;
    }
    if (lowercaseQuestion.includes('seminars')) {
      return clubData.clubActivities.regularEvents.seminars;
    }
    if (lowercaseQuestion.includes('event registration')) {
      return clubData.clubActivities.eventRegistrationProcess;
    }
    if (lowercaseQuestion.includes('event notifications')) {
      return clubData.clubActivities.eventNotifications;
    }
    
    // Team Structure and Roles
    if (lowercaseQuestion.includes('president')) {
      return `The President is ${clubData.teamStructure.leadershipTeam.president}.`;
    }
    if (lowercaseQuestion.includes('vice president')) {
      return `The Vice President is ${clubData.teamStructure.leadershipTeam.vicePresident}.`;
    }
    if (lowercaseQuestion.includes('design team')) {
      return `The Design Team is led by ${clubData.teamStructure.designTeam.leader}.`;
    }
    if (lowercaseQuestion.includes('technical team')) {
      return `The Technical Team is led by ${clubData.teamStructure.technicalTeam.leader}.`;
    }
    if (lowercaseQuestion.includes('media team')) {
      return `The Media Team is led by ${clubData.teamStructure.mediaTeam.leader}.`;
    }
    if (lowercaseQuestion.includes('content team')) {
      return `The Content Team is led by ${clubData.teamStructure.contentTeam.leader}.`;
    }
    
    // General Questions
    if (lowercaseQuestion.includes('what is tensor')) {
      return clubData.generalInformation.whatIsTensor;
    }
    if (lowercaseQuestion.includes('who can join')) {
      return clubData.generalInformation.whoCanJoin;
    }
    if (lowercaseQuestion.includes('membership fees')) {
      return clubData.generalInformation.membershipFees;
    }
    if (lowercaseQuestion.includes('stay updated')) {
      return clubData.generalInformation.stayUpdated;
    }
    if (lowercaseQuestion.includes('events registration')) {
      return clubData.eventsAndRegistration.howToRegister;
    }
    
    // More specific team and member queries
    if (lowercaseQuestion.includes('team leaders') || lowercaseQuestion.includes('leadership')) {
      return `Tensor Club Leadership:
• President: ${clubData.teamStructure.leadershipTeam.president}
• Vice President: ${clubData.teamStructure.leadershipTeam.vicePresident}

Team Leaders:
• Design Team Leader: ${clubData.teamStructure.designTeam.leader}
• Technical Team Leader: ${clubData.teamStructure.technicalTeam.leader}
• Media Team Leader: ${clubData.teamStructure.mediaTeam.leader}
• Content Team Leader: ${clubData.teamStructure.contentTeam.leader}`;
    }

    // Catch-all for unrecognized queries with helpful suggestions
    return `I'm not sure about that specific query. Could you rephrase or be more specific? 

Some things you can ask me:
• About Tensor Club
• Team Members
• Joining Process
• Club Events
• Membership Details
• Contact Information

I'm here to help you learn more about Tensor!`;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim()) return;

    const userMessage: Message = { type: 'user', content: inputValue };
    const botMessage: Message = { type: 'bot', content: findAnswer(inputValue) };

    setMessages(prev => [...prev, userMessage, botMessage]);
    setInputValue('');
  };

  const toggleChat = () => {
    setIsOpen(!isOpen);
    setIsMinimized(false);
    if (!isOpen) {
      setTimeout(() => {
        inputRef.current?.focus();
      }, 100);
    }
  };

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <AnimatePresence>
        {isOpen && !isMinimized && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="mb-4 w-[400px] h-[600px] bg-black/90 backdrop-blur-lg rounded-lg border border-white/10 shadow-xl flex flex-col"
          >
            {/* Chat Header */}
            <div className="flex items-center justify-between p-4 border-b border-white/10">
              <div className="flex items-center space-x-2">
                <img src="/logo_white.png" alt="Tensor Logo" className="w-6 h-6" />
                <span className="font-semibold text-white">TensorBot</span>
              </div>
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => setIsMinimized(true)}
                  className="p-1 hover:bg-white/10 rounded-full transition-colors"
                >
                  <MinusSquare className="w-4 h-4 text-white/70" />
                </button>
                <button
                  onClick={toggleChat}
                  className="p-1 hover:bg-white/10 rounded-full transition-colors"
                >
                  <X className="w-4 h-4 text-white/70" />
                </button>
              </div>
            </div>

            {/* Predefined Questions Scrollable Container */}
            <div className="w-full overflow-x-auto px-4 py-1 custom-scrollbar">
              <div className="flex space-x-2">
                {[
                  { 
                    question: 'About Tensor', 
                    query: 'About Tensor',
                    icon: <Info size={14} className="mr-1 inline" />
                  },
                  { 
                    question: 'Joining', 
                    query: 'How to join?',
                    icon: <UserPlus size={14} className="mr-1 inline" />
                  },
                  { 
                    question: 'Teams', 
                    query: 'Tell me about Tensor teams',
                    icon: <Users size={14} className="mr-1 inline" />
                  },
                  { 
                    question: 'Events', 
                    query: 'What events does Tensor organize?',
                    icon: <Calendar size={14} className="mr-1 inline" />
                  },
                  { 
                    question: 'Membership', 
                    query: 'Who can join Tensor?',
                    icon: <Award size={14} className="mr-1 inline" />
                  },
                  { 
                    question: 'Contact', 
                    query: 'How to contact Tensor?',
                    icon: <Phone size={14} className="mr-1 inline" />
                  }
                ].map((item) => (
                  <button 
                    key={item.question}
                    onClick={() => {
                      const answer = findAnswer(item.query);
                      setMessages(prev => [
                        ...prev, 
                        { type: 'user', content: item.query },
                        { type: 'bot', content: answer }
                      ]);
                      setTimeout(() => {
                        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
                      }, 100);
                    }}
                    className="
                      flex 
                      items-center 
                      whitespace-nowrap 
                      bg-white/10 
                      text-white 
                      px-2 
                      py-1 
                      rounded-md 
                      text-xs 
                      hover:bg-white/20 
                      transition-colors
                    "
                  >
                    {item.icon}
                    {item.question}
                  </button>
                ))}
              </div>
            </div>

            {/* Chat Messages */}
            <div 
              ref={messagesContainerRef}
              onScroll={handleScroll}
              className="flex-1 overflow-y-auto p-4 space-y-4 custom-scrollbar relative"
              style={{
                background: 'linear-gradient(180deg, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0.9) 100%)',
              }}
            >
              {messages.map((message, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'} w-full`}
                >
                  <div
                    className={`
                      max-w-[80%] 
                      p-3 
                      rounded-lg 
                      break-words 
                      shadow-md
                      ${
                        message.type === 'user'
                          ? 'bg-blue-600 text-white'
                          : 'bg-white/10 text-white'
                      }
                    `}
                    style={{ 
                      wordWrap: 'break-word', 
                      overflowWrap: 'break-word'
                    }}
                  >
                    <p className="text-sm leading-relaxed">{message.content}</p>
                  </div>
                </motion.div>
              ))}
              <div ref={messagesEndRef} />
              
              {/* Scroll to Top Button */}
              <AnimatePresence>
                {showScrollTop && (
                  <motion.button
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.5 }}
                    onClick={scrollToTop}
                    className="absolute bottom-4 right-2 p-2 rounded-full shadow-lg transition-all duration-300 group
                             bg-gradient-to-r from-purple-600 via-pink-500 to-blue-500 hover:shadow-xl
                             hover:shadow-purple-500/30 hover:scale-110"
                    whileHover={{ y: -2, rotate: 360 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <ChevronUp className="w-4 h-4 group-hover:animate-bounce text-white" />
                  </motion.button>
                )}
              </AnimatePresence>
            </div>

            {/* Chat Input */}
            <form onSubmit={handleSubmit} className="p-4 border-t border-white/10 bg-gradient-to-b from-black/90 to-black/70">
              <div className="flex items-center space-x-2">
                <input
                  ref={inputRef}
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  placeholder="Type your message..."
                  className="flex-1 bg-white/5 text-white placeholder-white/50 rounded-lg px-4 py-2 
                           focus:outline-none focus:ring-2 focus:ring-purple-500 focus:bg-white/10
                           transition-all duration-300 backdrop-blur-sm"
                />
                <button
                  type="submit"
                  className="p-2 rounded-lg transition-all duration-300
                           bg-gradient-to-r from-purple-600 to-pink-500 text-white
                           hover:shadow-lg hover:shadow-purple-500/50 hover:scale-105"
                >
                  <Send className="w-4 h-4" />
                </button>
              </div>
            </form>

            <style jsx global>{`
              .custom-scrollbar::-webkit-scrollbar {
                width: 10px;
                height: 10px;
                margin-right: 2px;
              }
              
              .custom-scrollbar::-webkit-scrollbar-track {
                background: transparent;
                border-radius: 10px;
                margin: 8px 0;
              }
              
              .custom-scrollbar::-webkit-scrollbar-track:hover {
                background: rgba(255, 255, 255, 0.05);
                box-shadow: inset 0 0 2px rgba(255, 255, 255, 0.1);
              }
              
              .custom-scrollbar::-webkit-scrollbar-thumb {
                background: linear-gradient(45deg, 
                  #ff3366,
                  #ff33ff,
                  #3366ff,
                  #33ffff,
                  #33ff66
                );
                background-size: 200% 200%;
                animation: gradient-scroll 5s ease infinite;
                border-radius: 10px;
                border: 2px solid rgba(255, 255, 255, 0.1);
                box-shadow: 
                  0 0 10px rgba(255, 255, 255, 0.2),
                  inset 0 0 6px rgba(255, 255, 255, 0.3);
                transition: all 0.3s ease;
              }
              
              .custom-scrollbar::-webkit-scrollbar-thumb:hover {
                background-size: 100% 100%;
                box-shadow: 
                  0 0 20px rgba(255, 255, 255, 0.4),
                  inset 0 0 10px rgba(255, 255, 255, 0.5);
              }

              @keyframes gradient-scroll {
                0% {
                  background-position: 0% 50%;
                }
                50% {
                  background-position: 100% 50%;
                }
                100% {
                  background-position: 0% 50%;
                }
              }
              
              .custom-scrollbar {
                scrollbar-width: thin;
                scrollbar-color: #ff3366 transparent;
                scroll-behavior: smooth;
                -webkit-overflow-scrolling: touch;
              }

              .custom-scrollbar::-webkit-scrollbar-button {
                display: none;
              }

              .custom-scrollbar::-webkit-scrollbar-corner {
                background: transparent;
                border-radius: 10px;
              }

              .custom-scrollbar::-webkit-scrollbar-thumb:active {
                background: linear-gradient(45deg, 
                  #ff3366 0%,
                  #ff33ff 25%,
                  #3366ff 50%,
                  #33ffff 75%,
                  #33ff66 100%
                );
                box-shadow: 
                  0 0 30px rgba(255, 255, 255, 0.6),
                  inset 0 0 15px rgba(255, 255, 255, 0.7);
              }
            `}</style>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Chat Toggle Button */}
      <div className="relative">
        <motion.button
          onClick={toggleChat}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className={`p-3 bg-black/90 backdrop-blur-lg rounded-full shadow-lg border border-white/10 ${
            isOpen ? 'hidden' : ''
          }`}
          onMouseEnter={() => setShowTooltip(true)}
          onMouseLeave={() => setShowTooltip(false)}
        >
          <img src="/logo_white.png" alt="Tensor Logo" className="w-8 h-8" />
        </motion.button>
        
        <AnimatePresence>
          {showTooltip && !isOpen && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              className="
                absolute 
                bottom-full 
                right-0 
                mb-2 
                bg-white/90 
                text-black 
                px-3 
                py-2 
                rounded-lg 
                shadow-lg 
                text-xs 
                whitespace-nowrap
                z-50
              "
            >
              Need help? Chat with TensorBot!
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Minimized Chat Indicator */}
      {isMinimized && (
        <motion.button
          onClick={() => setIsMinimized(false)}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          className="flex items-center space-x-2 p-2 bg-black/90 backdrop-blur-lg rounded-lg border border-white/10 shadow-lg"
        >
          <img src="/logo_white.png" alt="Tensor Logo" className="w-6 h-6" />
          <span className="text-white font-semibold">TensorBot</span>
        </motion.button>
      )}
    </div>
  );
};

export default ChatBot;
