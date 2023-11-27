import { Component, OnDestroy } from '@angular/core';
import { OnInit } from '@angular/core';
import { FormControl, FormGroup, FormArray, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';

import { RecipeService } from 'src/app/recipe.service';
import { Recipe } from '../recipes.model';
import { Ingredient } from 'src/app/shared/ingredient.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css']
})
export class RecipeEditComponent implements OnInit, OnDestroy {
  editMode = false
  editModeId: number

  recipe: Recipe
  createMode = false
  recipeEditForm: FormGroup

  subscriptions: Subscription[] = [];

  constructor(private route: ActivatedRoute, private router: Router, private recipeService: RecipeService) { }

  ngOnInit(): void {
    this.subscriptions.push(this.route.params.subscribe((params: Params) => {
      this.editModeId = +params['id'];
      this.editMode = (params['id'] != null);
      this.initForm()
      this.subscriptions.push(this.recipeEditForm.valueChanges.subscribe((value) => {
        if (this.recipeEditForm.get('imagePath').value) {
          this.recipe.imagePath = this.recipeEditForm.get('imagePath').value;
        }
      }))
    }));
    ;
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((item) => item.unsubscribe());
  }

  private initForm() {
    let recipe = this.recipeService.getRecipeById(this.editModeId);
    if (recipe === undefined) {
      recipe = new Recipe('', '', '', [], this.recipeService.getNewRecipeId());
    }

    this.recipe = recipe

    this.recipeEditForm = new FormGroup({
      'name': new FormControl(recipe.name, Validators.required),
      'imagePath': new FormControl(recipe.imagePath),
      'description': new FormControl(recipe.description, Validators.required),
      'ingredients': new FormArray([]),
    });

    for (let ingredient of recipe.ingredients) {
      (<FormArray>this.recipeEditForm.get('ingredients')).push(
        new FormGroup({
          'name': new FormControl(ingredient.name, Validators.required),
          'amount': new FormControl(ingredient.amount, [Validators.required, , Validators.pattern("^[1-9]+[0-9]*$")])
        })
      );
    }
  }

  get controls() {
    return (<FormArray>this.recipeEditForm.get('ingredients')).controls;
  }

  addIngredient() {
    (<FormArray>this.recipeEditForm.get('ingredients')).insert(0,
      new FormGroup({
        'name': new FormControl(null, Validators.required),
        'amount': new FormControl(null, [Validators.required, , Validators.pattern("^[1-9]+[0-9]*$")])
      })
    );
  }

  cancelEdit() {
    this.router.navigate(['../'], { relativeTo: this.route });
  }

  clearForm() {
    this.initForm()
  }

  deleteIngredient(index: number) {
    (<FormArray>this.recipeEditForm.get('ingredients')).removeAt(index)
  }

  submitForm() {
    this.recipe.name = this.recipeEditForm.get('name').value;
    this.recipe.description = this.recipeEditForm.get('description').value;
    this.recipe.imagePath = this.recipeEditForm.get('imagePath').value;

    let ingredients: Ingredient[] = []
    for (let i of this.recipeEditForm.get('ingredients').value) {
      ingredients.push(new Ingredient(i.name, i.amount));
    }
    this.recipe.ingredients = ingredients;
    if (this.editMode) {
      this.recipeService.updateRecipe(this.recipe)
      this.recipeService.recipesChanged.next(this.recipeService.getRecipes());
      this.router.navigate(['../'], { relativeTo: this.route });
    }
    else {
      this.recipeService.addRecipe(this.recipe)
      this.recipeService.recipesChanged.next(this.recipeService.getRecipes());
      this.router.navigate(['../', this.recipe.id], { relativeTo: this.route })
    }
  }

}
