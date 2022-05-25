import { Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';

export const rootRouterConfig: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },
  {
    path: 'login',
    canLoad: [AuthGuard],
    loadChildren: () => import('./pages/login/login.module').then( m => m.LoginModule),
  },
  {
    path: 'invoice',
    canActivate: [AuthGuard],
    loadChildren: () =>
      import('./pages/invoice/invoice.module').then(
        (m) => m.InvoiceModule
      ),
  },
  {
    path: '**',
    redirectTo: 'login',
  },
];