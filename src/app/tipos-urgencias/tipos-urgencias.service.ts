import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {TipoUrgencia} from '../core/Models/TipoUrgencia';


@Injectable({
    providedIn: 'root'
})
export class TiposUrgenciasService {

    tokensRenokeUrl = 'http://localhost:8080/tipos_urgencias';

    entidade: TipoUrgencia = new TipoUrgencia();

    constructor(private http: HttpClient) {

    }


    salvar(entidade: TipoUrgencia): Promise<any> {
        return this.http.post(this.tokensRenokeUrl, entidade)
            .toPromise();
    }

}
