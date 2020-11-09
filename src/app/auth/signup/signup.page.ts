import { Encryption } from './../../services/encryption/encryption';
import { Component, OnInit, HostListener } from '@angular/core';
import { NavController } from '@ionic/angular';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { PasswordValidator, PatternValidator } from '../../shared/validators';
import { Router, NavigationExtras } from '@angular/router';
import { AuthService } from '../../services/auth/auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss', '../../../theme/payments.scss'],
})
export class SignupPage implements OnInit {

  postData = {
    firstName: '',
    lastName: '',
    phoneNumber: '',
    emailAddress: '',
    password: '',
    comparePassword: '',
    DataPolicyAccepted: null
  };

  passwordType = 'password';
  passwordShown = false;
  registrationForm: FormGroup;
  errorMsg = '';

  get firstName() {
    return this.registrationForm.get('firstName');
  }

  get lastName() {
    return this.registrationForm.get('lastName');
  }

  get email() {
    return this.registrationForm.get('email');
  }

  get phone() {
    return this.registrationForm.get('phone');
  }

  get password() {
    return this.registrationForm.get('password');
  }

  constructor(
    private navCtrl: NavController,
    private formBildr: FormBuilder,
    private router: Router,
    private authSrvc: AuthService,
    private encryption: Encryption
    ) { 
    
    }

  ngOnInit() {
    this.registrationForm = this.formBildr.group({
      firstName: ['', [Validators.required, Validators.minLength(2)]],
      lastName: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.email]],
      dataPolicy: [false, [Validators.requiredTrue]],
      phone: ['', [Validators.required, Validators.pattern(/^((\+)*(?:[\d]{11,15}))$/)]],
      password: ['', [
        Validators.required,
        Validators.minLength(8),
         // check whether the entered password has a number
        PatternValidator(/\d/, { hasNumber: true }),
        // check whether the entered password has upper case letter
        PatternValidator(/[A-Z]/, { hasCapitalCase: true }),
        // check whether the entered password has a lower-case letter
        PatternValidator(/[a-z]/, { hasSmallCase: true }),
        // special Character
        PatternValidator(/[!@#$%^&*]/, { hasSpecialCharacters: true }),

      ]],
      confirmPassword: ['']
    }, {validator: PasswordValidator});
  }

  ionViewWillEnter() {
    this.authSrvc.clearData();
  }


  toggleVisibility() {
    if (this.passwordShown) {
      this.passwordShown = false;
      this.passwordType = 'password';
    } else {
      this.passwordShown = true;
      this.passwordType = 'text';
    }
  }

  openConfirm() {
    this.registerAction();
    const navigationExtras: NavigationExtras = {
      state: {
        pageExtras: this.postData
      },
    };
    this.router.navigate(
      ['/', 'auth', 'sign-up', 'confirm'],
      navigationExtras
    );
  }


  storePhoneNumber(value) {
    this.authSrvc.storeUserPhone(value);
  }

  async registerAction() {
    const MobileAppVersion = await this.authSrvc.getAppVersion();
    this.postData.firstName = this.registrationForm.value.firstName;
    this.postData.lastName = this.registrationForm.value.lastName;
    this.postData.emailAddress = this.registrationForm.value.email;
    this.postData.phoneNumber = this.registrationForm.value.phone;
    // this.postData.password = this.encryption.hash_SHA512_Login(this.registrationForm.value.password).toUpperCase();
    // this.postData.comparePassword = this.encryption.hash_SHA512_Login(this.registrationForm.value.confirmPassword).toUpperCase();
    this.postData.password = this.registrationForm.value.password;
    this.postData.comparePassword = this.registrationForm.value.confirmPassword;
    this.postData['MobileAppVersion'] = MobileAppVersion;
    this.postData.DataPolicyAccepted = true;
    console.log(this.postData);
  }

}
