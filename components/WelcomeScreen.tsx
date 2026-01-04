
import React from 'react';
import { Button } from './Button';

interface WelcomeScreenProps {
  onStartNew: () => void;
  hasDraft: boolean;
  onLoadDraft: () => void;
}

export const WelcomeScreen: React.FC<WelcomeScreenProps> = ({ onStartNew, hasDraft, onLoadDraft }) => {
  return (
    <div className="text-center animate-fade-in">
      <h2 className="text-2xl font-bold text-re-dark-gray mb-2">Tired of Repetitive Tasks?</h2>
      <p className="text-gray-600 mb-6">
        Take this 60-second survey to tell us your biggest automation pain points. Your feedback will shape the next generation of tools for real estate agents.
      </p>
      
      <div className="space-y-4">
        {hasDraft && (
          <Button onClick={onLoadDraft} variant="secondary">
            Continue Previous Draft
          </Button>
        )}
        <Button onClick={onStartNew} variant={hasDraft ? 'primary' : 'secondary'}>
          {hasDraft ? 'Start a New Survey' : 'Get Started'}
        </Button>
      </div>
    </div>
  );
};
