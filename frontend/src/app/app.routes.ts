import { Routes } from '@angular/router';
import { HomepageComponent } from './homepage/homepage.component';
import { ProductsComponent } from './products/products.component';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from './guards/auth-guard.guard';
import { AddProductComponent } from './add-product/add-product.component';
import { SignupComponent } from './signup/signup.component';

export const routes: Routes = [
  { path: '', component: HomepageComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'products', component: ProductsComponent, canActivate: [AuthGuard] },
  { path: 'product', component: AddProductComponent, canActivate: [AuthGuard] },
  { path: 'product/:id', component: AddProductComponent, canActivate: [AuthGuard] },
  { path: 'login', component: LoginComponent },
];
