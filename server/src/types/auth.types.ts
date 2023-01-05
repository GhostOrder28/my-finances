type SignupData = UserCredentials & {
  username: string;
}

type UserCredentials = {
  email: string;
  password: string;
}

type User = {
  _id: string;
  username: string;
  email: string;
  password: string;
  receivables: number;
  debtors: number;
  creationDate: Date;
}

export {
  SignupData,
  UserCredentials,
  User
}
