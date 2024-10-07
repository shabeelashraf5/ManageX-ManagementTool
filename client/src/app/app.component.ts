import { Component, inject, OnInit } from '@angular/core';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { NavbarComponent } from './core/layout/navbar/navbar.component';
import { CommonModule, ViewportScroller } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NavbarComponent, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  
  showNavbar: boolean = false

  viewPort = inject(ViewportScroller)
  router = inject(Router)

  ngOnInit() {
    
    this.hiddenNavbar()
  }
  

  hiddenNavbar(){

    this.router.events.subscribe((event) =>{
    
      if(event instanceof NavigationEnd){

        const navbarHiddenRoutes = ['/']
        this.showNavbar = !navbarHiddenRoutes.includes(event.urlAfterRedirects)
      }

    })
  }
  


  




}
