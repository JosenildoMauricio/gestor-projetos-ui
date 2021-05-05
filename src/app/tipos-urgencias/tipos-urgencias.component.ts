import {Component, OnInit} from '@angular/core';
import {TiposUrgenciasService} from './tipos-urgencias.service';
import {Router} from '@angular/router';
import {AuthService} from '../seguranca/auth.service';
import {NotificationsService} from 'angular2-notifications';
import {ErrorHandlerService} from '../core/error-handler.service';
import {TipoUrgencia} from '../core/Models/TipoUrgencia';

@Component({
    selector: 'app-tipos-urgencias',
    templateUrl: './tipos-urgencias.component.html',
    styleUrls: ['./tipos-urgencias.component.css']
})
export class TiposUrgenciasComponent implements OnInit {

    hide = true;

    constructor(public tiposUrgenciasService: TiposUrgenciasService,
                private router: Router,
                private notificationsService: NotificationsService,
                private errorHandler: ErrorHandlerService) {

    }

    ngOnInit(): void {

    }

    salvar() {
        this.tiposUrgenciasService.salvar(this.tiposUrgenciasService.entidade)
            .then(response => {
                console.log(JSON.stringify(response));
                this.tiposUrgenciasService.entidade = new TipoUrgencia();
                this.notificationsService.success('Registro inserido com sucesso.', '',
                    {
                        timeOut: 5000,
                        showProgressBar: false,
                        pauseOnHover: false,
                        clickToClose: true,
                        maxLength: 10,
                        position: ['top', 'left']
                    });
            })
            .catch(erro => {
                this.errorHandler.handle(erro);
            });
    }

    cancelarVoltar() {
        this.router.navigate(['/default']);
    }

}
