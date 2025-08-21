export class MovieDomain {
    private title: string;
    private id: string;
    private poster_path?: string;
    constructor(title: string, id: string, poster_path?: string) {
        this.title = title
        this.id = id;
        this.poster_path = poster_path;
    }
    public getTitle(): string {
        return this.title;
    }

    public getId(): string {
        return this.id;
    }
    public getPosterPath(): string | undefined {
        return this.poster_path;
    }
}