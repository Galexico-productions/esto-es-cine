declare namespace NodeJS {
  interface ProcessEnv {
    PORT?: string;
    MONGODB_URI: string;
    TMDB_API_KEY: string;
  }
}

