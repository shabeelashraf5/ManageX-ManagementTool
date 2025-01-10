import { Component, inject, InjectionToken, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { LoginService } from '../../core/services/login/login.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-dispalypassword',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './dispalypassword.component.html',
  styleUrl: './dispalypassword.component.css',
})
export class DispalypasswordComponent implements OnInit {
  newPassword!: string;
  rePassword!: string;
  token: string | null = '';
  queryParam: string | null = null;

  passService = inject(LoginService);
  router = inject(Router);
  route = inject(ActivatedRoute);

  ngOnInit() {
    this.route.queryParamMap.subscribe((params) => {
      this.queryParam = params.get('token');
    });
  }

  onSubmit() {
    if (this.newPassword !== this.rePassword) {
      console.error('Passwords do not match');
      return;
    }

    if (!this.token || !this.newPassword) {
      console.error('Token or newPassword is missing');
      return;
    }

    this.passService
      .updatePassword(this.token, this.newPassword, this.rePassword)
      .subscribe({
        next: (response) => {
          console.log('Password updated successfully:', response);

          this.newPassword = '';

          this.router.navigate(['/login']);
        },

        error: (error) => {
          console.error('Error occurred:', error);
        },
      });
  }
}
