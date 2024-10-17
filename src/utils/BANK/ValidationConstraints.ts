/* eslint-disable unicorn/filename-case */
import {validate} from 'validate.js';

import { translate } from '@/core';

interface Constraints {
  [key: string]: {
    presence?: {allowEmpty: boolean};
    format?: {pattern: RegExp; message: string; flags?: string};
    email?: boolean;
    length?: {minimum: number; message: string};
    numericality?: {message: string};
  };
}

export const validateString = (id: string, value: string): string | undefined => {
  const constraints: Constraints = {
    [id]: {
      presence: {
        allowEmpty: false,
      },
    },
  };

  if (value !== '') {
    constraints[id].format = {
      pattern: /.+/i,
      message: translate('bank_screens.canblank'),
    };
  }

  const validationResult = validate({[id]: value}, constraints);
  return validationResult && validationResult[id]?.[0];
};

export const validateEmail = (id: string, value: string): string | undefined => {
  const constraints: Constraints = {
    [id]: {
      presence: {
        allowEmpty: false,
      },
    },
  };

  if (value !== '') {
    constraints[id].email = true;
  }

  const validationResult = validate({[id]: value}, constraints);
  return validationResult && validationResult[id]?.[0];
};

export const validatePassword = (id: string, value: string): string | undefined => {
  const constraints: Constraints = {
    [id]: {
      presence: {
        allowEmpty: false,
      },
    },
  };

  if (value !== '') {
    constraints[id].length = {
      minimum: 6,
      message: translate('bank_screens.must6characters'),
    };
  }

  const validationResult = validate({[id]: value}, constraints);
  return validationResult && validationResult[id]?.[0];
};

export const validateNumber = (id: string, value: string): string | undefined => {
  const constraints: Constraints = {
    [id]: {
      presence: {
        allowEmpty: false,
      },
      numericality: {
        message: translate('bank_screens.mustvalidnumber'),
      },
    },
  };

  const validationResult = validate({[id]: value}, constraints);
  return validationResult && validationResult[id]?.[0];
};

export const validateCreditCardNumber = (id: string, value: string) => {
  const constraints = {
    presence: {
      allowEmpty: false,
    },
    format: {
      pattern: /^(?:\d{4}-){3}\d{4}$|^\d{16}$/,
      message: translate('bank_screens.Invalidcreditcard'),
    },
  };

  const validationResult = validate({[id]: value}, {[id]: constraints});
  return validationResult && validationResult[id];
};

export const validateCVV = (id: string, value: string) => {
  const constraints = {
    presence: {
      allowEmpty: false,
    },
    format: {
      pattern: /^[0-9]{3,4}$/,
      message: translate('bank_screens.InvalidCVV'),
    },
  };

  const validationResult = validate({[id]: value}, {[id]: constraints});
  return validationResult && validationResult[id];
};

export const validateExpiryDate = (id: string, value: string) => {
  const constraints = {
    presence: {
      allowEmpty: false,
    },
    format: {
      pattern: /^(0[1-9]|1[0-2])\/?([0-9]{2})$/,
      message: translate('bank_screens.Invalid_expiry'),
    },
  };

  const validationResult = validate({[id]: value}, {[id]: constraints});
  return validationResult && validationResult[id];
};
