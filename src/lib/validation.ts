const LOCAL = "[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+(?:\\.[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+)*";
const LABEL = '[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?';

export const EMAIL_PATTERN = new RegExp(`^${LOCAL}@(?:${LABEL}\\.)+[a-zA-Z]{2,}$`);

export const MAX_EMAIL = 200;
export const MAX_MESSAGE = 10000;

export function isValidEmail(value: string) {
	return value.length <= MAX_EMAIL && EMAIL_PATTERN.test(value);
}
