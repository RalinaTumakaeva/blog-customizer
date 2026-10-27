import clsxFn from 'clsx';
import { useRef, useState } from 'react';
import {
  backgroundColors,
  contentWidthArr,
  defaultArticleState,
  fontColors,
  fontFamilyOptions,
  fontSizeOptions,
} from 'src/constants/articleProps';

import { ArrowButton } from '../arrow-button/ArrowButton';
import { Button } from '../button/Button';
import { RadioGroup } from '../radio-group';
import { Select } from '../select';
import { useOutsideClickClose } from '../select/hooks/useOutsideClickClose';
import { Separator } from '../separator';
import { Text } from '../text';
import { useClose } from './hooks/useClose';

import type { FC, FormEvent } from 'react';
import type { ArticleStateType } from 'src/constants/articleProps';

import styles from './ArticleParamsForm.module.scss';

type ArticleParamsFormProps = {
  articleState: ArticleStateType;
  setArticleState: (param: ArticleStateType) => void;
};

export const ArticleParamsForm: FC<ArticleParamsFormProps> = ({
  articleState,
  setArticleState,
}) => {
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);

  const [formState, setFormState] = useState({
    fontFamily: articleState.fontFamilyOption,
    fontSize: articleState.fontSizeOption,
    fontColor: articleState.fontColor,
    backgroundColor: articleState.backgroundColor,
    contentWidth: articleState.contentWidth,
  });

  const rootRef = useRef<HTMLElement | null>(null);
  const formRef = useRef<HTMLFormElement | null>(null);

  // Функция закрытия по Escape
  const handleClose = (): void => {
    setIsMenuOpen(false);
  };

  useOutsideClickClose({
    isMenuOpen,
    rootRef,
    onClose: () => setIsMenuOpen(false),
    onChange: setIsMenuOpen,
  });

  useClose({
    rootRef: formRef,
    onClose: handleClose,
  });

  const formResetHandler = (): void => {
    setFormState((prevState) => ({
      ...prevState,
      fontFamily: defaultArticleState.fontFamilyOption,
      fontSize: defaultArticleState.fontSizeOption,
      fontColor: defaultArticleState.fontColor,
      backgroundColor: defaultArticleState.backgroundColor,
      contentWidth: defaultArticleState.contentWidth,
    }));

    setArticleState(defaultArticleState);
  };

  const formSubmitHandler = (evt: FormEvent): void => {
    evt.preventDefault();

    setArticleState({
      ...formState,
      fontFamilyOption: formState.fontFamily,
      fontSizeOption: formState.fontSize,
      fontColor: formState.fontColor,
      backgroundColor: formState.backgroundColor,
      contentWidth: formState.contentWidth,
    });

    setIsMenuOpen((prev) => !prev);
  };

  return (
    <>
      <ArrowButton
        onClick={() => setIsMenuOpen((prev) => !prev)}
        isMenuOpen={isMenuOpen}
      />
      <aside
        className={clsxFn(styles.container, isMenuOpen && styles.container_open)}
        ref={rootRef}
      >
        <form
          className={styles.form}
          onSubmit={formSubmitHandler}
          onReset={formResetHandler}
          ref={formRef}
        >
          <Text as="h2" size={31} weight={800} uppercase={true}>
            Задайте параметры
          </Text>

          <Select
            title="Шрифт"
            selected={formState.fontFamily}
            options={fontFamilyOptions}
            onChange={(selectedOption) =>
              setFormState((prevState) => ({
                ...prevState,
                fontFamily: selectedOption,
              }))
            }
          />

          <RadioGroup
            options={fontSizeOptions}
            selected={formState.fontSize}
            title="Размер шрифта"
            name="Размер шрифта"
            onChange={(selectedOption) =>
              setFormState((prevState) => ({
                ...prevState,
                fontSize: selectedOption,
              }))
            }
          />

          <Select
            options={fontColors}
            selected={formState.fontColor}
            title="Цвет шрифта"
            onChange={(selectedOption) =>
              setFormState((prevState) => ({
                ...prevState,
                fontColor: selectedOption,
              }))
            }
          />
          <Separator />

          <Select
            options={backgroundColors}
            selected={formState.backgroundColor}
            title="Цвет фона"
            onChange={(selectedOption) =>
              setFormState((prevState) => ({
                ...prevState,
                backgroundColor: selectedOption,
              }))
            }
          />

          <Select
            options={contentWidthArr}
            selected={formState.contentWidth}
            title="Ширина контента"
            onChange={(selectedOption) =>
              setFormState((prevState) => ({
                ...prevState,
                contentWidth: selectedOption,
              }))
            }
          />

          <div className={styles.bottomContainer}>
            <Button title="Сбросить" type="reset" />
            <Button title="Применить" type="submit" />
          </div>
        </form>
      </aside>
    </>
  );
};
