/**
 * Informacion a recivir de los ultimos episodios agregados
 */
export class NuevosEpisodios {
  /**
   * Identificador del episodio
   */
  public episodioId: number;

  /**
   * Numero del episodio
   */
  public numero_Episodio: number;

  /**
   * Nombre del anime al que corresponde el episodio
   */
  public nombre_Anime: string;

  /**
   *  Arreglo de bytes de la imagen de portada del anime que corresponde el episodio
   */
  public anime_Portada: string;

  constructor(episodioId: number, numeroEpisodio: number, nombreAnime: string, animePortada: string) {
    this.episodioId = episodioId;
    this.numero_Episodio = numeroEpisodio;
    this.nombre_Anime = nombreAnime;
    this.anime_Portada = animePortada;
  }
}
