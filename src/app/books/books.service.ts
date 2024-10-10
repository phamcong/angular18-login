import { Injectable } from "@angular/core";
import { Book } from "./books.store";
import { firstValueFrom, Observable, of } from "rxjs";

@Injectable({ providedIn: 'root' })
export class BooksService {
  constructor() { }

  getAll(): Promise<Book[]> {
    return firstValueFrom(of([]));
  }

  getByQuery(query: string): Observable<Book[]> {
    return of([]);
  }
}