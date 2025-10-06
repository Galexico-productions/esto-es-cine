export interface UserType {
  id: string;
  userName: string;
  email: string;
  isAdmin: boolean;
  favoriteMovies: FavoriteMovie[];
}

export interface DBUserType extends UserType {
  password: string;
}

export interface FavoriteMovie {
  title: string;
  tmdbId: string;
  poster_path?: string;
}