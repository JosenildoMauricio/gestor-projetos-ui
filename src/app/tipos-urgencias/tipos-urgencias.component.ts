import {Component, OnInit} from '@angular/core';
import {TiposUrgenciasService} from './tipos-urgencias.service';
import {FormControl, Validators} from '@angular/forms';
import {Router} from '@angular/router';

@Component({
    selector: 'app-tipos-urgencias',
    templateUrl: './tipos-urgencias.component.html',
    styleUrls: ['./tipos-urgencias.component.css']
})
export class TiposUrgenciasComponent implements OnInit {

    hide = true;

    constructor(private cadastroService: TiposUrgenciasService,
                private router: Router) {

    }

    ngOnInit(): void {

    }

    cancelarClick() {
        this.router.navigate(['login']);
    }

}
