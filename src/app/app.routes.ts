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
import { AdminGuard } from './authenticate/admin-guard/admin-guard';
import { AdminProductDetail } from './admin/admin-product/admin-product-detail/admin-product-detail';
import { StatsComponent } from './stats/stats';
import { AdminStats } from './admin/stats/admin-stats/admin-stats';

export const routes: Routes = [
  { path: '', redirectTo: '/auth', pathMatch: 'full' },
  { path: 'logout', redirectTo:  '/auth', pathMatch: 'full' },
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
  { path: 'stats', component: StatsComponent, canActivate: [AuthGuard] },

  { path: 'admin/dashboard', component: AdminHome, canActivate: [AdminGuard] },
  { path: 'admin/product/edit/:id', component: AdminProductEdit, canActivate: [AdminGuard] },
  { path: 'admin/product/new', component: NewProduct, canActivate: [AdminGuard] },
  { path: 'admin/orders', component: AdminOrderComponent, canActivate: [AdminGuard] },
  { path: 'admin/orders/:id', component: AdminOrderDetail, canActivate: [AdminGuard] },
  { path: 'admin-product-details/:id', component: AdminProductDetail, canActivate: [AdminGuard] },
  { path: 'admin/stats', component: AdminStats, canActivate: [AdminGuard] },



  { path: '**', redirectTo: '/auth' }
];
