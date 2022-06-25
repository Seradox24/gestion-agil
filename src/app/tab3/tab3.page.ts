import { Component } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { FirestoreService } from '../services/firestore.service';

interface Usuarios {
  name: string,
  nickname:string,
  telefono: string,
  email:string,
  password:string,
  uid:string,
  foto:string,
}


@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})



export class Tab3Page {

  
  usuario:Usuarios = {
    name: '',
    nickname:'',
    telefono: '',
    email:'',
    password:'',
    uid:'',
    foto:'',
  };

  usuario2:Usuarios = {
    name: '',
    nickname:'',
    telefono: '',
    email:'',
    password:'',
    uid:'',
    foto:'',
  };

  uid= '';
  estado: boolean;
  uidUsr: string;

  newFile:any;



  constructor(public firestore:FirestoreService,private ModalCtrl: ModalController,) {this.estado=true;}




  
cEstado(ev:any){
  console.log('cEstado()',ev.detail.value);
  const opc = ev.detail.value;
  if (opc === 'Login'){
    this.estado=true;

  }
  else {
    this.estado=false;

  }
}
}
