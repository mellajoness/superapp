import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { LoaderService } from '../../services/utilities/loader.service';
import { UserService } from '../../services/user/user.service';
import { ProfileService } from '../../services/user/profile.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlertService } from '../../services/utilities/alert.service';
import { PasswordValidator, PatternValidator } from '../../shared/validators';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['../../auth/signup/signup.page.scss', './change-password.component.scss', '../../../theme/payments.scss' ],
})
export class ChangePasswordComponent implements OnInit {

  passwordForm: FormGroup;

  phoneNumber;

  passwordType = 'password';
  passwordShown = false;

  postData = {
    phonenumber: '',
    oldPassword: '',
    password: '',
    confirmPassword: '',
  };

  get oldPassword() {
    return this.passwordForm.get('oldPassword');
  }
  get password() {
    return this.passwordForm.get('password');
  }
  get confirmPassword() {
    return this.passwordForm.get('confrimPassword');
  }


  constructor(
    private modalCtrl: ModalController,
    private userSrvc: UserService,
    private loaderSrvc: LoaderService,
    private profileServc: ProfileService,
    private formBildr: FormBuilder,
    private alertSrvc: AlertService

  ) { }

  ngOnInit() {
    this.phoneNumber = this.profileServc.getUserPhone();

    this.passwordForm = this.formBildr.group({
      oldPassword: ['', Validators.required],
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

  dismiss() {
    this.modalCtrl.dismiss({
      dismissed: true
    });
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

  changeAction(){
    this.loaderSrvc.showLoader();
    this.postData.oldPassword = this.passwordForm.value.oldPassword;
    this.postData.password = this.passwordForm.value.password;
    this.postData.confirmPassword = this.passwordForm.value.confirmPassword;
    this.postData.phonenumber = this.phoneNumber;
    this.userSrvc.changePassword(this.postData).subscribe(res => {
      if (res) {
        this.loaderSrvc.hideLoader();
        if (res.resultCode === '200') {
          this.alertSrvc.displayAuthSuccessModal('Password Was changed successfully', null);
          this.dismiss();
        } else {
          this.alertSrvc.showErrorToast('Error Processing Request, try again later');
        }
      }
    });
  }

}
