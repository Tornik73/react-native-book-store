import * as RNLocalize from 'react-native-localize';
import i18n from 'i18n-js';

import ru from './ru';
import en from './en';
import he from './he';

const translations = { en, ru, he };

const { languageTag } = RNLocalize.findBestAvailableLanguage(
  Object.keys(translations),
) || { languageTag: 'en' };

i18n.locale = languageTag;
i18n.fallbacks = true;
i18n.translations = translations;

export default i18n;