import { Injectable } from "@angular/core";
import { Recipe } from "./recipes/recipes.model";
import { map } from "rxjs";
import { HttpClient } from "@angular/common/http"
import { RecipeService } from "./recipe.service";

@Injectable({ providedIn: "root" })
export class recipeFirebaseService {
  constructor(private httpClient: HttpClient, private recipeService: RecipeService) { }
  firebaseRoot: string = "https://angular-course-project-39546-default-rtdb.europe-west1.firebasedatabase.app/";

  putRecipes() {
    const url: string = this.firebaseRoot + "recipes.json";
    const recipes = this.recipeService.getRecipes();
    this.httpClient.put(url, recipes).subscribe();
  }

  getRecipes() {
    const url: string = this.firebaseRoot + "recipes.json";

    return this.httpClient.get<{ [i: number]: Recipe }>(url).pipe(map(data => {
      const recipes: Recipe[] = []
      for (let i of Object.keys(data)) {
        recipes.push(data[i]);
        this.recipeService.addRecipe(data[i]);
      }
      this.recipeService.recipesChanged.next(recipes);
      return recipes;
    }));
  }

}