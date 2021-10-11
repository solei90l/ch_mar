import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';

const routes: Routes = [
  {
    loadChildren: () => import('./pages/home/home.module').then((m) => m.HomeModule),
    path: '',
    // canActivate: []
  }
];

@NgModule({
  exports: [RouterModule],
  imports: [RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })],
})
export class AppRoutingModule { }
