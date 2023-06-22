import { NgModule, Component } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePageComponent } from './components/home-page/home-page.component';
import { GameComponent } from './components/game/game.component';
import { GameOverComponent } from './components/game-over/game-over.component';

const routes: Routes = [
  { path: '', component: HomePageComponent}, //el path en blanco para que sea la ruta por defecto al iniciar la app
  { path: 'game', component: GameComponent },
  { path: 'game-over', component: GameOverComponent },
]

@NgModule({
  declarations: [],
  imports: [RouterModule.forRoot(routes)],
  exports:[RouterModule],
})
export class AppRoutingModule { }
