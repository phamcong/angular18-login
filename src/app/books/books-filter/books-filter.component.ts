import { Component, EventEmitter, Input, Output } from "@angular/core";
import { FormBuilder, FormGroup, ReactiveFormsModule } from "@angular/forms";
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';

interface FilterModel {
  query: string;
  order: 'asc' | 'desc';
}

@Component({
  selector: 'app-books-filter',
  templateUrl: './books-filter.component.html',
  styleUrls: ['./books-filter.component.scss'],
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatInputModule,
    MatSelectModule
  ]
})
export class BooksFilterComponent {
  @Input() query = '';
  @Input() order: 'asc' | 'desc' = 'asc';

  @Output() queryChange = new EventEmitter();
  @Output() orderChange = new EventEmitter();

  orderItems = [
    { label: 'Ascending', value: 'asc' },
    { label: 'Descending', value: 'desc' },
  ]

  filterForm: FormGroup;

  constructor(private readonly fb: FormBuilder) {
    this.filterForm = this.fb.group<FilterModel>({
      query: '',
      order: 'asc'
    })

    this.filterForm.get('query')?.valueChanges.subscribe(query => this.queryChange.emit(query));
    this.filterForm.get('order')?.valueChanges.subscribe(order => this.orderChange.emit(order));
  }
}