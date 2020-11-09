import { Injectable } from '@angular/core';
import { UserService } from './user.service';
import { Observable, of, BehaviorSubject } from 'rxjs';
import { HttpService } from '../http/http.service';
import { ModalController } from '@ionic/angular';
import { LoaderService } from '../utilities/loader.service';
import { StorageService } from '../storage/storage.service';
import { Constants } from '../../config/constants';
import { IUser } from 'src/app/models/superApp/IUser';
import { Handlers } from 'src/app/shared/handlers';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  userProfile: IUser;
  userPhone;
  userEmail;
  photo: string;
  testString;
  fileUrl: any = null;
  respData: any;
  window: any = window;
  profilePhotoObject = {
    userPhone : '',
    userImage: ''
  };

 public imageResponse: any;

 private userPhoneSubject: BehaviorSubject<any[]>;
 private profilePhotoSubject: BehaviorSubject<any[]>;
 public userPhoneData: Observable<any>;
 public profilePhoto$: Observable<any>;

 public userProfileData: Observable<IUser>;
 private userProfileSubject: BehaviorSubject<IUser>;

 public finaclePhone$: Observable<IUser>;
 private finaclePhoneSubject: BehaviorSubject<IUser>;
 finaclePhone: any;

 private userProfilePictureSubject: BehaviorSubject<String>;

 private consolidatedTransactions: BehaviorSubject<any>;



  constructor(
    private userSrvc: UserService,
    private httpService: HttpService,
    private modalCtrlr: ModalController,
    private loaderSrvc: LoaderService,
    private storageSrvc: StorageService,
    private handlers: Handlers
  ) {
    const userPhoneData =  storageSrvc.get(Constants.USERPHONE).then(res => {
      this.userPhoneSubject = new BehaviorSubject<any>(res);
      this.userPhoneData = this.userPhoneSubject.asObservable();
      // console.log(this.currentUserData);
    });

    const userProfileData = storageSrvc.get(Constants.USERPROFILE).then(res => {
      this.userProfileSubject = new BehaviorSubject<IUser>(res);
      this.userProfileData = this.userProfileSubject.asObservable();
      // console.log(this.currentUserData);
    });

    this.profilePhotoSubject = new BehaviorSubject<any>('assets/imgs/johndoe.png');
    this.profilePhoto$ = this.profilePhotoSubject.asObservable();
    this.finaclePhoneSubject = new BehaviorSubject<any>('');
    this.finaclePhone$ = this.finaclePhoneSubject.asObservable();

    this.userProfilePictureSubject = new BehaviorSubject<any>('assets/imgs/johndoe.png');

    this.storageSrvc.get(Constants.USERPHOTO).then(res => {
        if (res) {
          this.profilePhotoSubject.next(res);
        }
      }
    );

    this.consolidatedTransactions = new BehaviorSubject<any>([]);
  }


  storeProfilePhoto(path) {
    this.storageSrvc.store(Constants.USERPHOTO, path);
    this.profilePhotoSubject.next(path);
  }

  setUserProfileData(value){
    this.storageSrvc.store(Constants.USERPROFILE, value);
    this.userProfileSubject.next(value);
  }

  getProfilePhoto() {
    return this.storageSrvc.get(Constants.USERPHOTO);
  }

  setUserPhone(value) {
    this.storageSrvc.store(Constants.USERPHONE, value);
    this.userPhoneSubject.next(value);
  }

  setUserProfilePicture(value) {
    this.userProfilePictureSubject.next(value);
    this.storageSrvc.store(Constants.USERPHOTO, value);
  }

  getUserProfilePicture() {
    return this.userProfilePictureSubject.asObservable();
  }

  setFinaclePhone(value) {
    this.formatFinacleNumber(value);
    this.storageSrvc.store(Constants.FINPHONE, this.finaclePhone);
    this.finaclePhoneSubject.next(this.finaclePhone);
    // this.finaclePhone = value;
    console.log(this.finaclePhone);
  }

  getUserPhone(): string {
   this.userPhoneData.subscribe(res => {
     this.userPhone = res;
   });
   return this.userPhone;
  }

  getFinaclePhone(): string {
   this.finaclePhone$.subscribe(res => {
     this.finaclePhone = res;
   });
   return this.finaclePhone;
  }

  getUserEmail(): string {
    this.userSrvc.currentUserProfile.subscribe(res => {
      this.userEmail = res.emailAddress;
      // console.log(this.userPhone);
      return this.userEmail;
      // return console.error('Network Error');
    });
    return this.userEmail;
  }

  getUserProfileData() {
    this.userSrvc.currentUserProfile.subscribe(res => {
      this.userProfile = res;
      return this.userProfile;
    });
    return this.userProfile;
  }

  updateProfile(postData: any): Observable<any> {
    this.getUserPhone();
    if (this.userPhone) {
      return this.httpService.post(`UpdateUserProfileByPhone?PhoneNumberCurrent=${this.userPhone}`, postData);
    }
  }

  updateNOK(postData: any): Observable<any> {
    this.getUserPhone();
    if (this.userPhone) {
      return this.httpService.post(`UpdateNextOfKinByPhone?PhoneNumber=${this.userPhone}`, postData);
    }
  }

  _uploadFile(file) {
    return this.httpService.upload(`Uploads/UploadUserDocuments`, file);
  }

  _uploadProfilePhoto(file) {
    return this.httpService.upload(`Uploads/UploadProfilePic`, file);
  }

  _uploadProfileSelfie(file) {
    return this.httpService.upload(`Uploads/UploadProfileSelfie`, file);
  }

  _updateBvn(bvn: number) {
    return this.httpService.get(`BvnUpdateByPhone?Phonenumber=${this.userPhone}&BvNumber=${bvn}`);
  }

  profileWithCard(postData: any): Observable<any> {
    this.getUserPhone();
    this.getUserEmail();
    if (this.userPhone && this.userEmail) {
      postData['email'] = this.userEmail;
      postData['truProfilePhoneNumber'] = this.userPhone;
      return this.httpService.profileCustomer_POST(`ProfileFidelityCustomerWithCard`, postData);
    }
  }

  profileWithToken(postData: any): Observable<any> {
    this.getUserPhone();
    this.getUserEmail();
    if (this.userPhone && this.userEmail) {
      postData['email'] = this.userEmail;
      postData['truProfilePhoneNumber'] = this.userPhone;
      return this.httpService.profileCustomer_POST(`ProfileFidelityCustomerWithToken`, postData);
    }
  }

  profileFidelityCustomer_VerifyToken(token) {
    this.getUserPhone();
    if (this.userPhone) {
      return this.httpService.profileCustomer_GET(`ConfirmTokenForFidelityCustomerProfiling?OTP=${token}&PhoneNumber=${this.userPhone}`);
    }
  }

  profileFidelityCustomer_GetCardProducts(): Observable<any> {
    return this.httpService.profileCustomer_GET(`GetCardProducts`);
  }

  formatFinacleNumber(value) {
    let phone: string = value;
    if (phone) {
      if (phone.startsWith('+234')) {
        phone = `0${phone.slice(4)}`;
      } else if (phone.startsWith('234')) {
        phone = `0${phone.slice(3)}`;
      }
      return this.finaclePhone = phone;
    }
  }

  getTransactions() {
    this.getUserPhone();
    if (this.userPhone) {
      return this.httpService.transactions_GET(`GetConsolidatedTransactions?Phonenumber=${this.userPhone}`);
    }
  }

  getConsolidatedTransactions() {
    return this.consolidatedTransactions.asObservable()
  }

  updateConsolidatedTransactions(value) {
    this.consolidatedTransactions.next(value);
    console.log("Updated consolidated trnx");
  }

}
