import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl, AbstractControl, ValidatorFn, ValidationErrors } from '@angular/forms';
import { AnimePost } from 'src/Clases/Anime/ViewModels/anime-post';

@Component({
  selector: 'app-formulario-anime',
  templateUrl: './formulario-anime.component.html',
  styleUrls: ['./formulario-anime.component.css'],
})
export class FormularioAnimeComponent implements OnInit {
  @Output() animeInfo = new EventEmitter<AnimePost>();
  animeForm: FormGroup;

  fechaMinima = new Date(1970, 1, 1);
  fechaMaxima = new Date(Date.now());
  srcResult = '';
  cargandoImagen!: boolean;

  @Input() generos: string[] = [];
  tipos: string[] = [
    'Anime',
    'Pelicula',
    'Ova'
  ];
  estados: string[] = [
    'En emision',
    'Finalizado'
  ];

  constructor(public fb: FormBuilder) {
    this.animeForm = fb.group({
      nombre: new FormControl('', [
        Validators.required,
        Validators.minLength(2),
        Validators.maxLength(40)
      ]),
      descripcion: new FormControl('', [
        Validators.required,
        Validators.minLength(15),
        Validators.maxLength(500),
      ]),
      fecha_publicacion: new FormControl(new Date(), [
        Validators.required,
        (c: AbstractControl) =>
          new Date(c.value).getTime() >= Date.now() ? { invalid: true } : null,
      ]),
      portada: new FormControl(null, [
        Validators.required
      ]),
      generos: new FormControl([], [
        Validators.required
      ]),
      tipo_animacion: new FormControl('', [
        Validators.required
      ]),
      numero_episodios: new FormControl(1, [
        Validators.required,
        Validators.min(1),
        Validators.max(1250)
      ]),
      estado: new FormControl('', [
        Validators.required
      ])
    });
  }

  ngOnInit(): void {}

  agregarAnime(animeFormValues: AnimePost): void {
    if (this.animeForm.valid) {
      const anime: AnimePost = animeFormValues;
      this.animeInfo.emit(anime);
    }
  }

  visualizarPortada(event: Event): void {
    this.cargandoImagen = true;
    const filelist: FileList = (event.target as HTMLInputElement).files as FileList;

    if (filelist.item(0)) {
      const file: File = filelist[0];
      const image = new Image();

      if (file) {
        image.src = window.URL.createObjectURL(file);
        if (image) {
          const reader = new FileReader();
          reader.onload = () => {
            this.srcResult = reader.result as string;
            this.animeForm.get('portada')?.setValidators([
              imageDimentionsValidator(image.height, image.width),
              imageSizeValidator(file.size),
              Validators.required
            ]);
            this.animeForm.patchValue({ portada: file });

            this.cargandoImagen = false;
          };
          reader.readAsDataURL(file);
        }
      } else {
        alert('No se encontro archivo de imagen');
      }
    } else {
      alert('No se encontro archivo de imagen');
    }
  }

  hasError = (campo: string, validacion: string) => {
    return this.animeForm.controls[campo].hasError(validacion);
  }
}


function imageDimentionsValidator(largo: number, ancho: number): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    // el ancho no sea mayor que el largo (sea minimamente certical)
    if ((ancho + 100) <= largo) {
      return null; // es valido, no hay error
    }

    return {imageDimentionsValidator: true}; // hay error
  };
}

function imageSizeValidator(tamanio: number): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    if (tamanio <= 9152700) { // imagen no pese mas de 9mb
      return null; // es valido, no regresa error
    }

    return {imageSizeValidator: true}; // hay error
  };
}
