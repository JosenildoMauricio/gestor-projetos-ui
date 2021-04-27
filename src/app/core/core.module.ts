import {Title} from '@angular/platform-browser';
import {RouterModule} from '@angular/router';
import {NgModule, LOCALE_ID} from '@angular/core';
import {CommonModule} from '@angular/common';
import {registerLocaleData} from '@angular/common';
import localePt from '@angular/common/locales/pt';

import {AuthService} from '../seguranca/auth.service';
import {PaginaNaoEncontradaComponent} from './pagina-nao-encontrada.component';
import {ErrorHandlerService} from './error-handler.service';

registerLocaleData(localePt);

@NgModule({
    imports: [
        CommonModule,
        RouterModule
    ],
    declarations: [
        PaginaNaoEncontradaComponent
    ],
    exports: [],
    providers: [
        ErrorHandlerService,
        AuthService,
        Title,
        {provide: LOCALE_ID, useValue: 'pt-BR'}
    ]
})
export class CoreModule {
}
