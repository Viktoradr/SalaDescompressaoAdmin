import { Component, OnInit } from '@angular/core';
import { Produto } from 'src/app/model/produto.model';
import { ActivatedRoute, Router } from '@angular/router';
import { ProdutoService } from 'src/app/shared/services/produto/produto.service';
import { take } from 'rxjs/internal/operators/take';
import { ProdutoProvider } from 'src/app/shared/providers/produto/produto.provider';
import { PNotifyProvider } from 'src/app/shared/providers/pnotify/pnotify.provider';
import { MESSAGES } from 'src/app/app.messages';
import { MASKS } from 'src/app/app.mask';

@Component({
  selector: 'app-editar-produto',
  templateUrl: './editar-produto.component.html',
  styleUrls: ['./editar-produto.component.scss']
})
export class EditarProdutoComponent implements OnInit {

  produto: Produto;
  mask = MASKS.valorMask;

  constructor(
    private notify: PNotifyProvider,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private produtoService: ProdutoService,
    private produtoProvider: ProdutoProvider,
  ) { 
    this.produto = new Produto();
  }

  ngOnInit() {
    this.activatedRoute.params
    .subscribe(params => {
      if (params['id'] != undefined) {
        this.produtoService.getProduto(params['id'])
        .pipe(take(1))
        .subscribe((res: Produto) => {
          if(res) {
            this.produto = res;
          } else {
            this.notify.error('Erro', MESSAGES._erro);
          }
        });
      }
    })
  }

  editarProduto() {
    console.log(this.produto)
    this.produtoService.editarProduto(this.produto)
    .pipe(take(1))
    .subscribe(res => {
      if(res) {
        this.produtoProvider.eventProduto(this.produto);
        this.notify.success('Alterado!', MESSAGES._success_alt_prod);
      } else {
        this.notify.info('Aviso!', MESSAGES._aviso);
      }
    }, err => {
      this.notify.error('Erro', MESSAGES._erro);
    });
  }

  fecharTela() {
    this.router.navigate(['Admin/Produtos']);
  }

  onFileChange(event) {
    let reader = new FileReader();
    if(event.target.files && event.target.files.length > 0) {
      let file = event.target.files[0];
      reader.readAsDataURL(file);
      console.log("reader", reader)
      reader.onload = () => {
        this.produto.imagemNome = file.name;
        this.produto.file = reader.result;

        if (this.verificarExtensao(this.produto.imagemNome)) {
          this.notify.info('Aviso!', MESSAGES._imagem_extensao_invalida);
          this.produto.file = null;
          this.produto.imagemNome = '';
        }
      };
    }
  }

  verificarExtensao(nome) {
    let ext = nome.split('.')[1];
    if (ext != 'png' && ext != 'jpg') return true;
    else return false;
  }

}
