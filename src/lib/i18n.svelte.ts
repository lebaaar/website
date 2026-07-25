import { getLocale, setLocale, locales } from '$paraglide/runtime';

export type Locale = Parameters<typeof setLocale>[0];

export const supportedLocales = locales as readonly Locale[];

// Reactive locale used to re-render translated content in place, without the
// full-page reload paraglide does by default. `setLocale(reload: false)` updates
// the runtime synchronously, so getLocale() reflects the change immediately.
export const i18n = $state<{ locale: Locale }>({ locale: getLocale() as Locale });

export function switchLocale(lang: Locale) {
	if (lang === i18n.locale) return;
	setLocale(lang, { reload: false });
	i18n.locale = getLocale() as Locale;
}
