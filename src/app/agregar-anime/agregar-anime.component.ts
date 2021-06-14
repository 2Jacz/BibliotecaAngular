import { Component, OnInit, OnDestroy } from '@angular/core';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { AnimePost } from 'src/Clases/Anime/ViewModels/anime-post';
import { AnimeServicioService } from 'src/Servicios/Animes/anime-servicio.service';
import { AnimeEpisodioPost } from 'src/Clases/Anime_Episodio/ViewModels/anime-episodio-post';
import { Title } from '@angular/platform-browser';
import { GenerosServiciosService } from 'src/Servicios/Generos/generos-servicios.service';

@Component({
  selector: 'app-agregar-anime',
  templateUrl: './agregar-anime.component.html',
  styleUrls: ['./agregar-anime.component.css']
})
export class AgregarAnimeComponent implements OnInit, OnDestroy {
  generos: string[] = [
  ];

  nuevoAnime: AnimePost = new AnimePost();
  animeEps: AnimeEpisodioPost[] = [];

  destroy$: Subject<boolean> = new Subject<boolean>();
  listo = true;

  constructor(private animeServicio: AnimeServicioService, private titleService: Title, private generoService: GenerosServiciosService) { }

  ngOnInit(): void {
    this.titleService.setTitle('Agregar nuevo anime - Biblioteca Otaca');
    this.getGeneros();
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }

  agregarAnime(animeInfo: AnimePost): void {
    if (this.listo) {
      this.nuevoAnime = animeInfo;
      this.nuevoAnime.episodios_incluidos = this.animeEps;
      if (this.nuevoAnime) {
        this.animeServicio.agregarAnime(this.nuevoAnime)
        .pipe(takeUntil(this.destroy$)).subscribe(
          (info) => {
            if (info.estado === 201) {
            }

            alert(info.mensaje);
          },
          (error) => {
            console.log(error);
          }
        );
      }
    } else {
      alert('Modifico y no actualizo los episodios, guarde cambios por favor.');
    }
  }

  agregarEpisodios(animeEps: AnimeEpisodioPost[]): void {
    this.animeEps = animeEps;
  }

  valido(listo: boolean): void {
    this.listo = listo;
  }

  getGeneros(): void {
    this.generoService.obtenerGeneros().pipe(takeUntil(this.destroy$)).subscribe(
      (info) => {
        this.generos = info.datos;
      },
      (error) => {
        this.generos = ['accion'];
      }
    );
  }
}
