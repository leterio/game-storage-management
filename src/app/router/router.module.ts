import { NgModule } from '@angular/core';
import { RouterModule as AngularRouterModule, Routes, TitleStrategy as AngularTitleStrategy } from '@angular/router';
import { HomeComponent } from '../pages/home/home.component';
import { JogosFormComponent } from '../pages/jogos/jogos-form/jogos-form.component';
import { JogosHomeComponent } from '../pages/jogos/jogos-home/jogos-home.component';
import { JogosRouterComponent } from '../pages/jogos/jogos-router/jogos-router.component';
import { RouterTitleStrategy } from './router-title-strategy';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { title: 'Home', path: 'home', component: HomeComponent },
  {
    title: 'Jogos',
    path: 'jogos',
    component: JogosRouterComponent,
    children: [
      { title: 'Jogos', path: '', component: JogosHomeComponent },
      { title: 'Novo Jogo', path: 'novo', component: JogosFormComponent },
      { title: 'Alterando ${jogo}', path: ':id', component: JogosFormComponent },
    ],
  },
];

@NgModule({
  imports: [AngularRouterModule.forRoot(routes)],
  exports: [AngularRouterModule],
  providers: [{ provide: AngularTitleStrategy, useClass: RouterTitleStrategy }],
})
export class RouterModule {}
