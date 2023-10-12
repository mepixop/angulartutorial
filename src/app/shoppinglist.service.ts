import { EventEmitter, Injectable } from "@angular/core";
import { Ingredient } from "./shared/ingredient.model";
import { __spreadArray } from "tslib";

@Injectable({ providedIn: 'root' })

export class ShoppinglistService {
    ingredientsChanged = new EventEmitter<Ingredient[]>()

    private ingrediets: Ingredient[] = [
        new Ingredient('Apple', 5),
        new Ingredient('Banana', 10)
    ]

    getIngredients() {
        return this.ingrediets.slice()
    }

    addIngredient(ingredient: Ingredient) {
        this.ingrediets.push(ingredient)
        this.ingredientsChanged.emit(this.ingrediets.slice())
    }

    addIngredients(ingredients: Ingredient[]) {
        this.ingrediets.push(...ingredients)
        this.ingredientsChanged.emit(this.ingrediets.slice())
    }

}