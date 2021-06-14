import { Component, OnInit, Input } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { NuevosAnimes } from 'src/Clases/Inicio_Anime/nuevos-animes';

@Component({
  selector: 'app-nuevos-animes',
  templateUrl: './nuevos-animes.component.html',
  styleUrls: ['./nuevos-animes.component.css']
})
export class NuevosAnimesComponent implements OnInit {
  @Input() nuevosAnimes: NuevosAnimes[] = [];
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
