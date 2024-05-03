import { Routes } from '@angular/router';
import { LayoutComponent } from './component/layout/layout.component';
import { PageNotDoundComponent } from './pages/page-not-dound/page-not-dound.component';

export const routes: Routes = [
    { path : '', component : LayoutComponent ,
        children : [
            { path : 'youtube' , loadChildren : () => import('./pages/youtube/youtube.module').then((m)=> m.YoutubeModule )},
            { path : 'tweet', loadChildren : () => import('./pages/tweet/tweet.module').then((m)=> m.TweetModule )},
        ]
    },
    { path : '**', component : PageNotDoundComponent }
];