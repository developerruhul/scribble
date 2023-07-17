export const EMAIL_EXISTS_ERROR = {
  issues: [
    {
      path: ['email'],
      message: 'An account with this email already exists!',
    },
  ],
};

export const EMAIL_DOES_NOT_EXISTS_ERROR = {
  issues: [
    {
      path: ['email'],
      message: 'No account with this email was found!',
    },
  ],
};

export const PASSWORD_DONT_MATCH = {
  issues: [
    {
      path: ['password'],
      message: 'Wrong password! Please try again.',
    },
  ],
};
