import { Routes } from '@angular/router';
import { Authenticate } from './authenticate/authenticate';
import { Home } from './home/home';
import { AuthGuard } from './authenticate/auth-guard';
import { Detail } from './product/detail/detail';
import { CartComponent } from './cart/cart-component/cart-component';
import { OrderDetailsComponent } from './order/order-details-component/order-details-component';
import { OrderComponent } from './order/order-component/order-component';
import { WatchlistComponent } from './watchlist/watchlist-component/watchlist-component';
import { AdminHome } from './admin/admin-home/admin-home';
import { AdminProductEdit } from './admin/admin-product/admin-product-edit/admin-product-edit';
import { NewProduct } from './admin/admin-product/new-product/new-product';
import { AdminOrderComponent } from './admin/orders/admin-order-component/admin-order-component';
import { AdminOrderDetail } from './admin/orders/admin-order-detail/admin-order-detail';

export const routes: Routes = [
  { path: '', redirectTo: '/auth', pathMatch: 'full' },
  { path: 'auth', component: Authenticate },
  { path: 'dashboard', component: Home, canActivate: [AuthGuard] },
  {
    path: 'product-details/:id',
    component: Detail,
    title: 'Product details', canActivate: [AuthGuard]
  },
  { path: 'cart', component: CartComponent },
  { path: 'watchlist', component: WatchlistComponent },
  { path: 'orders', component: OrderComponent, canActivate: [AuthGuard] },
  { path: 'orders/:id', component: OrderDetailsComponent, canActivate: [AuthGuard] },

  { path: 'admin/dashboard', component: AdminHome, canActivate: [AuthGuard] },
  { path: 'admin/product/edit/:id', component: AdminProductEdit, canActivate: [AuthGuard] },
  { path: 'admin/product/new', component: NewProduct, canActivate: [AuthGuard] },
  { path: 'admin/orders', component: AdminOrderComponent, canActivate: [AuthGuard] },
  { path: 'admin/orders/:id', component: AdminOrderDetail, canActivate: [AuthGuard] },



  { path: '**', redirectTo: '/auth' }
];
