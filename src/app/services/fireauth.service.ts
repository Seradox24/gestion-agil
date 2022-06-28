import { Injectable, OnInit } from '@angular/core';
import {AngularFireAuth} from '@angular/fire/compat/auth';

@Injectable({
  providedIn: 'root'
})
export class FireauthService implements OnInit  {

  constructor(public auth:AngularFireAuth) {this.getUid() }

  async ngOnInit() {
    this.getUid()
    }

  login(email:string,password:string){
    return this.auth.signInWithEmailAndPassword(email,password);

  }

  logout(){
    return this.auth.signOut();
  }
  
  register(email:string,password:string){
    this.auth.createUserWithEmailAndPassword(email,password);
  }

  async getUid(){
    const user= await this.auth.currentUser;
    if (user===null){
      return null;
    }else{
      return user.uid
    }
  }


  stateAuth(){
    return this.auth.authState;
  }

}
