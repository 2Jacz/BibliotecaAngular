import { Anime } from 'src/Clases/Anime/Entidad/anime';
import { AnimeEpisodioServidor } from 'src/Clases/Anime_Episodio_Servidor/Entidad/anime-episodio-servidor';

/**
 * Modelo que se encuentra en la base de datos
 */
export class AnimeEpisodio {
  public episodioId: number;
  public tituloEpisodio: string;
  public numeroEpisodio: number;
  public urlServidores: AnimeEpisodioServidor[];
  public fechaSubida: Date;
  public animeId: number;

  public anime: Anime;

  constructor(
    episodioId: number,
    tituloEpisodio: string,
    numeroEpisodio: number,
    urlServidores: AnimeEpisodioServidor[],
    fechaSubida: Date,
    animeId: number,
    anime: Anime
  ) {
    this.episodioId = episodioId;
    this.tituloEpisodio = tituloEpisodio;
    this.numeroEpisodio = numeroEpisodio;
    this.urlServidores = urlServidores;
    this.fechaSubida = fechaSubida;
    this.animeId = animeId;
    this.anime = anime;
  }
}
