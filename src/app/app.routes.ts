import { AuthLayoutComponent } from './layouts/auth-layout/auth-layout.component';
import { Routes } from '@angular/router';
import { BlankLayoutComponent } from './layouts/blank-layout/blank-layout.component';
import { NotfoundComponent } from './Components/notfound/notfound.component';
import { LoginComponent } from './Components/auth/login/login.component';
import { RegisterComponent } from './Components/auth/register/register.component';
import { HomeComponent } from './Components/home/home.component';
import { ProductComponent } from './Components/product/product.component';
import { CartComponent } from './Components/cart/cart.component';
import { ProductDetailComponent } from './Components/product/product-detail/product-detail.component';
import { AllOrdersComponent } from './Components/all-orders/all-orders.component';
import { CheckoutComponent } from './Components/checkout/checkout.component';

export const routes: Routes = [
    {path:'', component:AuthLayoutComponent, children:[
        {path:'', redirectTo:'login',pathMatch:'full'},
        {path:'login', component:LoginComponent},
        {path:'register', component:RegisterComponent},
    ]},

    {path:'',component:BlankLayoutComponent,children:[
        {path:'', redirectTo:'home',pathMatch:'full'},
        {path:'home',component:HomeComponent},
        {path:'product',component:ProductComponent},
        {path:'product/:id',component:ProductDetailComponent},
        {path:'cart',component:CartComponent},
        {path:'allorders', component:AllOrdersComponent},
        {path:'orders/:id', component:CheckoutComponent},

    ]},

    {path:'**', component:NotfoundComponent}
];
