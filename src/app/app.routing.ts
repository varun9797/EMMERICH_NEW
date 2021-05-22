import { NgModule  } from '@angular/core';
import { CommonModule, } from '@angular/common';
import { BrowserModule  } from '@angular/platform-browser';
import { Routes, RouterModule } from '@angular/router';

import { ComponentsComponent } from './components/components.component';
import { LandingComponent } from './examples/landing/landing.component';
import { LoginComponent } from './examples/login/login.component';
import { ProfileComponent } from './examples/profile/profile.component';
import { NucleoiconsComponent } from './components/nucleoicons/nucleoicons.component';
import { AuthGuardService } from './services/auth-guard.service'
import { JwtHelperService, JWT_OPTIONS } from '@auth0/angular-jwt';
import { AuthService } from './services/auth.service'


const routes: Routes =[
    { path: '', redirectTo: 'index/CHIMNEYS', pathMatch: 'full' },
    { path: 'index', redirectTo: 'index/CHIMNEYS', pathMatch: 'full' },
    { path: 'index/:type',                component: ComponentsComponent },
    { path: 'details/:imageName',          component: NucleoiconsComponent },
    { path: 'examples/details/:id',     component: LandingComponent },
    { path: 'examples/login',       component: LoginComponent },
    { path: 'examples/profile',canActivate: [AuthGuardService] ,  component: ProfileComponent }

];

@NgModule({
    imports: [
        CommonModule,
        BrowserModule,
        RouterModule.forRoot(routes),
    ],
    exports: [
    ],
    providers:[{ provide: JWT_OPTIONS, useValue: JWT_OPTIONS },
        JwtHelperService, AuthGuardService, AuthService]
})
export class AppRoutingModule { }
