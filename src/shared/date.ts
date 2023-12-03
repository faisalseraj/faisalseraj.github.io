export const toLocalDate = (date: Date) => {
  return new Date(date.getTime() - date.getTimezoneOffset() * 60 * 1000);
};

export const getTimeZoneCode = (date: Date) => {
  return date.toLocaleString('en', { timeZoneName: 'short' }).split(' ').pop();
};

export const getMaxDate = (...dates: (Date | undefined)[]) => {
  const defined = dates.filter((d) => d !== undefined);
  if (defined.length === 0) return undefined;
  return new Date(Math.max(...(defined as never[])));
};

export type DateStringsToDate<T extends object> = {
  [K in keyof T]: K extends `${string}Date`
    ? Date
    : K extends `${string}At`
    ? Date
    : T[K];
};

export const mapDatePropsToDate = <T extends Record<string, unknown>>(
  obj: T
) => {
  return Object.fromEntries(
    Object.keys(obj).map((k) => [
      k,
      obj[k] !== undefined
        ? k.endsWith('Date') || k.endsWith('At')
          ? new Date(obj[k] as string)
          : obj[k]
        : undefined
    ])
  ) as DateStringsToDate<T>;
};

export type DatesToStrings<T extends object> = {
  [K in keyof T]: K extends `${string}Date` ? string : T[K];
};

export const mapDatePropsToString = <T extends Record<string, unknown>>(
  obj: T
) => {
  return Object.fromEntries(
    Object.keys(obj).map((k) => [
      k,
      obj[k] !== undefined
        ? k.endsWith('Date')
          ? (obj[k] as Date).toISOString()
          : obj[k]
        : undefined
    ])
  ) as DatesToStrings<T>;
};
