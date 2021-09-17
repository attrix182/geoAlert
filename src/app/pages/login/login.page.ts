import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  public formLogin: FormGroup;
  user: any = {};
  titulo: string;

  constructor(private FB: FormBuilder, private router: Router, private auth: AuthService, public toastController: ToastController) {

    this.user.email = '';
    this.user.password = '';

    this.titulo = 'GEO ALERT'
  }

  ngOnInit() {
    this.formLogin = new FormGroup({
      'email': new FormControl(''),
      'password': new FormControl(''),
    });

    this.formLogin = this.FB.group({

      'email': ['', Validators.required],
      'password': ['', Validators.required]
    })
  }

  register() {
    console.log(this.user);
    this.user = this.formLogin.value;
    this.auth.onRegister(this.user);
    this.presentToast('Error');

  }

  login() {

    this.user = this.formLogin.value;

    this.auth.onLogin(this.user)
    .then(resolve=>{
      if(resolve==true){
       this.router.navigateByUrl('/home')
      }
    })
  }


  async presentToast(msj: string) {
    const toast = await this.toastController.create({
      message: msj,
      duration: 2000
    });
    toast.present();
  }


}
