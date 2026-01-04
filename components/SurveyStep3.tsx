
import React from 'react';
import type { SurveyResponse } from '../types';
import { Button } from './Button';

interface SurveyStep3Props {
  data: SurveyResponse;
  updateData: (field: 'wantsBeta' | 'name', value: boolean | string) => void;
  onNext: () => void;
  onBack: () => void;
}

export const SurveyStep3: React.FC<SurveyStep3Props> = ({ data, updateData, onNext, onBack }) => {
  return (
    <div className="animate-slide-in">
      <h3 className="text-xl font-semibold text-re-dark-gray mb-6">If we built a solution for this, would you be interested in being a Beta tester?</h3>
      
      <div className="flex gap-4 mb-6">
          <Button 
            variant={data.wantsBeta === true ? 'secondary' : 'ghost'}
            onClick={() => updateData('wantsBeta', true)}
            className={`border ${data.wantsBeta === true ? 'border-re-gold' : 'border-gray-300'}`}
          >
            Yes, count me in!
          </Button>
          <Button
            variant={data.wantsBeta === false ? 'secondary' : 'ghost'}
            onClick={() => updateData('wantsBeta', false)}
            className={`border ${data.wantsBeta === false ? 'border-re-gold' : 'border-gray-300'}`}
          >
            No, thanks
          </Button>
      </div>

      {data.wantsBeta && (
        <div className="mt-6 mb-8 animate-fade-in">
            <label htmlFor="name" className="block text-sm font-medium text-re-dark-gray mb-2">
            Great! What's your name? (Optional)
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
        <Button onClick={onNext} disabled={data.wantsBeta === null}>
          Next
        </Button>
      </div>
    </div>
  );
};
