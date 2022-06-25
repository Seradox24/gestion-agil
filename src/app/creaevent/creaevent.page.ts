import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Evento } from '../models';
import { FirestoreService } from '../services/firestore.service';

@Component({
  selector: 'app-creaevent',
  templateUrl: './creaevent.page.html',
  styleUrls: ['./creaevent.page.scss'],
})
export class CreaeventPage implements OnInit {

  eventos: Evento[]=[];

  newEvento: Evento={
    nombre:'',
    contexto:'',
    fecha:new Date(),
    direccion:'',
    foto:'',
    id:this.firestore.getId(),
  };
  private path ='eventos/';

  constructor(private modalCtrl: ModalController, public firestore: FirestoreService) { }

  ngOnInit() {
    this.getEvento();
  }

  cerrarModal(){
    this.modalCtrl.dismiss();
  }

  guardarEvento(){
    
    this.firestore.createDoc(this.newEvento,this.path,this.newEvento.id)
    this.modalCtrl.dismiss();
  }

  getEvento(){
    this.firestore.getCollection<Evento>(this.path).subscribe(res=>{
      this.eventos=res;
    
    });
  }

}
