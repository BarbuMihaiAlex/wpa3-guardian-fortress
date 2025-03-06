
import React from 'react';
import { motion } from 'framer-motion';
import { useRouter } from '@/context/RouterContext';

interface ConfigurationStepProps {
  step: number;
  title: string;
  description: string;
  children: React.ReactNode;
  explanationText: string;
}

const ConfigurationStep: React.FC<ConfigurationStepProps> = ({
  step,
  title,
  description,
  children,
  explanationText,
}) => {
  const { 
    currentStep, 
    setCurrentStep, 
    setShowExplanation, 
    setCurrentExplanation 
  } = useRouter();

  const isActive = currentStep === step;

  const handleShowExplanation = () => {
    setCurrentExplanation(explanationText);
    setShowExplanation(true);
  };

  if (!isActive) return null;

  return (
    <motion.div
      className="router-card mb-8"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.4 }}
    >
      <div className="flex items-center mb-4">
        <div 
          className={`step-indicator ${
            isActive ? 'bg-router-blue' : 'bg-router-gray-medium'
          }`}
        >
          {step + 1}
        </div>
        <h3 className="ml-3 text-xl font-semibold text-router-black">{title}</h3>
      </div>
      
      <p className="text-router-gray-dark mb-6">{description}</p>
      
      <div className="space-y-6">
        {children}
      </div>
      
      <div className="mt-8 flex justify-between items-center">
        <button
          onClick={handleShowExplanation}
          className="text-router-blue hover:text-router-blue-light text-sm flex items-center transition-colors"
        >
          <svg className="w-4 h-4 mr-1" viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <circle cx="12" cy="12" r="10" strokeWidth="2" />
            <path d="M12 16v-4" strokeWidth="2" strokeLinecap="round" />
            <path d="M12 8h.01" strokeWidth="2" strokeLinecap="round" />
          </svg>
          Learn more about this setting
        </button>
        
        <div className="flex space-x-3">
          {step > 0 && (
            <button
              onClick={() => setCurrentStep(currentStep - 1)}
              className="px-4 py-2 border border-router-gray text-router-gray-dark rounded-md hover:bg-router-gray-light transition-colors"
            >
              Previous
            </button>
          )}
          
          <button
            onClick={() => {
              if (currentStep < 4) {
                setCurrentStep(currentStep + 1);
              }
            }}
            className="router-button"
          >
            {currentStep === 4 ? 'Finish' : 'Next'}
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default ConfigurationStep;
