type VerifyOptions = {
    message: string;
}
type VerifyFunction = {
  (
    username: string,
    password: string,
    done: (error: any, user?: any, options?: VerifyOptions) => void
  ): void;
}

export {
  VerifyOptions,
}
