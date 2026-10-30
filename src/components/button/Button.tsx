import { Text } from '../text';

import type React from 'react';
import type { FC } from 'react';

import styles from './Button.module.scss';

type ButtonProps = {
  title: string;
  onClick?: () => void;
  type?: React.ButtonHTMLAttributes<HTMLButtonElement>['type'];
};

export const Button: FC<ButtonProps> = ({ title, onClick, type }) => {
  return (
    <button className={styles.button} type={type} onClick={onClick}>
      <Text weight={800} uppercase>
        {title}
      </Text>
    </button>
  );
};
