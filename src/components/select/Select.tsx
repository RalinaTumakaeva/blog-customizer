import clsxFn from 'clsx';
import { useState } from 'react';
import arrowDown from 'src/images/arrow-down.svg';

import { Option } from '../radio-group/Option';
import { Text } from '../text';
import { isFontFamilyClass } from './helpers/isFontFamilyClass';

import type { MouseEventHandler, FC } from 'react';
import type { OptionType } from 'src/constants/articleProps';

import styles from './Select.module.scss';

type SelectProps = {
  selected: OptionType | null;
  options: OptionType[];
  placeholder?: string;
  onChange?: (selected: OptionType) => void;
  title?: string;
};

export const Select: FC<SelectProps> = (props: SelectProps) => {
  const { options, placeholder, selected, onChange, title } = props;
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);

  const handleOptionClick = (option: OptionType): void => {
    setIsMenuOpen(false);
    onChange?.(option);
  };

  const handlePlaceholderClick: MouseEventHandler<HTMLDivElement> = (e) => {
    e.stopPropagation();
    setIsMenuOpen((prev) => !prev);
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
        data-is-active={isMenuOpen}
        data-testid="selectWrapper"
      >
        <img src={arrowDown} alt="иконка стрелочки" className={styles.arrow} />

        <div
          className={clsxFn(styles.placeholder, customPlaceholderClass)}
          data-status={status}
          data-selected={!!selected?.value}
          onClick={handlePlaceholderClick}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              e.preventDefault();
              e.stopPropagation();
              setIsMenuOpen((prev) => !prev);
            }
          }}
          role="button"
          tabIndex={0}
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
