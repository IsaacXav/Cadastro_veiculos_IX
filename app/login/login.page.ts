import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule, ToastController } from '@ionic/angular';
import { Router } from '@angular/router';
import { SQLiteService } from '../services/sqlite.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule],
})
export class LoginPage {
  email = '';
  senha = '';

  constructor(
    private sqliteService: SQLiteService,
    private router: Router,
    private toastCtrl: ToastController
  ) {}

  async login() {
    if (!this.email || !this.senha) {
      this.mostrarToast('Preencha todos os campos.');
      return;
    }
  
    try {
      const db = this.sqliteService.getDB();
      const result = await db.query(
        'SELECT * FROM usuarios WHERE email = ? AND senha = ?',
        [this.email, this.senha]
      );
  
      const usuarios = result.values ?? [];
  
      if (usuarios.length > 0) {
        this.mostrarToast('Login bem-sucedido!');
        this.router.navigate(['/cadastro-carro']);
      } else {
        this.mostrarToast('E-mail ou senha inválidos!');
      }
    } catch (err: any) {
      this.mostrarToast('Erro ao realizar login: ' + err.message);
    }
  }
  

  irParaCadastro() {
    this.router.navigate(['/cadastro-usuario']);
  }

  async mostrarToast(msg: string) {
    const toast = await this.toastCtrl.create({
      message: msg,
      duration: 2000,
      position: 'bottom',
    });
    toast.present();
  }
}