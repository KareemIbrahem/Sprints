import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CustomersComponent } from './customers.component';
import { OrdersComponent } from '../orders/orders.component';

const routes: Routes = [{ path: '', 
component: CustomersComponent ,
children: [{ path: 'orders', component: OrdersComponent}]}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CustomersRoutingModule { }
