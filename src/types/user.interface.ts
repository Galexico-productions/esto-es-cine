export interface UserType {
  id: string;
  userName: string;
  email: string;
  isAdmin: boolean;
  favoriteMovies: string[];
}

export interface DBUserType extends UserType {
  password: string;
}