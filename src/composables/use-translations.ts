import { type ResourcePath } from "@intlify/core-base";

import { type Locale, type Messages, type Schema } from "~/config/i18n.config";

// @ts-expect-error
export function useTranslations(): (
	key: ResourcePath<Messages>,
	values?: Record<string, unknown>,
) => string;
export function useTranslations<T extends keyof Messages>(
	namespace: T,
): (key: ResourcePath<Messages[T]>, values?: Record<string, unknown>) => string;
export function useTranslations<T extends keyof Messages>(namespace?: T) {
	const { t } = useI18n<Schema, Locale>();

	if (namespace == null) {
		return function translate(key: ResourcePath<Messages>, values: Record<string, unknown> = {}) {
			return t(key, values);
		};
	}

	return function translate(key: ResourcePath<Messages[T]>, values: Record<string, unknown> = {}) {
		return t([namespace, key].join("."), values);
	};
}
