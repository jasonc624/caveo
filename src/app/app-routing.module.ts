import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from "@angular/router";
import {ListingsComponent} from "./listings/listings.component";
import {ListingNotFoundComponent} from "./listings/listing-not-found/listing-not-found.component";
import {SplashComponent} from "./splash/splash.component";
import {HomeComponent} from "./home/home.component";
import {AuthGuard} from "./_guards/auth.guard";

const appRoutes: Routes = [
  {path: '', component: HomeComponent, canActivate: [AuthGuard]},
  {path: 'landing', component: SplashComponent},
  // {path: 'login', component: LoginComponent},
  {
    path: 'listings', children: [
    {path: ':address', component: ListingsComponent},
    {path: ':address/not-found', component: ListingNotFoundComponent},
  ]
  },
  {path: '**', redirectTo: ''}
];
@NgModule({
  imports: [
    CommonModule,
    RouterModule.forRoot(
      appRoutes,
      { enableTracing: false }// <-- debugging purposes only),
    )
  ],
  declarations: [],
  exports: [RouterModule]
})

export class AppRoutingModule { }
