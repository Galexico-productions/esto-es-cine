export interface MovieType extends Document {
    title: string;
    year?: string;
    description?: string;
    imdb_rating?: string;
    genre?: string[];
    is_watched?: boolean;
}
