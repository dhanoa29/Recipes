import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { RecipeService } from '../recipes/recipe.service';
import { Recipe } from '../recipes/recipe.model';
import { exhaustMap, map, take, tap } from 'rxjs';
import { AuthService } from '../auth/auth.service';

@Injectable({ providedIn: 'root' })
export class DataStorageService {
  constructor(
    private http: HttpClient,
    private recipeService: RecipeService,
    private authService: AuthService
  ) {}

  storeRecipes() {
    const recipes = this.recipeService.getRecipes();
    this.http
      .put(
        'https://ng-course-recipe-book-210fa-default-rtdb.firebaseio.com/recipes.json',
        recipes
      )
      .subscribe((response) => {
        console.log(response);
      });
  }

  // fetchRecipes() {
  //   //You pass a number to "take" operator. It tells rxjs that i only
  //   //wanna take 1 value from that observable and it should unsubscribe after that.
  //   //exhaustMap waits for the first observable to complete. Once user observable
  //   //is done, it will be replaced with http observable.

  //   //In the end, it will be http observable

  //   //For firebase or real time database, we add a token as a query paramter in the URL.
  //   //For other APIs, you add a token as a header in the request

  //   return this.authService.user.pipe(
  //     take(1),
  //     exhaustMap((user) => {
  //       return this.http.get<Recipe[]>(
  //         // 'https://ng-course-recipe-book-210fa-default-rtdb.firebaseio.com/recipes.json?auth=' +
  //         //   user.token
  //         'https://ng-course-recipe-book-210fa-default-rtdb.firebaseio.com/recipes.json',
  //         {
  //           params: new HttpParams().set('auth', user!.token!),
  //         }
  //       );
  //     }),
  //     map((recipes) => {
  //       return recipes.map((recipe) => {
  //         return {
  //           ...recipe,
  //           ingredients: recipe.ingredients ? recipe.ingredients : [],
  //         };
  //       });
  //     }),
  //     tap((recipes) => {
  //       this.recipeService.setRecipes(recipes);
  //     })
  //   );
  // }

  fetchRecipes() {
    //You pass a number to "take" operator. It tells rxjs that i only
    //wanna take 1 value from that observable and it should unsubscribe after that.
    //exhaustMap waits for the first observable to complete. Once user observable
    //is done, it will be replaced with http observable.

    //In the end, it will be http observable

    //For firebase or real time database, we add a token as a query paramter in the URL.
    //For other APIs, you add a token as a header in the request

    return this.http
      .get<Recipe[]>(
        // 'https://ng-course-recipe-book-210fa-default-rtdb.firebaseio.com/recipes.json?auth=' +
        //   user.token
        'https://ng-course-recipe-book-210fa-default-rtdb.firebaseio.com/recipes.json'
      )
      .pipe(
        map((recipes) => {
          return recipes.map((recipe) => {
            return {
              ...recipe,
              ingredients: recipe.ingredients ? recipe.ingredients : [],
            };
          });
        }),
        tap((recipes) => {
          this.recipeService.setRecipes(recipes);
        })
      );
  }
}
