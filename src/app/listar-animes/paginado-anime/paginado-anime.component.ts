import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AnimeResultadoPaginador } from 'src/Clases/Anime/ViewModels/anime-resultado-paginador';

@Component({
  selector: 'app-paginado-anime',
  templateUrl: './paginado-anime.component.html',
  styleUrls: ['./paginado-anime.component.css'],
})
export class PaginadoAnimeComponent implements OnInit {
  @Input() paginador!: AnimeResultadoPaginador;
  @Output() paginaSeleccionada = new EventEmitter<number>();
  paginasANavegar: number[] = [];

  @Input() cargando!: boolean;

  constructor() {}

  ngOnInit(): void {
    this.calcularPaginasANavegar(
      this.paginador.paginaInicial,
      this.paginador.paginaFinal
    );
  }

  /**
   * Envia el numero de la pagina a buscar al componente padre
   * @param numPagina numero de la pagina a buscar
   */
  navegar(numPagina: number): void {
    this.paginaSeleccionada.emit(numPagina);
  }

  /**
   * Calcula el rango de las paginas a mostrar en el paginador
   * @param paginaInicial el borde de la pagina minima a buscar
   * @param paginaFinal el borde de la pagina maxima a buscar
   */
  calcularPaginasANavegar(paginaInicial: number, paginaFinal: number): void {
    this.paginasANavegar = [];
    for (let pagina = paginaInicial; pagina < paginaFinal; pagina++) {
      this.paginasANavegar.push(pagina);
    }
  }

  /**
   * Navega a la pagina especifica seleccionada por el usuario
   */
  irAPagina(): void {
    const pagina = Number(prompt('Ingrese una pagina correcta (1-' + this.paginador.paginasTotales + ')', '1'));

    if (pagina >= 0) {
      if (pagina >= 1 && pagina <= this.paginador.paginasTotales) {
        this.navegar(pagina);
      } else if (pagina > this.paginador.paginasTotales) {
        alert('Pagina invalida');
        this.irAPagina();
      }
    } else {
      alert('Pagina invalida');
      this.irAPagina();
    }
  }

  trackByNumPag(numeroPagina: number): number {
    return numeroPagina;
  }
}
