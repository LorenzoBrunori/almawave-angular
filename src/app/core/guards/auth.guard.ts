import { inject } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot } from "@angular/router";
import { LoginService } from "../services/login.service";

export const canActivate: CanActivateFn = (
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ) => {
    const loginService = inject(LoginService);
    const router = inject(Router);
    if (!loginService.userValue) {
      router.navigate(['/login']);
      return false;
    }
  
    return true;
  };
  