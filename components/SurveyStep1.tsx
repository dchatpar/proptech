
import React, { useState } from 'react';
import type { SurveyResponse } from '../types';
import { Button } from './Button';

interface SurveyStep1Props {
  data: SurveyResponse;
  updateData: (field: 'pain_points' | 'customPainPoints', value: string[]) => void;
  onNext: () => void;
}

const detailedAutomationPainPoints = {
  "Contracts": [
    {
      title: "One-Click Offer Generation",
      description: "Instantly create fully compliant offer documents from a few key details, eliminating repetitive data entry."
    },
    {
      title: "Auto-filling State Contracts",
      description: "Use AI to accurately populate official state contract templates from an MLS listing or even a business card photo."
    },
    {
      title: "Digital Signature Coordination",
      description: "An automated assistant that sends documents, tracks signatures, and sends polite reminders so you don't have to."
    }
  ],
  "Lead Nurture": [
    {
      title: "AI 'Ghosting' Fix",
      description: "Let an AI send human-like texts to cold leads for months, keeping you top-of-mind and notifying you instantly when they reply."
    },
    {
      title: "Automated Email Drip Campaigns",
      description: "Nurture new leads with tailored email sequences for different client types (e.g., first-time buyers, investors)."
    },
    {
      title: "Instant Lead Follow-up Bot",
      description: "Ensure no lead is missed with a 24/7 bot that engages, qualifies, and schedules calls on your calendar."
    }
  ],
  "Admin": [
    {
      title: "Automated Showing Coordination",
      description: "A bot that syncs with everyone's calendars to schedule viewings, send confirmations, and request feedback automatically."
    },
    {
      title: "Transaction Coordinator Bot",
      description: "A digital assistant to manage deadlines, track paperwork, and keep all parties informed from contract to close."
    },
    {
      title: "Client Paperwork Automation",
      description: "Streamline the collection of disclosures and forms, keeping everything securely organized for each transaction."
    }
  ],
  "Marketing": [
    {
      title: "Instant Listing Kit",
      description: "Generate a compelling MLS property description, a professional flyer, and an announcement email in seconds."
    },
    {
      title: "Automated Social Media Posting",
      description: "Keep your social media active with automatically created and scheduled posts for new listings and sales."
    },
    {
      title: "AI-Powered Ad Copy Generation",
      description: "Create and test multiple high-performing versions of ad headlines and text for your digital marketing campaigns."
    }
  ]
};

const DetailedOption: React.FC<{ 
  title: string; 
  description: string; 
  isSelected: boolean; 
  onToggle: () => void 
}> = ({ title, description, isSelected, onToggle }) => {
  return (
    <div
      onClick={onToggle}
      role="checkbox"
      aria-checked={isSelected}
      tabIndex={0}
      onKeyDown={(e) => (e.key === ' ' || e.key === 'Enter') && onToggle()}
      className={`p-4 border rounded-lg cursor-pointer transition-all duration-200 ${
        isSelected
          ? 'bg-re-blue bg-opacity-5 border-re-blue ring-2 ring-re-gold'
          : 'bg-white border-gray-300 hover:border-re-blue hover:bg-re-light-gray'
      }`}
    >
      <div className="flex items-start">
        <div className={`mr-4 mt-1 flex-shrink-0 w-5 h-5 rounded-md border-2 flex items-center justify-center transition-colors ${
            isSelected ? 'bg-re-blue border-re-blue' : 'border-gray-400'
        }`}>
            {isSelected && <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"></path></svg>}
        </div>
        <div>
            <h5 className="font-semibold text-re-dark-gray">{title}</h5>
            <p className="text-sm text-gray-600 mt-1">{description}</p>
        </div>
      </div>
    </div>
  );
};

export const SurveyStep1: React.FC<SurveyStep1Props> = ({ data, updateData, onNext }) => {
  const [currentCustomIdea, setCurrentCustomIdea] = useState('');

  const toggleOption = (optionTitle: string) => {
    const newSelection = data.pain_points.includes(optionTitle)
      ? data.pain_points.filter((item) => item !== optionTitle)
      : [...data.pain_points, optionTitle];
    updateData('pain_points', newSelection);
  };

  const handleAddIdea = () => {
    const trimmedIdea = currentCustomIdea.trim();
    if (trimmedIdea && !data.customPainPoints.includes(trimmedIdea)) {
      updateData('customPainPoints', [...data.customPainPoints, trimmedIdea]);
      setCurrentCustomIdea('');
    }
  };

  const handleRemoveIdea = (indexToRemove: number) => {
    const newCustomPoints = data.customPainPoints.filter((_, index) => index !== indexToRemove);
    updateData('customPainPoints', newCustomPoints);
  };

  const hasSelection = data.pain_points.length > 0 || data.customPainPoints.length > 0;

  return (
    <div className="animate-slide-in">
      <h3 className="text-xl font-semibold text-re-dark-gray mb-2">What are your biggest automation pain points?</h3>
      <p className="text-sm text-gray-500 mb-6">(Select all that apply or add your own)</p>
      
      <div className="space-y-6 mb-8">
        {Object.entries(detailedAutomationPainPoints).map(([category, options]) => (
          <div key={category}>
            <h4 className="font-semibold text-re-blue mb-3">{category}</h4>
            <div className="space-y-3">
              {options.map((option) => (
                <DetailedOption
                  key={option.title}
                  title={option.title}
                  description={option.description}
                  isSelected={data.pain_points.includes(option.title)}
                  onToggle={() => toggleOption(option.title)}
                />
              ))}
            </div>
          </div>
        ))}
        <div>
          <h4 className="font-semibold text-re-blue mb-3">Something else?</h4>
          <div className="flex gap-2 mb-3">
            <input
              type="text"
              value={currentCustomIdea}
              onChange={(e) => setCurrentCustomIdea(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  e.preventDefault();
                  handleAddIdea();
                }
              }}
              placeholder="Add another idea..."
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-re-gold focus:border-re-gold transition"
            />
            <button
              type="button"
              onClick={handleAddIdea}
              className="flex-shrink-0 bg-re-gold text-re-blue font-bold w-12 h-12 rounded-lg flex items-center justify-center text-2xl transition-transform transform hover:scale-105 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
              aria-label="Add custom idea"
              disabled={!currentCustomIdea.trim()}
            >
              +
            </button>
          </div>
          <div className="flex flex-wrap gap-2">
            {data.customPainPoints.map((idea, index) => (
              <div key={index} className="flex items-center bg-gray-200 rounded-full px-3 py-1 text-sm text-re-dark-gray animate-fade-in">
                <span>{idea}</span>
                <button
                  type="button"
                  onClick={() => handleRemoveIdea(index)}
                  className="ml-2 text-gray-500 hover:text-red-500 font-bold text-lg leading-none"
                  aria-label={`Remove ${idea}`}
                >
                  &times;
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
      
      <Button onClick={onNext} disabled={!hasSelection}>
        Next
      </Button>
    </div>
  );
};