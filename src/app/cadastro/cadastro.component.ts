import {Component, OnInit} from '@angular/core';
import {CadastroService} from './cadastro.service';
import {FormControl, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {ErrorHandlerService} from '../core/error-handler.service';
import {NotificationsService} from 'angular2-notifications';


@Component({
    selector: 'app-cadastro',
    templateUrl: './cadastro.component.html',
    styleUrls: ['./cadastro.component.css']
})
export class CadastroComponent implements OnInit {

    hide = true;

    foto: string = '';

    constructor(public cadastroService: CadastroService,
                private notificationsService: NotificationsService,
                private errorHandler: ErrorHandlerService,
                private router: Router) {

    }

    ngOnInit(): void {

    }

    emailFormControl = new FormControl('', [
        Validators.required,
        Validators.email,
    ]);

    cancelarClick() {
        this.router.navigate(['/login']);
    }

    cadastrar() {
        console.log(JSON.stringify(this.cadastroService.entidade));
        this.cadastroService.cadastrar(this.cadastroService.entidade)
            .then(response => {
                this.notificationsService.success('Usuário cadastrado com sucesso.', '',
                    {
                        timeOut: 5000,
                        showProgressBar: false,
                        pauseOnHover: false,
                        clickToClose: false,
                        maxLength: 10,
                        position: ['top', 'left']
                    });
            })
            .catch(erro => {
                this.errorHandler.handle(erro);
            });
    }

    changeFileSelected(event: any) {
        const file = event.target.files[0];

        this.getBase64(file);
    }

    getBase64(file: any): any {
        let reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => {
            this.cadastroService.entidade.avatar = reader.result as string; // (reader.result as string).split(',')[1];
            this.carregarAvatar(reader.result);
        };
        reader.onerror = function (error) {
            console.log('Error: ', error);
        };
    }

    carregarAvatar(img64: any) {
        this.cadastroService.foto = img64 as string;
        this.cadastroService.entidade.avatar = this.cadastroService.foto;
    }

    limparImagem() {
        this.cadastroService.foto = '';
        this.cadastroService.entidade.avatar = '';
    }

}
