import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {Pessoa} from '../core/Models/Pessoa';


@Injectable({
    providedIn: 'root'
})
export class AlterarCadastroService {

    tokensRenokeUrl = 'http://localhost:8080/pessoas';

    entidade: Pessoa = new Pessoa();
    foto: string = '';

    constructor(private http: HttpClient) {

    }

    getDados(email: string): Promise<any> {
        return this.http.get(this.tokensRenokeUrl + `/buscar-por-email/${email}`)
            .toPromise();
    }

    alterar(id: number, entidade: Pessoa): Promise<any> {
        return this.http.put(this.tokensRenokeUrl + `/${id}`, entidade)
            .toPromise();
    }

}
