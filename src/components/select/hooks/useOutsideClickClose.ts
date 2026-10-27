import { useEffect } from 'react';

import type { RefObject } from 'react';

type UseOutsideClickClose = {
  isMenuOpen: boolean;
  rootRef: RefObject<HTMLElement | null>;
  onClose?: () => void;
  onChange?: (isOpen: boolean) => void;
};

export const useOutsideClickClose = ({
  isMenuOpen,
  rootRef,
  onClose,
  onChange,
}: UseOutsideClickClose): void => {
  useEffect(() => {
    if (!isMenuOpen) return;

    const element = rootRef.current;
    if (!element) return;

    const handleClickOutside = (event: MouseEvent): void => {
      if (!element.contains(event.target as Node)) {
        onClose?.();
        onChange?.(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return (): void => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isMenuOpen, rootRef, onClose, onChange]);
};
