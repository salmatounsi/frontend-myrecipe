import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit, OnDestroy {
  // Champs du formulaire
  firstname: string = '';
  lastname: string = '';
  email: string = '';
  password: string = '';
  confirmPassword: string = '';
  acceptTerms: boolean = false;
  
  // Photo de profil
  profilePhoto: string = ''; // Base64
  profilePhotoPreview: string = '';
  
  // État
  showPassword: boolean = false;
  isLoading: boolean = false;
  
  // Animation des aliments
  private foodInterval: any;
  private foodEmojis = [
    '🍕', '🍔', '🥗', '🍝', '🍣', '🍩', '🌮', '🥐', '🍓', '🍰',
    '🥑', '🍅', '🥦', '🥝', '🍌', '🍇', '🍉', '🧀', '🥞', '🍗'
  ];

  constructor(private router: Router) {}

  ngOnInit(): void {
    // this.initFoodAnimation();
  }

  ngOnDestroy(): void {
    if (this.foodInterval) {
      clearInterval(this.foodInterval);
    }
  }

  // Animation des aliments
  initFoodAnimation(): void {
    for (let i = 0; i < 8; i++) {
      setTimeout(() => this.createFoodItem(), i * 300);
    }

    this.foodInterval = setInterval(() => {
      this.createFoodItem();
    }, 1500);
  }

  createFoodItem(): void {
    const foodBackground = document.querySelector('.food-background');
    if (!foodBackground) return;

    const foodItem = document.createElement('div');
    foodItem.classList.add('food-item');

    const randomEmoji = this.foodEmojis[Math.floor(Math.random() * this.foodEmojis.length)];
    foodItem.textContent = randomEmoji;

    foodItem.style.left = Math.random() * 100 + '%';
    foodItem.style.fontSize = (Math.random() * 2 + 1.5) + 'rem';

    const orangeShades = ['#FF6600', '#FF8C42', '#FFB347', '#FFD166', '#FFA500'];
    foodItem.style.color = orangeShades[Math.floor(Math.random() * orangeShades.length)];

    const duration = Math.random() * 10 + 20;
    foodItem.style.animationDuration = duration + 's';

    const delay = Math.random() * -30;
    foodItem.style.animationDelay = delay + 's';

    foodBackground.appendChild(foodItem);

    setTimeout(() => {
      if (foodItem.parentNode) {
        foodItem.parentNode.removeChild(foodItem);
      }
    }, duration * 1000);
  }

  // Gestion de la photo
  onPhotoSelected(event: any): void {
    const file = event.target.files[0];
    if (!file) return;

    // Vérifier la taille (max 2MB)
    if (file.size > 2 * 1024 * 1024) {
      alert('La photo ne doit pas dépasser 2MB');
      return;
    }

    // Vérifier le type
    if (!file.type.match('image.*')) {
      alert('Veuillez sélectionner une image valide');
      return;
    }

    // Créer un preview
    const reader = new FileReader();
    reader.onload = (e: any) => {
      this.profilePhotoPreview = e.target.result;
    };
    reader.readAsDataURL(file);

    // Convertir en base64 pour l'envoi
    const base64Reader = new FileReader();
    base64Reader.onload = (e: any) => {
      this.profilePhoto = e.target.result;
      console.log('Photo convertie en base64');
    };
    base64Reader.readAsDataURL(file);
  }

  // Toggle visibilité du mot de passe
  togglePasswordVisibility(): void {
    this.showPassword = !this.showPassword;
    const passwordInput = document.getElementById('password') as HTMLInputElement;
    if (passwordInput) {
      passwordInput.type = this.showPassword ? 'text' : 'password';
    }
  }

  // Vérification de la force du mot de passe - TERMINÉE
  getPasswordStrength(): number {
    if (!this.password) return 0;
    
    let strength = 0;
    
    // Longueur minimale
    if (this.password.length >= 8) strength += 1;
    
    // Contient des majuscules
    if (/[A-Z]/.test(this.password)) strength += 1;
    
    // Contient des minuscules
    if (/[a-z]/.test(this.password)) strength += 1;
    
    // Contient des chiffres
    if (/[0-9]/.test(this.password)) strength += 1;
    
    // Contient des caractères spéciaux
    if (/[^A-Za-z0-9]/.test(this.password)) strength += 1;
    
    return strength;
  }

  // Obtenir la classe CSS pour la force du mot de passe
  getPasswordStrengthClass(): string {
    const strength = this.getPasswordStrength();
    
    if (strength <= 2) {
      return 'weak';
    } else if (strength <= 3) {
      return 'medium';
    } else {
      return 'strong';
    }
  }

  // Obtenir le texte pour la force du mot de passe
  getPasswordStrengthText(): string {
    const strength = this.getPasswordStrength();
    
    if (strength <= 2) {
      return 'Faible';
    } else if (strength <= 3) {
      return 'Moyen';
    } else {
      return 'Fort';
    }
  }

  // Soumission du formulaire
  onSubmit(): void {
    if (!this.validateForm()) {
      return;
    }

    this.isLoading = true;

    // Préparer les données pour l'envoi
    const userData = {
      firstname: this.firstname,
      lastname: this.lastname,
      email: this.email,
      password: this.password,
      profilePhoto: this.profilePhoto,
      acceptTerms: this.acceptTerms
    };

    console.log('Données d\'inscription:', {
      ...userData,
      profilePhoto: this.profilePhoto ? 'Base64 présent' : 'Aucune photo'
    });

    // Simulation d'une requête API
    setTimeout(() => {
      this.isLoading = false;
      
      // Simuler une réponse réussie
      const success = Math.random() > 0.1; // 90% de chance de succès
      
      if (success) {
        alert('Inscription réussie ! Un email de confirmation a été envoyé.');
        this.router.navigate(['/signin']);
      } else {
        alert('Erreur lors de l\'inscription. Veuillez réessayer.');
      }
    }, 2000);
  }

  // Validation du formulaire
  validateForm(): boolean {
    // Vérifier les champs requis
    if (!this.firstname || !this.lastname || !this.email || !this.password || !this.confirmPassword) {
      alert('Veuillez remplir tous les champs obligatoires.');
      return false;
    }

    // Vérifier l'email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(this.email)) {
      alert('Veuillez entrer une adresse email valide.');
      return false;
    }

    // Vérifier la longueur du mot de passe
    if (this.password.length < 6) {
      alert('Le mot de passe doit contenir au moins 6 caractères.');
      return false;
    }

    // Vérifier la correspondance des mots de passe
    if (this.password !== this.confirmPassword) {
      alert('Les mots de passe ne correspondent pas.');
      return false;
    }

    // Vérifier les conditions d'utilisation
    if (!this.acceptTerms) {
      alert('Veuillez accepter les conditions d\'utilisation.');
      return false;
    }

    return true;
  }

  // Réinitialiser le formulaire
  resetForm(): void {
    this.firstname = '';
    this.lastname = '';
    this.email = '';
    this.password = '';
    this.confirmPassword = '';
    this.profilePhoto = '';
    this.profilePhotoPreview = '';
    this.acceptTerms = false;
    this.showPassword = false;
  }
}