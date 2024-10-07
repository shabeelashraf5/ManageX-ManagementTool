import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { Observable } from 'rxjs';
import { LoginService } from '../../services/login/login.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent implements OnInit {

  isLoggedIn! : Observable<boolean>

  logService = inject(LoginService)
  router = inject(Router)

  ngOnInit() {
    this.isLoggedIn = this.logService.loggedIn$
  }


  logOut(){
    this.logService.logOut()
    this.router.navigate(['/login'])
  }



}
