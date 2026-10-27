import clsxFn from 'clsx';
import { useState, useRef } from 'react';
import arrowDown from 'src/images/arrow-down.svg';

import { Option } from '../radio-group/Option';
import { Text } from '../text';
import { isFontFamilyClass } from './helpers/isFontFamilyClass';
import { useOutsideClickClose } from './hooks/useOutsideClickClose';

import type { MouseEventHandler, FC } from 'react';
import type { OptionType } from 'src/constants/articleProps';

import styles from './Select.module.scss';

type SelectProps = {
  selected: OptionType | null;
  options: OptionType[];
  placeholder?: string;
  onChange?: (selected: OptionType) => void;
  onClose?: () => void;
  title?: string;
};

export const Select: FC<SelectProps> = (props: SelectProps) => {
  const { options, placeholder, selected, onChange, onClose, title } = props;
  const [isMenuOpen, setIsOpen] = useState<boolean>(false);

  const rootRef = useRef<HTMLDivElement | null>(null);
  const placeholderRef = useRef<HTMLDivElement | null>(null);

  useOutsideClickClose({
    isMenuOpen,
    rootRef,
    onClose,
    onChange: setIsOpen,
  });

  const handleOptionClick = (option: OptionType): void => {
    setIsOpen(false);
    onChange?.(option);
  };

  const handlePlaceHolderClick: MouseEventHandler<HTMLDivElement> = () => {
    setIsOpen((prev) => !prev);
  };

  const status = selected ? 'selected' : 'empty';

  const customPlaceholderClass = selected?.optionClassName
    ? styles[selected.optionClassName as keyof typeof styles]
    : undefined;

  return (
    <div className={styles.container}>
      {title && (
        <Text size={12} weight={800} uppercase>
          {title}
        </Text>
      )}

      <div
        className={styles.selectWrapper}
        ref={rootRef}
        data-is-active={isMenuOpen}
        data-testid="selectWrapper"
      >
        <img src={arrowDown} alt="иконка стрелочки" className={styles.arrow} />

        <div
          className={clsxFn(styles.placeholder, customPlaceholderClass)}
          data-status={status}
          data-selected={!!selected?.value}
          onClick={handlePlaceHolderClick}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              e.preventDefault();
              setIsOpen((prev) => !prev);
            }
          }}
          role="button"
          tabIndex={0}
          ref={placeholderRef}
        >
          <Text
            family={
              selected?.className && isFontFamilyClass(selected.className)
                ? selected.className
                : undefined
            }
          >
            {selected?.title ?? placeholder}
          </Text>
        </div>

        {isMenuOpen && (
          <ul className={styles.select} data-testid="selectDropdown">
            {options
              .filter((option) => selected?.value !== option.value)
              .map((option) => (
                <Option
                  key={option.value}
                  option={option}
                  selected={selected}
                  groupName="select-option"
                  onChange={(opt) => handleOptionClick(opt)}
                />
              ))}
          </ul>
        )}
      </div>
    </div>
  );
};
