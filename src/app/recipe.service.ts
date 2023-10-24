import { Injectable } from "@angular/core";
import { Recipe } from "./recipes/recipes.model";
import { Ingredient } from "./shared/ingredient.model";
import { ShoppinglistService } from "./shoppinglist.service";

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
      1),
    new Recipe(
      'Testfood1',
      'Easy to make test',
      'https://img.freepik.com/premium-vector/job-exam-test-vector-illustration_138676-243.jpg',
      [
        new Ingredient('banana', 2)
      ],
      2)
  ]

  constructor(private shoppinglistService: ShoppinglistService) { }

  getRecipes() {
    return this.recipes
  }

  getRecipeById(id: number): Recipe {
    return this.recipes.find(
      (recipe) => {
        return recipe.id === id;
      }
    );
  }

  addRecipe(recipe: Recipe) {
    this.recipes.push(recipe)
  }

  addIngredientsToShoppingList(ingredients: Ingredient[]) {
    this.shoppinglistService.addIngredients(ingredients)
  }


}