import { Component, Input, OnInit } from '@angular/core';
import { AnimeEmision } from 'src/Clases/Inicio_Anime/anime-emision';

@Component({
  selector: 'app-animes-en-emision',
  templateUrl: './animes-en-emision.component.html',
  styleUrls: ['./animes-en-emision.component.css']
})
export class AnimesEnEmisionComponent implements OnInit {
  @Input() animesEnEmision: AnimeEmision[] = [];
  @Input() cargando!: boolean;
  visible = false;

  constructor() {
   }

  ngOnInit(): void {
  }

  trackByAnimeNombre(index: number, anime: AnimeEmision): string {
    return anime.nombre;
  }
}
