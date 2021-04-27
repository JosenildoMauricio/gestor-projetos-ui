import {Component, OnInit} from '@angular/core';
import {FormControl, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {AuthService} from '../auth.service';
import {ErrorHandlerService} from '../../core/error-handler.service';
import {Pessoa} from '../../core/Models/Pessoa';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

    public usuario = '';
    public senha = '';

    constructor(private router: Router,
                private errorHandler: ErrorHandlerService,
                private authService: AuthService) {
    }

    ngOnInit(): void {

    }

    emailFormControl = new FormControl('', [
        Validators.required,
        Validators.email,
    ]);


    login(usuario: string, senha: string) {
        this.authService.login(usuario, senha)
            .then(() => {
                this.router.navigate(['/default']);
                this.authService.getDados(this.authService.jwtPayload?.user_name)
                    .then(response => {
                        const {avatar} = response as Pessoa;
                        this.authService.foto = avatar;
                    })
                    .catch(response => {
                        const res = response as any;
                        return Promise.resolve(res);
                    });
            })
            .catch(erro => {
                this.errorHandler.handle(erro);
            });
    }

    cadastroClick() {
        this.router.navigate(['cadastro']);
    }

}
