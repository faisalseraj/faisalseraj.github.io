import validator from 'validator';
import * as yup from 'yup';

export const phoneRegExp = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;

export const emailRegExp =
  /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

export const nameRegExp = /^[A-Za-z ]+$/;

export const passwordSchema = () =>
  yup.object({
    password: yup
      .string()
      .required()
      .min(8, 'formValidation.passwordLength')
      .matches(/^(?=.*[a-z])(?=.*[A-Z]).*$/, 'formValidation.passwordReq'),
    retypedPassword: yup
      .string()
      .oneOf([yup.ref('password')], 'formValidation.passwordMatch')
  });

export const extractPhoneNumber = (phone: string) => {
  return phone?.replace(phoneRegExp, '+1$1$2$3');
};

export const formatPhoneNumber = (phone: string) => {
  return phone?.replace(phoneRegExp, '($1) $2-$3');
};

export function formatUSPhoneNumber(phoneNumberString: string) {
  const cleaned = ('' + phoneNumberString).replace(/\D/g, '');
  const match = cleaned.match(/^(1|)?(\d{3})(\d{3})(\d{4})$/);
  if (match) {
    const intlCode = match[1] ? '+1 ' : '';
    return [intlCode, '(', match[2], ') ', match[3], '-', match[4]].join('');
  }
  return null;
}

export const wordCount = (text: string | undefined) => {
  return text ? text.trim().split(' ').length : 0;
};

export const wordsLeft = (text: string | undefined, wordLimit: number) => {
  return wordLimit - wordCount(text);
};

export const lineCount = (html: string | undefined) => {
  if (html) {
    html = html
      .replace(/<p[^>]*>(&nbsp;( )*|<br( )*\/>)*<\/p>/g, '') // Exclude empty lines
      .replace(/<p[^>]*>(&nbsp;( )*|<br( )*\/>)+/g, '<p>') // Exclude spaces and line breaks at start of paragraph
      .replace(/(&nbsp;( )*|<br( )*\/>)+<\/p>/g, '</p>'); // Exclude spaces and line breaks at end of paragraph
    return new DOMParser()
      .parseFromString(html, 'text/html')
      .querySelectorAll('p, br, li').length;
  }
  return 0;
};

export const isValidZip = (zip: string | undefined) =>
  zip !== undefined && validator.isPostalCode(zip, 'US');

export const isValidZipForCountry = (
  zip: string | undefined,
  country: 'any' | validator.PostalCodeLocale
) => zip !== undefined && validator.isPostalCode(zip, country);
