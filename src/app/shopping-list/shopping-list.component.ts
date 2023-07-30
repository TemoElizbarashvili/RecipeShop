import { Component, OnInit, OnDestroy } from '@angular/core';
import { ShoppingListService } from './shopping-list.service';
import { Ingredient } from '../shared/ingredient.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})

export class ShoppingListComponent implements OnInit, OnDestroy {
  ingredients: any;
  private ingredientChangeSub: Subscription;

  constructor(private shoppingListService: ShoppingListService){ }

  ngOnInit(): void {
    this.ingredients = this.shoppingListService.getIngredients();
    this.ingredientChangeSub =  this.shoppingListService.ingredientsChanged.subscribe(
      (ingredients :Ingredient[]) => {
        this.ingredients = ingredients
      }
    );
  }

  ngOnDestroy(): void {
    this.ingredientChangeSub.unsubscribe();
  }

}