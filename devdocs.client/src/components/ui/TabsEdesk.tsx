import React, { createContext, useContext, useState } from 'react';
import type { PropsWithChildren } from 'react';
import { motion, type Variants } from 'framer-motion';
import { cn } from '../../lib/utils';

interface TabsContextValue {
    activeId: string;
    setActiveId: (id: string) => void;
    orientation: 'horizontal' | 'vertical';
}

const TabsContext = createContext<TabsContextValue | null>(null);

// Hook personalizado para usar el contexto
const useTabs = () => {
    const context = useContext(TabsContext);
    if (!context) {
        throw new Error('useTabs must be used within a Tabs component');
    }
    return context;
};

interface TabsProps {
    defaultActiveId: string;
    orientation?: 'horizontal' | 'vertical';
}

interface TabTriggerProps {
    tabId: string;
    children?: React.ReactNode;
}

interface TabPanelProps {
    tabId: string;
    children?: React.ReactNode;
    animationVariants?: Variants;
    className?: string;
}

type TabsComponent = React.FC<PropsWithChildren<TabsProps>> & {
    List: React.FC<PropsWithChildren<{ className?: string }>>;
    Trigger: React.FC<PropsWithChildren<TabTriggerProps>>;
    Panels: React.FC<PropsWithChildren<{ className?: string }>>;
    Panel: React.FC<PropsWithChildren<TabPanelProps>>;
};

export const Tabs = (({
    defaultActiveId,
    orientation = 'horizontal',
    children
}: PropsWithChildren<TabsProps>) => {
    const [activeId, setActiveId] = useState(defaultActiveId);

    return (
        <TabsContext.Provider value={{ activeId, setActiveId, orientation }}>
            {children}
        </TabsContext.Provider>
    );
}) as TabsComponent;

const TabsList: React.FC<PropsWithChildren<{ className?: string }>> = ({ children, className }) => {
    const { orientation } = useTabs();
    
    return (
        <div 
            role="tablist" 
            className={cn(
                'tabs-header',
                orientation === 'horizontal' ? 'tabs-header-horizontal' : 'tabs-header-vertical',
                className
            )}
        >
            {children}
        </div>
    );
};

const TabsTrigger: React.FC<PropsWithChildren<TabTriggerProps>> = ({ tabId, children }) => {
    const { activeId, setActiveId } = useTabs();
    
    return (
        <button
            role="tab"
            className={`tab-button ${activeId === tabId ? 'active' : ''}`}
            aria-selected={activeId === tabId}
            onClick={() => setActiveId(tabId)}
        >
            {children}
        </button>
    );
};

const TabsPanels: React.FC<PropsWithChildren<{ className?: string }>> = ({ children, className }) => (
    <div className={cn("tab-content", className)}>{children}</div>
);

// Valor por defecto si no se pasa ninguna animación
const defaultAnimation: Variants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0 },
};

const TabsPanel: React.FC<PropsWithChildren<TabPanelProps>> = ({ 
    tabId, 
    children, 
    animationVariants = defaultAnimation,
    className 
}) => {
    const { activeId } = useTabs();
    
    if (activeId !== tabId) return null;

    return (
        <motion.div
            className={cn("doc-section", className)}
            variants={animationVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
            transition={{ duration: 0.2 }}
        >
            {children}
        </motion.div>
    );
};

Tabs.List = TabsList;
Tabs.Trigger = TabsTrigger;
Tabs.Panels = TabsPanels;
Tabs.Panel = TabsPanel;
