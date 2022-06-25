import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FirestoreService {

  constructor(private firestore: AngularFirestore) { }

/*
  createDoc<tipo>(data:tipo,enlace:string){
    const ref = this.firestore.collection<tipo>(enlace);
    return ref.add
  }*/

  createDoc(data:any,path:string,id:string){
  const collection = this.firestore.collection(path);
  return collection.doc(id).set(data);  
  }

  getdoc(path:string,id:string){
  const collection = this.firestore.collection(path);
  return collection.doc(id).valueChanges; 
  }

  updateDoc(data:any,path:string,id:string){
  const collection = this.firestore.collection(path);
  return collection.doc(id).update(data); 
  }

  deleteDoc(path:string,id:string){
  const collection = this.firestore.collection(path);
  return collection.doc(id).delete(); 
  }

  getId(){
    return this.firestore.createId();
  }

  getCollection<tipo>(path:string){
    const collection = this.firestore.collection<tipo>(path);
    return collection.valueChanges();
  }

}
