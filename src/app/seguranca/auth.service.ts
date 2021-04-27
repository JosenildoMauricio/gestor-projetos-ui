import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {JwtHelperService} from '@auth0/angular-jwt';

@Injectable()
export class AuthService {

    private oauthTokenUrl = 'http://localhost:8080/oauth/token';
    private tokensRenokeUrl = 'http://localhost:8080/pessoas';

    public jwtPayload: any;
    public nomeUsuarioLogado: any;
    public foto: string = '';

    constructor(
        private http: HttpClient,
        private jwtHelper: JwtHelperService) {
        this.carregarToken();
    }

    login(usuario: string, senha: string): Promise<void> {
        const headers = new HttpHeaders()
            .append('Content-Type', 'application/x-www-form-urlencoded')
            .append('Authorization', 'Basic YW5ndWxhcjpAbmd1bEByMDAw');

        const body = `username=${usuario}&password=${senha}&grant_type=password`;

        return this.http.post(this.oauthTokenUrl, body, { headers })
            .toPromise()
            .then(response => {
                const token = response as any;
                this.armazenarToken(token['access_token']);
            })
            .catch(response => {
                const res = response as any;

                if (res.status === 400) {
                    if (res.error.error === 'invalid_grant') {
                        return Promise.reject('Usuário ou senha inválida!');
                    }
                }

                return Promise.reject(res);
            });
    }

    obterNovoAccessToken(): Promise<void> {
        const headers = new HttpHeaders()
            .append('Content-Type', 'application/x-www-form-urlencoded')
            .append('Authorization', 'Basic YW5ndWxhcjpAbmd1bEByMDAw');

        const body = 'grant_type=refresh_token';

        return this.http.post(this.oauthTokenUrl, body,
            { headers, withCredentials: true })
            .toPromise()
            .then(response => {
                const token = response as any;
                this.armazenarToken(token['access_token']);

                return Promise.resolve(token);
            })
            .catch(response => {
                const res = response as any;
                return Promise.resolve(res);
            });
    }

    isAccessTokenInvalido() {
        const token = localStorage.getItem('token');

        return !token || this.jwtHelper.isTokenExpired(token);
    }

    limparAccessToken() {
        localStorage.removeItem('token');
        this.jwtPayload = null;
    }

    temPermissao(permissao: string) {
        return this.jwtPayload && this.jwtPayload.authorities.includes(permissao);
    }

    temQualquerPermissao(roles: any) {
        for (const role of roles) {
            if (this.temPermissao(role)) {
                return true;
            }
        }

        return false;
    }

    getDados(email: string): Promise<any> {
        return this.http.get(this.tokensRenokeUrl + `/buscar-por-email/${email}`)
            .toPromise();
    }

    private armazenarToken(token: string) {
        this.jwtPayload = this.jwtHelper.decodeToken(token);
        this.nomeUsuarioLogado = this.jwtPayload.nome;
        localStorage.setItem('token', token);
    }

    private carregarToken() {
        const token = localStorage.getItem('token');

        if (token) {
            this.armazenarToken(token);
        }
    }

}
