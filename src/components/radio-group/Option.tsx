import { useRef } from 'react';

import { Text } from '../text';

import type { FC } from 'react';
import type { OptionType } from 'src/constants/articleProps';

import styles from './RadioGroup.module.scss';

type OptionProps = {
  option: OptionType;
  selected: OptionType | null;
  groupName: string;
  onChange?: (option: OptionType) => void;
};

export const Option: FC<OptionProps> = ({ option, selected, groupName, onChange }) => {
  const optionRef = useRef<HTMLDivElement>(null);

  const isChecked = selected ? option.value === selected.value : false;
  const inputId = `${groupName}_radio_item_with_value__${option.value}`;

  const handleChange = (): void => {
    onChange?.(option);
  };

  return (
    <div
      className={styles.item}
      data-checked={isChecked}
      data-testid={inputId}
      tabIndex={0}
      ref={optionRef}
      onKeyDown={(e) => {
        if (e.key === 'Enter') {
          e.preventDefault();
          handleChange();
        }
      }}
      onClick={handleChange}
    >
      <input
        className={styles.input}
        type="radio"
        name={groupName}
        id={inputId}
        value={option.value}
        checked={isChecked}
        onChange={handleChange}
        tabIndex={-1}
      />
      <label className={styles.label} htmlFor={inputId}>
        <Text size={18} uppercase>
          {option.title}
        </Text>
      </label>
    </div>
  );
};
