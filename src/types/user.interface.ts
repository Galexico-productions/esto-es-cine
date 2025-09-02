export interface UserType {
  id: string;
  name: string;
  email: string;
  isAdmin: boolean;
  favoriteMovies: string[];
}

export interface DBUserType extends UserType {
  password: string;
}