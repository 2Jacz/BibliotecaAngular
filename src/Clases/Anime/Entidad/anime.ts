import { AnimeEpisodio } from 'src/Clases/Anime_Episodio/Entidad/anime-episodio';
import { Genero } from 'src/Clases/Genero/Entidad/genero';

/**
 * Modelo que se encuentra en la base de datos
 */
export class Anime {
  /**
   * Identificador del anime
   */
  public animeId: number;

  /**
   * Nombre del anime
   */
  public nombre: string;

  /**
   * Descripcion del anime
   */
  public descripcion: string;

  /**
   * Fecha de la primera emicion del anime
   */
  public fechaPublicacion: Date;

  /**
   * Arreglo de bytes de la imagen de portada del anime
   */
  public portada: string;

  /**
   * Numero de episodios que contiene el anime
   */
  public numeroEpisodios: number;

  /**
   * Fecha en que se publico en la pagina
   */
  public fechaSubida: Date;

  /**
   * Generos en los que entra el anime
   */
  public generos: Genero[];

  /**
   * Lista de episodios del anime
   */
  public episodios: AnimeEpisodio[];

  constructor(animeId: number, nombre: string, descripcion: string, fechaPublicacion: Date, portada: string, numeroEpisodios: number,
              fechaSubida: Date, generos: Genero[], episodios: AnimeEpisodio[]) {
    this.animeId = animeId;
    this.nombre = nombre;
    this.descripcion = descripcion;
    this.fechaPublicacion = fechaPublicacion;
    this.portada = portada;
    this.numeroEpisodios = numeroEpisodios;
    this.fechaSubida = fechaSubida;
    this.generos = generos;
    this.episodios = episodios;
  }
}
