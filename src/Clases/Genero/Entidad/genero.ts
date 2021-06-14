import { Anime } from "src/Clases/Anime/Entidad/anime";

/**
 * Modelo que se encuentra en la base de datos
 */
export class Genero {
  /**
   * Identificador del genero
   */
  public generoId: number;

  /**
   * Nombre del genero
   */
  public nombre: string;

  /**
   * Animes que pertenecen a este genero
   */
  public listaAnimes: Anime[];

  constructor(generoId: number, nombre: string, listaAnimes: Anime[]) {
    this.generoId = generoId;
    this.nombre = nombre;
    this.listaAnimes = listaAnimes;
  }
}
