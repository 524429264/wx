
import React from 'react';
import { Contact } from '../types';

interface ChatListProps {
  contacts: Contact[];
  onSelectContact: (contact: Contact) => void;
}

const ChatList: React.FC<ChatListProps> = ({ contacts, onSelectContact }) => {
  return (
    <div className="bg-white">
      {contacts.map((contact) => (
        <div 
          key={contact.id} 
          className="flex items-center p-3 border-b border-gray-100 active:bg-gray-100 cursor-pointer transition-colors"
          onClick={() => onSelectContact(contact)}
        >
          <div className="relative">
            <img src={contact.avatar} alt={contact.name} className="w-12 h-12 rounded-md object-cover" />
            {contact.unreadCount && contact.unreadCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] px-1.5 rounded-full min-w-[18px] text-center h-[18px] flex items-center justify-center border-2 border-white">
                {contact.unreadCount}
              </span>
            )}
          </div>
          <div className="ml-3 flex-1 overflow-hidden">
            <div className="flex justify-between items-center">
              <h3 className="text-base font-medium text-gray-900 truncate">{contact.name}</h3>
              <span className="text-xs text-gray-400">{contact.lastTime}</span>
            </div>
            <p className="text-sm text-gray-500 truncate mt-0.5">{contact.lastMessage}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ChatList;
