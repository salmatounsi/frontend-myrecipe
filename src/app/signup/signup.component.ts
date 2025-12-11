import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthServiceService } from '../services/auth-service.service';
import { User } from '../models/User';

@Component({
    selector: 'app-signup',
    imports: [FormsModule, CommonModule],
    templateUrl: './signup.component.html',
    styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit, OnDestroy {
  firstname: string = '';
  lastname: string = '';
  email: string = '';
  password: string = '';
  confirmPassword: string = '';
  
  profilePhoto: string = ''; 
  profilePhotoPreview: string = '';
  photoExt : string = '';
  showPassword: boolean = false;
  isLoading: boolean = false;
  
  private foodInterval: any;
  private foodEmojis = [
    '🍕', '🍔', '🥗', '🍝', '🍣', '🍩', '🌮', '🥐', '🍓', '🍰',
    '🥑', '🍅', '🥦', '🥝', '🍌', '🍇', '🍉', '🧀', '🥞', '🍗'
  ];

  constructor(private router: Router,private authServiceService : AuthServiceService) {}

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    if (this.foodInterval) {
      clearInterval(this.foodInterval);
    }
  }

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

  onPhotoSelected(event: any): void {
    const file = event.target.files[0];
    if (!file) return;

    if (file.size > 2 * 1024 * 1024) {
      alert('La photo ne doit pas dépasser 2MB');
      return;
    }

    if (!file.type.match('image.*')) {
      alert('Veuillez sélectionner une image valide');
      return;
    }

    const reader = new FileReader();
    reader.onload = (e: any) => {
      this.profilePhotoPreview = e.target.result;
    };
    reader.readAsDataURL(file);

    const base64Reader = new FileReader();
    base64Reader.onload = (e: any) => {
      this.profilePhoto =  e.target.result.split(',')[1];
      this.photoExt = e.target.result.split(',')[0];
      console.log('Photo convertie en base64');
    };
    base64Reader.readAsDataURL(file);
  }

  togglePasswordVisibility(): void {
    this.showPassword = !this.showPassword;
    const passwordInput = document.getElementById('password') as HTMLInputElement;
    if (passwordInput) {
      passwordInput.type = this.showPassword ? 'text' : 'password';
    }
  }

  getPasswordStrength(): number {
    if (!this.password) return 0;
    
    let strength = 0;
    
    if (this.password.length >= 8) strength += 1;
    
    if (/[A-Z]/.test(this.password)) strength += 1;
    
    if (/[a-z]/.test(this.password)) strength += 1;
    
    if (/[0-9]/.test(this.password)) strength += 1;
    
    if (/[^A-Za-z0-9]/.test(this.password)) strength += 1;
    
    return strength;
  }

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

  onSubmit(): void {
    if (!this.validateForm()) {
      return;
    }

    this.isLoading = true;


    let user : User = {} as User;
    user.firstName = this.firstname;
    user.lastName = this.lastname;
    user.email = this.email;
    user.password = this.password;
    user.photoUserString = this.profilePhoto;
    user.extPhoto = this.photoExt;

    console.log('Données d\'inscription:', {
      ...user,
      profilePhoto: this.profilePhoto ? 'Base64 présent' : 'Aucune photo'
    });

    this.authServiceService.signup(user).subscribe({
      next: (response) => {
        console.log('Inscription réussie:', response);  
        this.isLoading = false;
        localStorage.setItem('token', response.token);
        //this.router.navigate(['/login']);
      }
      ,error: (error) => {
        console.error('Erreur lors de l\'inscription:', error);
        this.isLoading = false;
        alert('Une erreur est survenue lors de l\'inscription. Veuillez réessayer.');
      }
    });
  }

  validateForm(): boolean {
    if (!this.firstname || !this.lastname || !this.email || !this.password || !this.confirmPassword) {
      alert('Veuillez remplir tous les champs obligatoires.');
      return false;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(this.email)) {
      alert('Veuillez entrer une adresse email valide.');
      return false;
    }

    if (this.password.length < 6) {
      alert('Le mot de passe doit contenir au moins 6 caractères.');
      return false;
    }

    if (this.password !== this.confirmPassword) {
      alert('Les mots de passe ne correspondent pas.');
      return false;
    }


    return true;
  }

  resetForm(): void {
    this.firstname = '';
    this.lastname = '';
    this.email = '';
    this.password = '';
    this.confirmPassword = '';
    this.profilePhoto = '';
    this.profilePhotoPreview = '';
    this.showPassword = false;
  }
}