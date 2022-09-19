import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AllAuctionListComponent } from './auction-list/all-auction-list/all-auction-list.component';
import { HomeComponent } from './home/home.component';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { ProductsFormComponent } from './products-form/products-form.component';
import { UserProductsListComponent } from './products-list/user-products-list/user-products-list.component';
import { ProductsComponent } from './products/products.component';
import { RegistrationFormComponent } from './registration-form/registration-form.component';
import { UserComponent } from './user/user.component';

const routes: Routes = [
  {path:"", redirectTo: "home", pathMatch: "full"},
  {path:"home", component: HomeComponent},
  {path:"products/form", component: ProductsFormComponent},
  {path:"products", component: ProductsComponent},
  {path:"products/user", component: UserProductsListComponent},
  {path:"users", component: UserComponent},
  {path:"register", component: RegistrationFormComponent},
  {path:"auction", component: AllAuctionListComponent},
  {path:"product/details/:productId", component: ProductDetailsComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
