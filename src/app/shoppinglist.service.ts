import { Injectable } from "@angular/core";
import { Ingredient } from "./shared/ingredient.model";
import { __spreadArray } from "tslib";
import { Subject } from "rxjs";

@Injectable({ providedIn: 'root' })

export class ShoppinglistService {
  startedEditing = new Subject<number>()
  changedIngredient = new Subject<Ingredient[]>()
  private ingredients: Ingredient[] = [
    new Ingredient('Apple', 5),
    new Ingredient('Banana', 10)
  ]

  getIngredients() {
    return this.ingredients
  }

  getIngredientByIndex(index: number) {
    return this.ingredients[index]
  }

  addIngredient(ingredient: Ingredient) {
    this.ingredients.push(ingredient)
  }
  addIngredients(ingredients: Ingredient[]) {
    this.ingredients.push(...ingredients)
  }

  updateIngredient(index: number, newIngredient: Ingredient) {
    this.ingredients[index] = newIngredient
    this.changedIngredient.next(this.ingredients)
  }
}