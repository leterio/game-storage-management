import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Constants } from 'src/app/helper/constants';

declare type AppRoutes = AppRoute[];
interface AppRoute {
  title: string;
  path: string;
}

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  appName: string = Constants.appName;

  public routes: AppRoutes = [];

  constructor(private router: Router) {}

  loadRoutes(): void {
    this.routes = this.router.config
      .filter((route) => route.title && route.path)
      .map(
        (route) =>
          <AppRoute>{
            title: route.title,
            path: `/${route.path}`,
          }
      );
  }

  ngOnInit(): void {
    this.loadRoutes();
  }
}
