import { AnimeEmision } from './anime-emision';
import { NuevosAnimes } from './nuevos-animes';
import { NuevosEpisodios } from './nuevos-episodios';

/**
 * Informacion a mostrar en la pagina de inicio
 */
export class InicioAnime {
  /**
   * Ultimos episodios, peliculas u ovas agregadas
   */
  public ultimos_12_episodios: NuevosEpisodios[] = [];

  /**
   * Ultimos animes, peliculas u ovas agregadas
   */
  public ultimos_16_animes: NuevosAnimes[] = [];

  /**
   * Animes que se estan transmitiendo actualmente
   */
  public animes_emision: AnimeEmision[] = [];
}
