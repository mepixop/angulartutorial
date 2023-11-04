import { Injectable } from "@angular/core";
import { Recipe } from "./recipes/recipes.model";
import { Ingredient } from "./shared/ingredient.model";
import { ShoppinglistService } from "./shoppinglist.service";
import { Subject } from "rxjs";

@Injectable({ providedIn: 'root' })
export class RecipeService {
  private recipes: Recipe[] = []
  recipesChanged: Subject<Recipe[]> = new Subject<Recipe[]>();

  constructor(private shoppinglistService: ShoppinglistService) { }

  getRecipes() {
    return this.recipes;
  }

  getRecipeById(id: number): Recipe {
    return this.recipes.find((recipe) => recipe.id === id);
  }

  addRecipe(recipe: Recipe) {
    this.recipes.push(recipe);
  }

  updateRecipe(newRecipe: Recipe) {
    for (let i = 0; i < this.recipes.length; i++) {
      if (this.recipes[i].id === newRecipe.id) {
        this.recipes[i] = newRecipe;
      }
    }
  }

  addIngredientsToShoppingList(ingredients: Ingredient[]) {
    this.shoppinglistService.addIngredients(ingredients)
  }

  getNewRecipeId() {
    let max: number = this.recipes[0].id
    this.recipes.map((item) => max = (item.id > max) ? item.id : max);
    return max + 1;
  }

  deleteRecipe(recipe: Recipe) {
    for (let i = 0; i < this.recipes.length; i++) {
      if (this.recipes[i].id === recipe.id) {
        this.recipes.splice(i, 1)
        break
      }
    }

  }
}