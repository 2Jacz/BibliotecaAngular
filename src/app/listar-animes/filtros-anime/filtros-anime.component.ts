import { Component, EventEmitter, Input, OnInit, Output, OnChanges } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-filtros-anime',
  templateUrl: './filtros-anime.component.html',
  styleUrls: ['./filtros-anime.component.css'],
})
export class FiltrosAnimeComponent implements OnInit, OnChanges {
  @Input() generos: string[] = [];
  @Input() buscado!: boolean;

  fechas: number[] = [];
  tipos: string[] = ['Anime', 'Manga', 'Ova', 'Pelicula'];
  ordenamiento: string[] = ['Predeterminado', 'Nombre', 'Fecha'];
  estados: string[] = ['En emision', 'Finalizado'];

  @Output() form = new EventEmitter<FormGroup>();
  busquedaForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.busquedaForm = this.refrescarFiltros();

    this.rellenarFechas();
  }

  ngOnInit(): void {}

  ngOnChanges(): void {
    if (this.buscado) {
      this.busquedaForm = this.refrescarFiltros();
    }
  }

  buscar(): void {
    this.form.emit(this.busquedaForm);
  }

  rellenarFechas(): void {
    for (let final = 2021; final >= 1900; final--) {
      this.fechas.push(final);
    }
  }

  refrescarFiltros(): FormGroup {
    return this.fb.group({
      generosSeleccionados: new FormControl(),
      tiposSeleccionados: new FormControl(),
      fechasSeleccionadas: new FormControl(),
      ordenSeleccionado: new FormControl(),
      estadoSeleccionado: new FormControl(),
    });
  }
}
