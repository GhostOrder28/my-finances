import { SignupData } from '../../types/entities/auth.types';

type AuthErrors = {
  authorizationError?: string;
  authenticationError?: string;  
}

type UserData = Omit<SignupData, 'password' | 'hashedPwd'> & {
  _id: string;
  errors: AuthErrors;
};

export {
  UserData,
  AuthErrors,
}
