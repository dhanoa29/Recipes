import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { RecipesModule } from './recipes/recipes.module';

//canActivate: [() => inject(myGuard).canActivate()]
//resolve: {'user': () => inject(UserResolver).resolve()}.
const appRoutes: Routes = [
  { path: '', redirectTo: '/recipes', pathMatch: 'full' },
  //It tells angular to load this only when this page is requested.

  //This is the older approach which does not work anymore. It does not work anymore.
  //{ path: 'recipes', loadChildren: './recipes/recipes.module#RecipesModule' },

  //This is the newer approach.
  //When this route is requested, all the imports in RecipeModule are loaded.
  //import() resolves a promise
  {
    path: 'recipes',
    loadChildren: () =>
      import('./recipes/recipes.module').then((mod) => mod.RecipesModule),
  },

  {
    path: 'shopping-list',
    loadChildren: () =>
      import('./shopping-list/shopping-list.module').then(
        (mod) => mod.ShoppingListModule
      ),
  },

  {
    path: 'auth',
    loadChildren: () =>
      import('./auth/auth.module').then((mod) => mod.AuthModule),
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(appRoutes, { preloadingStrategy: PreloadAllModules }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
