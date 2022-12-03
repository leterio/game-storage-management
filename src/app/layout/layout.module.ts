import { CommonModule } from '@angular/common';
import { NgModule, Type } from '@angular/core';
import { RouterModule } from '../router/router.module';
import { AppComponent } from './app/app.component';
import { FooterComponent } from './footer/footer.component';
import { HeaderComponent } from './header/header.component';

const modules: Array<Type<any>> = [HeaderComponent, FooterComponent, AppComponent];

@NgModule({
  declarations: modules,
  exports: modules,
  imports: [CommonModule, RouterModule],
})
export class LayoutModule {}
