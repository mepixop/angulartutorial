import { Component } from '@angular/core';
import { OnInit } from '@angular/core';
import { FormControl, FormGroup, FormArray } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';

import { RecipeService } from 'src/app/recipe.service';
import { Recipe } from '../recipes.model';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css']
})
export class RecipeEditComponent implements OnInit {
  id: number
  recipe: Recipe
  editMode = false
  createMode = false
  imagePath: string;
  recipeEditForm: FormGroup
  constructor(private route: ActivatedRoute, private router: Router, private recipeService: RecipeService) { }

  ngOnInit(): void {
    this.route.params
      .subscribe(
        (params: Params) => {
          this.id = +params['id']
          this.editMode = params['id'] != null
          this.initForm()
        });
    this.recipeEditForm.valueChanges.subscribe((value) => {
      if (this.recipeEditForm.get('imagePath').value) {
        this.imagePath = this.recipeEditForm.get('imagePath').value;
      }
    })
  }

  private initForm() {
    let recipeName = ''
    let recipeImgPath = ''
    let recipeDescription = ''
    let recipeIngredients = new FormArray([])

    if (this.editMode) {
      const recipe = this.recipeService.getRecipeById(this.id)
      recipeName = recipe.name
      recipeImgPath = recipe.imagePath
      this.imagePath = recipeImgPath;
      recipeDescription = recipe.description
      this.recipe = recipe

      if (recipe['ingredients']) {
        for (let ingredient of recipe.ingredients) {
          recipeIngredients.push(
            new FormGroup({
              'name': new FormControl(ingredient.name),
              'amount': new FormControl(ingredient.amount)
            })
          )
        }
      }
    }

    this.recipeEditForm = new FormGroup({
      'name': new FormControl(recipeName),
      'imagePath': new FormControl(recipeImgPath),
      'description': new FormControl(recipeDescription),
      'ingredients': recipeIngredients,
    })


  }

  get controls() {
    return (<FormArray>this.recipeEditForm.get('ingredients')).controls;
  }

  addIngredient() {
    (<FormArray>this.recipeEditForm.get('ingredients')).insert(0,
      new FormGroup({
        'name': new FormControl(),
        'amount': new FormControl()
      })
    )
  }

  submitForm() {
    console.log(this.recipeEditForm)
  }
}
