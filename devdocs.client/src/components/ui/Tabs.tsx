"use client"

import React, { createContext, useContext, forwardRef } from "react"
import "../../styles/ui/tabs.css"

interface TabsContextType {
  value: string
  onValueChange: (value: string) => void
}

const TabsContext = createContext<TabsContextType | undefined>(undefined)

const useTabsContext = () => {
  const context = useContext(TabsContext)
  if (!context) {
    throw new Error("Tabs components must be used within a TabsProvider")
  }
  return context
}

interface TabsProps extends React.HTMLAttributes<HTMLDivElement> {
  defaultValue: string
  value?: string
  onValueChange?: (value: string) => void
  className?: string
}

export const Tabs = forwardRef<HTMLDivElement, TabsProps>(
  ({ children, defaultValue, value, onValueChange, className = "", ...props }, ref) => {
    const [selectedValue, setSelectedValue] = React.useState(value || defaultValue)

    const handleValueChange = (newValue: string) => {
      setSelectedValue(newValue)
      onValueChange?.(newValue)
    }

  const tabsClasses = ["tabs", className].join(" ")

  return (
      <TabsContext.Provider value={{ value: selectedValue, onValueChange: handleValueChange }}>
        <div ref={ref} className={tabsClasses} {...props}>
          {children}
        </div>
    </TabsContext.Provider>
  )
}
)

Tabs.displayName = "Tabs"

interface TabsListProps extends React.HTMLAttributes<HTMLDivElement> {
  className?: string
}

export const TabsList = forwardRef<HTMLDivElement, TabsListProps>(({ children, className = "", ...props }, ref) => {
  const tabsListClasses = ["tabs-list", className].join(" ")

  return (
    <div ref={ref} className={tabsListClasses} role="tablist" {...props}>
      {children}
    </div>
  )
})

TabsList.displayName = "TabsList"

interface TabsTriggerProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  value: string
  className?: string
}

export const TabsTrigger = forwardRef<HTMLButtonElement, TabsTriggerProps>(
  ({ children, value, className = "", ...props }, ref) => {
    const { value: selectedValue, onValueChange } = useTabsContext()
    const isSelected = selectedValue === value

    const tabsTriggerClasses = ["tabs-trigger", isSelected ? "tabs-trigger-selected" : "", className].join(" ")

  return (
    <button
        ref={ref}
        className={tabsTriggerClasses}
        role="tab"
        aria-selected={isSelected}
        onClick={() => onValueChange(value)}
        {...props}
    >
      {children}
    </button>
  )
}
)

TabsTrigger.displayName = "TabsTrigger"

interface TabsContentProps extends React.HTMLAttributes<HTMLDivElement> {
  value: string
  className?: string
}

export const TabsContent = forwardRef<HTMLDivElement, TabsContentProps>(
  ({ children, value, className = "", ...props }, ref) => {
    const { value: selectedValue } = useTabsContext()
    const isSelected = selectedValue === value

    const tabsContentClasses = ["tabs-content", isSelected ? "tabs-content-selected" : "", className].join(" ")

  return (
      <div
        ref={ref}
        className={tabsContentClasses}
        role="tabpanel"
        aria-hidden={!isSelected}
        {...props}
    >
        {isSelected && children}
      </div>
  )
}
)

TabsContent.displayName = "TabsContent"
