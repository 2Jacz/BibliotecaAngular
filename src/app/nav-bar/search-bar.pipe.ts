import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'searchBar',
})
export class SearchBarPipe implements PipeTransform {
  /**
   * Transform
   *
   * @param {any[]} objetos objetos filtrados
   * @param {string} busqueda parametro de busqueda
   * @returns {any[]} lista de animes/manga filtrados
   */
  transform(objetos: any[], busqueda: string): any[] {
    if (!objetos) {
      return [];
    }
    if (!busqueda) {
      return objetos;
    }
    busqueda = busqueda.toLocaleLowerCase();

    return objetos.filter((it) => {
      return it.toLocaleLowerCase().includes(busqueda);
    });
  }
}
