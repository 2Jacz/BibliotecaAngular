import { Component, OnInit, Input } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { NuevosEpisodios } from 'src/Clases/Inicio_Anime/nuevos-episodios';

@Component({
  selector: 'app-nuevos-episodios',
  templateUrl: './nuevos-episodios.component.html',
  styleUrls: ['./nuevos-episodios.component.css']
})
export class NuevosEpisodiosComponent implements OnInit {
  @Input() nuevosEpisodios: NuevosEpisodios[] = [];
  @Input() cargando!: boolean;
  constructor(private sanitizer: DomSanitizer) {
   }

  ngOnInit(): void {
  }

  loadImage(imageArray: string): SafeResourceUrl {
    return this.sanitizer.bypassSecurityTrustResourceUrl('data:image/*;base64,' + imageArray);
  }

  trackingByEpisodioId(index: number, episodio: NuevosEpisodios): number {
    return episodio.episodioId;
  }
}
