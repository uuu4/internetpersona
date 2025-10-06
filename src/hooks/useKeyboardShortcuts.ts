import { useEffect } from 'react';

interface ShortcutConfig {
  key: string;
  ctrl?: boolean;
  shift?: boolean;
  callback: () => void;
}

export const useKeyboardShortcuts = (shortcuts: ShortcutConfig[]) => {
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      shortcuts.forEach(({ key, ctrl, shift, callback }) => {
        const isCtrlMatch = ctrl === undefined || event.ctrlKey === ctrl || event.metaKey === ctrl;
        const isShiftMatch = shift === undefined || event.shiftKey === shift;
        const isKeyMatch = event.key.toLowerCase() === key.toLowerCase();

        if (isCtrlMatch && isShiftMatch && isKeyMatch) {
          event.preventDefault();
          callback();
        }
      });
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [shortcuts]);
};
