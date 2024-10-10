import { Routes } from '@angular/router';
import { BooksComponent } from './books/books.component';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from './guards/auth-guard';

export const routes: Routes = [
    { path: 'login', component: LoginComponent },
    { path: 'book', component: BooksComponent, canActivate: [AuthGuard] }
];