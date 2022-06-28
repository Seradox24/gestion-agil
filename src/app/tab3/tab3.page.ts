import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { FirestoreService } from '../services/firestore.service';
import { FireauthService } from '../services/fireauth.service';
import { async } from '@firebase/util';
import { FirestorageService } from '../services/firestorage.service';
import { Subscription } from 'rxjs'


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



export class Tab3Page implements OnInit  {

  
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

  ingresarDisable=true;
  ingresarEnable=false;
  uid= '';
  estado: boolean;
  uidUsr: string;

  newFile:any;



  constructor(public firestore:FirestoreService,
              private ModalCtrl: ModalController,
              public auth:FireauthService,
              public Firestorage:FirestorageService) {
                
                this.estado=true;
                this.auth.stateAuth().subscribe(res=>{
                  console.log(res.uid)
                  if(res!==null){
                    this.uid=res.uid;
                    this.getUserInfo(this.uid);
                    console.log(res)
                    this.ingresarEnable=false;
                    this.ingresarDisable=true;
                  }else{
                    this.uid='';
                    this.initUsuario();
                    this.ingresarEnable=true;
                    this.ingresarDisable=false;
                  }
                })
              
              
              }

async ngOnInit() {
const uid= await this.auth.getUid()
console.log(uid)

}

initUsuario(){
  this.usuario= {
    name: '',
    nickname:'',
    telefono: '',
    email:'',
    password:'',
    uid:'',
    foto:'',
  };
}

  
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

async newImagePro(event:any){ 
  
  if(event.target.files && event.target.files[0]){
    this.newFile= event.target.files[0];
    const reader = new FileReader();
    reader.onload = ((image)=>{
      this.usuario.foto= image.target.result as string;
    });
    reader.readAsDataURL( event.target.files[0])


 

  }
  }

  async registrar(){
    const credenciales ={
      email:this.usuario.email,
      password:this.usuario.password,
    };
    const res = await this.auth.register(credenciales.email,credenciales.password);
    console.log(res)
    const uid= await this.auth.getUid();
    this.guardarUsuarios();
  }


  salir(){
    this.auth.logout();
    this.reloadCurrentPage()
    this.ingresarDisable=false;
    this.ingresarEnable=true;
  }


  async guardarUsuarios(){
    const path='Usuarios'
    const name= this.usuario.name;
    
    console.log(this.newFile)
    if(this.newFile!== ''){

    const res= await this.Firestorage.uploadImage(this.newFile,path,name);
    this.usuario.foto= res
    console.log(res)
    }
    const uid = await this.auth.getUid();
    this.usuario.uid= uid
    
    this.firestore.createDoc(this.usuario,path,this.usuario.uid);
   
  }

  
  
getUserInfo(uid:string){
  const path= 'Usuarios';
  this.firestore.getDoc<Usuarios>(path,uid).subscribe(res=>{
     this.usuario=res ;
  });

}

ingresar(){
  const credenciales ={
    email:this.usuario.email,
    password:this.usuario.password,
  };
  this.auth.login(credenciales.email,credenciales.password).then(res=>{
    this.reloadCurrentPage()
  })
  
}

reloadCurrentPage() {
  window.location.reload();
 }

 async updateInfo(){
  const path='Usuarios'
  const name= this.usuario.name;
  
  console.log(this.newFile)
  if(this.newFile!== ''){

  const res= await this.Firestorage.uploadImage(this.newFile,path,name);
  this.usuario.foto= res
  console.log(res)
  }
  const uid = await this.auth.getUid();
  this.usuario.uid= uid
  
  this.firestore.updateDoc(this.usuario,path,this.usuario.uid);
 }

}
