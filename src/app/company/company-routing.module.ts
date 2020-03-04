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
    data: { breadcrumb: 'list'}
  },
  {
    path: 'add',
    component: CompanyFormContainer,
    data: { breadcrumb: 'add'}
    
=======
    component: CompanyListContainer
  },
  {
    path: 'add-form',
    component: CompanyFormContainer
>>>>>>> 192265dfc5c3c1cf2aefca4d5e16a1b45eaeafb5
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
