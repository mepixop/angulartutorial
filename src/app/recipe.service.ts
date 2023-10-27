import { Injectable, numberAttribute } from "@angular/core";
import { Recipe } from "./recipes/recipes.model";
import { Ingredient } from "./shared/ingredient.model";
import { ShoppinglistService } from "./shoppinglist.service";
import { Subject, findIndex } from "rxjs";

@Injectable({ providedIn: 'root' })
export class RecipeService {
  private recipes: Recipe[] = [
    new Recipe(
      'Testfood',
      'Easy to make test',
      'https://img.freepik.com/premium-vector/job-exam-test-vector-illustration_138676-243.jpg',
      [
        new Ingredient('apple', 2),
        new Ingredient('apple', 1),
        new Ingredient('pineapple', 2)
      ],
      2),
    new Recipe(
      'Testfood1',
      'Easy to make test',
      'https://img.freepik.com/premium-vector/job-exam-test-vector-illustration_138676-243.jpg',
      [
        new Ingredient('banana', 2)
      ],
      13)
  ]

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