import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { User } from '../models/User';
import { Recipe } from '../models/Recipe';
import { ProfileServiceService } from '../services/profile-service.service';





interface FoodDecoration {
  emoji: string;
  left: string;
  animationDelay: string;
  animationDuration: string;
  color: string;
  fontSize: string;
}

@Component({
    selector: 'app-profile',
    imports: [CommonModule, RouterModule],
    templateUrl: './profil.component.html',
    styleUrls: ['./profil.component.css']
})
export class ProfileComponent implements OnInit {
  constructor(private profileService:ProfileServiceService) { }
  // Données de l'utilisateur
  user: User = {
    firstName: 'Marie Dubois',
    lastName: '',
    photoUserString: 'https://images.unsplash.com/photo-1494790108755-2616b786d4d9?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
    email: ' ',

  };
  profilePictureUrl: string = 'https://cdn.pixabay.com/photo/2023/02/18/11/00/icon-7797704_640.png';


  userRecipes: Recipe[] = [];
  foodDecorations: FoodDecoration[] = [];
  private foodEmojis = ['🍕', '🍔', '🥗', '🍝', '🍣', '🍩', '🌮', '🥐', '🍓', '🍰', '🥑', '🍅'];
    private orangeShades = ['#FF6600', '#FF8C42', '#FFB347', '#FFD166'];

  ngOnInit(): void {
   console.log("ngOnInit profil.component.ts");
    this.profileService.getUser().subscribe((data) => {
      this.user = data;
      if(!this.user.photoUserString || this.user.photoUserString.trim() === '') {
        this.user.photoUserString = 'https://images.unsplash.com/photo-1494790108755-2616b786d4d9?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80';
      }else{
      
      this.profilePictureUrl=data.extPhoto+","+data.photoUserString;
      console.log("profilePictureUrl:",this.profilePictureUrl);
      }
    });

    this.profileService.getUserRecipes().subscribe((data) => {
      this.userRecipes = data;
    });
     this.initFoodDecorations();
  }

  private initFoodDecorations(): void {
    for (let i = 0; i < 12; i++) {
      this.foodDecorations.push({
        emoji: this.foodEmojis[Math.floor(Math.random() * this.foodEmojis.length)],
        left: Math.random() * 100 + '%',
        animationDelay: (Math.random() * -20) + 's',
        animationDuration: (Math.random() * 10 + 20) + 's',
        color: this.orangeShades[Math.floor(Math.random() * this.orangeShades.length)],
        fontSize: (Math.random() * 1.5 + 1.5) + 'rem'
      });
    }
  }

  getTotalTime(recipe: Recipe): string {
    let totalMinutes = recipe.preparationTime   ;
    totalMinutes= totalMinutes? totalMinutes:0;
    const hours = Math.floor(totalMinutes / 60);
    const minutes = totalMinutes % 60;
    
    if (hours > 0) {
      return `${hours}h ${minutes > 0 ? minutes + 'min' : ''}`;
    }
    return `${minutes}min`;
  }


  editProfilePhoto(): void {
    alert('Fonctionnalité d\'édition de photo de profil - À implémenter');
  }

  editProfile(): void {
    alert('Fonctionnalité d\'édition de profil - À implémenter');
  }

  shareProfile(): void {
    if (navigator.share) {
      navigator.share({
        title: `Profil de ${this.user.firstName} - RecettesPro`,
        text: `Découvrez les recettes de ${this.user.firstName} sur RecettesPro`,
        url: window.location.href
      }).catch(error => console.log('Erreur de partage:', error));
    } else {
      alert('Le partage n\'est pas supporté par votre navigateur');
    }
  }

  addNewRecipe(): void {
    alert('Redirection vers le formulaire d\'ajout de recette - À implémenter');
    // Dans une vraie application, vous redirigeriez vers /recipes/new
    // this.router.navigate(['/recipes/new']);
  }

  // Voir une recette
  viewRecipe(recipeId: number | undefined): void {
    alert(`Voir la recette ${recipeId} - À implémenter`);
    // Dans une vraie application, vous redirigeriez vers /recipes/recipeId
    // this.router.navigate(['/recipes', recipeId]);
  }

  // Supprimer une recette
  deleteRecipe(recipe: Recipe): void {
    if (confirm(`Êtes-vous sûr de vouloir supprimer la recette "${recipe.title}" ?`)) {
      // Supprimer la recette du tableau
      const index = this.userRecipes.findIndex(r => r.id === recipe.id);
      if (index > -1) {
        this.userRecipes.splice(index, 1);
        // Optionnel: Appeler une API pour supprimer de la base de données
        console.log(`Recette "${recipe.title}" supprimée`);
      }
    }
  }
}