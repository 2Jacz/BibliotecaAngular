import { Component, OnInit, OnDestroy } from '@angular/core';
import { takeUntil } from 'rxjs/operators';
import { Title } from '@angular/platform-browser';
import { InicioAnime } from 'src/Clases/Inicio_Anime/inicio-anime';
import { InicioAnimeServicioService } from 'src/Servicios/Inicio_Anime/inicio-anime-servicio.service';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-inicio-anime',
  templateUrl: './inicio-anime.component.html',
  styleUrls: ['./inicio-anime.component.css'],
})
export class InicioAnimeComponent implements OnInit, OnDestroy {
  cargando = true;
  mensaje!: string;
  info: InicioAnime = {
    animes_emision: [],
    ultimos_12_episodios: [],
    ultimos_16_animes: [],
  };

  destroy$: Subject<boolean> = new Subject<boolean>();

  constructor(private inicioAnimeServicio: InicioAnimeServicioService, private titleService: Title) {}

  ngOnInit(): void {
    this.titleService.setTitle('Biblioteca Otaca');
    this.cargarInfoInicio();
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }

  private cargarInfoInicio(): void {
    this.inicioAnimeServicio.ObtenerInformacionInicio().pipe(takeUntil(this.destroy$)).subscribe(
      (data) => {
        if (data.estado === 200) {
          this.info = data.datos;
        }
        this.mensaje = data.mensaje;
        this.cargando = false;
      },
      (error) => {
        this.cargando = false;
        this.mensaje = error.error.mensaje;
      }
    );
  }
}
