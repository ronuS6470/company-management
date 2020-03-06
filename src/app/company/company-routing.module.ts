import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuthGuard } from '../core/services/guard/auth.guard';
import { CompanyFormContainer } from './company-form-container/company-form.container';
import { CompanyListContainer } from './company-list-container/company-list.container';

const routes: Routes = [
  {
    path: 'list',
    component: CompanyListContainer,
    canActivate: [AuthGuard]
  },
  {
    path: 'add',
    component: CompanyFormContainer,
    data: { breadcrumb: 'add'}
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
