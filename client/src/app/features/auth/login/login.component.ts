import { Component, OnInit, inject } from '@angular/core';
import { NavbarComponent } from '../../../core/layout/navbar/navbar.component';
import { ButtonComponent } from '../../../shared/components/button/button.component';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { LoginService } from '../../../core/services/login/login.service';
import { Register } from '../../../models/register.model';
import { HttpErrorResponse } from '@angular/common/http';


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [NavbarComponent, ButtonComponent, ReactiveFormsModule, CommonModule, RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})

export class LoginComponent implements OnInit {


  myForm!: FormGroup
  errorMessage: string = ''
  incorrectPassword: string =''

  private logService = inject(LoginService)
  private router = inject(Router)
  

ngOnInit() {

  this.useForm()
  
}

useForm(){

  this.myForm = new FormGroup({
    email: new FormControl('', [ Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(6)])
  })
}


logSubmit(){

  this.errorMessage = ' '
  this.incorrectPassword = ' '

  if(this.myForm.valid){

    const userDetails: Register = this.myForm.value

    this.logService.logIn(userDetails.email, userDetails.password).subscribe({
      next: (response) => {
        console.log('LOGGED in', response);
        if(response.success){
          this.router.navigate(['/'])
        }else{
          this.errorMessage = response.message;
        }
      },
      error: (err: HttpErrorResponse) => {

          if(err.status === 400){
            this.errorMessage = 'User not found. Please register your account'
          }else if(err.status === 401){
            this.incorrectPassword = 'Incorrect Password'
          }

          console.error('Login error', err);
      }
    })
  
  }else{
    this.myForm.markAllAsTouched()
  }

  
}



}
 