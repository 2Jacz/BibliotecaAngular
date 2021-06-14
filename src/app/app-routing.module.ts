import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AgregarAnimeComponent } from './agregar-anime/agregar-anime.component';
import { ErrorComponent } from './error/error.component';
import { InicioAnimeComponent } from './inicio-anime/inicio-anime.component';
import { ListarAnimesComponent } from './listar-animes/listar-animes.component';

const routes: Routes = [
  { path: '', redirectTo: '/Inicio-Anime', pathMatch: 'full' },
  { path: 'Inicio-Anime', component: InicioAnimeComponent },
  { path: 'Animes', component: ListarAnimesComponent },
  { path: 'Anime/Agregar', component: AgregarAnimeComponent },
  { path: '**', component: ErrorComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
