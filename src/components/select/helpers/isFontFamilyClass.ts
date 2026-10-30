import { fontFamilyClasses } from 'src/constants/articleProps';

import type { FontFamiliesClasses } from 'src/constants/articleProps';

export function isFontFamilyClass(family?: string): family is FontFamiliesClasses {
  if (!family) return false;
  return (fontFamilyClasses as readonly string[]).includes(family);
}
