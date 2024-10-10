import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ButtonComponent } from '../../shared/components/button/button.component';
import { Passwords } from '../../models/dashboard.model';
import { DashboardService } from '../../core/services/dashboard/dashboard.service';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, FormsModule, ButtonComponent, HttpClientModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {

  generatePass: string = ''
  passwordSize: number = 6 
  useUpperCase: boolean = false;
  useLowerCase: boolean = false;
  useNumbers: boolean = false;
  useSymbols: boolean = false;
  useMixed: boolean = false
  alert: boolean = false
  errorMessage: string = ''
  user_id: string = ''

  alertMessage: boolean = false
  messageAlert: string = ''

 DashService = inject(DashboardService)

 generatePassword(){

  let characters = '';
    const lowercase = 'abcdefghijklmnopqrstuvwxyz';
    const uppercase = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const numbers = '0123456789';
    const symbols = '@%_&'
    
    let result = '';

    if (this.useMixed && (this.useUpperCase || this.useLowerCase || this.useNumbers)) {
      this.alert = true;
      this.errorMessage = 'You cannot select "Mixed" along with other options (Uppercase, Lowercase, Numbers).';
      return; 
    } else {
      this.alert = false;
    }

    if (this.useUpperCase) {
        characters += uppercase;
    } 

    if (this.useLowerCase) {
        characters += lowercase;
    } 
    
    if(this.useNumbers) {
        characters += numbers;
    } 
    
    if (this.useMixed) {
        
        result += lowercase.charAt(Math.floor(Math.random() * lowercase.length));
        result += uppercase.charAt(Math.floor(Math.random() * uppercase.length));
        result += numbers.charAt(Math.floor(Math.random() * numbers.length));
        result += symbols.charAt(Math.floor(Math.random() * symbols.length ) )
        
        characters = lowercase + uppercase + numbers + symbols;

    } 

    if(!characters){
        this.alert = true
        this.errorMessage = 'Please select at least one option for the password generation.';
        return
    }

    const charactersLength = characters.length;

    for (let i = 0; i < this.passwordSize; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }

    this.generatePass = result

 }


 storePasswords(){

  if (!this.generatePass) { 
    this.alert = true; 
    this.errorMessage = 'Please click the Generate button to create a password first.';
    this.messageAlert = '';
    return; 
  }

  const passwordData: Passwords = {
    _id: '',
    user_id: this.user_id,
    password: this.generatePass,
    date: new Date()
  }

 this.DashService.addPasswords(passwordData).subscribe({
  next: (response) => {
    
    console.log('the passwords has been stored', response)

    this.messageAlert = 'The password has been saved successfully!';
    this.alertMessage = true; 
    this.alert = false; 
    

  },
  error: (error) =>{

    this.alert = true;
    this.errorMessage = 'Failed to store password. Please try again.';
    this.messageAlert = '';

  }
 })

 }



 closeWarning() {
  this.alert = false;
  this.alertMessage = false
}


}
