
import React, { useState, useEffect, useCallback } from 'react';
import Layout from './components/Layout';
import ChatList from './components/ChatList';
import ChatWindow from './components/ChatWindow';
import DiscoverView from './components/DiscoverView';
import { TabType, Contact, Message } from './types';
import { streamChat } from './services/geminiService';

const INITIAL_CONTACTS: Contact[] = [
  {
    id: 'ai-assistant',
    name: 'Gemini 智能助手',
    avatar: 'https://picsum.photos/seed/ai-bot/100',
    lastMessage: '你好！我是你的智能助手，有什么我可以帮你的吗？',
    lastTime: '12:45',
    unreadCount: 1
  },
  {
    id: '2',
    name: '张三',
    avatar: 'https://picsum.photos/seed/zhang/100',
    lastMessage: '明天一起吃饭吗？',
    lastTime: '昨日',
    unreadCount: 0
  },
  {
    id: '3',
    name: '公司群',
    avatar: 'https://picsum.photos/seed/work/100',
    lastMessage: '收到，马上处理。',
    lastTime: '18:22',
    unreadCount: 5
  }
];

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<TabType>('chat');
  const [selectedContact, setSelectedContact] = useState<Contact | null>(null);
  const [messages, setMessages] = useState<Record<string, Message[]>>({
    'ai-assistant': [
      { id: '1', text: '你好！我是你的智能助手，有什么我可以帮你的吗？', sender: 'ai', timestamp: Date.now() }
    ]
  });
  const [isAITyping, setIsAITyping] = useState(false);

  const handleSendMessage = async (text: string) => {
    if (!selectedContact) return;

    const contactId = selectedContact.id;
    const newMessage: Message = {
      id: Date.now().toString(),
      text,
      sender: 'me',
      timestamp: Date.now()
    };

    setMessages(prev => ({
      ...prev,
      [contactId]: [...(prev[contactId] || []), newMessage]
    }));

    if (contactId === 'ai-assistant') {
      setIsAITyping(true);
      
      const aiMessageId = (Date.now() + 1).toString();
      const initialAIMessage: Message = {
        id: aiMessageId,
        text: '',
        sender: 'ai',
        timestamp: Date.now(),
        isStreaming: true
      };

      setMessages(prev => ({
        ...prev,
        [contactId]: [...(prev[contactId] || []), initialAIMessage]
      }));

      let accumulatedText = "";
      try {
        const stream = streamChat(text);
        for await (const chunk of stream) {
          accumulatedText += chunk;
          setMessages(prev => ({
            ...prev,
            [contactId]: prev[contactId].map(m => 
              m.id === aiMessageId ? { ...m, text: accumulatedText } : m
            )
          }));
        }
      } finally {
        setIsAITyping(false);
        setMessages(prev => ({
          ...prev,
          [contactId]: prev[contactId].map(m => 
            m.id === aiMessageId ? { ...m, isStreaming: false } : m
          )
        }));
      }
    }
  };

  const renderContent = () => {
    if (selectedContact) {
      return (
        <ChatWindow 
          contact={selectedContact} 
          messages={messages[selectedContact.id] || []}
          onSendMessage={handleSendMessage}
          isAITyping={isAITyping}
        />
      );
    }

    switch (activeTab) {
      case 'chat':
        return <ChatList contacts={INITIAL_CONTACTS} onSelectContact={setSelectedContact} />;
      case 'contacts':
        return <div className="p-4 text-center text-gray-500">通讯录（演示中）</div>;
      case 'discover':
        return <DiscoverView />;
      case 'me':
        return (
          <div className="bg-gray-100 min-h-full">
            <div className="bg-white flex items-center p-6 mb-2">
              <img src="https://picsum.photos/seed/me/100" className="w-16 h-16 rounded-lg mr-4" alt="me" />
              <div>
                <h2 className="text-xl font-bold">微信名</h2>
                <p className="text-sm text-gray-500 mt-1">微信号: ai_dev_2024</p>
              </div>
            </div>
            <div className="bg-white px-4">
              <div className="py-4 border-b border-gray-100">服务</div>
              <div className="py-4 border-b border-gray-100">收藏</div>
              <div className="py-4 border-b border-gray-100">朋友圈</div>
              <div className="py-4">设置</div>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  const getTitle = () => {
    if (selectedContact) return selectedContact.name;
    switch (activeTab) {
      case 'chat': return '微信';
      case 'contacts': return '通讯录';
      case 'discover': return '发现';
      case 'me': return '';
      default: return '微信';
    }
  };

  return (
    <Layout 
      activeTab={activeTab} 
      setActiveTab={setActiveTab} 
      title={getTitle()}
      showBack={!!selectedContact}
      onBack={() => setSelectedContact(null)}
    >
      {renderContent()}
    </Layout>
  );
};

export default App;
