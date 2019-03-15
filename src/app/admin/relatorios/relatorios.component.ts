import { Component, OnInit, TemplateRef } from '@angular/core';
import { Cart } from 'src/app/model/cart.model';
import { Filtro } from 'src/app/model/filtro.model';
import { CartService } from 'src/app/shared/services/cart/cart.service';
import { take } from 'rxjs/operators';
import { BsModalRef, BsModalService } from 'ngx-bootstrap';
import { PNotifyProvider } from 'src/app/shared/providers/pnotify/pnotify.provider';
import { MESSAGES } from 'src/app/app.messages';
import { MASKS } from 'src/app/app.mask';
import { saveAs } from 'file-saver';

@Component({
  selector: 'app-relatorios',
  templateUrl: './relatorios.component.html',
  styleUrls: ['./relatorios.component.scss']
})
export class RelatoriosComponent implements OnInit {
  
  modalRef: BsModalRef;
  filtro: Filtro;
  carts: Array<Cart>;
  cart: Cart;
  total = 0.00;
  isLoading: boolean = false;
  mask = MASKS.dataMask;

  constructor(
    private modalService: BsModalService,
    private cartService: CartService,
    private notify: PNotifyProvider
  ) {
    this.filtro = new Filtro();
    this.carts = new Array<Cart>();

    let date = new Date();
    date.setDate(11);
    date.setMonth(date.getMonth() - 1);

    this.filtro.dataInicio = date.toLocaleDateString();

    date.setDate(10);
    date.setMonth(date.getMonth() + 1);
    this.filtro.dataFim = date.toLocaleDateString();
  }

  ngOnInit() {
  }

  buscar() {
    this.carts = new Array<Cart>();
    this.popularTabela();
  }

  popularTabela() {
    if (this.valid()) {
      this.cartService.filtroCompra(this.filtro)
        .pipe(take(1))
        .subscribe((res: Array<Cart>) => {

          if(res) {
            this.carts = res;
            this.total = 0.00;
            res.forEach(element => {
              this.total += Number.parseFloat(element.total.replace(',','.'));
            });
          } 
          
        });
    } else {
      this.notify.alert('Aviso', MESSAGES._data_invalida);
    }
  }

  valid() {
    console.log(this.filtro)
    if(this.filtro.dataInicio == null || this.filtro.dataFim == null ) return false;
    if(this.filtro.dataInicio != "" && this.filtro.dataFim != "") return true;
    else return false;
  }

  verProdutos(_cart: Cart, template: TemplateRef<any>) {
    this.cart = _cart;
    this.modalRef = this.modalService.show(template, {
      animated: true,
      class: 'modal-lg'
    });
  }

  gerarExcel() {
    if (this.valid()) {

      this.isLoading = true;
      
      this.cartService.exportarExcel(this.filtro)
      .pipe(take(1))
      .subscribe(response => {

        var file = new Blob([response], {
          type: 'application/octet-stream'
        })

        var _data = this.filtro.dataInicio;
        var _dataFim = this.filtro.dataFim;
        var inicio = _data.toLocaleString().replace(/[\-\:\/\ ]/g,'');
        var fim = _dataFim.toLocaleString().replace(/[\-\:\/\ ]/g,'');
        
        this.isLoading = false;

        saveAs(file, `contratos_de_uso_${inicio}_${fim}.xlsx`);

  
      }, err => {
        this.isLoading = false;
        if (err.status != 0) this.notify.alert('Aviso!', MESSAGES._aviso);
      });

    } else {
      this.notify.alert('Aviso!', MESSAGES._data_invalida);
    }
  }

  gerarDocumentos() {

    if (this.valid()) {

      this.isLoading = true;
      
      this.cartService.gerarDocumentos(this.filtro)
      .pipe(take(1))
      .subscribe(response => {

        var file = new Blob([response], {
          type: 'text/html'
        })

        //var _data = new Date();
        //var temp = _data.toLocaleString().replace(/[\-\:\/\ ]/g,'');
        
        this.isLoading = false;

        var url = URL.createObjectURL(file);
        window.open(url,"_blank","");

        //saveAs(file, `contratos_de_uso_${temp}.html`);

  
      }, err => {
        this.isLoading = false;
        if (err.status != 0) this.notify.alert('Aviso!', MESSAGES._aviso);
      });

    } else {
      this.notify.alert('Aviso!', MESSAGES._data_invalida);
    }
  }
}
