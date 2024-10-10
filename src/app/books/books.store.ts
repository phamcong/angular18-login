import { computed, inject } from '@angular/core';
import {
  patchState,
  signalStore,
  withComputed,
  withMethods,
  withState,
} from '@ngrx/signals';
import { tapResponse } from '@ngrx/operators';
import { BooksService } from './books.service';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { debounceTime, distinctUntilChanged, pipe, switchMap, tap } from 'rxjs';

export type Book = {
  id: number;
  title: string;
  author: string;
  description: string;
  price: number;
  image: string;
};

type BooksState = {
  books: Book[];
  isLoading: boolean;
  filter: {
    query: string;
    order: 'asc' | 'desc';
  };
};

const initialState: BooksState = {
  books: [],
  isLoading: false,
  filter: {
    query: '',
    order: 'asc',
  },
};

export const BooksStore = signalStore(
  withState(initialState),
  withComputed(({ books, filter }) => {
    return {
      booksCount: computed(() => books().length),
      sortedBooks: computed(() => {
        const direction = filter.order() === 'asc' ? 1 : -1;
        return books().sort((a, b) => {
          return a.title.localeCompare(b.title) * direction;
        })
      })
    }
  }),
  withMethods((store, bookService = inject(BooksService)) => {
    return {
      updateQuery: (query: string): void => {
        patchState(store, state => ({
          filter: {
            ...state.filter,
            query
          }
        }))
      },
      updateOrder: (order: 'asc' | 'desc'): void => {
        patchState(store, state => ({
          filter: {
            ...state.filter,
            order
          }
        }))
      },
      async loadAll(): Promise<void> {
        patchState(store, { isLoading: true });
        const books = await bookService.getAll();
        patchState(store, { books, isLoading: false });
      },
      loadByQuery: rxMethod<string>(
        pipe(
          debounceTime(300),
          distinctUntilChanged(),
          tap(() => patchState(store, { isLoading: true })),
          switchMap(query => {
            return bookService.getByQuery(query).pipe(
              tapResponse({
                next: (res) => patchState(store, { books: res, isLoading: false }),
                error: (err) => {
                  patchState(store, { isLoading: false });
                  console.error(err);
                }
              })
            )
          })
        )
      )
    }
  })
)

export const BooksStore1 = signalStore(
  // Providing `BooksStore` at the root level with
  // { providerIn: 'root' } will make it available
  withState(initialState),
  withComputed(({ books, filter }) => {
    return {
      booksCount: computed(() => books().length),
      sortedBooks: computed(() => {
        const direction = filter.order() === 'asc' ? 1 : -1;
        return books().sort((a, b) => {
          return a.title.localeCompare(b.title) * direction;
        });
      }),
    };
  }),
  withMethods((store, booksService = inject(BooksService)) => {
    return {
      updateQuery: (query: string): void => {
        patchState(store, state => ({
          filter: {
            ...state.filter,
            query,
          },
        }));
      },
      updateOrder: (order: 'asc' | 'desc'): void => {
        patchState(store, state => ({
          filter: {
            ...state.filter,
            order
          }
        }))
      },
      async loadAll(): Promise<void> {
        patchState(store, { isLoading: true });

        const books = await booksService.getAll();
        patchState(store, { books, isLoading: false })
      },
      loadByQuery: rxMethod<string>(
        pipe(
          debounceTime(300),
          distinctUntilChanged(),
          tap(() => patchState(store, { isLoading: true })),
          switchMap((query) => {
            console.log('query: ', query);
            return booksService.getByQuery(query).pipe(
              tapResponse({
                next: (books) => patchState(store, { books, isLoading: false }),
                error: (err) => {
                  patchState(store, { isLoading: false });
                  console.error(err);
                }
              })
            )
          })
        )
      )
    };
  })
);
