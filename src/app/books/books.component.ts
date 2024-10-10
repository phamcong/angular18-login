import { CommonModule } from "@angular/common";
import { ChangeDetectionStrategy, Component, inject } from "@angular/core";
import { BooksStore } from "./books.store";
import { BooksFilterComponent } from "./books-filter/books-filter.component";
import { SlideToggleComponent } from "../slide-toggle/slide-toggle.component";

@Component({
  selector: 'app-books',
  standalone: true,
  imports: [CommonModule, BooksFilterComponent, SlideToggleComponent],
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.scss'],
  providers: [BooksStore],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BooksComponent {
  readonly booksStore = inject(BooksStore);

  ngOnInit(): void {
    const query = this.booksStore.filter.query;
    this.booksStore.loadByQuery(query);
  }

  logFirst(obj: { checked: boolean }) {
    console.log('first toggle:', obj.checked);
  }

  logSecond(obj: { checked: boolean }) {
    console.log('second toggle:', obj.checked);
  }
}