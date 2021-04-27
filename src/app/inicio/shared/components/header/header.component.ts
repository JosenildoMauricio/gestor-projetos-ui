import {Component, OnInit, Output, EventEmitter} from '@angular/core';
import {Router} from '@angular/router';
import {LogoutService} from '../../../../seguranca/logout.service';
import {ErrorHandlerService} from '../../../../core/error-handler.service';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

    @Output() toggleSideBarForMe: EventEmitter<any> = new EventEmitter();

    constructor(
        private router: Router,
        private logoutService: LogoutService,
        private errorHandler: ErrorHandlerService
    ) {
    }

    ngOnInit() {
    }

    toggleSideBar() {
        this.toggleSideBarForMe.emit();
        setTimeout(() => {
            window.dispatchEvent(
                new Event('resize')
            );
        }, 300);
    }

    alterarCadastro() {
        this.router.navigate(['alterar-cadastro']);
    }

    tiposUrgencias() {
        this.router.navigate(['tipos-urgencias']);
    }

    sair() {
        this.logoutService.logout()
            .then(() => {
                this.router.navigate(['/login']);
            })
            .catch(erro => this.errorHandler.handle(erro));
    }


}
