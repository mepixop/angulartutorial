import { ActivatedRouteSnapshot, ResolveFn, RouterStateSnapshot } from "@angular/router";
import { recipeFirebaseService } from "./recipe-firebase.service";
import { inject } from "@angular/core";
import { Recipe } from "./recipes/recipes.model";

export const recipeResolver: ResolveFn<Recipe[]> =
  (
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot,
    service: recipeFirebaseService = inject(recipeFirebaseService)
  ) => {
    return service.getRecipes();
  }