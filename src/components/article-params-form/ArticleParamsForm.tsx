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

import type { FC } from 'react';
import type { ArticleStateType } from 'src/constants/articleProps';

import styles from './ArticleParamsForm.module.scss';

type ArticleParamsFormProps = {
  articleState: ArticleStateType;
  setArticleState: (state: ArticleStateType) => void;
};

export const ArticleParamsForm: FC<ArticleParamsFormProps> = ({
  articleState,
  setArticleState,
}) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const [draft, setDraft] = useState<ArticleStateType>(articleState);

  const rootRef = useRef<HTMLElement | null>(null);

  useOutsideClickClose({
    isMenuOpen,
    rootRef,
    onClose: () => setIsMenuOpen(false),
  });

  const handleReset = (): void => {
    setDraft(defaultArticleState);
    setArticleState(defaultArticleState);
  };

  const handleApply = (): void => {
    setArticleState(draft);
    setIsMenuOpen(false);
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
          onSubmit={(e) => {
            e.preventDefault();
            handleApply();
          }}
        >
          <Text as="h2" size={31} weight={800} uppercase>
            Задайте параметры
          </Text>

          <Select
            title="Шрифт"
            selected={draft.fontFamilyOption}
            options={fontFamilyOptions}
            onChange={(selectedOption) =>
              setDraft((prev) => ({ ...prev, fontFamilyOption: selectedOption }))
            }
          />

          <RadioGroup
            options={fontSizeOptions}
            selected={draft.fontSizeOption}
            title="Размер шрифта"
            name="Размер шрифта"
            onChange={(selectedOption) =>
              setDraft((prev) => ({ ...prev, fontSizeOption: selectedOption }))
            }
          />

          <Select
            options={fontColors}
            selected={draft.fontColor}
            title="Цвет шрифта"
            onChange={(selectedOption) =>
              setDraft((prev) => ({ ...prev, fontColor: selectedOption }))
            }
          />

          <Separator />

          <Select
            options={backgroundColors}
            selected={draft.backgroundColor}
            title="Цвет фона"
            onChange={(selectedOption) =>
              setDraft((prev) => ({ ...prev, backgroundColor: selectedOption }))
            }
          />

          <Select
            options={contentWidthArr}
            selected={draft.contentWidth}
            title="Ширина контента"
            onChange={(selectedOption) =>
              setDraft((prev) => ({ ...prev, contentWidth: selectedOption }))
            }
          />

          <div className={styles.bottomContainer}>
            <Button title="Сбросить" type="button" onClick={handleReset} />
            <Button title="Применить" type="submit" />
          </div>
        </form>
      </aside>
    </>
  );
};
