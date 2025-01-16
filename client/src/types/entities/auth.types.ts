type SignupData = UserCredentials & {
  username: string;
  hashedPwd?: string;
}

type UserCredentials = {
  email: string;
  password: string;
}

export {
  SignupData,
  UserCredentials,
}
