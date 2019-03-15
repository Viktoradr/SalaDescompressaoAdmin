import { NgModule } from '@angular/core';
import { ApiProvider } from './api/api';
import { DataProvider } from './api/data';
import { ProdutoProvider } from './produto/produto.provider';
import { PNotifyProvider } from './pnotify/pnotify.provider';
import { UsuarioProvider } from './usuario/usuario.provider';

@NgModule({
    providers: [
        ApiProvider,
        DataProvider,
        ProdutoProvider,
        UsuarioProvider,
        PNotifyProvider,
    ]
})
export class ProvidersModule { }