import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {
  isExpanded = false;
  busqueda = '';

  constructor(private router: Router) {
  }

  ngOnInit(): void {
  }

  collapse(): void {
    this.isExpanded = false;
  }

  toggle(): void {
    this.isExpanded = !this.isExpanded;
  }

  buscar(): void {
    if (this.busqueda.trim().length >= 2) {
      const busqueda = this.busqueda;
      this.busqueda = '';
      this.router.navigate(['/Anime'], { queryParams: { nombre: busqueda } });    }
  }
}
