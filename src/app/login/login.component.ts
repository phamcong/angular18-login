import { Component, inject } from "@angular/core";
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from "@angular/forms";
import { MatInputModule } from "@angular/material/input";
import { MatButtonModule } from "@angular/material/button";
import { IUser, UserService } from "../user.service";
import { Router } from "@angular/router";

@Component({
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss'],
    standalone: true,
    imports: [ReactiveFormsModule, MatInputModule, MatButtonModule]
})
export class LoginComponent {
    loginForm: FormGroup;
    userService = inject(UserService);
    fb = inject(FormBuilder);
    router = inject(Router);

    constructor() {
        this.loginForm = this.fb.group({
            username: new FormControl('', [Validators.required]),
            password: new FormControl('', [Validators.required]),
        })
    }

    ngOnInit(): void {

    }

    login(): void {
        const formValue: IUser = this.loginForm.value;
        this.userService.loggedUserBSub.next(formValue);
        this.router.navigate(['/book']);
    }
}