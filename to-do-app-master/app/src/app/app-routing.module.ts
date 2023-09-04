import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: 'login', loadChildren: () => import('./login-page/login-page.module').then(m => m.LoginPageModule) },
  { path: 'todo', loadChildren: () => import('./to-do-page/to-do-page.module').then(m => m.ToDoPageModule) }
  ];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
