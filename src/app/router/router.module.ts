import { NgModule } from '@angular/core';
import { RouterModule as AngularRouterModule, Routes, TitleStrategy as AngularTitleStrategy } from '@angular/router';
import { HomeComponent } from '../pages/home/home.component';
import { JogosFormComponent } from '../pages/jogos/jogos-form/jogos-form.component';
import { JogosHomeComponent } from '../pages/jogos/jogos-home/jogos-home.component';
import { JogosRouterComponent } from '../pages/jogos/jogos-router/jogos-router.component';
import { PlataformasFormComponent } from '../pages/plataformas/plataformas-form/plataformas-form.component';
import { PlataformasHomeComponent } from '../pages/plataformas/plataformas-home/plataformas-home.component';
import { PlataformasRouterComponent } from '../pages/plataformas/plataformas-router/plataformas-router.component';
import { PrateleirasFormComponent } from '../pages/prateleiras/prateleiras-form/prateleiras-form.component';
import { PrateleirasHomeComponent } from '../pages/prateleiras/prateleiras-home/prateleiras-home.component';
import { PrateleirasRouterComponent } from '../pages/prateleiras/prateleiras-router/prateleiras-router.component';
import { SobreComponent } from '../pages/sobre/sobre.component';
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
  {
    title: 'Plataformas / Consoles',
    path: 'plataformas',
    component: PlataformasRouterComponent,
    children: [
      { title: 'Plataformas / Consoles', path: '', component: PlataformasHomeComponent },
      { title: 'Nova Plataforma', path: 'novo', component: PlataformasFormComponent },
      { title: 'Alterando ${plataforma}', path: ':id', component: PlataformasFormComponent },
    ],
  },
  {
    title: 'Prateleiras',
    path: 'prateleiras',
    component: PrateleirasRouterComponent,
    children: [
      { title: 'Prateleiras', path: '', component: PrateleirasHomeComponent },
      { title: 'Nova Prateleira', path: 'novo', component: PrateleirasFormComponent },
      { title: 'Alterando ${prateleira}', path: ':id', component: PrateleirasFormComponent },
    ],
  },
  { title: 'Sobre', path: 'sobre', component: SobreComponent },
];

@NgModule({
  imports: [AngularRouterModule.forRoot(routes, { onSameUrlNavigation: 'reload' })],
  exports: [AngularRouterModule],
  providers: [{ provide: AngularTitleStrategy, useClass: RouterTitleStrategy }],
})
export class RouterModule {}
