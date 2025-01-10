import { Component, inject } from '@angular/core';
import { Register } from '../../models/register.model';
import { LoginService } from '../../core/services/login/login.service';
import { Rpassword } from '../../models/reset-password.model';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-resetpassword',
  standalone: true,
  imports: [FormsModule, HttpClientModule],
  templateUrl: './resetpassword.component.html',
  styleUrl: './resetpassword.component.css',
})
export class ResetpasswordComponent {
  email: string = '';

  loginService = inject(LoginService);
  route = inject(Router);

  onSubmit() {
    const user = { email: this.email };

    this.loginService.resetPassword(user).subscribe({
      next: (response) => {
        console.log(response);
        this.route.navigate(['/login']);
        console.log('Password reset link sent');
      },
      error: (error) => {
        console.error('Error occurred:', error);
      },
    });
  }
}
