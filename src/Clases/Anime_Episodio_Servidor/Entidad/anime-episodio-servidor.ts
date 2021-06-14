/**
 * Modelo que se encuentra en la base de datos
 */
export class AnimeEpisodioServidor {
  /**
   * Identificador del enlace para visualizar el episodio del anime
   */
  public ID: number;

  /**
   * Nombre del servidor
   */
  public nombreServidor: string;

  /**
   * Enlace para visualizar el episodio del anime
   */
  public url: string;

  constructor(ID: number, nombreServidor: string, url: string) {
    this.ID = ID;
    this.nombreServidor = nombreServidor;
    this.url = url;
  }
}
