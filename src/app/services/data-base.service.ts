import { Injectable } from '@angular/core';
import { SQLite, SQLiteObject } from '@awesome-cordova-plugins/sqlite/ngx';
import { BehaviorSubject, Observable } from 'rxjs';

import { AlertController, Platform, ToastController } from '@ionic/angular';
@Injectable({
  providedIn: 'root'
})
export class DataBaseService {

  public database: SQLiteObject;
  private isDBReady: BehaviorSubject<boolean> = new BehaviorSubject(false);
  roleTable: string = "create table if not exist rol(id_rol INTEGER PRIMARY KEY autoincrement, nombre_rol VARCHAR(32) NOT NULL);";
  userTable: string = "create table if not exist usuario(id_usuario INTEGER PRIMARY KEY autoincrement, nombre varchar(32) not null,apellidos VARCHAR(32) NOT NULL, clave VARCHAR(32) NOT NULL,FOREIGN KEY(nombre_rol) REFERENCES rol(id_rol), correo VARCHAR(32), rut VARCHAR(32) NOT NULL);";
  subjectTable: string = "create table if not exist asignatura(id_asignatura INTEGER PRIMARY KEY autoincrement, nombre VARCHAR(128) NOT NULL, sigla VARCHAR(10) NOT NULL);";
  sectionTable: string = "create table if not exist seccion(id_seccion INTEGER PRIMARY KEY autoincrement, sigla VARCHAR(10) NOT NULL);";
  subjSectTable: string = "create table if not exist asig_secc(id_asig_secc INTEGER PRIMARY KEY autoincrement, FOREIGN KEY(asignatura_id) REFERENCES asignatura(id_asignatura) , FOREIGN KEY(seccion_id) REFERENCES seccion(id_seccion), FOREIGN KEY(usuario_id) REFERENCES usuario(id_usuario));";
  listTable: string = "create table if not exist listado(id_listado INTEGER PRIMARY KEY autoincrement,status VARCHAR(15), FOREIGN KEY(asignatura_seccion_id) REFERENCES asig_secc(id_asig_secc) , FOREIGN KEY(usario_id) REFERENCES usuario(id_usuario));";
  assistenceTable: string = "create table if not exist asistencia(id_asistencia INTEGER PRIMARY KEY autoincrement, fecha DATE, qr BLOB, hora_inicio DATETIME, hora_fin DATETIME, FOREIGN KEY(asignatura_seccion_id) REFERENCES asig_secc(id_asig_secc));";
  detailAssistTable: string = "create table if not exist detalle_asist(id_detalle INTEGER PRIMARY KEY autoincrement,status VARCHAR(15), FOREIGN KEY(asistencia_id) REFERENCES asistencia(id_asistencia) , FOREIGN KEY(usuario_id) REFERENCES usuario(id_usuario));";
  constructor(private sqlite: SQLite, private toastController: ToastController, private platform: Platform) {
this.createDB();

}

  dbState() {
    return this.isDBReady.asObservable();
  }


  async presentToast(msj: string) {
    const toast = await this.toastController.create({
      message: msj,
      duration: 3000,
      icon: 'globe'
    });

    await toast.present();
  }
 async createTables() {
    try {
      //executing sql querys
      await this.database.executeSql(this.roleTable, []);
      await this.database.executeSql(this.userTable, []);
      await this.database.executeSql(this.subjectTable, []);
      await this.database.executeSql(this.sectionTable, []);
      await this.database.executeSql(this.subjSectTable, []);
      await this.database.executeSql(this.listTable, []);
      await this.database.executeSql(this.assistenceTable, []);
      await this.database.executeSql(this.detailAssistTable, []);
      //Updating database status
      this.isDBReady.next(true);
    } catch (e) {
      this.presentToast("Error sql query" + e);
    }

  }

  createDB() {
    //verificamos que la plataforma este lista
    this.platform.ready().then(() => {
      //creamos la BD
      this.sqlite.create({
        name: 'bdasistoqr.db',
        location: 'default'
      }).then((db: SQLiteObject) => {
        //guardamos la conexion a la BD en la variable propia
        this.database = db;
        //llamar a la funcion para crear las tablas
        this.createTables();
      }).catch(e => {
        //muestro el mensaje de error en caso de ocurrir alguno
        this.presentToast("Error tablas no creadas:" + e);
      })
    })
  }

}
