import { Device } from '@ionic-native/device/ngx';
import { ErrorInterceptorService } from './services/error/error-interceptor';
import { Crop } from '@ionic-native/crop/ngx';
// import { Deploy } from 'cordova-plugin-ionic/dist/ngx';
import { AppVersion } from '@ionic-native/app-version/ngx';
import { VerificationPageModule } from './payments/identify-fidelity-customer/verification/verification.module';
import { IdentifyFidelityCustomerPageModule } from './payments/identify-fidelity-customer/identify-fidelity-customer.module';
import { IdentifyFidelityCustomerPage } from './payments/identify-fidelity-customer/identify-fidelity-customer.page';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { File } from '@ionic-native/file/ngx';
import { FilePath } from '@ionic-native/file-path/ngx';
import { Camera } from '@ionic-native/camera/ngx';
import { WebView } from '@ionic-native/ionic-webview/ngx';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';
import { SpinnerDialog } from '@ionic-native/spinner-dialog/ngx';
import { SocialSharing } from '@ionic-native/social-sharing/ngx';
import { Network } from '@ionic-native/network/ngx';

import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { ForgotPasswordComponent } from './components/forgot-password/forgot-password.component';
import { TransactionPinComponent } from './components/transaction-pin/transaction-pin.component';
import { ForgotPinComponent } from './components/forgot-pin/forgot-pin.component';
import { ChangePasswordComponent } from './components/change-password/change-password.component';
import { SetupPinComponent } from './components/setup-pin/setup-pin.component';
import { TopUpComponent } from './components/top-up/top-up.component';
import { NgOtpInputModule } from 'ng-otp-input';
import { PaymentSourceLoaderComponent } from './components/payment-source-loader/payment-source-loader.component';
import { SmsRetriever } from '@ionic-native/sms-retriever/ngx';
import { SuccessModalComponent } from './components/success-modal/success-modal.component';
import { GoalDueComponent } from './components/goal-due/goal-due.component';
import { SharedData } from './shared/shared.components';
import { Handlers } from './shared/handlers';
import { BillsmodalComponent } from './components/billsmodal/billsmodal.component';
import { Config } from './shared/Urls';
import { FormValidations } from './shared/formsDirectives';
import { SharedModule } from './shared/shared.module';
import { SearchandselectComponent } from './components/modal/payment/travel/searchandselect/searchandselect.component';
import { CustomalertComponent } from './components/customalert/customalert.component';
import { WalletmodalComponent } from './components/walletmodal/walletmodal.component';
import { FlightTicketDetailsComponent } from './components/modal/payment/travel/flight-ticket-details/flight-ticket-details.component';
import { SortComponent } from './components/modal/payment/travel/sort/sort.component';
import { LiquidateGoalComponent } from './components/liquidate-goal/liquidate-goal.component';
import { AuthInterceptorService } from './services/auth/auth-interceptor.service';
import { DasboardcomponentComponent } from '../../src/app//loans/dasboardcomponent/dasboardcomponent.component';
import { ModalBaseComponent } from './components/modal-base/modal-base.component';
import { CardOrTokenPageModule } from './payments/identify-fidelity-customer/card-or-token/card-or-token.module';
import { SocialShareComponent } from './components/social-share/social-share.component';
import { FingerprintAIO } from '@ionic-native/fingerprint-aio/ngx';
import { AccountsPipe } from './pipes/accounts/accounts.pipe';
import { OneSignal } from '@ionic-native/onesignal/ngx';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { NativeGeocoder } from '@ionic-native/native-geocoder/ngx';
import { LocationComponent } from './components/location/location.component';
import { LocationinfoComponent } from './components/locationinfo/locationinfo.component';
import { GroupDetailPopoverComponent } from './components/group-detail-popover/group-detail-popover.component';
import { LiquidateGroupComponent } from './components/liquidate-group/liquidate-group.component';
// import { FCM } from '@ionic-native/fcm/ngx';
import { FCM } from '@ionic-native/fcm/ngx';
import { ProfileSuccessModalComponent } from './components/profile-success-modal/profile-success-modal/profile-success-modal.component';
import { AuthSuccessModalComponent } from './components/profile-success-modal/auth-success-modal/auth-success-modal.component';
import { BiometricSetupComponent } from './components/biometric-setup/biometric-setup.component';
import { ForgotPasswordPrimaryComponent } from './components/forgot-password-primary/forgot-password-primary.component';
import { OnboardingComponent } from './components/onboarding/onboarding.component';
import { ExitappComponent } from './components/exitapp/exitapp.component';
import { DeletenotificationComponent } from './components/deletenotification/deletenotification.component';
import { ShownotificationComponent } from './components/shownotification/shownotification.component';
import { BettingcompaniesComponent } from './components/bettingcompanies/bettingcompanies.component';
import { ScreenOrientation } from '@ionic-native/screen-orientation/ngx';
import { ViewSiComponent } from './components/view-si/view-si.component';
import { FileOpener } from '@ionic-native/file-opener/ngx';
import { ChangeWalletPinComponent } from './components/change-wallet-pin/change-wallet-pin.component';

