import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {SegurancaRoutingModule} from './seguranca-routing.module';
import {LoginComponent} from './login/login.component';
import {FormsModule} from '@angular/forms';
import {AppRoutingModule} from '../app-routing.module';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatCardModule} from '@angular/material/card';
import {DefaultModule} from '../inicio/default/default.module';
import {MatInputModule} from '@angular/material/input';
import {BrowserModule} from '@angular/platform-browser';
import {MatFormFieldModule} from '@angular/material/form-field';

import { JwtModule, JwtHelperService } from '@auth0/angular-jwt';
import {AuthGuard} from './auth.guard';
import {LogoutService} from './logout.service';
import {SimpleNotificationsModule} from 'angular2-notifications';


@NgModule({
    imports: [
        CommonModule,
        SegurancaRoutingModule,
        FormsModule,

        DefaultModule,

        SimpleNotificationsModule.forRoot(),

        JwtModule.forRoot({
            config: {
                tokenGetter: () => {
                    return localStorage.getItem('token');
                },
                allowedDomains: ['localhost:8080'],
                disallowedRoutes: ['http://localhost:8080/oauth/token']
            }
        }),

        BrowserModule,
        AppRoutingModule,
        BrowserAnimationsModule,
        MatCardModule,
        MatButtonModule,
        MatInputModule,
        MatFormFieldModule,
        MatIconModule
    ],
    declarations: [
        LoginComponent
    ],
    providers: [
        JwtHelperService,
        AuthGuard,
        LogoutService
    ]
})
export class SegurancaModule {}
