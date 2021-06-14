import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { RespuestaServicio } from 'src/Clases/Respuesta_Servicio/respuesta-servicio';
import { baseUrl } from '../BaseUrl';
import { catchError, retry } from 'rxjs/operators';
import { handlerError } from '../my-error-handler';

@Injectable({
  providedIn: 'root'
})
export class InicioAnimeServicioService {

  constructor(private http: HttpClient) { }

  public ObtenerInformacionInicio(): Observable<RespuestaServicio> {
    return this.http.get<RespuestaServicio>(baseUrl + 'Anime_Inicio/Inicio-Anime')
    .pipe(retry(2), catchError(handlerError.handleError));
  }
}
