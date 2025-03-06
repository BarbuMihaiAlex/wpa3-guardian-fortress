
import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter } from '@/context/RouterContext';

const SecurityExplanation: React.FC = () => {
  const { showExplanation, setShowExplanation, currentExplanation } = useRouter();

  return (
    <AnimatePresence>
      {showExplanation && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.5 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 bg-black"
            onClick={() => setShowExplanation(false)}
          />
          
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-x-0 top-1/2 transform -translate-y-1/2 max-w-md mx-auto p-6 glass-panel rounded-xl z-50"
          >
            <div className="text-center mb-4">
              <div className="inline-flex items-center justify-center h-10 w-10 rounded-full bg-router-blue/10 mb-2">
                <svg className="h-5 w-5 text-router-blue" viewBox="0 0 24 24" fill="none">
                  <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" />
                  <path d="M12 16v-4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                  <path d="M12 8h.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-router-black">Security Information</h3>
            </div>
            
            <div className="prose prose-sm max-w-none text-router-gray-dark">
              <p>{currentExplanation}</p>
            </div>
            
            <div className="mt-6 flex justify-center">
              <button
                onClick={() => setShowExplanation(false)}
                className="router-button"
              >
                Got it
              </button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default SecurityExplanation;
