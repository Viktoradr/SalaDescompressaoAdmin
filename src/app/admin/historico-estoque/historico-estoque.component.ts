import { Component, OnInit } from '@angular/core';
import { PNotifyProvider } from 'src/app/shared/providers/pnotify/pnotify.provider';
import { HistoricoService } from 'src/app/shared/services/historico/historico.service';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-historico-estoque',
  templateUrl: './historico-estoque.component.html',
  styleUrls: ['./historico-estoque.component.scss']
})
export class HistoricoEstoqueComponent implements OnInit {

  historicos: Array<any>;

  constructor(
    private historicoService: HistoricoService,
    private notify: PNotifyProvider
  ) {
    this.historicos = new Array<any>();
  }

  ngOnInit() {
    this.montarTabela();
  }

  montarTabela() {
    this.historicoService.getHistorico()
      .pipe(take(1))
      .subscribe((res: any) => {
        console.log(res);
        this.historicos = res;
      });
  }

}
