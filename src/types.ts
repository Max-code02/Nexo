export interface EventItem {
  id: string;
  title: string;
  category: string;
  game?: string;
  dayTime: string;
  dateStr: string;
  description: string;
  prize?: string;
  participants: number;
  maxParticipants?: number;
  iconType: 'trophy' | 'star' | 'cube' | 'gamepad';
  tag: string;
}

export interface TeamRole {
  id: string;
  title: string;
  category: string;
  icon: string;
  shortDesc: string;
}

export interface DiscordChannel {
  id: string;
  name: string;
  category: 'WILLKOMMEN' | 'COMMUNITY' | 'GAMING' | 'SUPPORT' | 'VOICE';
  unread?: boolean;
  type: 'text' | 'voice';
  members?: string[];
  description?: string;
}

export interface RuleItem {
  number: number;
  title: string;
  description: string;
  severity: 'Info' | 'Wichtig' | 'Kritisch';
}

export interface LFGPost {
  id: string;
  game: string;
  author: string;
  discordTag: string;
  lookingFor: string;
  rank?: string;
  timeAgo: string;
  micRequired: boolean;
  spotsLeft: number;
}
