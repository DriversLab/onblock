export interface QuestsData {
  id: string;
  name: string;
  stagesCompleted: number;
  totalStages: number;
  requiresConfirmation?: boolean;
  requiresAnswerCheck?: boolean;
}
