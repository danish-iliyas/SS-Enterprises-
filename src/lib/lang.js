import { cookies } from 'next/headers';
import { LANG_COOKIE, makeT, normaliseLang, pickLang } from './i18n';

// Server components: read the visitor's language from the cookie set by the language switcher.
export async function getI18n() {
  const lang = normaliseLang((await cookies()).get(LANG_COOKIE)?.value);
  return { lang, t: makeT(lang), tx: (obj) => pickLang(obj, lang) };
}
