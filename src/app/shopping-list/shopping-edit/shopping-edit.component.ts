import { NgFor } from '@angular/common';
import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Ingredient } from 'src/app/shared/ingredient.model';
import { ShoppinglistService } from 'src/app/shoppinglist.service';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit, OnDestroy {
  @ViewChild('f') shoppinglistForm: NgForm

  subscription: Subscription
  editMode: boolean = false
  editedItem: Ingredient
  editedItemIndex: number

  constructor(private shoppinglistService: ShoppinglistService) { }

  ngOnInit(): void {
    this.subscription = this.shoppinglistService.startedEditing.
      subscribe(
        (index: number) => {
          this.editedItemIndex = index
          this.editMode = true
          this.editedItem = this.shoppinglistService.getIngredientByIndex(index)
          this.shoppinglistForm.setValue({
            name: this.editedItem.name,
            amount: this.editedItem.amount,
          })
        }
      )
  }

  upsertItem(form: NgForm) {
    const value = form.value
    const newIngredient = new Ingredient(value.name, value.amount)
    if (this.editMode) {
      this.shoppinglistService.updateIngredient(this.editedItemIndex, newIngredient)
    }
    else {
      this.shoppinglistService.addIngredient(newIngredient);
    }
    this.clearForm(form)
  }

  clearForm(form: NgForm) {
    form.reset()
    this.editMode = false
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe()
  }
}