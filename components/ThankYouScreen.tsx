import React from 'react';
import type { SurveyResponse } from '../types';
import { Button } from './Button';

interface ThankYouScreenProps {
  onReset: () => void;
  lastResponse: SurveyResponse;
}

export const ThankYouScreen: React.FC<ThankYouScreenProps> = ({ onReset, lastResponse }) => {
  const allPainPoints = [
    ...lastResponse.pain_points,
    ...lastResponse.customPainPoints,
  ];

  return (
    <div className="text-center animate-fade-in">
      <svg className="w-16 h-16 mx-auto text-green-500 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
      <h2 className="text-2xl font-bold text-re-dark-gray mb-2">
        {lastResponse.name ? `Thank You, ${lastResponse.name}!` : 'Thank You!'}
      </h2>
      <p className="text-gray-600 mb-6">
        Your feedback is invaluable. We're one step closer to building tools that truly help agents succeed.
      </p>

      <div className="text-left bg-re-light-gray p-4 rounded-lg mb-8 border border-gray-200">
        <h4 className="font-semibold text-re-blue mb-2">Your Submission Summary:</h4>
        <ul className="text-sm text-gray-700 list-disc list-inside space-y-1">
          {lastResponse.name && <li><strong>Name:</strong> {lastResponse.name}</li>}
          <li><strong>Interests:</strong> {allPainPoints.join(', ') || 'N/A'}</li>
          <li><strong>Most Hated Task:</strong> {lastResponse.mostHatedTask || 'N/A'}</li>
          <li><strong>Beta Interest:</strong> {lastResponse.wantsBeta === null ? 'N/A' : (lastResponse.wantsBeta ? 'Yes' : 'No')}</li>
        </ul>
      </div>
      
      <div className="space-y-4">
        <Button onClick={onReset} variant="secondary">
          Submit Another Response
        </Button>
      </div>
    </div>
  );
};
