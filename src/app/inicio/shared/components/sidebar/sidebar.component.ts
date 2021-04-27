import {Component, OnInit} from '@angular/core';
import {AuthService} from '../../../../seguranca/auth.service';
import {Pessoa} from '../../../../core/Models/Pessoa';
import {AlterarCadastroService} from '../../../../alterar-cadastro/alterar-cadastro.service';

@Component({
    selector: 'app-sidebar',
    templateUrl: './sidebar.component.html',
    styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

    constructor(public authService: AuthService) {
    }

    ngOnInit() {

    }



}
