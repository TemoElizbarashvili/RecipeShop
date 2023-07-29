import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router'

import { RecipeService } from '../recipe.service';
import { Recipe } from '../recipe.model';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit {
  currentRecipe: Recipe;
  id: number;

  constructor(private recipeService: RecipeService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    this.route.params.subscribe(
      (params: Params) => {
        this.id = +params['id'];
        this.currentRecipe = this.recipeService.getRecipe(+params['id']);
      }
    );
  }

  onToShoppingList(){
    const ingredientstoAdd = this.currentRecipe.ingredients.slice()
    this.recipeService.addingredientsToShoppingList(ingredientstoAdd);
  }

  onEditRecipe() { 
    // This two line is doing same job
    // this.router.navigate(['../', this.id, 'edit']);
    this.router.navigate(['edit'], {relativeTo: this.route});
  }
}
 