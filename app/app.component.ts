import { Component, EnvironmentInjector, inject, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { SQLiteService } from './services/sqlite.service'; // ajuste o caminho se necessário

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppComponent implements OnInit {
  public environmentInjector = inject(EnvironmentInjector);
  private sqliteService = inject(SQLiteService); // usando injeção via `inject`

  constructor() {}

  async ngOnInit() {
    try {
      await this.sqliteService.initializePlugin();
      await this.sqliteService.openDatabase('carroDB', false, 'no-encryption', 1, false);
      await this.sqliteService.createTables();
      console.log('Banco de dados inicializado com sucesso.');
    } catch (error) {
      console.error('Erro ao inicializar o banco de dados:', error);
    }
  }
}