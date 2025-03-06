
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter } from '@/context/RouterContext';

const FlagReveal: React.FC = () => {
  const { securityScore, isCompleted } = useRouter();
  const [showFlag, setShowFlag] = useState(false);
  const [flagRevealed, setFlagRevealed] = useState(false);
  const [flagContent, setFlagContent] = useState('');
  
  const flag = "CTF{WPA3_Guardian_Fortress}";
  
  useEffect(() => {
    if (isCompleted && !showFlag) {
      const timer = setTimeout(() => {
        setShowFlag(true);
      }, 1000);
      
      return () => clearTimeout(timer);
    }
  }, [isCompleted, showFlag]);
  
  const revealFlag = () => {
    setFlagRevealed(true);
    let revealed = '';
    const revealInterval = setInterval(() => {
      if (revealed.length < flag.length) {
        revealed = flag.substring(0, revealed.length + 1);
        setFlagContent(revealed);
      } else {
        clearInterval(revealInterval);
      }
    }, 50);
  };
  
  return (
    <AnimatePresence>
      {showFlag && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.7 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 bg-black"
          />
          
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ 
              duration: 0.4, 
              ease: [0.16, 1, 0.3, 1],
              delay: 0.1
            }}
            className="fixed inset-0 flex items-center justify-center p-6 z-50"
          >
            <div className="w-full max-w-lg p-8 bg-white rounded-2xl shadow-card overflow-hidden relative">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.5 }}
                className="text-center mb-6"
              >
                <div className="inline-flex items-center justify-center h-16 w-16 rounded-full bg-router-green/10 mb-4">
                  <svg className="h-8 w-8 text-router-green" viewBox="0 0 24 24" fill="none">
                    <path 
                      d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" 
                      stroke="currentColor" 
                      strokeWidth="2"
                    />
                    <path 
                      d="M8 12L11 15L16 9" 
                      stroke="currentColor" 
                      strokeWidth="2" 
                      strokeLinecap="round" 
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
                <h2 className="text-2xl font-bold text-router-black">
                  {securityScore === 100 ? "Perfect Security!" : "Excellent Security!"}
                </h2>
                <p className="text-router-gray-dark mt-2">
                  You've successfully configured the router with optimal WPA3 security settings.
                </p>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6, duration: 0.5 }}
                className="bg-router-gray-light rounded-lg p-5 mb-6"
              >
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-medium text-router-gray-dark">Security Score</span>
                  <span className="text-sm font-bold text-router-blue">{securityScore}/100</span>
                </div>
                <div className="h-2 bg-white rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${securityScore}%` }}
                    transition={{ delay: 0.9, duration: 1, ease: "easeOut" }}
                    className={`h-full ${
                      securityScore >= 90
                        ? "bg-router-green"
                        : securityScore >= 70
                        ? "bg-router-blue"
                        : "bg-router-yellow"
                    }`}
                  />
                </div>
                
                <div className="mt-4 text-sm text-router-gray-dark">
                  {securityScore >= 90 ? (
                    <span>Your network configuration provides excellent protection against threats!</span>
                  ) : (
                    <span>Your network is secure, but could be improved further.</span>
                  )}
                </div>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.9, duration: 0.5 }}
                className="text-center"
              >
                {!flagRevealed ? (
                  <>
                    <p className="text-router-gray-dark mb-4">
                      You've earned the secret FLAG for this challenge!
                    </p>
                    <button
                      onClick={revealFlag}
                      className="router-button animate-pulse-glow"
                    >
                      Reveal FLAG
                    </button>
                  </>
                ) : (
                  <div className="space-y-4">
                    <div className="relative">
                      <div className="bg-router-black/90 text-router-green font-mono rounded-md p-4 overflow-hidden">
                        <span className="inline-block w-full overflow-hidden whitespace-nowrap">
                          {flagContent}
                          {flagContent.length < flag.length && (
                            <span className="animate-pulse">_</span>
                          )}
                        </span>
                      </div>
                    </div>
                    <p className="text-router-gray-dark text-sm">
                      Congratulations! You may use this flag to complete the challenge.
                    </p>
                  </div>
                )}
              </motion.div>
              
              {/* Decorative elements */}
              <div className="absolute top-0 right-0 -mt-10 -mr-10 w-40 h-40 bg-router-blue opacity-10 rounded-full blur-3xl" />
              <div className="absolute bottom-0 left-0 -mb-10 -ml-10 w-40 h-40 bg-router-green opacity-10 rounded-full blur-3xl" />
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default FlagReveal;
