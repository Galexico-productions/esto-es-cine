export interface MovieType extends Document {
    id: string;
    title: string;
    tmdbId?: string;
    year?: string;
    description?: string;
    imdb_rating?: string;
    genre?: string[];
    is_watched?: boolean;
}

export interface MovieTitleType {
    title: string;
}

export interface MovieIDType {
    _id: string
}