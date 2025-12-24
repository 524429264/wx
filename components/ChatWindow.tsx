
import React, { useState, useRef, useEffect } from 'react';
import { Message, Contact } from '../types';
import { ICONS } from '../constants';

interface ChatWindowProps {
  contact: Contact;
  messages: Message[];
  onSendMessage: (text: string) => void;
  isAITyping?: boolean;
}

const ChatWindow: React.FC<ChatWindowProps> = ({ contact, messages, onSendMessage, isAITyping }) => {
  const [inputValue, setInputValue] = useState('');
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isAITyping]);

  const handleSend = () => {
    if (inputValue.trim()) {
      onSendMessage(inputValue.trim());
      setInputValue('');
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSend();
    }
  };

  return (
    <div className="flex flex-col h-full bg-[#ededed]">
      {/* Messages */}
      <div 
        ref={scrollRef}
        className="flex-1 overflow-y-auto p-4 space-y-4 no-scrollbar pb-24"
      >
        {messages.map((msg) => (
          <div 
            key={msg.id} 
            className={`flex ${msg.sender === 'me' ? 'justify-end' : 'justify-start'}`}
          >
            {msg.sender !== 'me' && (
              <img src={contact.avatar} className="w-10 h-10 rounded-md mr-2 mt-1" alt="avatar" />
            )}
            <div 
              className={`max-w-[70%] px-3 py-2 rounded-md shadow-sm relative ${
                msg.sender === 'me' 
                  ? 'bg-[#95ec69] text-gray-800 rounded-tr-none' 
                  : 'bg-white text-gray-800 rounded-tl-none'
              }`}
            >
              <p className="text-sm whitespace-pre-wrap break-words">{msg.text}</p>
              {msg.isStreaming && (
                <span className="inline-block w-1 h-4 ml-1 bg-gray-400 animate-pulse align-middle" />
              )}
            </div>
            {msg.sender === 'me' && (
              <img src="https://picsum.photos/seed/me/100" className="w-10 h-10 rounded-md ml-2 mt-1" alt="avatar" />
            )}
          </div>
        ))}
        {isAITyping && (
          <div className="flex justify-start">
             <img src={contact.avatar} className="w-10 h-10 rounded-md mr-2 mt-1" alt="avatar" />
             <div className="bg-white px-3 py-2 rounded-md shadow-sm rounded-tl-none">
                <div className="flex space-x-1">
                  <div className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce"></div>
                  <div className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce delay-75"></div>
                  <div className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce delay-150"></div>
                </div>
             </div>
          </div>
        )}
      </div>

      {/* Input Area */}
      <div className="fixed bottom-0 left-0 right-0 max-w-md mx-auto bg-[#f7f7f7] border-t border-gray-200 px-3 py-2 pb-8 flex items-end space-x-2 z-30">
        <ICONS.Plus className="w-7 h-7 text-gray-600 mb-1" />
        <textarea
          rows={1}
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={handleKeyDown}
          className="flex-1 max-h-32 bg-white rounded-md border-none focus:ring-0 p-2 text-sm resize-none overflow-y-auto"
          placeholder="发送消息"
        />
        <ICONS.Smile className="w-7 h-7 text-gray-600 mb-1" />
        {inputValue.trim() ? (
          <button 
            onClick={handleSend}
            className="wechat-bg-green text-white px-4 py-1.5 rounded-md text-sm font-medium mb-1 transition-opacity"
          >
            发送
          </button>
        ) : (
          <ICONS.Plus className="w-7 h-7 text-gray-600 mb-1 rotate-45 hidden" />
        )}
      </div>
    </div>
  );
};

export default ChatWindow;
