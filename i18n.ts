import type {AbstractIntlMessages} from 'next-intl';
import {getRequestConfig} from 'next-intl/server';

export default getRequestConfig(async ({requestLocale}) => {
  const locale = (await requestLocale) ?? 'es';

  const messages = (await import(`./messages/${locale}.json`)).default as AbstractIntlMessages;

  return {
    locale,
    messages
  };
});