/**
 * Informacion para mostrar en los animes en emision
 */
export class AnimeEmision {
  /**
   * Nombre del anime
   */
  nombre: string;

  /**
   * Tipo de contenido
   */
  tipo_animacion: string;

  constructor(nombre: string, tipo_animacion: string) {
    this.nombre = nombre;
    this.tipo_animacion = tipo_animacion;
  }
}
