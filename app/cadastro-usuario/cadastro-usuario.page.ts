import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule, ToastController } from '@ionic/angular';
import { Router } from '@angular/router';
import { SQLiteService } from '../services/sqlite.service';

@Component({
  selector: 'app-cadastro-usuario',
  templateUrl: './cadastro-usuario.page.html',
  styleUrls: ['./cadastro-usuario.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule],
})
export class CadastroUsuarioPage {
  nome = '';
  email = '';
  senha = '';

  constructor(
    private sqliteService: SQLiteService,
    private router: Router,
    private toastCtrl: ToastController
  ) {}

  async cadastrar() {
    if (!this.nome || !this.email || !this.senha) {
      this.mostrarToast('Preencha todos os campos.');
      return;
    }

    try {
      const db = this.sqliteService.getDB();
      await db.run(
        'INSERT INTO usuarios (nome, email, senha) VALUES (?, ?, ?)',
        [this.nome, this.email, this.senha]
      );

      this.mostrarToast('Usuário cadastrado com sucesso!');
      this.router.navigate(['/login']); // redireciona para a página de login
    } catch (err: any) {
      this.mostrarToast('Erro ao cadastrar: ' + err.message);
    }
  }

  async mostrarToast(msg: string) {
    const toast = await this.toastCtrl.create({
      message: msg,
      duration: 2000,
      position: 'bottom'
    });
    toast.present();
  }
}