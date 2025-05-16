import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CadastroCarroPage } from './cadastro-carro.page';

describe('CadastroCarroPage', () => {
  let component: CadastroCarroPage;
  let fixture: ComponentFixture<CadastroCarroPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(CadastroCarroPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
