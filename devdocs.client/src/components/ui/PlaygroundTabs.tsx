import React from 'react';

export interface PlaygroundTabsProps {
  activeTab: 'props' | 'css';
  onTabChange: (tab: 'props' | 'css') => void;
  propsContent: React.ReactNode;
  cssContent: React.ReactNode;
}

export const PlaygroundTabs: React.FC<PlaygroundTabsProps> = ({
  activeTab,
  onTabChange,
  propsContent,
  cssContent
}) => {
  return (
    <div className="playground-tabs">
      <div className="tabs-header sticky">
        <button
          className={`tab-button ${activeTab === 'props' ? 'active' : ''}`}
          onClick={() => onTabChange('props')}
        >
          Props
        </button>
        <button
          className={`tab-button ${activeTab === 'css' ? 'active' : ''}`}
          onClick={() => onTabChange('css')}
        >
          CSS
        </button>
      </div>
      
      <div className="tabs-content">
        {activeTab === 'props' && (
          <div className="tab-panel props-panel">
            {propsContent}
          </div>
        )}
        
        {activeTab === 'css' && (
          <div className="tab-panel css-panel">
            {cssContent}
          </div>
        )}
      </div>
    </div>
  );
};
