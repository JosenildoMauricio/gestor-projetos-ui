import {Injectable} from '@angular/core';
import {HttpErrorResponse} from '@angular/common/http';
import {NotificationsService} from 'angular2-notifications';

@Injectable()
export class ErrorHandlerService {

    constructor(private notificationsService: NotificationsService) {
    }

    handle(errorResponse: any) {
        // console.log(errorResponse);
        let msg: string;

        if (typeof errorResponse === 'string') {
            msg = errorResponse;

        } else if (errorResponse instanceof HttpErrorResponse
            && errorResponse.status >= 400 && errorResponse.status <= 499) {
            msg = 'Ocorreu um erro ao processar a sua solicitação';

            try {
                msg = errorResponse.error[0].mensagemUsuario;
            } catch (e) {
            }

            // console.error('Ocorreu um erro', errorResponse);

        } else {
            msg = 'Erro ao processar serviço remoto. Tente novamente.';
            // console.error('Ocorreu um erro', errorResponse);
        }

        this.notificationsService.error('Ocorreu erro', `${msg}`,
            {
                timeOut: 5000,
                showProgressBar: false,
                pauseOnHover: false,
                clickToClose: false,
                maxLength: 10
            });
    }

}

