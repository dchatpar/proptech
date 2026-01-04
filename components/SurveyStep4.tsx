
import React from 'react';
import type { SurveyResponse } from '../types';
import { Button } from './Button';

interface SurveyStep4Props {
  data: SurveyResponse;
  updateData: (field: 'wantsBeta' | 'name', value: boolean | string) => void;
  onSubmit: () => void;
  onBack: () => void;
}

export const SurveyStep4: React.FC<SurveyStep4Props> = ({ data, updateData, onSubmit, onBack }) => {
  return (
    <div className="animate-slide-in">
      <h3 className="text-xl font-semibold text-re-dark-gray mb-6">Ready to help shape the future of PropTech?</h3>
      
      <p className="text-gray-600 mb-6">
        One last click to submit your valuable feedback. If you opted-in for the beta, we'll be in touch soon!
      </p>

      {data.wantsBeta && !data.name && (
        <div className="mt-6 mb-8 animate-fade-in">
            <label htmlFor="name" className="block text-sm font-medium text-re-dark-gray mb-2">
            Just to confirm, what's your name?
            </label>
            <input
            type="text"
            id="name"
            value={data.name || ''}
            onChange={(e) => updateData('name', e.target.value)}
            placeholder="So we know who to contact"
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-re-gold focus:border-re-gold transition"
            />
        </div>
      )}
      
      <div className="flex flex-col sm:flex-row gap-4 mt-8">
        <Button onClick={onBack} variant="ghost">
          Back
        </Button>
        <Button onClick={onSubmit} variant="secondary">
          Submit Feedback
        </Button>
      </div>
    </div>
  );
};