@NgModule({
 
  declarations: [AppComponent,
  ForgotPasswordComponent,
  ForgotPasswordPrimaryComponent,
  ForgotPinComponent,
  TransactionPinComponent,
  SetupPinComponent,
  TopUpComponent,
  SuccessModalComponent,
  ProfileSuccessModalComponent,
  AuthSuccessModalComponent,
  BiometricSetupComponent,
  GoalDueComponent,
  ChangePasswordComponent,
  BillsmodalComponent,
  CustomalertComponent,
  WalletmodalComponent,
  SearchandselectComponent,
  FlightTicketDetailsComponent,
  SortComponent,
  OnboardingComponent,
  CustomalertComponent,
  LiquidateGoalComponent,
  DasboardcomponentComponent,
  IdentifyFidelityCustomerPage,
  ModalBaseComponent,
  LocationComponent,
  SocialShareComponent,
  LocationinfoComponent,
  LiquidateGroupComponent,
  OnboardingComponent,
  ExitappComponent,
  DeletenotificationComponent,
  ShownotificationComponent,
  BettingcompaniesComponent,
  ViewSiComponent,
  GroupDetailPopoverComponent,
  ChangeWalletPinComponent
],
  entryComponents: [ForgotPasswordComponent, ForgotPinComponent, TransactionPinComponent, ForgotPasswordPrimaryComponent, ChangePasswordComponent, SetupPinComponent, OnboardingComponent,
    TopUpComponent, SuccessModalComponent, ProfileSuccessModalComponent, AuthSuccessModalComponent, GoalDueComponent, BillsmodalComponent, CustomalertComponent, WalletmodalComponent, LiquidateGroupComponent,
    SearchandselectComponent, BiometricSetupComponent, FlightTicketDetailsComponent, SortComponent, LiquidateGoalComponent, DasboardcomponentComponent, ExitappComponent,SocialShareComponent, ChangeWalletPinComponent,
    ModalBaseComponent, IdentifyFidelityCustomerPage, LocationComponent, LocationinfoComponent, DeletenotificationComponent, ShownotificationComponent, BettingcompaniesComponent, ViewSiComponent, GroupDetailPopoverComponent],
  imports: [BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    SharedModule,
    NgOtpInputModule,
    IdentifyFidelityCustomerPageModule,
    CardOrTokenPageModule,
    VerificationPageModule,
    BrowserAnimationsModule
  ],

  providers: [
    // Network,
    StatusBar,
    SplashScreen,
    SmsRetriever,
    SocialSharing,
    Network,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    FCM,
    SharedData,
    Handlers,
    FormValidations,
    File,
    FilePath,
    Camera,
    WebView,
    Config,
    FormValidations,
    InAppBrowser,
    SpinnerDialog,
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptorService, multi: true},
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptorService, multi: true},
    AppVersion,
    FingerprintAIO,
    OneSignal,
    Geolocation,
    NativeGeocoder,
    ScreenOrientation,
    FileOpener,
    Crop,
    Device
  ],

  bootstrap: [AppComponent]
})
export class AppModule {}
