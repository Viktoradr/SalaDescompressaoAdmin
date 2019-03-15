import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HistoricoEstoqueComponent } from './historico-estoque.component';

describe('HistoricoEstoqueComponent', () => {
  let component: HistoricoEstoqueComponent;
  let fixture: ComponentFixture<HistoricoEstoqueComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HistoricoEstoqueComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HistoricoEstoqueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
