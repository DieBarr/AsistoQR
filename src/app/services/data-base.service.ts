import { Injectable } from '@angular/core';
import { SQLite, SQLiteObject } from '@awesome-cordova-plugins/sqlite/ngx';
import { BehaviorSubject, Observable } from 'rxjs';
import { Asignaturas } from './asignaturas';


import { NativeStorage } from '@awesome-cordova-plugins/native-storage/ngx';
import { Usuario } from './usuario';
import { AlertController, Platform, ToastController } from '@ionic/angular';
import { AsigSecc } from './asig-secc';
import  { AsigStudent} from './asig-student';

import  { AsigTeacher} from './asig-teacher';
import { Section } from './section';
import {ClassesDates}  from './classes-dates';
import {Atendance} from './atendance';
@Injectable({
  providedIn: 'root'
})
export class DataBaseService {
  public database: SQLiteObject;
  private isDBReady: BehaviorSubject<boolean> = new BehaviorSubject(false);
  id:any;
  roleTable: string = "CREATE TABLE IF NOT EXISTS rol(id_rol INTEGER PRIMARY KEY AUTOINCREMENT, nombre_rol VARCHAR(32) NOT NULL);";
  userTable: string = "CREATE TABLE IF NOT EXISTS usuario(id_usuario INTEGER PRIMARY KEY AUTOINCREMENT, nombre_usuario VARCHAR(32) NOT NULL, nombre VARCHAR(32),  apellido VARCHAR(32)   , correo VARCHAR(32), clave VARCHAR(32) NOT NULL,rol_id INTEGER,  rut VARCHAR(10) , FOREIGN KEY(rol_id)  REFERENCES rol(id_rol));";
  subjectTable: string = "CREATE TABLE IF NOT EXISTS asignatura(id_asignatura INTEGER PRIMARY KEY AUTOINCREMENT, nombre_asignatura VARCHAR(128) NOT NULL, sigla_asig VARCHAR(10) NOT NULL);";
  sectionTable: string = "CREATE TABLE IF NOT EXISTS seccion(id_seccion INTEGER PRIMARY KEY autoincrement, sigla_secc VARCHAR(10) NOT NULL);";
  subjSectTable: string = "CREATE TABLE IF NOT EXISTS asig_secc(id_asig_secc INTEGER PRIMARY KEY autoincrement, id_asignatura INTEGER NOT NULL, id_seccion INTEGER NOT NULL,  profesor_id INTEGER NOT NULL, FOREIGN KEY(id_seccion) REFERENCES seccion(id_seccion), FOREIGN KEY(id_asignatura) REFERENCES asignatura(id_asignatura), FOREIGN KEY(profesor_id) REFERENCES usuario(id_usuario));";
  listTable: string = "CREATE TABLE IF NOT EXISTS listado(id_listado INTEGER PRIMARY KEY autoincrement, estado VARCHAR(15), id_asig_secc INTEGER NOT NULL, id_usuario INTEGER NOT NULL, FOREIGN KEY(id_asig_secc) REFERENCES asig_secc(id_asig_secc) , FOREIGN KEY(id_usuario) REFERENCES usuario(id_usuario));";
  assistenceTable: string = "CREATE TABLE IF NOT EXISTS asistencia(id_asistencia INTEGER PRIMARY KEY autoincrement,estado_clase VARCHAR(15), fecha DATE, qr BLOB, hora_inicio DATETIME, hora_fin DATETIME, id_asig_secc INTEGER NOT NULL, FOREIGN KEY(id_asig_secc) REFERENCES asig_secc(id_asig_secc));";
  detailAssistTable: string = "CREATE TABLE IF NOT EXISTS detalle_asist(id_detalle INTEGER PRIMARY KEY autoincrement,estado_asistencia VARCHAR(15), id_asistencia INTEGER NOT NULL,usuario_id INTEGER NOT NULL,  FOREIGN KEY(id_asistencia) REFERENCES asistencia(id_asistencia), FOREIGN KEY(usuario_id) REFERENCES usuario(id_usuario));";
  listSubject = new BehaviorSubject([]);
  listUser = new BehaviorSubject([]);

