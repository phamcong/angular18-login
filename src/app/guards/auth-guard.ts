import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, GuardResult, MaybeAsync, Router, RouterStateSnapshot } from "@angular/router";
import { UserService } from "../user.service";

@Injectable({
    providedIn: 'root'
})
export class AuthGuard implements CanActivate {
    constructor(
        private readonly userService: UserService,
        private readonly router: Router
    ) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): MaybeAsync<GuardResult> {
        const loggedUser = this.userService.loggedUserBSub.getValue();
        console.log('loggedUser', loggedUser);

        if (loggedUser?.username !== 'john') {
            this.router.navigateByUrl('/login');
        }

        return true;
    }
}