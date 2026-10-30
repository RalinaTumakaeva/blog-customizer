import clsxFn from 'clsx';
import arrow from 'src/images/arrow.svg';

import type React from 'react';
import type { FC } from 'react';

import styles from './ArrowButton.module.scss';

type OnClick = {
  onClick?: (state: boolean) => void;
  isMenuOpen?: boolean;
};

export const ArrowButton: FC<OnClick> = ({ onClick, isMenuOpen }) => {
  const onClickHandler = (): void => {
    onClick?.(!isMenuOpen);
  };

  return (
    <div
      role="button"
      aria-label="Открыть/Закрыть форму параметров статьи"
      tabIndex={0}
      className={`${styles.container} ${isMenuOpen ? styles.container_open : ''}`}
      onClick={(e: React.MouseEvent) => {
        e.stopPropagation();
        onClickHandler();
      }}
    >
      <img
        src={arrow}
        alt="иконка стрелочки"
        className={clsxFn(styles.arrow, isMenuOpen && styles.arrow_open)}
      />
    </div>
  );
};
