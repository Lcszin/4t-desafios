import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Home } from './pages/home/home.component';

const routes: Routes = [
  { path: '', component: Home },
  { 
    path: 'planos', 
    loadChildren: () => import('./modules/planos/planos-module').then(m => m.PlanosModule) 
  }, 
  { 
    path: 'beneficiarios', 
    loadChildren: () => import('./modules/beneficiarios/beneficiarios-module').then(m => m.BeneficiariosModule) 
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }