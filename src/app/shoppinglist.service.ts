import { EventEmitter, Injectable } from "@angular/core";
import { Ingredient } from "./shared/ingredient.model";
import { __spreadArray } from "tslib";

@Injectable({ providedIn: 'root' })

export class ShoppinglistService {
    ingredientsChanged = new EventEmitter<Ingredient[]>()

    private ingredients: Ingredient[] = [
        new Ingredient('Apple', 5),
        new Ingredient('Banana', 10)
    ]

    getIngredients() {
        return this.ingredients.slice()
    }

    addIngredient(ingredient: Ingredient) {
        this.ingredients.push(ingredient)
        this.ingredientsChanged.emit(this.ingredients.slice())
    }

    addIngredients(ingredients: Ingredient[]) {
        this.ingredients.push(...ingredients)
        this.ingredientsChanged.emit(this.ingredients.slice())
    }

}