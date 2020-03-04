import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CompanyListContainer } from './company-list-container/company-list.container';
import { CompanyFormContainer } from './company-form-container/company-form.container';
import { AuthGuard } from '../core/services/guard/auth.guard';


const routes: Routes = [
  {
    path: 'list',
<<<<<<< HEAD
    component: CompanyListContainer,
    canActivate: [AuthGuard]
  },
  {
    path: 'add',
    component: CompanyFormContainer
  },
  {
    path: 'edit/:id',
    component: CompanyFormContainer
  },
  {
    path: 'add',
=======
    component: CompanyListContainer
  },
  {
    path: 'add-form',
>>>>>>> 686a6b438d6461f2c45bf728a159a42aa64718eb
    component: CompanyFormContainer
  },
  {
    path: 'edit/:id',
    component: CompanyFormContainer
  },
  {
    path: '',
    redirectTo: 'list',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CompanyRoutingModule { }
