import { Observable } from "rxjs";
import { Thumbnail } from "./thumbnail";

export type Book = {
    id: number
    thumbnail$: Observable<Thumbnail>
}