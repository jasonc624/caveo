import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from "@angular/router";
import {ListingsComponent} from "./listings/listings.component";
import {SplashComponent} from "./splash/splash.component";
import {HomeComponent} from "./home/home.component";
import {AuthGuard} from "./_guards/auth.guard";
import {ProfileComponent} from "./profile/profile.component";

const appRoutes: Routes = [
  {path: 'app', component: HomeComponent, canActivate: [AuthGuard], children: [
    {path: 'profile', component: ProfileComponent},
    {path: 'search', children: [
      {path: ':address', component: ListingsComponent}
      // {path: '**', component: ListingNotFoundComponent}
    ]}
    ]
  },
  {path: 'landing', component: SplashComponent},
  // {path: 'login', component: LoginComponent},
  // {
  //   path: 'listings', children: [
  //   {path: ':address', component: ListingsComponent},
  //   {path: ':address/not-found', component: ListingNotFoundComponent},
  // ]
  // },
  {path: '**', redirectTo: 'app'}
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
