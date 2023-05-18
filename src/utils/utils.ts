import I18N from '~/config/site/i18n';

const formatter =
  I18N?.dateFormatter ||
  new Intl.DateTimeFormat('en', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    timeZone: 'UTC',
  });

const numberFormatter =
  I18N?.numberFormatter ||
  new Intl.NumberFormat('en', {
    notation: 'compact',
  });

export const getFormattedDate = (date: Date) => (date ? formatter.format(date) : '');

export const trim = (str = "", ch?: string) => {
  let start = 0,
    end = str.length || 0;
  while (start < end && str[start] === ch) ++start;
  while (end > start && str[end - 1] === ch) --end;
  return start > 0 || end < str.length ? str.substring(start, end) : str;
};

export const currentYear = new Date().getFullYear();

export const getFormattedNumber = (number: number) => (number ? numberFormatter.format(number) : '')