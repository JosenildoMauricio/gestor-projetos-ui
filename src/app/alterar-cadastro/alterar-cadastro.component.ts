import {Component, OnInit} from '@angular/core';
import {AlterarCadastroService} from './alterar-cadastro.service';
import {FormControl, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {Pessoa} from '../core/Models/Pessoa';
import {AuthService} from '../seguranca/auth.service';
import {ErrorHandlerService} from '../core/error-handler.service';
import {NotificationsService} from 'angular2-notifications';

@Component({
    selector: 'app-alterar-cadastro',
    templateUrl: './alterar-cadastro.component.html',
    styleUrls: ['./alterar-cadastro.component.css']
})
export class AlterarCadastroComponent implements OnInit {

    hide = true;

    constructor(public alterarCadastroService: AlterarCadastroService,
                private notificationsService: NotificationsService,
                private authService: AuthService,
                private errorHandler: ErrorHandlerService,
                private router: Router) {

    }

    ngOnInit(): void {
        this.getDados();
    }

    emailFormControl = new FormControl('', [
        Validators.required,
        Validators.email,
    ]);

    getDados() {
        this.alterarCadastroService.getDados(this.authService.jwtPayload?.user_name)
            .then(response => {
                this.alterarCadastroService.entidade = response as Pessoa;
                this.authService.nomeUsuarioLogado = this.alterarCadastroService.entidade.nome;
                this.alterarCadastroService.foto = this.alterarCadastroService.entidade.avatar;
            })
            .catch(response => {
                const res = response as any;
                return Promise.resolve(res);
            });
    }

    salvarAlteracoes() {
        this.alterarCadastroService.alterar(this.alterarCadastroService.entidade.id, this.alterarCadastroService.entidade)
            .then(response => {
                this.getDados();
                this.notificationsService.success('Registro alterado com sucesso.', '',
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

    changeFileSelected(event: any) {
        const file = event.target.files[0];

        this.getBase64(file);
    }

    getBase64(file: any): any {
        let reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => {
            this.alterarCadastroService.entidade.avatar = (reader.result as string).split(',')[1];
            this.carregarAvatar(reader.result);
        };
        reader.onerror = function (error) {
            console.log('Error: ', error);
        };
    }

    carregarAvatar(img64: any) {
        this.alterarCadastroService.foto = img64 as string;
        this.alterarCadastroService.entidade.avatar = this.alterarCadastroService.foto;
    }

    cancelarClick() {
        this.authService.getDados(this.authService.jwtPayload?.user_name)
            .then(response => {
                const {avatar} = response as Pessoa;
                this.authService.foto = avatar;
            })
            .catch(response => {
                const res = response as any;
                return Promise.resolve(res);
            });
        this.router.navigate(['/default']);
    }

    limparImagem() {
        this.alterarCadastroService.foto = '';
        this.alterarCadastroService.entidade.avatar = '';
    }

}
