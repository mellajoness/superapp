import { NavController } from '@ionic/angular';
import { Router } from '@angular/router';
import { AlertService } from 'src/app/services/utilities/alert.service';
import { SharedData } from 'src/app/shared/shared.components';
import { AuthService } from 'src/app/services/auth/auth.service';
import { DeviceService } from 'src/app/services/utilities/device.service';
import { LoaderService } from 'src/app/services/utilities/loader.service';
import { ProfileService } from 'src/app/services/user/profile.service';
import { Observable } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { UserService } from 'src/app/services/user/user.service';
import { BiometricSetupComponent } from 'src/app/components/biometric-setup/biometric-setup.component';

@Component({
  selector: 'app-security-questions',
  templateUrl: './security-questions.page.html',
  styleUrls: ['./security-questions.page.scss'],
})
export class SecurityQuestionsPage implements OnInit {

  state: any;
  createSecretQuestionsForm: FormGroup;
  answerSecretQuestionsForm: FormGroup;
  q1!: string;
  q2!: string;
  q3!: string;
  position = {
    q1: null,
    q2: null,
    q3: null
  };
  userPhone!: string;
  secretQuestions: ISecretQuestion[];
  deviceInfo: any;
  incompleteRegistration: boolean;
  updateSQnA: boolean;
  answerSQnA: boolean;
  secretQuestionThreePosition!: string;

  successParams = {
    message: 'Your account creation was successful',
    route: 'home'
  };

  constructor(
    private formBildr: FormBuilder,
    private userService: UserService,
    private loaderService: LoaderService,
    private profileService: ProfileService,
    private deviceService: DeviceService,
    private authSrvc: AuthService,
    private userSrvc: UserService,
    private sharedData: SharedData,
    private alertSrvc: AlertService,
    private router: Router,
    private navController: NavController
  ) {
    this.userPhone = this.profileService.getUserPhone();
    this.deviceService.deviceInfo.subscribe(
      res => {
        this.deviceInfo = res;
      }
    )
  }

  ngOnInit() {
    this.state = this.router.getCurrentNavigation().extras.state;
    this.createSecretQuestionsForm = this.formBildr.group({
      q1: ['', [Validators.required]],
      cq1: [''],
      a1: ['', [Validators.required]],
      q2: ['', [Validators.required]],
      cq2: [''],
      a2: ['', [Validators.required]],
      q3: ['', [Validators.required]],
      cq3: [''],
      a3: ['', [Validators.required]],
      otp: [''],
    })

    this.answerSecretQuestionsForm = this.formBildr.group({
      a1: [''],
      a2: [''],
      a3: [''],
    })

    if (this.router.getCurrentNavigation().extras.state) {
      this.incompleteRegistration = this.router.getCurrentNavigation().extras.state.incompleteRegistration;
      this.updateSQnA = this.router.getCurrentNavigation().extras.state.update;
      this.answerSQnA = this.router.getCurrentNavigation().extras.state.answer;
    }
    if (this.incompleteRegistration) {
      this.createSecretQuestionsForm.get('otp').setValidators(Validators.required);
    }
    if (this.updateSQnA) {
      this.requestOTP();
      this.incompleteRegistration = true;
    }
    if (this.answerSQnA) {
      const data = this.router.getCurrentNavigation().extras.state.data;
      data.secretQuestionOne ? (
        (() => {
          this.q1 = data.secretQuestionOne;
          this.position.q1 = data.secretQuestionOnePosition;
          this.answerSecretQuestionsForm.get('a1').setValidators(Validators.required);
        })()
      ) : this.q1 = undefined;
      data.secretQuestionTwo ? (
        (() => {
          this.q2 = data.secretQuestionTwo;
          this.position.q2 = data.secretQuestionTwoPosition;
          this.answerSecretQuestionsForm.get('a2').setValidators(Validators.required);
        })()
      ) : this.q2 = undefined;
      data.secretQuestionThree ? (
        (() => {
          this.q3 = data.secretQuestionThree;
          this.position.q3 = data.secretQuestionThreePosition;
          this.answerSecretQuestionsForm.get('a3').setValidators(Validators.required);
        })()
      ) : this.q3 = undefined;
    }
    else {
      this.getSecretQuestionsList();
    }

    this.createSecretQuestionsForm.valueChanges.subscribe(
      value => {
        if (value.q1 === 'custom') {
          this.createSecretQuestionsForm.get('cq1').setValidators(Validators.required);
        }
        else {
          this.createSecretQuestionsForm.get('cq1').setValidators(null);
        }
        if (value.q2 === 'custom') {
          this.createSecretQuestionsForm.get('cq2').setValidators(Validators.required);
        }
        else {
          this.createSecretQuestionsForm.get('cq2').setValidators(null);
        }
        if (value.q3 === 'custom') {
          this.createSecretQuestionsForm.get('cq3').setValidators(Validators.required);
        }
        else {
          this.createSecretQuestionsForm.get('cq3').setValidators(null);
        }
      }
    )
  }

  private async getSecretQuestionsList() {
    console.log("HEYEYEYEY")
    this.loaderService.showLoader();
    this.userService.getSecretQuestionsList().subscribe(
      res => {
        this.secretQuestions = res;
        this.loaderService.hideLoader();
      },
      err => {
        this.loaderService.hideLoader();
      }
    )
  }

