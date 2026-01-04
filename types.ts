
export interface SurveyResponse {
  id: string;
  name?: string;
  pain_points: string[];
  customPainPoints: string[];
  mostHatedTask: string;
  wantsBeta: boolean | null;
  timestamp: string;
}