import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ComponentsModule } from '../components/components.module';
import { RouterModule } from '../router/router.module';
import { HomeComponent } from './home/home.component';
import { JogosFormComponent } from './jogos/jogos-form/jogos-form.component';
import { JogosHomeComponent } from './jogos/jogos-home/jogos-home.component';
import { JogosRouterComponent } from './jogos/jogos-router/jogos-router.component';
import { PlataformasFormComponent } from './plataformas/plataformas-form/plataformas-form.component';
import { PlataformasHomeComponent } from './plataformas/plataformas-home/plataformas-home.component';
import { PlataformasRouterComponent } from './plataformas/plataformas-router/plataformas-router.component';
import { PrateleirasFormComponent } from './prateleiras/prateleiras-form/prateleiras-form.component';
import { PrateleirasHomeComponent } from './prateleiras/prateleiras-home/prateleiras-home.component';
import { PrateleirasRouterComponent } from './prateleiras/prateleiras-router/prateleiras-router.component';
import { SobreComponent } from './sobre/sobre.component';

@NgModule({
  declarations: [
    HomeComponent,
    JogosHomeComponent,
    JogosFormComponent,
    JogosRouterComponent,
    PrateleirasHomeComponent,
    PrateleirasFormComponent,
    PrateleirasRouterComponent,
    PlataformasHomeComponent,
    PlataformasFormComponent,
    PlataformasRouterComponent,
    SobreComponent,
  ],
  exports: [HomeComponent],
  imports: [CommonModule, RouterModule, ComponentsModule, FormsModule],
})
export class PagesModule {}
