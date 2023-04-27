import { Platform, isPlatform } from '@ionic/angular';
import firebase from 'firebase/compat/app';
import { Injectable } from '@angular/core'
import { Auth, signOut, user } from '@angular/fire/auth';import { collectionData, docData, Firestore, getDocs } from '@angular/fire/firestore';
;
import { createUserWithEmailAndPassword, GoogleAuthProvider, signInWithEmailAndPassword, signInWithRedirect, signInWithPopup, User, onAuthStateChanged, getAuth } from '@firebase/auth';
import { addDoc, collection, doc, setDoc, updateDoc } from 'firebase/firestore';
// import '@codetrix-studio/capacitor-google-auth';
import { Capacitor, Plugins } from '@capacitor/core';
import { GoogleAuth } from '@codetrix-studio/capacitor-google-auth';
import { query, orderBy, limit } from "firebase/firestore";
import { Observable } from 'rxjs';
import { FirebaseError } from '@angular/fire/app';
import { Storage, getDownloadURL, ref, uploadBytes } from '@angular/fire/storage';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  userCreateId: any;
  userCreateEmail: any;
  userIdLogin: any;
  nivel: any;
  userprofile: any = {};
  profile: any = {};
  userprofileAuth: any = {};
  errorCode: any;
  image: any;
  imagePerfil: any


  constructor(
    public auth: Auth,
    private firestore: Firestore,
    private platform: Platform,
    private storage: Storage
    ) {
      if(!isPlatform('capacitor')){
        GoogleAuth.initialize();
      }
     }

     // -------------------------------------------------//

    //  async loginWithGoogle() {
    //   let userGoogle
    //   const provider = new GoogleAuthProvider();
    //   return userGoogle = await signInWithPopup(this.auth, provider);
    // }


  // ---------> Método para registrar Usuario no Firebase Auth <-------------//
  async register(data: {email: string, password: string}) {
    try {
      const user = await createUserWithEmailAndPassword(
        this.auth,
        data.email,
        data.password,

      );
        this.userCreateId = user.user.uid;
        this.userCreateEmail = user.user.email;
        this.userIdLogin = user.user.uid;

        console.log(this.userCreateId, this.userCreateEmail);
        this.userCreate();
        this.userLogin();

      return user
    } catch (error) {
      return null;
    }
  }
  // Método de Insert no Banco com Dados do Autentication --->
    async userCreate() {
      let numDocumentos = 0;
      const colecao = collection(this.firestore, 'users');
      getDocs(colecao).then((querySnapshot) => {
        numDocumentos = querySnapshot.size;
        try {

          const userId = this.userCreateId
          const name = `Usuario-0${numDocumentos + 1}`
        const email = this.userCreateEmail;
        const nivel = 1;
        const imagePerfil = '';

        const userDocRef = doc(this.firestore, `users/${userId}`);
        setDoc(userDocRef, {
          email,
          nivel,
          name,
          imagePerfil
        })
        } catch (error) {

        }
      }).catch((error) => {
        console.log(`Erro ao obter o número de documentos: ${error}`);
      });

    }
    // Fim do Metodo Insert no Banco <--------


  async login(data: {email: string, password: string}) {
    try {
      const user = await signInWithEmailAndPassword(
        this.auth,
        data.email,
        data.password
      );
      this.userIdLogin = "";
      this.userIdLogin = user.user.uid;
      this.userLogin();

      return user
    } catch(error) {
      return null

    }
  }

   // Método de Loign e Return no Banco  --->
   userLogin() {

      const userId = this.userIdLogin;

    const userDocRef = doc(this.firestore, `users/${userId}`);
    return docData(userDocRef);

  }
 // Fim do Metodo de Login no Banco <--------

  logout() {
  return signOut(this.auth);
  }


// ----------> Método de trazer o Usuário <------------ //
    getUserProfile() {

      const auth = getAuth();
      const user = auth.currentUser;

      this.userprofile = user;

      const userDocRef = doc(this.firestore, `users/${this.userprofile.uid}`);
      return docData(userDocRef);


    }

    // -------> Metodo para Listar Usuarios em Nivel decrescente para o Rank   <-------------//
    listUsers(): Observable<any[]> {
      const listaUsers = collection(this.firestore, 'users');
      const listCrescente = query(listaUsers, orderBy("nivel", "desc" ));
      return collectionData(listCrescente) as Observable<any[]>;

    }

    // ---> Metodo para Salvar Imagem no Firebase Storage < ---- //
    async takePicture() {
      try {
        if(Capacitor.getPlatform() != 'web') await Camera.requestPermissions();
        const image = await Camera.getPhoto({
          quality: 90,
          //allowEditing: false,
          source: CameraSource.Prompt,
          width: 600,
          resultType: CameraResultType.DataUrl
        });
        console.log('iamge', image);
        this.image = image.dataUrl
        const blob = this.dataURLtoBlob(image.dataUrl);
        const url = await this.uploadImage(blob, image)
        console.log(url)
        this.imagePerfil = url
        return this.imagePerfil
      } catch(e) {
        console.log(e)
      }
    }

    dataURLtoBlob(dataurl: any) {
      var arr = dataurl.split(','), mime = arr[0].match(/:(.*?);/)[1],
      bstr = atob(arr[1]), n = bstr.length, u8arr = new Uint8Array(n);
      while(n--) {
        u8arr[n] = bstr.charCodeAt(n);
      }
      return new Blob([u8arr], {type:mime})
    }

    async uploadImage(blob: any, imageData: any) {
      try{
        const currentDate = Date.now();
        const filePath = `imagePerfil/${currentDate}.${imageData.format}`;
        const fileRef = ref(this.storage, filePath);
        const task = await uploadBytes(fileRef, blob);
        console.log('task: ', task);
        const url = getDownloadURL(fileRef);
        return url;
      } catch(e) {
        throw(e);
      }
    }



}
