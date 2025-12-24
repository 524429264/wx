
import React from 'react';
import { TabType } from '../types';
import { ICONS } from '../constants';

interface LayoutProps {
  children: React.ReactNode;
  activeTab: TabType;
  setActiveTab: (tab: TabType) => void;
  title: string;
  showBack?: boolean;
  onBack?: () => void;
}

const Layout: React.FC<LayoutProps> = ({ children, activeTab, setActiveTab, title, showBack, onBack }) => {
  return (
    <div className="flex flex-col h-screen max-w-md mx-auto bg-gray-50 overflow-hidden relative shadow-2xl">
      {/* Header */}
      <header className="wechat-bg-gray border-b border-gray-200 h-14 flex items-center justify-between px-4 shrink-0 z-10">
        <div className="flex items-center space-x-2">
          {showBack && (
            <button onClick={onBack} className="p-1 -ml-1">
              <ICONS.ArrowLeft className="w-6 h-6 text-gray-700" />
            </button>
          )}
          <h1 className="text-lg font-medium text-gray-800 truncate">{title}</h1>
        </div>
        <div className="flex items-center space-x-4">
          <ICONS.Search className="w-5 h-5 text-gray-700" />
          <ICONS.Plus className="w-6 h-6 text-gray-700" />
        </div>
      </header>

      {/* Content */}
      <main className="flex-1 overflow-y-auto no-scrollbar pb-16">
        {children}
      </main>

      {/* Tab Bar */}
      {!showBack && (
        <nav className="fixed bottom-0 left-0 right-0 max-w-md mx-auto bg-gray-50 border-t border-gray-200 flex justify-around items-center h-16 safe-area-bottom z-20">
          <TabItem 
            icon={<ICONS.Chat className="w-6 h-6" />} 
            label="微信" 
            active={activeTab === 'chat'} 
            onClick={() => setActiveTab('chat')} 
          />
          <TabItem 
            icon={<ICONS.Contacts className="w-6 h-6" />} 
            label="通讯录" 
            active={activeTab === 'contacts'} 
            onClick={() => setActiveTab('contacts')} 
          />
          <TabItem 
            icon={<ICONS.Discover className="w-6 h-6" />} 
            label="发现" 
            active={activeTab === 'discover'} 
            onClick={() => setActiveTab('discover')} 
          />
          <TabItem 
            icon={<ICONS.Me className="w-6 h-6" />} 
            label="我" 
            active={activeTab === 'me'} 
            onClick={() => setActiveTab('me')} 
          />
        </nav>
      )}
    </div>
  );
};

interface TabItemProps {
  icon: React.ReactNode;
  label: string;
  active: boolean;
  onClick: () => void;
}

const TabItem: React.FC<TabItemProps> = ({ icon, label, active, onClick }) => (
  <button onClick={onClick} className="flex flex-col items-center justify-center flex-1 py-1">
    <div className={`${active ? 'text-green-600' : 'text-gray-500'}`}>
      {icon}
    </div>
    <span className={`text-[10px] mt-0.5 ${active ? 'text-green-600' : 'text-gray-500'}`}>
      {label}
    </span>
  </button>
);

export default Layout;
