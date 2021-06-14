import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { AnimeResultadoPaginador } from 'src/Clases/Anime/ViewModels/anime-resultado-paginador';
import { NuevosAnimes } from 'src/Clases/Inicio_Anime/nuevos-animes';
import { AnimeServicioService } from 'src/Servicios/Animes/anime-servicio.service';
import { GenerosServiciosService } from 'src/Servicios/Generos/generos-servicios.service';
import { PaginadoAnimeComponent } from './paginado-anime/paginado-anime.component';

@Component({
  selector: 'app-listar-animes',
  templateUrl: './listar-animes.component.html',
  styleUrls: ['./listar-animes.component.css']
})
export class ListarAnimesComponent implements OnInit, OnDestroy {
  paginador: AnimeResultadoPaginador = new AnimeResultadoPaginador();
  animes: NuevosAnimes[] = [];
  generos: string[] = [];

  cargando!: boolean;
  mensaje!: string;

  porNombre!: boolean;

  @ViewChild(PaginadoAnimeComponent) paginadoComponent!: PaginadoAnimeComponent;
  destroy$: Subject<boolean> = new Subject<boolean>();

  constructor(private animeService: AnimeServicioService, private route: ActivatedRoute, private router: Router,
              private titleService: Title, private generoService: GenerosServiciosService) {
                route.queryParams.subscribe((params: Params) => {
                  const nombre = params.nombre;
                  const pagina = params.pag;
                  const link = params[''];
                  if (nombre) { // busqueda por nombre
                    
                  } else if (nombre && pagina) {
                    titleService.setTitle('Buscar ' + nombre + ' - Biblioteca Otaca');
                    this.porNombre = true;
                    this.getAnimes({ nombre });
                  } else if (link === 'filtro') { // busqueda por filtro
                    titleService.setTitle('Animes - Biblioteca Otaca');
                    this.porNombre = false;
                  } else { // busqueda por link
                    titleService.setTitle('Animes - Biblioteca Otaca');
                    this.porNombre = false;
                    if (!this.porNombre) {
                      this.getAnimes({});
                    }
                    this.porNombre = true;
                  }
                });
  }

  ngOnInit(): void {
    this.getGeneros();
    // this.getAnimes({});
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }

  getAnimes(filtros: {nombre?: string, generos?: string[], tiposAnimacion?: string[], anios?: number[], estados?: string[],
            orden?: string, pagina?: number}): void {
    this.cargando = true;

    this.animeService.filtrarBusqueda(filtros.nombre, filtros.generos, filtros.tiposAnimacion, filtros.anios,
      filtros.estados, filtros.orden, filtros.pagina)
    .pipe(takeUntil(this.destroy$)).subscribe(
      (info) => {
        this.paginador = info.datos.paginador;
        this.animes = info.datos.animes;
        this.cargando = false;
        console.log({
          resultado: info.datos.paginador,
          asignado: this.paginador
        });
      },
      (error) => {
        this.mensaje = error;
        this.cargando = false;
      }
    );
  }

  getGeneros(): void {
    this.generoService.obtenerGeneros().pipe(takeUntil(this.destroy$)).subscribe(
      (info) => {
        this.generos = info.datos;
      },
      (error) => {
        this.generos = [];
      }
    );
  }

  buscarPagina(numPagina: number): void {
    this.getAnimes({pagina: numPagina});
    this.paginadoComponent.calcularPaginasANavegar(this.paginador.paginaInicial, this.paginador.paginaFinal);
  }

  filtrar(filtros: FormGroup): void {
    this.quitarBusqueda();
    // tslint:disable-next-line: no-string-literal
    const generos: string[] = filtros.controls['generosSeleccionados'].value;
    // tslint:disable-next-line: no-string-literal
    const tiposAnimacion: string[] = filtros.controls['tiposSeleccionados'].value;
    // tslint:disable-next-line: no-string-literal
    const anios: number[] = filtros.controls['fechasSeleccionadas'].value;
    // tslint:disable-next-line: no-string-literal
    const orden: string = filtros.controls['ordenSeleccionado'].value;
    // tslint:disable-next-line: no-string-literal
    const estados: string[] = filtros.controls['estadoSeleccionado'].value;

    if (!this.cargando && (generos || tiposAnimacion || anios || orden || estados)) {
      this.getAnimes({generos, tiposAnimacion, anios, orden, estados});
    } else {
      this.getAnimes({});
    }
  }

  quitarBusqueda(): void {
    this.router.navigate([], {
      queryParams: { nombre: null, '': 'filtro' },
      queryParamsHandling: 'merge'
    });
  }
}
