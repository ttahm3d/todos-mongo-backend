declare global {
  namespace NodeJS {
    interface ProcessEnv {
      DB_CONNECTION_STRING: string;
      PORT: string;
    }
  }
}

export {};
