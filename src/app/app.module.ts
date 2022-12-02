import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './layout/app/app.component';
import { LayoutModule } from './layout/layout.module';
import { PagesModule } from './pages/pages.module';
import { RouterModule } from './router/router.module';

@NgModule({
  imports: [BrowserModule, RouterModule, LayoutModule, PagesModule, HttpClientModule],
  bootstrap: [AppComponent],
  declarations: [],
})
export class AppModule {}
