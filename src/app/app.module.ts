import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { AppRoutingModule } from './app-routing.module';
import { AlertInvalidRecipeComponent } from './recipes/alert-invalid-recipe/alert-invalid-recipe.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { recipeResolver } from './recipe-resolver.service';
import { AuthInterceptorService } from './authentication/auth-interceptor.service';
import { authGuard } from './authentication/auth-guard.service';
import { AlertPopupComponent } from './alert-popup/alert-popup.component';
import { RecipesModule } from './recipes/recipes.module';
import { ShoppingListModule } from './shopping-list/shopping-list.module';
import { AuthModule } from './authentication/auth.module';
import { SharedModule } from './shared/shared.module';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    AlertInvalidRecipeComponent,
    AlertPopupComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    RecipesModule,
    ShoppingListModule,
    AuthModule,
    SharedModule
  ],
  providers: [
    {
      provide: 'recipeResolver',
      useFactory: () => { return recipeResolver; }
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptorService,
      multi: true
    },
    {
      provide: 'authGuard',
      useValue: authGuard
    }
  ],
  bootstrap: [AppComponent]

})
export class AppModule { }
