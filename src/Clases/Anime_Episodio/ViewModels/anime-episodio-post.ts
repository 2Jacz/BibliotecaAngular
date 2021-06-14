export class AnimeEpisodioPost {
  public nombre_episodio: string;
  public numero_episodio: number;
  public urls: AnimeEpisodioUrlPost[];
  public fecha_subida: Date;

  constructor(nombre_episodio: string, numero_episodio: number, urls: AnimeEpisodioUrlPost[], fecha_subida: Date) {
    this.nombre_episodio = nombre_episodio;
    this.numero_episodio = numero_episodio;
    this.urls = urls;
    this.fecha_subida = fecha_subida;
  }
}

export class AnimeEpisodioUrlPost {
  public nombre_servidor = '';
  public url = '';
}
