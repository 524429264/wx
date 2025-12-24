
export type TabType = 'chat' | 'contacts' | 'discover' | 'me';

export interface Message {
  id: string;
  text: string;
  sender: 'me' | 'ai' | 'other';
  timestamp: number;
  isStreaming?: boolean;
}

export interface Contact {
  id: string;
  name: string;
  avatar: string;
  lastMessage?: string;
  lastTime?: string;
  unreadCount?: number;
}

export interface Post {
  id: string;
  author: string;
  avatar: string;
  content: string;
  images: string[];
  timestamp: string;
  likes: number;
  comments: number;
}
