import { Component, Input, OnInit } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { NuevosAnimes } from 'src/Clases/Inicio_Anime/nuevos-animes';

@Component({
  selector: 'app-listado-anime',
  templateUrl: './listado-anime.component.html',
  styleUrls: ['./listado-anime.component.css']
})
export class ListadoAnimeComponent implements OnInit {
  @Input() animes: NuevosAnimes[] = [];

  @Input() cargando!: boolean;

  constructor(private sanitizer: DomSanitizer) { }

  ngOnInit(): void {
  }

  loadImage(imageArray: string): SafeResourceUrl {
    return this.sanitizer.bypassSecurityTrustResourceUrl('data:image/*;base64,' + imageArray);
  }

  tackingByNuevoAnimeId(index: number, anime: NuevosAnimes): number {
    return anime.animeId;
  }
}