  addOrUpdate() {

    console.log(this.createSecretQuestionsForm.valid);

    this.loaderService.showLoader();
    const form = this.createSecretQuestionsForm.value
    const data: IAddUserSecretQuestionAndAnswer = {
      phoneNumber: this.userPhone,
      phoneUUID: this.deviceInfo.uuid,
      otp: this.incompleteRegistration ? form.otp : undefined,
      secretAnswerOne: form.a1,
      secretAnswerTwo: form.a2,
      secretAnswerThree: form.a3,
      secretQuestionOne: form.q1 === 'custom' ? form.cq1 : form.q1,
      secretQuestionTwo: form.q2 === 'custom' ? form.cq2 : form.q2,
      secretQuestionThree: form.q3 === 'custom' ? form.cq3 : form.q3
    }

    console.log(data);
    const subscription = this.updateSQnA
      ? this.userService.updateUserSecretQuestionAndAnswer(data)
      : this.incompleteRegistration
        ? this.userService.addUserSecretQuestionAndAnswerNoAuth(data)
        : this.userService.addUserSecretQuestionAndAnswer(data);
    subscription.subscribe(
      res => {
        console.log(res);
        if (res.resultCode === '200') {
          // const parsedMessage = JSON.parse(res.body.message);
          // this.authSrvc.updateSessionIDSubject(parsedMessage.SessionID);
          // this.authSrvc.updateTokenSubject(parsedMessage.Token);
          // this.profileService.setUserPhone(parsedMessage.MobilePhone);
          // this.storeToken(parsedMessage.Token);
          // this.authSrvc.isAuthenticated = true;
          // if (this.sharedData.isBiometericsAvailable) {
          //   this.alertSrvc.displayBiometricSetupModal(BiometricSetupComponent, this.successParams.message, '/home');
          // }
          // else {
          //   this.alertSrvc.displaySuccessModal(this.successParams.message, '/home');
          // }
          this.updateSQnA ? (() => {
            this.alertSrvc.showSuccessToast(res.message);
            this.router.navigate(['/', 'home'])
          })() : this.login(res.body.message, !this.updateSQnA);
        }
        else {
          this.alertSrvc.showErrorToast(res.message);
        }
        this.loaderService.hideLoader();
      },
      err => {
        this.loaderService.hideLoader();
        console.log(err);
      }
    )
  }

  storeToken(value) {
    this.userSrvc.storeToken(value);
  }

  requestOTP(resend?: boolean) {
    this.userService.generateOTPToUpdateSecretQuestion(this.userPhone).subscribe(
      res => {
        console.log(res);
        this.alertSrvc.showInfoToast(res.message);
      },
      err => {
        console.log(err);

      }
    )
  }

  verify() {
    this.loaderService.showLoader();
    const form = this.answerSecretQuestionsForm.value
    const loginData = this.state.data;
    const data = {
      phoneUUID: this.deviceInfo.uuid,
      playerId: this.sharedData.PLAYER_ID,
      custId: loginData.custId,
      phoneNumber: loginData.phoneNumber,
      secretQuestionOne: this.q1 ? this.q1 : undefined,
      secretQuestionTwo: this.q2 ? this.q2 : undefined,
      secretQuestionThree: this.q3 ? this.q3 : undefined,
      secretAnswerOne: this.q1 ? form.a1 : undefined,
      secretAnswerTwo: this.q2 ? form.a2 : undefined,
      secretAnswerThree: this.q3 ? form.a3 : undefined,
      secretQuestionOnePosition: this.q1 ? loginData.secretQuestionOnePosition : undefined,
      secretQuestionTwoPosition: this.q2 ? loginData.secretQuestionTwoPosition : undefined,
      secretQuestionThreePosition: this.q3 ? this.secretQuestionThreePosition : undefined,
    }
    const subscription = this.q3 ? this.userService.checkLastSecretAnswer(data) : this.userService.checkFirstTwoSecretAnswers(data)
    subscription.subscribe(
      res => {
        this.loaderService.hideLoader();
        if (res.resultCode !== '200') {
          if (res.resultCode === '222') {
            this.alertSrvc.showInfoToast(res.message);
            this.q1 = null;
            this.q2 = null;
            this.q3 = res.data.secretQuestionThree;
            this.secretQuestionThreePosition = res.data.secretQuestionThreePosition;
          }
          else {
            this.alertSrvc.showErrorToast(res.message);
          }
        }
        else {
          this.login(res.message);
        }
      },
      err => {
        this.loaderService.hideLoader();
        console.log(err);
      }
    )
  }

  login(message, signUp?) {
    const parsedMessage = JSON.parse(message);
    console.log(parsedMessage)
    const userPhone = parsedMessage.MobilePhone;
    this.sharedData.TOKEN = parsedMessage.Token;
    this.sharedData.SESSIONID = parsedMessage.SessionID;
    this.sharedData.PHONENUMBER = parsedMessage.MobilePhone;
    this.authSrvc.updateSessionIDSubject(parsedMessage.SessionID);
    this.authSrvc.updateTokenSubject(parsedMessage.Token);
    this.profileService.setUserPhone(parsedMessage.MobilePhone);
    this.storeToken(parsedMessage.Token);
    this.profileService.setUserPhone(userPhone);
    this.storePhoneNumber(userPhone);
    this.authSrvc.isAuthenticated = true;
    if (signUp) {
      if (this.sharedData.isBiometericsAvailable) {
        this.alertSrvc.displayBiometricSetupModal(BiometricSetupComponent, this.successParams.message, '/home');
      }
      else {
        this.alertSrvc.displaySuccessModal(this.successParams.message, '/home');
      }
    }
    else {
      this.router.navigate(['/', 'home']);
    }
  }

  back() {
    this.navController.back();
  }

  storePhoneNumber(value) {
    this.authSrvc.storeUserPhone(value);
  }

}
