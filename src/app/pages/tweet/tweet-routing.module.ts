import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { TweetDashboardComponent } from './tweet-dashboard/tweet-dashboard.component';
import { NotificationComponent } from './notification/notification.component';
import { AnalyticsComponent } from './analytics/analytics.component';

const routes: Routes = [
  { path : '', redirectTo : 'dashboard', pathMatch : 'full'},
  {path: 'dashboard', component: TweetDashboardComponent, children : 
    [
      {path: 'home', component: HomeComponent},
      {path: 'notifications', component: NotificationComponent},
      {path : 'analytics', component: AnalyticsComponent},
    ]
  },
 


];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TweetRoutingModule { }
