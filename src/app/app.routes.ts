import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { RecipeDetailsComponent } from './pages/recipe-details/recipe-details.component';
import { AjouterRecetteComponent } from './ajouter-recette/ajouter-recette.component';
import { ProfileComponent } from './profil/profil.component';
import { SignupComponent } from './signup/signup.component';
import { SigninComponent } from './signin/signin.component';


export const routes: Routes = [
  { path: '', component: HomeComponent },
//  { path: '', component: SigninComponent },
  { path: 'recipes/:id', component: RecipeDetailsComponent },
  { path: 'signin', component: SigninComponent },
  { path: 'signup', component: SignupComponent },
  {path:'profil', component:ProfileComponent},
  {path:'ajouter-recette',component:AjouterRecetteComponent},
    { path: '**', redirectTo: '' },

];
