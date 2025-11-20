import { useState } from 'react';

export type ViewMode = 'card' | 'table';

export const useToggleView = (initialView: ViewMode = 'card') => {
  const [viewMode, setViewMode] = useState<ViewMode>(initialView);

  const toggleView = () => {
    setViewMode((prev) => (prev === 'card' ? 'table' : 'card'));
  };

  return { viewMode, toggleView, setViewMode };
};
