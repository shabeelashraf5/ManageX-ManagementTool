import { Component, inject, OnInit } from '@angular/core';
import { TableComponent } from '../../shared/components/table/table.component';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { PasswordsService } from '../../core/services/password/passwords.service';
import { Passwords } from '../../models/dashboard.model';

@Component({
  selector: 'app-passwords',
  standalone: true,
  imports: [TableComponent, CommonModule],
  templateUrl: './passwords.component.html',
  styleUrl: './passwords.component.css'
})
export class PasswordsComponent implements OnInit {
  
  passwordDetails: Passwords[] = [];

  passService = inject(PasswordsService)

  headerPassword = [
    {header: 'Passwords', field: 'password'},{header: 'created At',  field: 'createdAt'}
  ]

  ngOnInit() {
    this.loadPassword() 
  } 

  loadPassword(){

    this.passService.loadPass().subscribe({
      next: (response) => {
        
        this.passwordDetails = response.data
        console.log(this.passwordDetails)
      },
      error: (error) => {
        console.log(error)
      }
    })
  }

}
