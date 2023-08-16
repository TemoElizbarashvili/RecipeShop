import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Recipe } from "../recipes/recipe.model";
import { RecipeService } from "../recipes/recipe.service";
import { exhaustMap, map, take, tap } from "rxjs/operators";
import { AuthService } from "../auth/auth.service";

@Injectable({providedIn: 'root'})
export class DataStorageService { 

    constructor(private http: HttpClient, private recipeService: RecipeService, private authService: AuthService) { }

    storeRecipes() {
        const recipes = this.recipeService.getRecipes();
        return this.http.put('https://recipeshop-31692-default-rtdb.europe-west1.firebasedatabase.app/recipes.json', recipes)
        .subscribe( response => {
            console.log(response);
        });
    }

    fetchRecipes() {
        return this.http.get<Recipe[]>('https://recipeshop-31692-default-rtdb.europe-west1.firebasedatabase.app/recipes.json').pipe(
         map( recipes => {
            return recipes.map(recipe => {
                return {...recipe, ingredients: recipe.ingredients ? recipe.ingredients : []}
            });
        }), tap( recipes => {

            this.recipeService.SetRecipes(recipes);
        })).subscribe( response => {
            console.log('Data Fetched!');
        }); 
        
    }

}