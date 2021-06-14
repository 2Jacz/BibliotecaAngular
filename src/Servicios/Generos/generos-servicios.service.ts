import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { RespuestaServicio } from 'src/Clases/Respuesta_Servicio/respuesta-servicio';
import { baseUrl } from '../BaseUrl';
import { handlerError } from '../my-error-handler';

@Injectable({
  providedIn: 'root',
})
export class GenerosServiciosService {
  constructor(private http: HttpClient) {}

  obtenerGeneros(): Observable<RespuestaServicio> {
    return this.http
      .get<RespuestaServicio>(baseUrl + 'Generos/Lista')
      .pipe(retry(2), catchError(handlerError.handleError));
  }
}
