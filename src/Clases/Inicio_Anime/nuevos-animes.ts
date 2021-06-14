/**
 * Informacion a recivir de los animes recien agregados
 */
export class NuevosAnimes {
  /**
   * Identificador del anime
   */
  public animeId: number;

  /**
   * Nombre del anime
   */
  public nombre: string;

  /**
   * Arreglo de bytes de la imagen de portada del anime
   */
  public portada: string;

  /**
   * Descripcion del anime
   */
  public descripcion: string;

/**
 * Tipo de animacion
 */
  public tipo_animacion: string;

  constructor(animeId: number, nombre: string, portada: string, descripcion: string, tipo_animacion: string) {
    this.animeId = animeId;
    this.nombre = nombre;
    this.portada = portada;
    this.descripcion = descripcion;
    this.tipo_animacion = tipo_animacion;
  }
}
