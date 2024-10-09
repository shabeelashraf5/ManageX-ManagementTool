import { CommonModule } from '@angular/common';
import { Component, inject, Input, ViewChild, OnInit } from '@angular/core';
import { PasswordsService } from '../../../core/services/password/passwords.service';
import { Passwords } from '../../../models/dashboard.model';
import { PasswordsComponent } from '../../../features/passwords/passwords.component';

@Component({
  selector: 'app-table',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './table.component.html',
  styleUrl: './table.component.css'
})
export class TableComponent  {

  passService = inject(PasswordsService)
  
  @Input() columns: Array<{header: string, field: string }> = []
  @Input() data: Array<any> = []
  @ViewChild(PasswordsComponent) child!: PasswordsComponent


  deletePassword(id: string){

    this.passService.deletePass(id).subscribe({
      next: (response) => {
        this.data = this.data.filter(item => item._id !== id)
        console.log(response)
      },
      error: (error) => {
        console.log(error)
      }
    })

  }

  


}
