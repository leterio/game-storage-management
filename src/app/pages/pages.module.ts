import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { RouterModule } from '../router/router.module';
import { ComponentsModule } from '../components/components.module';

import { HomeComponent } from './home/home.component';

import { JogosFormComponent } from './jogos/jogos-form/jogos-form.component';
import { JogosHomeComponent } from './jogos/jogos-home/jogos-home.component';
import { JogosRouterComponent } from './jogos/jogos-router/jogos-router.component';

@NgModule({
  declarations: [HomeComponent, JogosHomeComponent, JogosFormComponent, JogosRouterComponent],
  exports: [HomeComponent],
  imports: [CommonModule, RouterModule, ComponentsModule],
})
export class PagesModule {}
