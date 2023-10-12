import { EventEmitter, Injectable } from "@angular/core";
import { Recipe } from "./recipes/recipes.model";
import { Ingredient } from "./shared/ingredient.model";
import { ShoppinglistService } from "./shoppinglist.service";

@Injectable({ providedIn: 'root' })
export class RecipeService {

    recipeSelected = new EventEmitter<Recipe>()
    private recipes: Recipe[] = [
        new Recipe(
            'Testfood',
            'Easy to make test',
            'https://img.freepik.com/premium-vector/job-exam-test-vector-illustration_138676-243.jpg',
            [
                new Ingredient('apple', 2),
                new Ingredient('apple', 1),
                new Ingredient('pineapple', 2)
            ]),
        new Recipe(
            'Testfood1',
            'Easy to make test',
            'https://img.freepik.com/premium-vector/job-exam-test-vector-illustration_138676-243.jpg',
            [
                new Ingredient('banana', 2)
            ])
    ]

    constructor(private shoppinglistService: ShoppinglistService) { }

    getRecipes() {
        return this.recipes.slice(); //only get copy
    }

    addIngredientsToShoppingList(ingredients: Ingredient[]) {
        this.shoppinglistService.addIngredients(ingredients)
    }


}