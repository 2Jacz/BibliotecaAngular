import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { RespuestaServicio } from 'src/Clases/Respuesta_Servicio/respuesta-servicio';
import { baseUrl } from '../BaseUrl';
import { catchError, retry } from 'rxjs/operators';
import { handlerError } from '../my-error-handler';
import { AnimePost } from 'src/Clases/Anime/ViewModels/anime-post';

@Injectable({
  providedIn: 'root',
})
export class AnimeServicioService {
  constructor(private http: HttpClient) {}

  filtrarBusqueda(nombre?: string, generos?: string[], tiposAnimacion?: string[], anios?: number[], estados?: string[],
                  orden?: string, pagina?: number): Observable<RespuestaServicio> {
    let httpParams: HttpParams = new HttpParams();
    generos?.forEach((genero) => (httpParams = httpParams.append('generos', genero)));
    tiposAnimacion?.forEach((tipo) => (httpParams = httpParams.append('tipo_animacion', tipo)));
    anios?.forEach((anio) => (httpParams = httpParams.append('anios', anio.toString())));
    estados?.forEach((estado) => (httpParams = httpParams.append('estados', estado)));

    if (pagina) {
      httpParams = httpParams.set('numPagina', pagina.toString());
    }

    if (nombre) {
      httpParams = httpParams.set('nombre', nombre.toString());
    }

    if (orden) {
      httpParams = httpParams.set('orden', orden.toString());
    }

    return this.http
      .get<RespuestaServicio>(baseUrl + 'Animes/Listar', { params: httpParams })
      .pipe(retry(2), catchError(handlerError.handleError));
  }

  agregarAnime(animeInfo: AnimePost): Observable<RespuestaServicio> {
    const anime = new FormData();
    anime.append('nombre', animeInfo.nombre);
    anime.append('descripcion', animeInfo.descripcion);
    anime.append('Portada_img', animeInfo.portada);
    anime.append('numero_episodios', animeInfo.numero_episodios.toString());
    anime.append('tipo_animacion', animeInfo.tipo_animacion);
    anime.append('fecha_publicacion', animeInfo.fecha_publicacion.toLocaleString());
    anime.append('estado', animeInfo.estado);
    animeInfo.generos.forEach((genero) => anime.append('generos_nombres[]', genero));
    // tslint:disable-next-line: prefer-for-of
    for (let numEp = 0; numEp < animeInfo.episodios_incluidos.length; numEp++) { // recorremos por numero de episodios
      Object.entries(animeInfo.episodios_incluidos[numEp]).forEach(([campo, valor]) => { // obtenemos los campos y sus datos
          if (typeof valor === 'object') { // vemos si es son datos de tipo url
            // tslint:disable-next-line: prefer-for-of
            for (let numUrl = 0; numUrl < valor.length; numUrl++) { // recorremos por numero de urls
              Object.entries(valor[numUrl]).forEach(([subcampo, subvalor]) => { // obtenemos los campos y sus datos
                 // agregamos la informacion de las urls al formulario
                anime.append(`episodios_incluidos[${numEp}].${campo}[${numUrl}].${subcampo}`, subvalor as string);
              });
            }
          } else {
            anime.append(`episodios_incluidos[${numEp}].${campo}`, valor); // agregamos la informacion de los episodios al formulario
          }
        }
      );
    }

    const headers = new HttpHeaders({
      // 'content-type': 'multipart/form-data',
      authorization: 'Bearer ',
    });

    return this.http
      .post<RespuestaServicio>(baseUrl + 'Animes/Agregar', anime, { headers })
      .pipe(retry(2), catchError(handlerError.handleError));
  }
}
