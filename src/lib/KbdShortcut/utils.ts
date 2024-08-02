import { parseKeybinding } from 'tinykeys';
import { GetFormattedShortcut } from './types';

function getFormattedKey(key: string) {
  switch (key) {
    case 'Meta':
      return '⌘';
    case 'Control':
      return 'Ctrl';
    case 'Escape':
      return 'Esc';
    case 'ArrowUp':
      return '↑';
    case 'ArrowDown':
      return '↓';
    case 'ArrowLeft':
      return '←';
    case 'ArrowRight':
      return '→';
    case 'Backspace':
      return '⌫';
    case 'Enter':
      return '↵';
  }
  return key;
}

export const getFormattedShortcut: GetFormattedShortcut = (shortcut) => {
  const parsedShortcut = parseKeybinding(shortcut);

  return parsedShortcut.map((group) => {
    const flatGroup = group.flat();
    return flatGroup.map(getFormattedKey);
  });
};
