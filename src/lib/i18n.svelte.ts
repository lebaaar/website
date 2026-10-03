import { getLocale, setLocale, locales } from '$lib/paraglide/runtime';

export type Locale = Parameters<typeof setLocale>[0];

export const supportedLocales = locales as readonly Locale[];

// Switches locale in place instead of paraglide's default full-page reload.
export const i18n = $state<{ locale: Locale }>({ locale: getLocale() as Locale });

export function switchLocale(lang: Locale) {
	if (lang === i18n.locale) return;
	setLocale(lang, { reload: false });
	i18n.locale = getLocale() as Locale;
}
