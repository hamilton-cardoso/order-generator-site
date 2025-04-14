import { Routes } from '@angular/router';
import { OrderComponent } from './pages/order/order.component';
import { HomeComponent } from './pages/home/home.component';

export const routes: Routes = [
    { path: 'home', component: HomeComponent },
    { path: '', redirectTo: 'home', pathMatch: 'full' },
    { path: 'ordens', component: OrderComponent },
];
