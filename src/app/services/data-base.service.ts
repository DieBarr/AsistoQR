import { Injectable } from '@angular/core';
import { SQLite, SQLiteObject } from '@awesome-cordova-plugins/sqlite/ngx';
import { BehaviorSubject, Observable } from 'rxjs';
import { Asignaturas } from './asignaturas';

import { Usuario } from './usuario';
import { AlertController, Platform, ToastController } from '@ionic/angular';
@Injectable({
  providedIn: 'root'
})
export class DataBaseService {
  public database: SQLiteObject;
  private isDBReady: BehaviorSubject<boolean> = new BehaviorSubject(false);
  roleTable: string = "CREATE TABLE IF NOT EXISTS rol(id_rol INTEGER PRIMARY KEY AUTOINCREMENT, nombre_rol VARCHAR(32) NOT NULL);";
  userTable: string = "CREATE TABLE IF NOT EXISTS usuario(id_usuario INTEGER PRIMARY KEY AUTOINCREMENT, nombre VARCHAR(32) NOT NULL, correo VARCHAR(32), clave VARCHAR(32) NOT NULL,rol_id INTEGER,  rut VARCHAR(10) , FOREIGN KEY(rol_id)  REFERENCES rol(id_rol));";
  subjectTable: string = "CREATE TABLE IF NOT EXISTS asignatura(id_asignatura INTEGER PRIMARY KEY AUTOINCREMENT, nombre VARCHAR(128), sigla VARCHAR(10) NOT NULL);";
  sectionTable: string = "CREATE TABLE IF NOT EXISTS seccion(id_seccion INTEGER PRIMARY KEY autoincrement, sigla VARCHAR(10) NOT NULL);";
  subjSectTable: string = "CREATE TABLE IF NOT EXISTS asig_secc(id_asig_secc INTEGER PRIMARY KEY autoincrement, asignatura_id INTEGER NOT NULL,  seccion_id INTEGER NOT NULL,  usuario_id INTEGER NOT NULL, FOREIGN KEY(seccion_id) REFERENCES seccion(id_seccion), FOREIGN KEY(asignatura_id) REFERENCES asignatura(id_asignatura), FOREIGN KEY(usuario_id) REFERENCES usuario(id_usuario));";
  listTable: string = "CREATE TABLE IF NOT EXISTS listado(id_listado INTEGER PRIMARY KEY autoincrement, estado VARCHAR(15), asig_secc_id INTEGER NOT NULL, usuario_id INTEGER NOT NULL, FOREIGN KEY(asig_secc_id) REFERENCES asig_secc(id_asig_secc) , FOREIGN KEY(usuario_id) REFERENCES usuario(id_usuario));";
  assistenceTable: string = "CREATE TABLE IF NOT EXISTS asistencia(id_asistencia INTEGER PRIMARY KEY autoincrement, fecha DATE, qr BLOB, hora_inicio DATETIME, hora_fin DATETIME, asig_secc_id INTEGER NOT NULL, FOREIGN KEY(asig_secc_id) REFERENCES asig_secc(id_asig_secc));";
  detailAssistTable: string = "CREATE TABLE IF NOT EXISTS detalle_asist(id_detalle INTEGER PRIMARY KEY autoincrement,estado VARCHAR(15), asistencia_id INTEGER NOT NULL,usuario_id INTEGER NOT NULL,  FOREIGN KEY(asistencia_id) REFERENCES asistencia(id_asistencia), FOREIGN KEY(usuario_id) REFERENCES usuario(id_usuario));";
  listSubject = new BehaviorSubject([]);
  listUser = new BehaviorSubject([]);
  constructor(private sqlite: SQLite, private toastController: ToastController, private platform: Platform, private alertController: AlertController) {
    this.createDB();

  }

  dbState() {
    return this.isDBReady.asObservable();
  }
  async insertApi(t, a, b, c, d) {

    this.dbState().subscribe(res => {
      if (res) {
        try {
          if (t == 1)
            this.database.executeSql("INSERT or IGNORE INTO usuario (id_usuario,nombre,clave,rol_id) VALUES (?,?,?,?);", [a, b, c, d]);
          else if (t == 2) {
            this.database.executeSql("INSERT or IGNORE INTO asignatura (id_asignatura ,sigla,nombre) VALUES (?,?,?);", [a, b, c]);
          }
        } catch (e) {
          this.presentToast("Error sql API query" + e);
        }
      }
    }
    )
  }

  async presentToast(msj: string) {
    const toast = await this.toastController.create({
      message: msj,
      duration: 3000,
      icon: 'globe'
    });

    await toast.present();
  }
  async presentAlert(msj: string) {
    const alert = await this.alertController.create({
      header: 'Alert',
      message: msj,
      buttons: ['OK'],
    });

    await alert.present();

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
      await this.database.executeSql("INSERT or IGNORE INTO rol(nombre_rol,id_rol) VALUES (?,?);", ['profesor', 1]);
      await this.database.executeSql("INSERT or IGNORE INTO rol(nombre_rol,id_rol) VALUES (?,?);", ['alumno', 2]);
      this.searchSubjects();
      this.searchUsers();
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
  fetchSubjects(): Observable<Asignaturas[]> {
    return this.listSubject.asObservable();
  }
  fetchUsers(): Observable<Usuario[]> {

    return this.listUser.asObservable();
  }


  async searchSubjects() {
    //retorno la ejecución del select
    return this.database.executeSql('SELECT * FROM asignatura', []).then(res => {
      //creo mi lista de objetos de noticias vacio
      let items: Asignaturas[] = [];
      //si cuento mas de 0 filas en el resultSet entonces agrego los registros al items
      if (res.rows.length > 0) {
        for (var i = 0; i < res.rows.length; i++) {
          items.push({
            id: res.rows.item(i).id_asignatura,
            nombre: res.rows.item(i).nombre,
            sigla: res.rows.item(i).sigla
          })
        }

      }
      //actualizamos el observable de las noticias
      this.listSubject.next(items);
    })
  }
  async searchUsers() {
    return this.database.executeSql('SELECT * FROM usuario', []).then(res => {
      let items: Usuario[] = [];
      if (res.rows.length > 0) {
        for (var i = 0; i < res.rows.length; i++) {
          items.push({
            id: res.rows.item(i).id_usuario,
            nombre: res.rows.item(i).nombre,
            clave: res.rows.item(i).clave,
            correo: res.rows.item(i).correo,
            rut: res.rows.item(i).rut,
            rol: res.rows.item(i).rol_id
          })
        }
      }
      this.listUser.next(items);
    })
  }

}