  listSect = new BehaviorSubject([]);

  listSubSect = new BehaviorSubject([]);

  listSubSectU = new BehaviorSubject([]);
listSubSectUT  = new BehaviorSubject([]);

listClassesDates  = new BehaviorSubject([]);
  constructor(private sqlite: SQLite, private toastController: ToastController, private platform: Platform, private alertController: AlertController, public nativeStorage: NativeStorage ) {
    this.createDB();
  }

  dbState() {
    return this.isDBReady.asObservable();
  }


  insertApi(t, a, b, c, d) {
    try {
      if (t == 1)
        this.database.executeSql("INSERT or IGNORE INTO usuario (id_usuario,nombre_usuario,clave,rol_id) VALUES (?,?,?,?);", [a, b, c, d]);

      else if (t == 2) {
        this.database.executeSql("INSERT or IGNORE INTO asignatura (id_asignatura ,sigla_asig,nombre_asignatura) VALUES (?,?,?);", [a, b, c]);
      }
      else if (t == 3) {
        this.database.executeSql("INSERT or IGNORE INTO seccion (id_seccion,sigla_secc) VALUES (?,?);", [a, b]);
      }
      else if (t == 4) {
        this.database.executeSql("INSERT or IGNORE INTO asig_secc (id_asig_secc,id_asignatura,id_seccion,profesor_id) VALUES (?,?,?,?);", [a, b, c, d]);

      }

    } catch (e) {
      this.presentToast("Error sql API query" + e);
    }
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
      this.searchUsers();
      this.searchSubjects();
      this.searchSections();

      this.searchSubSect();
      this.isDBReady.next(true);
    } catch (e) {
      this.presentToast("Error sql query" + e);
    }
  }
  onLoginStudent(idu){
      this.database.executeSql("INSERT or IGNORE INTO listado (id_asig_secc,id_usuario) VALUES (?,?);", [2, 2]);
      this.searchSubjectsU(idu);
}
  onLoginTeacher(idu){
      this.searchSubjectsUT(idu);

  }
  onEnterSection(id){
this.searchClasses(id);

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

  fetchSubSect(): Observable<AsigSecc[]> {
    return this.listSubSect.asObservable();
  }

  fetchSect(): Observable<Section[]> {
    return this.listSect.asObservable();
  }
  fetchSubSectU(): Observable<AsigStudent[]> {
    return this.listSubSectU.asObservable();
  }
fetchSubSectUT(): Observable<AsigTeacher[]> {
    return this.listSubSectUT.asObservable();
  }
fetchClasesDates(): Observable<ClassesDates[]> {
    return this.listClassesDates.asObservable();
  }

  searchSubjects() {
    //retorno la ejecución del select
    return this.database.executeSql('SELECT * FROM asignatura  ', []).then(res => {

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
      this.listSubSect.next(items);
    })
  }
  searchSubjectsU(idu) {
    //retorno la ejecución del select
    return this.database.executeSql('SELECT *  FROM asig_secc JOIN listado  using(id_asig_secc)  JOIN asignatura  USING(id_asignatura) JOIN seccion USING(id_seccion) WHERE id_usuario = (?)', [idu]).then(res => {
      //creo mi lista de objetos de noticias vacio
      let items: AsigStudent[] = [];
      //si cuento mas de 0 filas en el resultSet entonces agrego los registros al items
      if (res.rows.length > 0) {
        for (var i = 0; i < res.rows.length; i++) {
          items.push({
            id_usuario: res.rows.item(i).id_usuario,
            nombre_asig: res.rows.item(i).nombre_asignatura,
            sigla_asig: res.rows.item(i).sigla_asig,
            sigla_secc: res.rows.item(i).sigla_secc
          })
        }

      }
      //actualizamos el observable de las noticias
      this.listSubSectU.next(items);
    })
  }
  searchSubjectsUT(idu) {
    //retorno la ejecución del select
    return this.database.executeSql('SELECT *  FROM asig_secc JOIN asignatura  USING(id_asignatura) JOIN seccion USING(id_seccion) WHERE profesor_id = (?)', [idu]).then(res => {
      //creo mi lista de objetos de noticias vacio
      let items: AsigTeacher[] = [];
      //si cuento mas de 0 filas en el resultSet entonces agrego los registros al items
      if (res.rows.length > 0) {
        for (var i = 0; i < res.rows.length; i++) {
          items.push({
            profesor_id: res.rows.item(i).profesor_id,
            nombre_asig: res.rows.item(i).nombre_asignatura,
            sigla_asig: res.rows.item(i).sigla_asig,
            sigla_secc: res.rows.item(i).sigla_secc,
            id_asig_secc:res.rows.item(i).id_asig_secc
          })
        }

      }
      //actualizamos el observable de las noticias
      this.listSubSectUT.next(items);
    })
  }


  searchSections() {
    return this.database.executeSql('SELECT * FROM seccion', []).then(res => {
      let items: Section[] = [];
      if (res.rows.length > 0) {
        for (var i = 0; i < res.rows.length; i++) {
          items.push({
            id: res.rows.item(i).id_asignatura,
            sigla: res.rows.item(i).sigla
          })
        }

      }
      this.listSect.next(items);
    })
  }


  searchSubSect() {
    //retorno la ejecución del select
    return this.database.executeSql('SELECT * FROM asig_secc JOIN asignatura  USING(id_asignatura) JOIN seccion USING(id_seccion) ', []).then(res => {
      //creo mi lista de objetos de noticias vacio
      let items: AsigSecc[] = [];
      //si cuento mas de 0 filas en el resultSet entonces agrego los registros al items
      if (res.rows.length > 0) {
        for (var i = 0; i < res.rows.length; i++) {
          items.push({
            id: res.rows.item(i).id_asig_secc,
            asignatura_id: res.rows.item(i).asignatura_id,
            seccion_id: res.rows.item(i).seccion_id,
            profesor_id: res.rows.item(i).profesor_id,
            nombre_asignatura: res.rows.item(i).nombre,
            sigla_asig: res.rows.item(i).sigla_asig,
            sigla_secc: res.rows.item(i).sigla_secc

          })
        }

      }
      this.listSubSect.next(items);
    })
  }
  searchClasses(id) {
  return this.database.executeSql('SELECT * FROM asistencia WHERE id_asig_secc = (?)', [id]).then(res => {
      let items: ClassesDates[] = [];

      if (res.rows.length > 0) {
        for (var i = 0; i < res.rows.length; i++) {
          items.push({
            id_asistencia: res.rows.item(i).id_asistencia,
            fecha: res.rows.item(i).fecha,
            hora_inicio: res.rows.item(i).hora_inicio,
            hora_fin: res.rows.item(i).hora_fin,
            estado_clase: res.rows.item(i).estado_clase
                    })
        }

      }
      this.listClassesDates.next(items);
    })
  }


  searchUsers() {
    return this.database.executeSql('SELECT * FROM usuario', []).then(res => {
      let items: Usuario[] = [];
      if (res.rows.length > 0) {
        for (var i = 0; i < res.rows.length; i++) {
          items.push({
            id_usuario: res.rows.item(i).id_usuario,
            nombre_usuario: res.rows.item(i).nombre_usuario,
            nombre: res.rows.item(i).nombre,
            apellido: res.rows.item(i).apellido,
            clave: res.rows.item(i).clave,
            correo: res.rows.item(i).correo,

            rol_id: res.rows.item(i).rol_id,
            rut: res.rows.item(i).rut
          })
        }
      }
      this.listUser.next(items);
    })
  }

}
