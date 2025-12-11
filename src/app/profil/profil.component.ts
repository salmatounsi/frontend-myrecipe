import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

interface Recipe {
  id: number;
  title: string;
  preparationTime: number; // en minutes
  cookingTime: number; // en minutes
  servings: number;
  imageUrl: string;
  totalTime?: string;
}

interface User {
  name: string;
  profileImage: string;
  bio: string;
  stats: {
    followers: number;
    following: number;
  };
  joinDate: Date;
}

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
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './profil.component.html',
  styleUrls: ['./profil.component.css']
})
export class ProfileComponent implements OnInit {
  
  // Données de l'utilisateur
  user: User = {
    name: 'Marie Dubois',
    profileImage: 'https://images.unsplash.com/photo-1494790108755-2616b786d4d9?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
    bio: 'Passionnée de cuisine depuis 10 ans. J\'adore partager mes recettes familiales et découvrir de nouvelles saveurs du monde entier.',
    stats: {
      followers: 128,
      following: 56
    },
    joinDate: new Date('2020-03-15')
  };

  // Liste des recettes de l'utilisateur
  userRecipes: Recipe[] = [
    {
      id: 1,
      title: 'Ratatouille Provençale',
      preparationTime: 45,
      cookingTime: 30,
      servings: 4,
      imageUrl: 'https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80'
    },
    {
      id: 2,
      title: 'Bœuf Bourguignon Traditionnel',
      preparationTime: 40,
      cookingTime: 180,
      servings: 6,
      imageUrl: 'https://images.unsplash.com/photo-1600891964092-4316c288032e?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80'
    },
    {
      id: 3,
      title: 'Tarte aux Fraises Maison',
      preparationTime: 25,
      cookingTime: 30,
      servings: 8,
      imageUrl: 'https://images.unsplash.com/photo-1565958011703-44f9829ba187?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80'
    },
    {
      id: 4,
      title: 'Salade César au Poulet Grillé',
      preparationTime: 20,
      cookingTime: 15,
      servings: 2,
      imageUrl: 'https://images.unsplash.com/photo-1546793665-c74683f339c1?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80'
    }
  ];

  // Éléments décoratifs pour le background
  foodDecorations: FoodDecoration[] = [];

  // Émojis pour les décorations
  private foodEmojis = ['🍕', '🍔', '🥗', '🍝', '🍣', '🍩', '🌮', '🥐', '🍓', '🍰', '🥑', '🍅'];
  
  // Couleurs dans les tons orange
  private orangeShades = ['#FF6600', '#FF8C42', '#FFB347', '#FFD166'];

  ngOnInit(): void {
    this.initFoodDecorations();
  }

  // Initialiser les décorations alimentaires
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

  // Obtenir le temps total formaté
  getTotalTime(recipe: Recipe): string {
    const totalMinutes = recipe.preparationTime + recipe.cookingTime;
    const hours = Math.floor(totalMinutes / 60);
    const minutes = totalMinutes % 60;
    
    if (hours > 0) {
      return `${hours}h ${minutes > 0 ? minutes + 'min' : ''}`;
    }
    return `${minutes}min`;
  }

  // Obtenir l'âge du compte
  getAccountAge(): number {
    const diff = new Date().getTime() - this.user.joinDate.getTime();
    return Math.floor(diff / (1000 * 60 * 60 * 24 * 365));
  }

  // Éditer la photo de profil
  editProfilePhoto(): void {
    alert('Fonctionnalité d\'édition de photo de profil - À implémenter');
  }

  // Éditer le profil
  editProfile(): void {
    alert('Fonctionnalité d\'édition de profil - À implémenter');
  }

  // Partager le profil
  shareProfile(): void {
    if (navigator.share) {
      navigator.share({
        title: `Profil de ${this.user.name} - RecettesPro`,
        text: `Découvrez les recettes de ${this.user.name} sur RecettesPro`,
        url: window.location.href
      }).catch(error => console.log('Erreur de partage:', error));
    } else {
      alert('Le partage n\'est pas supporté par votre navigateur');
    }
  }

  // Ajouter une nouvelle recette
  addNewRecipe(): void {
    alert('Redirection vers le formulaire d\'ajout de recette - À implémenter');
    // Dans une vraie application, vous redirigeriez vers /recipes/new
    // this.router.navigate(['/recipes/new']);
  }

  // Voir une recette
  viewRecipe(recipeId: number): void {
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