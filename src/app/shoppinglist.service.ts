import { Injectable } from "@angular/core";
import { Ingredient } from "./shared/ingredient.model";
import { __spreadArray } from "tslib";

@Injectable({ providedIn: 'root' })

export class ShoppinglistService {

  private ingredients: Ingredient[] = [
    new Ingredient('Apple', 5),
    new Ingredient('Banana', 10)
  ]

  getIngredients() {
    return this.ingredients
  }

  addIngredient(ingredient: Ingredient) {
    this.ingredients.push(ingredient)
  }

  addIngredients(ingredients: Ingredient[]) {
    this.ingredients.push(...ingredients)
  }

}