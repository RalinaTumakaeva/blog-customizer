import { useEffect } from 'react';

import type { RefObject } from 'react';

type TUseClose = {
  rootRef: RefObject<HTMLFormElement | null>;
  onClose: () => void;
};

export const useClose = ({ rootRef, onClose }: TUseClose): void => {
  useEffect(() => {
    const element = rootRef.current;
    if (!element) {
      return;
    }

    const handleKeyDown = (e: KeyboardEvent): void => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    element.addEventListener('keydown', handleKeyDown);

    return (): void => {
      element.removeEventListener('keydown', handleKeyDown);
    };
  }, [rootRef, onClose]);
};
