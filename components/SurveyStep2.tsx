
import React from 'react';
import type { SurveyResponse } from '../types';
import { Button } from './Button';

interface SurveyStep2Props {
  data: SurveyResponse;
  updateData: (field: 'mostHatedTask', value: string) => void;
  onNext: () => void;
  onBack: () => void;
}

export const SurveyStep2: React.FC<SurveyStep2Props> = ({ data, updateData, onNext, onBack }) => {
  return (
    <div className="animate-slide-in">
      <h3 className="text-xl font-semibold text-re-dark-gray mb-6">What part of your day do you hate the most?</h3>
      
      <textarea
        value={data.mostHatedTask}
        onChange={(e) => updateData('mostHatedTask', e.target.value)}
        placeholder="e.g., Following up with cold leads, scheduling showings, paperwork..."
        className="w-full h-32 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-re-gold focus:border-re-gold transition mb-8"
        aria-label="Most hated task"
      />
      
      <div className="flex flex-col sm:flex-row gap-4">
        <Button onClick={onBack} variant="ghost">
          Back
        </Button>
        <Button onClick={onNext} disabled={!data.mostHatedTask.trim()}>
          Next
        </Button>
      </div>
    </div>
  );
};
