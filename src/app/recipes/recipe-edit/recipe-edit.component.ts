import { Component } from '@angular/core';
import { OnInit } from '@angular/core';
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

  constructor(private route: ActivatedRoute, private router: Router, private recipeService: RecipeService) { }

  ngOnInit(): void {
    this.route.params
      .subscribe(
        (params: Params) => {
          this.id = +params['id']
          this.editMode = params['id'] != null

          this.createMode = params['id'] == null
          // if (this.editMode == true) {
          //   this.recipe = this.recipeService.getRecipeById(+params['id']);
          //   if (this.recipe == undefined) {
          //     this.recipe = new Recipe('', '', '', [], 0)
          //     this.router.navigateByUrl('/recipes/invalid-id');
          //   }
          // }
          console.log(this.editMode)
          console.log(this.createMode)
        })
  }
}
