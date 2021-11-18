import { Observable } from "rxjs";
import { Thumbnail } from "./thumbnail";

export type Book = {
    id: number
    title: string,
    description: string,
    isbn: string,
    isAvailable: boolean,
    notes: string,
    deliveryDate?: Date,
    loanDate?: Date
    thumbnail$: Observable<Thumbnail>
}