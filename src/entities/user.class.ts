export class UserDomain {
  constructor(
    public id: string = "",
    public name: string,
    public email: string,
    private passwordHash: string,
    public isAdmin: boolean,
    public favoriteMovies: string[]
  ) { }

  getPasswordHash(): string {
    return this.passwordHash;
  }

  addFavorite(movieId: string) {
    if (!this.favoriteMovies.includes(movieId)) {
      this.favoriteMovies.push(movieId);
    }
  }
  removeFavorite(movieId: string) {
    this.favoriteMovies = this.favoriteMovies.filter(id => id !== movieId);
  }

  async verifyPassword(plainPassword: string, hasher: { compare(p: string, h: string): Promise<boolean> }): Promise<boolean> {
    return hasher.compare(plainPassword, this.passwordHash);
  }
}
