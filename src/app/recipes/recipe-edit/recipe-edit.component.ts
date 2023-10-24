import { Component } from '@angular/core';
import { OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { RecipeService } from 'src/app/recipe.service';
import { Recipe } from '../recipes.model';
import { FormControl, FormGroup } from '@angular/forms';
import { __values } from 'tslib';

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
  recipeEditForm: FormGroup
  newRecipe: Recipe

  constructor(private route: ActivatedRoute, private router: Router, private recipeService: RecipeService) { }

  ngOnInit(): void {
    this.route.params
      .subscribe(
        (params: Params) => {
          this.id = +params['id']
          this.editMode = params['id'] != null

          this.createMode = params['id'] == null
        })

    this.recipeEditForm = new FormGroup({
      'name': new FormControl(null),
      'imagePath': new FormControl(null),
      'description': new FormControl(null),
      'ingredientName': new FormControl(null),
      'ingredientAmout': new FormControl(null)
    })
  }



  submitForm() {
    //this.recipeService.addRecipe(this.newRecipe)
    console.log(this.recipeEditForm)
  }



}
