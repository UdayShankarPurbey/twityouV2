import { Routes } from '@angular/router';
import { LayoutComponent } from './component/layout/layout.component';
import { PageNotDoundComponent } from './pages/page-not-dound/page-not-dound.component';
import { LoginComponent } from './pages/user/login/login.component';
import { RegisterComponent } from './pages/user/register/register.component';
import { LogoutComponent } from './pages/user/logout/logout.component';

export const routes: Routes = [
    {path : '', redirectTo : 'login', pathMatch : 'full'},
    { path : '', component : LayoutComponent ,
        children : [
            { path : 'youtube' , loadChildren : () => import('./pages/youtube/youtube.module').then((m)=> m.YoutubeModule )},
            { path : 'tweet', loadChildren : () => import('./pages/tweet/tweet.module').then((m)=> m.TweetModule )},
            { path : 'user', loadChildren : () => import('./pages/user/user.module').then((m)=> m.UserModule )},
        ]
    },
    { path : 'login', component : LoginComponent},
    { path : 'register', component : RegisterComponent},
    { path : 'logout', component : LogoutComponent },
    { path : '**', component : PageNotDoundComponent }
];