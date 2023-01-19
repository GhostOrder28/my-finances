import { SignupData } from '#backend/auth.types';

type UserData = Omit<SignupData, 'password' | 'hashedPwd'> & {
  _id: string;
};

export {
  UserData,
}
