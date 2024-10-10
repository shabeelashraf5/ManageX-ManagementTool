import { Component, inject } from '@angular/core';
import { Register } from '../../models/register.model';
import { LoginService } from '../../core/services/login/login.service';
import { Rpassword } from '../../models/reset-password.model';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-resetpassword',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './resetpassword.component.html',
  styleUrl: './resetpassword.component.css'
})
export class ResetpasswordComponent {

  email: string = ''

  loginService = inject(LoginService)

  onSubmit() {

    const user = { email: this.email }

    
    this.loginService.resetPassword(user).subscribe({
      next: (response) => {
          
          console.log(response)
          console.log('Password reset link sent');
       
      },
      error: (error) => {
        console.error('Error occurred:', error);
      }
    });
  }



}
