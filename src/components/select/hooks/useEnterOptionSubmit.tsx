import { useEffect } from 'react';

import type { OptionType } from 'src/constants/articleProps';

type UseEnterOptionSubmit = {
  optionRef: React.RefObject<HTMLLIElement | null>;
  value: OptionType['value'];
  onClick: (value: OptionType['value']) => void;
};

export const useEnterOptionSubmit = ({
  optionRef,
  value,
  onClick,
}: UseEnterOptionSubmit): void => {
  useEffect(() => {
    const element = optionRef.current;

    if (!element) return;

    const handleKeyDown = (event: KeyboardEvent): void => {
      if (document.activeElement === element && event.key === 'Enter') {
        onClick(value);
      }
    };

    element.addEventListener('keydown', handleKeyDown);

    return (): void => {
      element.removeEventListener('keydown', handleKeyDown);
    };
  }, [optionRef, value, onClick]);
};
