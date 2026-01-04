
import React from 'react';

interface ProgressBarProps {
  currentStep: number;
  totalSteps: number;
}

const stepLabels = ["Pain Points", "Custom Input", "Hated Task", "Beta Interest"];

export const ProgressBar: React.FC<ProgressBarProps> = ({ currentStep, totalSteps }) => {
  return (
    <div className="w-full px-2 sm:px-4 mb-8">
      <div className="flex items-start">
        {Array.from({ length: totalSteps }, (_, i) => i + 1).map((step, index) => (
          <React.Fragment key={step}>
            <div className="flex flex-col items-center w-1/4">
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-lg transition-all duration-300 ${
                  currentStep >= step ? 'bg-re-gold text-re-blue' : 'bg-gray-200 text-gray-400'
                } ${currentStep === step ? 'ring-4 ring-re-gold ring-opacity-50' : ''}`}
              >
                {currentStep > step ? (
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"></path></svg>
                ) : (
                  step
                )}
              </div>
              <p className={`mt-2 text-xs text-center transition-colors duration-300 ${
                currentStep >= step ? 'text-re-dark-gray' : 'text-gray-400'
              } ${currentStep === step ? 'font-bold' : 'font-medium'}`}>
                {stepLabels[index] || `Step ${step}`}
              </p>
            </div>
            
            {/* Connector Line */}
            {index < totalSteps - 1 && (
                <div className="flex-1 mt-3.5">
                    <div className={`h-1 transition-colors duration-300 ${
                        currentStep > step ? 'bg-re-gold' : 'bg-gray-200'
                    }`}></div>
                </div>
            )}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};
