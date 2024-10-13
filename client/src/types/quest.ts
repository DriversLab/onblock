export interface QuestsData {
  isActive?: boolean;
  pictureUrl: string;
  tag: string;
  id: string;
  name: string;
  description?: string;
  stagesCompleted: number;
  totalStages: number;
  requiresConfirmation?: boolean;
  requiresAnswerCheck?: boolean;
  authorId: string;
}
