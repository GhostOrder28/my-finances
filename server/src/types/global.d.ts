declare namespace NodeJS {
  interface ProcessEnv {
    // [index: string]: string | undefined;
    MONGO_CONNECTION_STRING: string | undefined;
  }
}
