import { Component } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { CreaeventPage } from '../creaevent/creaevent.page';
import { RegistroPage } from '../registro/registro.page';
import { FirestoreService } from '../services/firestore.service';
import { FireauthService } from '../services/fireauth.service';
import { Evento } from '../models';


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
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {
  eventos: Evento[]=[];
  usuario:Usuarios = {
    name: '',
    nickname:'',
    telefono: '',
    email:'',
    password:'',
    uid:'',
    foto:'',
  };


  constructor(private modalCtrl: ModalController,
     public auth:FireauthService,
     public firestore:FirestoreService,) {
      this.getinfo();

      this.auth.stateAuth().subscribe(res=>{
        console.log(res.uid)
        if(res!==null){
          this.uid=res.uid;
          this.getUserInfo(this.uid);
          console.log(res)

        }else{
          this.uid='';
          this.initUsuario();

        }
      })
    
  }

  
  
  uid= '';

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
  
  getUserInfo(uid:string){
    const path= 'Usuarios';
    this.firestore.getDoc<Usuarios>(path,uid).subscribe(res=>{
       this.usuario=res ;
    });
  }
async mostrarModel(){
  if(this.uid!==''){
    const modal = await this.modalCtrl.create({
      component: CreaeventPage,
    });
    modal.present();
  }else{
    console.log('registrate')
  }
 
   
}

async mostrarLogin(){
  const modal = await this.modalCtrl.create({
    component: RegistroPage,
  });
  modal.present();
}
private path ='eventos/';
getinfo(){
  this.firestore.getCollection<Evento>(this.path).subscribe(res=>{
    this.eventos=res
})}

  //slide
public slideOpts2 = {
  slidesPerView: 1.8,
  spaceBetween:20,
}
public slideOpts3 = {
  slidesPerView: 2.4,
  spaceBetween:20,
  
}
public slideOpts4 = {
  slidesPerView: 1.2,
  spaceBetween:20,
  
}
public slideOpts = {
  slidesPerView: 1.2,
  spaceBetween: 50,
  centeredSlides: true,
  initialSlide: 2,
  coverflowEffect: {
    rotate: 0,
    stretch: 0,
    depth: 200,
    modifier: 1,
    slideShadows: false,
  },
  on: {
    beforeInit() {
      const swiper = this;

      swiper.classNames.push(`${swiper.params.containerModifierClass}coverflow`);
      swiper.classNames.push(`${swiper.params.containerModifierClass}3d`);

      swiper.params.watchSlidesProgress = true;
      swiper.originalParams.watchSlidesProgress = true;
    },
    setTranslate() {
      const swiper = this;
      const {
        width: swiperWidth, height: swiperHeight, slides, $wrapperEl, slidesSizesGrid, $
      } = swiper;
      const params = swiper.params.coverflowEffect;
      const isHorizontal = swiper.isHorizontal();
      const transform$$1 = swiper.translate;
      const center = isHorizontal ? -transform$$1 + (swiperWidth / 2) : -transform$$1 + (swiperHeight / 2);
      const rotate = isHorizontal ? params.rotate : -params.rotate;
      const translate = params.depth;
      // Each slide offset from center
      for (let i = 0, length = slides.length; i < length; i += 1) {
        const $slideEl = slides.eq(i);
        const slideSize = slidesSizesGrid[i];
        const slideOffset = $slideEl[0].swiperSlideOffset;
        const offsetMultiplier = ((center - slideOffset - (slideSize / 2)) / slideSize) * params.modifier;

        let rotateY = isHorizontal ? rotate * offsetMultiplier : 0;
        let rotateX = isHorizontal ? 0 : rotate * offsetMultiplier;
        // var rotateZ = 0
        let translateZ = -translate * Math.abs(offsetMultiplier);

        let translateY = isHorizontal ? 0 : params.stretch * (offsetMultiplier);
        let translateX = isHorizontal ? params.stretch * (offsetMultiplier) : 0;

        // Fix for ultra small values
        if (Math.abs(translateX) < 0.001) translateX = 0;
        if (Math.abs(translateY) < 0.001) translateY = 0;
        if (Math.abs(translateZ) < 0.001) translateZ = 0;
        if (Math.abs(rotateY) < 0.001) rotateY = 0;
        if (Math.abs(rotateX) < 0.001) rotateX = 0;

        const slideTransform = `translate3d(${translateX}px,${translateY}px,${translateZ}px)  rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;

        $slideEl.transform(slideTransform);
        $slideEl[0].style.zIndex = -Math.abs(Math.round(offsetMultiplier)) + 1;

      }

      // Set correct perspective for IE10
      if (swiper.support.pointerEvents || swiper.support.prefixedPointerEvents) {
        const ws = $wrapperEl[0].style;
        ws.perspectiveOrigin = `${center}px 50%`;
      }
    },
    setTransition(duration) {
      const swiper = this;
      swiper.slides
        .transition(duration)
        .find('.swiper-slide-shadow-top, .swiper-slide-shadow-right, .swiper-slide-shadow-bottom, .swiper-slide-shadow-left')
        .transition(duration);
    }
  }
}
}
function navigateByUrl(arg0: string) {
  throw new Error('Function not implemented.');
}

