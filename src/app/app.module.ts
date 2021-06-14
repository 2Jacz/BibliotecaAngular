import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AnimesEnEmisionComponent } from './inicio-anime/animes-en-emision/animes-en-emision.component';
import { InicioAnimeComponent } from './inicio-anime/inicio-anime.component';
import { NuevosAnimesComponent } from './inicio-anime/nuevos-animes/nuevos-animes.component';
import { NuevosEpisodiosComponent } from './inicio-anime/nuevos-episodios/nuevos-episodios.component';
import { ErrorComponent } from './error/error.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { FootBarComponent } from './foot-bar/foot-bar.component';

import { AngularMaterialModule } from './angular-material.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { SearchBarPipe } from './nav-bar/search-bar.pipe';
import { ListarAnimesComponent } from './listar-animes/listar-animes.component';
import { FiltrosAnimeComponent } from './listar-animes/filtros-anime/filtros-anime.component';
import { ListadoAnimeComponent } from './listar-animes/listado-anime/listado-anime.component';
import { PaginadoAnimeComponent } from './listar-animes/paginado-anime/paginado-anime.component';
import { AgregarAnimeComponent } from './agregar-anime/agregar-anime.component';
import { FormularioAnimeComponent } from './agregar-anime/formulario-anime/formulario-anime.component';
import { FormularioEpisodiosComponent } from './agregar-anime/formulario-episodios/formulario-episodios.component';
import { MAT_DATE_LOCALE } from '@angular/material/core';

@NgModule({
  declarations: [
    AppComponent,
    NavBarComponent,
    FootBarComponent,
    InicioAnimeComponent,
    NuevosAnimesComponent,
    NuevosEpisodiosComponent,
    AnimesEnEmisionComponent,
    ErrorComponent,
    SearchBarPipe,
    ListarAnimesComponent,
    FiltrosAnimeComponent,
    ListadoAnimeComponent,
    PaginadoAnimeComponent,
    AgregarAnimeComponent,
    FormularioAnimeComponent,
    FormularioEpisodiosComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    AngularMaterialModule,
    FlexLayoutModule
  ],
  providers: [
    { provide: MAT_DATE_LOCALE, useValue: 'es-MX' }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
