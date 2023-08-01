import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';

import { Ingredient } from 'src/app/shared/ingredient.model';
import { ShoppingListService } from '../shopping-list.service';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit, OnDestroy {
  editSubscription: Subscription;
  editMode = false;
  editedItemIndex: number;
  editedItem: Ingredient;
  @ViewChild('f', { static: false }) slForm: NgForm;
  

  constructor(private shoppingListService: ShoppingListService){ }

  ngOnInit(): void {
    this.editSubscription = this.shoppingListService.startedEditing.subscribe(
      (index: number) => {
        this.editMode = true;
        this.editedItemIndex = index;
        this.editedItem = this.shoppingListService.getIngredient(index);
        this.slForm.setValue({
          'name': this.editedItem.name,
          'amount': this.editedItem.amount
        });
      }
    );
  }

  
  onSubmit(form: NgForm) {
    const value = form.value;
    const newIngredient = new Ingredient(value.name, value.amount);
    this.slForm.reset();
    if(this.editMode){
      this.shoppingListService.updateIngredient(this.editedItemIndex, newIngredient);
      this.editMode = false;
    }
    else
    this.shoppingListService.addIngredient(newIngredient);
  }
  
  onClear() { 
    this.slForm.reset();
    this.editMode = false;
  }
  
  onDelete() {
    if(this.editMode){
      this.shoppingListService.DeleteIngredient(this.editedItemIndex);
      this.editMode = false;
      this.onClear();
    }
  }

  ngOnDestroy(): void {
    this.editSubscription.unsubscribe();
  }

}
