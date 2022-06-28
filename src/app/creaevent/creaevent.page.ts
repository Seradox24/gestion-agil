import { Component, OnInit } from '@angular/core';
import { ModalController, ToastController } from '@ionic/angular';
import { Evento } from '../models';
import { FirestoreService } from '../services/firestore.service';
import { async } from '@firebase/util';
import { FirestorageService } from '../services/firestorage.service';
import { FireauthService } from '../services/fireauth.service';



@Component({
  selector: 'app-creaevent',
  templateUrl: './creaevent.page.html',
  styleUrls: ['./creaevent.page.scss'],
})
export class CreaeventPage implements OnInit {

  eventos: Evento[]=[];

  newEvento: Evento={
    nombre:'',
    usuario:'',
    contexto:'',
    fecha:new Date(),
    direccion:'',
    foto:'',
    id:this.firestore.getId(),
    uid:'',
  };

 

  uid= '';

  

  enableNewEvento= false;
  newFile='';
  private path ='eventos/';

  constructor(private modalCtrl: ModalController, public firestore: FirestoreService,
    public Firestorage:FirestorageService,public auth:FireauthService,public toastController: ToastController) {

      this.auth.stateAuth().subscribe(res=>{
        console.log(res.uid)
        if(res!==null){
          this.uid=res.uid;
          console.log(res)
          
         

        }else{
          this.uid='';
          

        }
      })
      
     }



  ngOnInit() {
    this.getEvento();
  }

  cerrarModal(){
    this.modalCtrl.dismiss();
  }

  async guardarEvento(){
    const path='Eventos'
    const name= this.newEvento.nombre;
    
    console.log(this.newFile)
    if(this.newFile!== ''){

    const res= await this.Firestorage.uploadImage(this.newFile,path,name);
    this.newEvento.foto= res
    console.log(res)
    }
    const uid = await this.auth.getUid();
    this.newEvento.uid= uid
    
    
    this.firestore.createDoc(this.newEvento,this.path,this.newEvento.id);
    this.presentToast('evento guardado con exito')
    this.modalCtrl.dismiss();
    this.presentToast('evento guardado con exito')
  }

  getEvento(){
    this.firestore.getCollection<Evento>(this.path).subscribe(res=>{
      this.eventos=res.filter((Evento) => 
      Evento.uid === this.uid);
      
    
    });
  }

  deleteProduct(evento:Evento){
    this.firestore.deleteDoc(this.path,evento.id);
    this.presentToast('evento borrado con exito')
  }

  nuevo(){
    this.enableNewEvento=true;
    this.newEvento={
      nombre:'',
      usuario:'',
      contexto:'',
      fecha:new Date(),
      direccion:'',
      foto:'',
      id:this.firestore.getId(),
      uid:'',
    };
  }

  newImage='';

  async newImagePro(event:any){
    if(event.target.files && event.target.files[0]){
      this.newFile= event.target.files[0];
      const reader = new FileReader();
      reader.onload = ((image)=>{
        this.newEvento.foto= image.target.result as string;
      });
      reader.readAsDataURL( event.target.files[0])
    }
  }


  reloadCurrentPage() {
    window.location.reload();
   }

   async presentToast(msj:string) {
    const toast = await this.toastController.create({
      message: msj,
      duration: 2000
    });
    toast.present();
  }

}
