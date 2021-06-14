import { Component, Output, OnInit, EventEmitter } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AnimeEpisodioPost } from 'src/Clases/Anime_Episodio/ViewModels/anime-episodio-post';

@Component({
  selector: 'app-formulario-episodios',
  templateUrl: './formulario-episodios.component.html',
  styleUrls: ['./formulario-episodios.component.css'],
})
export class FormularioEpisodiosComponent implements OnInit {
  episodiosForm: FormGroup;

  @Output() listo = new EventEmitter<boolean>();
  @Output() animeEps = new EventEmitter<AnimeEpisodioPost[]>();

  constructor(private fb: FormBuilder) {
    this.episodiosForm = fb.group({
      episodios: fb.array([]),
    });
  }

  ngOnInit(): void {}

  episodios(): FormArray {
    return this.episodiosForm.get('episodios') as FormArray;
  }

  episodioUrls(iep: number): FormArray {
    return this.episodios().at(iep).get('urls') as FormArray;
  }

  nuevoEpisodio(): FormGroup {
    return this.fb.group({
      numero_episodio: new FormControl(1, [
        Validators.required,
        Validators.min(1),
        Validators.max(1250),
      ]),
      nombre_episodio: new FormControl('', [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(40),
      ]),
      fecha_subida: new FormControl(new Date(Date.now()), [
        Validators.required,
      ]),
      urls: this.fb.array([this.nuevaUrl()])
    });
  }

  nuevaUrl(): FormGroup {
    return this.fb.group({
      nombre_servidor: new FormControl('', [
        Validators.required,
        Validators.minLength(0),
        Validators.maxLength(13)
      ]),
      url: new FormControl('', [
        Validators.required,
        Validators.minLength(0),
        Validators.maxLength(180),
        Validators.pattern('^(?:(?:http(?:s)?|ftp)://)(?:\\S+(?::(?:\\S)*)?@)?(?:(?:[a-z0-9\u00a1-\uffff](?:-)*)*(?:[a-z0-9\u00a1-\uffff])+)(?:\\.(?:[a-z0-9\u00a1-\uffff](?:-)*)*(?:[a-z0-9\u00a1-\uffff])+)*(?:\\.(?:[a-z0-9\u00a1-\uffff]){2,})(?::(?:\\d){2,5})?(?:/(?:\\S)*)?$')
      ])
    });
  }

  agregarEpisodio(): void {
    this.episodios().push(this.nuevoEpisodio());
    this.listo.emit(this.episodiosForm.valid);
  }

  agregarUrl(iep: number): void {
    this.episodioUrls(iep).push(this.nuevaUrl());
    this.listo.emit(this.episodiosForm.valid);
  }

  quitarEpisodio(i: number): void {
    this.episodios().removeAt(i);
    this.listo.emit(this.episodiosForm.valid);
  }

  quitarUrl(iep: number, iurl: number): void {
    this.episodioUrls(iep).removeAt(iurl);
    this.listo.emit(this.episodiosForm.valid);
  }

  /**
   * Enviar episodios al componente principal
   */
  agregarEps(episodiosFormValues: any): void {
    if (this.episodiosForm.valid) {
      const animeEps: AnimeEpisodioPost[] = [];
      episodiosFormValues.episodios.forEach((episodio: AnimeEpisodioPost) => {
        animeEps.push(episodio);
      });

      this.animeEps.emit(animeEps);
      this.listo.emit(this.episodiosForm.valid);
      alert('Lista de episodios actualizada');
    } else {
      alert('Revice que todos los campos sean validos.');
      this.listo.emit(this.episodiosForm.valid);
    }
  }

  hasError = (campo: string, validacion: string) => {
    return this.episodiosForm.controls[campo].hasError(validacion);
  }
}
