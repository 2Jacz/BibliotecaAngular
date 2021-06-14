import { HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';


class myErrorHandler {
  constructor() {}

  public handleError(error: HttpErrorResponse): Observable<never> {
    let errorMessage = 'Unknown error!';
    if (error.error instanceof ErrorEvent) {
      // Client-side errors
      errorMessage = `Error: ${error.error.message}`;
    } else {
      // Server-side errors
      if (error.error) {
        try {
          errorMessage = `${error.error.mensaje}\n`;
          Object.entries(error.error.datos).forEach(([campo, mensajes]) => {
            errorMessage += `${campo}: ${mensajes}\n`;
          });
        } catch {
          errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
        }
      }
    }
    alert(errorMessage);
    return throwError(errorMessage);
  }
}

const handlerError = new myErrorHandler();
export { handlerError };
