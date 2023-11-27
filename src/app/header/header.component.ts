import { Component, OnInit } from '@angular/core';
import { recipeFirebaseService } from '../recipe-firebase.service';
import { User } from '../authentication/user.model';
import { AuthService } from '../auth-firebase-connector.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  user: User = null
  constructor(private recipeFirebaseService: recipeFirebaseService, private authService: AuthService) { }

  ngOnInit(): void {
    this.authService.user.subscribe(user => {
      this.user = user
    })
  }

  logout() {
    this.authService.logout()
  }

  loadRecipes() {
    this.recipeFirebaseService.getRecipes().subscribe();
  }
  saveRecipes() {
    this.recipeFirebaseService.putRecipes();
  }
}
