import { useEffect } from 'react';

import type { RefObject } from 'react';

type UseOutsideClickCloseProps = {
  isMenuOpen: boolean;
  rootRef: RefObject<HTMLElement | null>;
  onClose: () => void;
};

export const useOutsideClickClose = ({
  isMenuOpen,
  rootRef,
  onClose,
}: UseOutsideClickCloseProps): void => {
  useEffect(() => {
    if (!isMenuOpen || !rootRef.current) return;

    const handleClickOutside = (e: MouseEvent): void => {
      const target = e.target as Node;
      if (rootRef.current && !rootRef.current.contains(target)) {
        onClose();
      }
    };

    const handleEscape = (e: KeyboardEvent): void => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    document.addEventListener('click', handleClickOutside);
    document.addEventListener('keydown', handleEscape);

    return (): void => {
      document.removeEventListener('click', handleClickOutside);
      document.removeEventListener('keydown', handleEscape);
    };
  }, [isMenuOpen, rootRef, onClose]);
};
