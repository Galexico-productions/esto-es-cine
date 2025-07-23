export class MovieDomain {
    private title: string;
    private id: string;
    constructor(title: string, id: string) {
        this.title = title
        this.id = id
    }
    public getTitle(): string {
        return this.title;
    }

    public getId(): string {
        return this.id;
    }
}