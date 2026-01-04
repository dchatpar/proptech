
import React, { useState, useCallback, useEffect } from 'react';
import type { SurveyResponse } from './types';
import { WelcomeScreen } from './components/WelcomeScreen';
import { SurveyStep1 } from './components/SurveyStep1';
import { SurveyStep2 } from './components/SurveyStep2';
import { SurveyStep3 } from './components/SurveyStep3';
import { SurveyStep4 } from './components/SurveyStep4';
import { ThankYouScreen } from './components/ThankYouScreen';
import { ProgressBar } from './components/ProgressBar';
import { Logo } from './components/Logo';

const TOTAL_STEPS = 4;
const LOCAL_STORAGE_KEY = 'realtor-survey-draft';

const generateNewResponse = (): SurveyResponse => ({
  id: crypto.randomUUID(),
  name: '',
  pain_points: [],
  customPainPoints: [],
  mostHatedTask: '',
  wantsBeta: null,
  timestamp: new Date().toISOString(),
});

const App: React.FC = () => {
  const [step, setStep] = useState(0); // 0: Welcome, 1-4: Survey, 5: Thank You
  const [currentResponse, setCurrentResponse] = useState<SurveyResponse>(generateNewResponse());
  const [hasDraft, setHasDraft] = useState<boolean>(false);
  const [saveMessage, setSaveMessage] = useState<string>('');

  useEffect(() => {
    const savedDraft = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (savedDraft) {
      try {
        JSON.parse(savedDraft);
        setHasDraft(true);
      } catch (e) {
        console.error("Removing invalid draft from localStorage", e);
        localStorage.removeItem(LOCAL_STORAGE_KEY);
      }
    }
  }, []);

  const handleLoadDraft = useCallback(() => {
    const savedDraft = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (savedDraft) {
      try {
        const { response, step: savedStep } = JSON.parse(savedDraft);
        if (response && savedStep) {
          setCurrentResponse(response);
          setStep(savedStep);
          setHasDraft(false);
        }
      } catch (e) {
        console.error("Failed to load draft:", e);
        localStorage.removeItem(LOCAL_STORAGE_KEY);
        setHasDraft(false);
      }
    }
  }, []);
  
  const handleSaveDraft = useCallback(() => {
    try {
      const draftData = { response: currentResponse, step };
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(draftData));
      setSaveMessage('Draft saved successfully!');
      setTimeout(() => setSaveMessage(''), 2500);
    } catch (e) {
      console.error("Failed to save draft:", e);
      setSaveMessage('Could not save draft.');
      setTimeout(() => setSaveMessage(''), 2500);
    }
  }, [currentResponse, step]);

  const handleNext = useCallback(() => {
    setStep((prevStep) => Math.min(prevStep + 1, TOTAL_STEPS + 1));
  }, []);

  const handleBack = useCallback(() => {
    setStep((prevStep) => Math.max(prevStep - 1, 1));
  }, []);

  const handleStartNew = useCallback(() => {
    localStorage.removeItem(LOCAL_STORAGE_KEY);
    setHasDraft(false);
    setCurrentResponse(generateNewResponse());
    setStep(1);
  }, []);

  const updateResponse = useCallback((field: keyof SurveyResponse, value: any) => {
    setCurrentResponse((prev) => ({ ...prev, [field]: value }));
  }, []);

  const handleSubmit = useCallback(() => {
    const finalResponse = {
        ...currentResponse,
        // Combine selected and custom pain points for submission
        all_pain_points: [
            ...currentResponse.pain_points,
            ...currentResponse.customPainPoints
        ]
    };
    
    console.log('--- MOCK API CALL ---');
    console.log('Submitting to backend:', JSON.stringify(finalResponse, null, 2));
    console.log('--- END MOCK API CALL ---');

    localStorage.removeItem(LOCAL_STORAGE_KEY);
    setHasDraft(false);
    handleNext();
  }, [currentResponse, handleNext]);

  const handleReset = useCallback(() => {
    setCurrentResponse(generateNewResponse());
    setStep(0);
  }, []);

  const renderStep = () => {
    switch (step) {
      case 1:
        return <SurveyStep1 data={currentResponse} updateData={updateResponse} onNext={handleNext} />;
      case 2:
        return <SurveyStep2 data={currentResponse} updateData={updateResponse} onNext={handleNext} onBack={handleBack} />;
      case 3:
        return <SurveyStep3 data={currentResponse} updateData={updateResponse} onNext={handleNext} onBack={handleBack} />;
      case 4:
        return <SurveyStep4 data={currentResponse} updateData={updateResponse} onSubmit={handleSubmit} onBack={handleBack} />;
      case 5:
        return <ThankYouScreen onReset={handleReset} lastResponse={currentResponse} />;
      default:
        return <WelcomeScreen onStartNew={handleStartNew} hasDraft={hasDraft} onLoadDraft={handleLoadDraft} />;
    }
  };

  return (
    <div className="bg-re-light-gray min-h-screen font-sans flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-md mx-auto">
        <header className="text-center mb-6">
          <Logo />
          <h1 className="text-3xl font-bold text-re-blue">Real Estate Automation</h1>
          <p className="text-re-dark-gray">Help Us Build the Future of PropTech</p>
        </header>

        {step > 0 && step <= TOTAL_STEPS && (
            <ProgressBar currentStep={step} totalSteps={TOTAL_STEPS} />
        )}

        <main className="bg-white p-6 sm:p-8 rounded-xl shadow-lg transition-all duration-500">
          {renderStep()}
        </main>

        {step > 0 && step <= TOTAL_STEPS && (
            <div className="mt-6 text-center h-8">
                <button 
                    onClick={handleSaveDraft}
                    className="text-sm text-re-blue hover:underline focus:outline-none font-medium transition-opacity active:opacity-75"
                    aria-label="Save draft and exit"
                >
                    Save Draft
                </button>
                {saveMessage && <p className="text-sm text-green-600 mt-2 animate-fade-in">{saveMessage}</p>}
            </div>
        )}
      </div>
    </div>
  );
};

export default App;
