import { AnimeEpisodioPost } from 'src/Clases/Anime_Episodio/ViewModels/anime-episodio-post';

export class AnimePost {
  nombre = '';
  descripcion = '';
    // tslint:disable-next-line: variable-name
  fecha_publicacion: Date = new Date();
  portada!: File;
    // tslint:disable-next-line: variable-name
  tipo_animacion = '';
  // tslint:disable-next-line: variable-name
  numero_episodios = 0;
  estado = '';
  generos: string[] = [];

  // tslint:disable-next-line: variable-name
  episodios_incluidos: AnimeEpisodioPost[] = [];

  constructor(){}
}
