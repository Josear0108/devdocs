import React, { createContext, useContext, useState } from 'react';
import type { PropsWithChildren } from 'react';

interface TabsContextValue {
    activeId: string;
    setActiveId: (id: string) => void;
}

const TabsContext = createContext<TabsContextValue | null>(null);

interface TabsProps {
    defaultActiveId: string;
}

interface TabTriggerProps {
    tabId: string;
    children?: React.ReactNode;
}

interface TabPanelProps {
    tabId: string;
    children?: React.ReactNode;
}

type TabsComponent = React.FC<PropsWithChildren<TabsProps>> & {
    List: React.FC<PropsWithChildren<{}>>;
    Trigger: React.FC<PropsWithChildren<TabTriggerProps>>;
    Panels: React.FC<PropsWithChildren<{}>>;
    Panel: React.FC<PropsWithChildren<TabPanelProps>>;
};

export const Tabs = (({
    defaultActiveId,
    children
}: PropsWithChildren<TabsProps>) => {
    const [activeId, setActiveId] = useState(defaultActiveId);

    return (
        <TabsContext.Provider value={{ activeId, setActiveId }}>
            <div className="tabs">{children}</div>
        </TabsContext.Provider>
    );
}) as TabsComponent;

Tabs.List = ({ children }: PropsWithChildren<{}>) => (
    <div role="tablist" className="tabs-header">
        {children}
    </div>
);

Tabs.Trigger = ({ tabId, children }: PropsWithChildren<TabTriggerProps>) => {
    const ctx = useContext(TabsContext);
    if (!ctx) {
        throw new Error('Tabs.Trigger must be used within a <Tabs>');
    }
    return (
        <button
            role="tab"
            className={`tab-button ${ctx.activeId === tabId ? 'active' : ''}`}
            aria-selected={ctx.activeId === tabId}
            onClick={() => ctx.setActiveId(tabId)}
        >
            {children}
        </button>
    );
};

Tabs.Panels = ({ children }: PropsWithChildren<{}>) => (
    <div className="tab-content">{children}</div>
);

Tabs.Panel = ({ tabId, children }: PropsWithChildren<TabPanelProps>) => {
    const ctx = useContext(TabsContext);
    if (!ctx) {
        throw new Error('Tabs.Panel must be used within a <Tabs>');
    }
    return ctx.activeId === tabId ? (
        <div role="tabpanel" className="doc-section">
            {children}
        </div>
    ) : null;
};
