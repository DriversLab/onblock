export interface UserData {
    id: number;
    first_name: string;
    last_name?: string;
    username?: string;
    quests: [];
    language_code: string;
    is_premium?: boolean;
    photo_url?: string;
    profile_color: {
      bg: string;
      text: string;
    }
  }
