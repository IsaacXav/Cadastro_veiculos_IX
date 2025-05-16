import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule, ToastController } from '@ionic/angular';
import { SQLiteService } from '../services/sqlite.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cadastro-carro',
  templateUrl: './cadastro-carro.page.html',
  styleUrls: ['./cadastro-carro.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule],
})
export class CadastroCarroPage {
  marca = '';
  modelo = '';
  cor = '';
  placa = '';
  carros: any[] = [];

  constructor(
    private sqliteService: SQLiteService,
    private toastCtrl: ToastController,
    private router: Router
  ) {}

  async ionViewWillEnter() {
    await this.carregarCarros();
  }

  async salvarCarro() {
    if (!this.marca || !this.modelo || !this.cor || !this.placa) {
      this.mostrarToast('Preencha todos os campos.');
      return;
    }

    try {
      const db = this.sqliteService.getDB();
      const query = `INSERT INTO carros (marca, modelo, cor, placa) VALUES (?, ?, ?, ?)`;
      await db.run(query, [this.marca, this.modelo, this.cor, this.placa]);

      this.mostrarToast('Carro cadastrado!');
      this.marca = '';
      this.modelo = '';
      this.cor = '';
      this.placa = '';
      await this.carregarCarros();
    } catch (err: any) {
      this.mostrarToast('Erro: ' + err.message);
    }
  }

  async carregarCarros() {
    try {
      const db = this.sqliteService.getDB();
      const result = await db.query('SELECT * FROM carros');
      this.carros = result.values ?? [];
    } catch (err: any) {
      this.mostrarToast('Erro ao carregar: ' + err.message);
    }
  }

  async mostrarToast(msg: string) {
    const toast = await this.toastCtrl.create({
      message: msg,
      duration: 2000,
      position: 'bottom',
    });
    toast.present();
  }

  logout() {
    // Aqui você pode adicionar lógica para limpar sessão se desejar
    this.router.navigateByUrl('/login', { replaceUrl: true });
  }
}