import { Component, OnInit } from '@angular/core';
import { CartService } from 'src/app/shared/services/cart/cart.service';
import { Filtro } from 'src/app/model/filtro.model';
import { take } from 'rxjs/operators';
import { MASKS } from 'src/app/app.mask';

@Component({
  selector: 'app-relatorio',
  templateUrl: './relatorio.component.html',
  styleUrls: ['./relatorio.component.scss']
})
export class RelatorioComponent implements OnInit {

  produtos: Array<any>;
  filtro: Filtro;
  mask = MASKS.dataMask;

  constructor(
    private cartService: CartService,
  ) { }

  ngOnInit() {
    this.produtos = new Array<any>();
    this.filtro = new Filtro();

    let date = new Date();
    date.setDate(11);
    date.setMonth(date.getMonth() - 1);

    this.filtro.dataInicio = date.toLocaleDateString();

    date.setDate(10);
    date.setMonth(date.getMonth() + 1);
    this.filtro.dataFim = date.toLocaleDateString();

    this.cartService.relatorioDeCompras(this.filtro)
    .pipe(take(1))
    .subscribe((result: any) => {
      this.produtos = result;
    })
  }

  buscar() {
    this.cartService.relatorioDeCompras(this.filtro)
    .pipe(take(1))
    .subscribe((result: any) => {
      this.produtos = result;
    })
  }

}
