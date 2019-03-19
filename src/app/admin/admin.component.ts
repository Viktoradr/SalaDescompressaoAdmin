import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { Usuario } from '../model/usuario.model';
import { DataProvider } from '../shared/providers/api/data';

export interface menu {
  title: string,
  url?: any,
  icon?: any,
  isDrop?: boolean,
  active?: any
  lista?: Array<item>
}
export interface item {
  title: string,
  url: any,
  icon: any,
  active?: any
}

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {

  Usuario: Usuario;
  isClosed: boolean;
  Closed: boolean;

  menu: Array<menu> = [
    { title: 'Dashboard', url: 'Dashboard', icon: 'home' },
    { title: 'Usuários', url: 'Usuarios', icon: 'people' },
    { title: 'Produtos', url: 'Produtos', icon: 'room_service' },
    { title: 'Relatório', url: 'Relatorios', icon: 'assignment' },
    { title: 'Produtos Comprados Mês', url: 'Relatorio', icon: 'assignment' },
    { title: 'Histórico de Estoque', url: 'Historico', icon: 'list_alt' },
    // {
    //   title: 'Integrações',
    //   icon: 'language',
    //   isDrop: true,
    //   lista: [
    //     { title: 'Processo Eletrônico', url: 'ProcessoEletronico', icon: 'gavel' },
    //   ]
    // },
  ];

  Dropdown: any;
  @Input() isLoading: boolean;

  constructor(
    private router: Router,
    private data: DataProvider
  ) { }

  ngOnInit() {
    this.Usuario = this.data.getUser();
    
    this.setWidth();
    
    window.addEventListener('resize', () => {
      this.setWidth();
    });
  }

  setWidth(){
    if (window.innerWidth > 767) {
      this.isClosed = false;
    } else {
      this.isClosed = true;
    }
  }

  toogleMenu() {
    this.isClosed = !this.isClosed;
  }

  sidebarSM() {
    if (window.innerWidth <= 767) {
      this.isClosed = true;
    }
  }

  sair() {
    //this.usuarioService.clearDadosUsuario();
    this.router.navigate(['../Sair']);
  }

}
