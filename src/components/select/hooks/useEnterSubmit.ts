import { useEffect } from 'react';

import type { RefObject } from 'react';

type UseEnterSubmitProps = {
  ref: RefObject<HTMLElement | null>;
  isMenuOpen: boolean;
  setIsOpen: (open: boolean) => void;
};

export const useEnterSubmit = ({
  ref,
  isMenuOpen,
  setIsOpen,
}: UseEnterSubmitProps): void => {
  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const handleKeyDown = (e: Event): void => {
      const event = e as KeyboardEvent;
      if (event.key === 'Enter') {
        event.preventDefault();
        setIsOpen(!isMenuOpen);
      }
    };

    element.addEventListener('keydown', handleKeyDown);

    return (): void => {
      element.removeEventListener('keydown', handleKeyDown);
    };
  }, [ref, isMenuOpen, setIsOpen]);
};
