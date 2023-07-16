import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
     path: 'customers',
      loadChildren: () => import('./customers/customers.module')
      .then(m => m.CustomersModule) 
    },
  { 
    path: 'orders', 
    loadChildren: () => import('./orders/orders.module')
    .then(m => m.OrdersModule)
   },
  { path: 'child',
   loadChildren: () => import('./child/child.module')
   .then(m => m.ChildModule)
   },
   
  ];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
