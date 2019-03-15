import { NgModule } from "@angular/core";
import { Routes, RouterModule } from '@angular/router';

import { LoginComponent } from "./login/login.component";

const routes: Routes = [
    { path: '', pathMatch: 'full', redirectTo: 'Login' },
    { path: 'Login', component: LoginComponent },
    { path: 'Admin', loadChildren: './admin/admin.module#AdminModule' },
    { path: 'Sair', redirectTo: 'Login' },
];

@NgModule({
    imports: [RouterModule.forRoot(routes, { useHash: true })],
    exports: [RouterModule]
})
export class AppRoutingModule { }
