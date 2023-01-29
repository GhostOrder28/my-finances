import { ValidationError, ValidationErrorItem } from "joi";

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
  return str.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
};

function groupValidationErrors (errors: ValidationError) {
  const itemErrors: ValidationErrorItem[] = [];
  const nonItemErrors: ValidationErrorItem[] = [];

  errors.details.forEach((err) => {
    if (err.path[0] === 'items') {
      itemErrors.push(err)
    } else {
      nonItemErrors.push(err)
    };
  })

  return {
    itemErrors,
    nonItemErrors
  }

  // const itemErrors = errors.details.filter((err) => {
  //   return err.path[0] === 'items'
  // });   
  // return itemErrors;
};

function getValidationErrorMessages (errors: ValidationErrorItem[], isArray?: boolean) {
  let parsedErrorMessages;

  if (isArray) {
    parsedErrorMessages = errors.reduce((acc, curr) => {
      console.log('current path: ', curr.path);
      console.log('current error context: ', curr.context);
      const field = curr.path[2];
      const idx = curr.path[1];
      const key = field + idx.toString();
      return { ...acc, [key]: curr.message }
    }, {});
  } else {
    parsedErrorMessages = errors.reduce((acc, curr) => {
      console.log('current path: ', curr.path);
      console.log('current error context: ', curr.context);
      const key = curr.path[0];
      return { ...acc, [key]: curr.message }
    }, {});
  };
  // const parsedErrorMessages = details.map((err) => ({
  //   key: err.context?.key || 'unknown key',
  //   message: err.message,
  // }));
  return parsedErrorMessages
};

export {
  qsToBool,
  strParseOut,
  strParseIn,
  getValidationErrorMessages,
  groupValidationErrors,
}
