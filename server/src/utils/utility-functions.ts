import { ValidationError } from "joi";

function qsToBool (qs: string) {
  return (qs.toLowerCase() === 'true')
};

function strParseIn (str: string) {
  const parsedStr = str.trim()
    .replaceAll(' ', '-')
    .replaceAll('_', '-')
    .toLowerCase();
  return parsedStr;
};

function strParseOut (str: string) {
  if (str) {
    return str.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
  } else {
    return null
  }
};

function getValidationErrorMessages (error: ValidationError) {
  const { details } = error;
  const parsedErrorMessages = details.map((err) => ({
    key: err.context?.key || 'unknown key',
    message: err.message,
  }));
  return parsedErrorMessages
};

export {
  qsToBool,
  strParseOut,
  strParseIn,
  getValidationErrorMessages,
}
