import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { PagesModule } from './pages/pages.module';

import { RouterModule } from './router/router.module';
import { AppComponent } from './layout/app/app.component';
import { LayoutModule } from './layout/layout.module';

@NgModule({
  imports: [BrowserModule, RouterModule, LayoutModule, PagesModule],
  bootstrap: [AppComponent],
  declarations: [],
})
export class AppModule {}
