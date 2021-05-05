import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {LoginComponent} from './login/login.component';
import {DefaultComponent} from '../inicio/default/default.component';
import {CadastroComponent} from '../cadastro/cadastro.component';
import {AuthGuard} from './auth.guard';
import {AlterarCadastroComponent} from '../alterar-cadastro/alterar-cadastro.component';
import {TiposUrgenciasComponent} from '../tipos-urgencias/tipos-urgencias.component';

const routes: Routes = [
    { path: 'login', component: LoginComponent },
    { path: 'cadastro', component: CadastroComponent },
    { path: 'default', component: DefaultComponent, canActivate: [AuthGuard] },
    { path: 'alterar-cadastro', component: AlterarCadastroComponent, canActivate: [AuthGuard] },
    { path: 'tipos-urgencias', component: TiposUrgenciasComponent, canActivate: [AuthGuard] }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class SegurancaRoutingModule {
}
