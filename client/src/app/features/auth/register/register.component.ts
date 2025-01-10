import { Component, OnInit, inject } from '@angular/core';
import { NavbarComponent } from '../../../core/layout/navbar/navbar.component';
import { ButtonComponent } from '../../../shared/components/button/button.component';
import {
  FormsModule,
  ReactiveFormsModule,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Register } from '../../../models/register.model';
import { RegisterService } from '../../../core/services/register/register.service';
import { HttpClientModule } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    ButtonComponent,
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    HttpClientModule,
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
})
export class RegisterComponent implements OnInit {
  myForm!: FormGroup;

  private regService = inject(RegisterService);
  private router = inject(Router);
  errorMessage: string = '';
  errorEmail: string = '';

  ngOnInit() {
    this.setForm();
  }

  setForm() {
    this.myForm = new FormGroup({
      fname: new FormControl('', [Validators.required]),
      lname: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(6),
      ]),
      rpassword: new FormControl('', [
        Validators.required,
        Validators.minLength(6),
      ]),
      phone: new FormControl('', [Validators.required]),
      address: new FormControl('', [Validators.required]),
    });
  }

  submitForm() {
    this.errorMessage = ' ';
    this.errorEmail = ' ';

    if (this.myForm.invalid) {
      this.myForm.markAllAsTouched();
    } else {
      const formValue: Register = this.myForm.value;
      this.regService.addUser(formValue).subscribe({
        next: (response) => {
          console.log('User registered successfully:', response);
          this.router.navigate(['/login']);
        },
        error: (error) => {
          if (error.status === 400) {
            if (error.error.message === '')
              this.errorMessage = 'Both the password should be same';
          }

          console.log(error);
        },
      });
    }
  }
}
