import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Pessoa} from '../core/Models/Pessoa';


@Injectable({
    providedIn: 'root'
})
export class CadastroService {

    entidade: Pessoa = new Pessoa();
    foto: string = '';

    constructor(private http: HttpClient) {

    }

    cadastrar(entidade: Pessoa): Promise<any> {
        return this.http.post('http://localhost:8080/pessoas', entidade)
            .toPromise();
    }

}
