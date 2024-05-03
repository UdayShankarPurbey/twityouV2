import { Routes } from '@angular/router';
import { LayoutComponent } from './component/layout/layout.component';
import { PageNotDoundComponent } from './pages/page-not-dound/page-not-dound.component';

export const routes: Routes = [
    { path : '', component : LayoutComponent },
    { path : '**', component : PageNotDoundComponent }
];
