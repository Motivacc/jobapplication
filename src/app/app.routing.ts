import {ModuleWithProviders} from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import {HomeComponent} from './home/home.component';

const appRouting: Routes = [
    {path: '', pathMatch: 'full', component:HomeComponent},
    {path: 'home',  component: HomeComponent}

]

export const routing:ModuleWithProviders = RouterModule.forRoot(appRouting); 