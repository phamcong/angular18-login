import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";

export interface IUser {
    username: string;
    password: string;
}
@Injectable({
    providedIn: 'root'
})
export class UserService {
    loggedUserBSub = new BehaviorSubject<IUser | undefined>(undefined);
    loggedUser$ = this.loggedUserBSub.asObservable();
}