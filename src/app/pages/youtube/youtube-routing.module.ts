import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { TrendingComponent } from './trending/trending.component';
import { SubscriptionComponent } from './subscription/subscription.component';
import { ReportComponent } from './report/report.component';

const routes: Routes = [
  { path : '', redirectTo : 'home', pathMatch : 'full'},
  { path : 'home', component : HomeComponent},
  { path : 'trending', component : TrendingComponent},
  { path : 'subscriptions', component : SubscriptionComponent},
  { path : 'report' , component : ReportComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class YoutubeRoutingModule { }
