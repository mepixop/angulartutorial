import { ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot, UrlTree } from "@angular/router";
import { Observable, map, take } from "rxjs";
import { AuthService } from "../auth-firebase-connector.service";
import { inject } from "@angular/core";

export const authGuard: CanActivateFn = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot,
  authService: AuthService = inject(AuthService),
  router: Router = inject(Router)
): Observable<boolean | UrlTree> => {
  return authService.user.pipe(
    take(1),
    map(user => {
      if (!!user) return true;
      return router.createUrlTree(['/authentication']);
    })
  );
}