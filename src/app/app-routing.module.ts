import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from "@angular/router";
import {SplashComponent} from "./splash/splash.component";
import {HomeComponent} from "./home/home.component";
import {AuthGuard} from "./_guards/auth.guard";
import {ProfileComponent} from "./profile/profile.component";
import {PropertyLandingComponent} from "./property-landing/property-landing.component";
import {ListingLandingComponent} from "./listing-landing/listing-landing.component";

const appRoutes: Routes = [
  {path: 'app', component: HomeComponent, canActivate: [AuthGuard], children: [
    {path: 'profile', component: ProfileComponent},
    {path: 'property', children: [
      {path: ':address', component: PropertyLandingComponent}
    ]},
    {path: 'property/:address/listing', children: [
      {path: ':id', component: ListingLandingComponent}
    ]}
    ]
  },
  {path: 'landing', component: SplashComponent},
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
