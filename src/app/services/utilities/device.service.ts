import { BehaviorSubject, Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { Device } from '@ionic-native/device/ngx';

@Injectable({
  providedIn: 'root'
})
export class DeviceService {

  genericInfo: Observable<Device>
  private deviceInfoSubject: BehaviorSubject<Device>;

  constructor(private device: Device) {
    this.deviceInfoSubject = new BehaviorSubject(this.device);
    this.genericInfo = new Observable(observer => {
      observer.next({
        cordova: "browser",
        isVirtual: true,
        manufacturer: "browser",
        model: "browser",
        platform: "browser",
        serial: "browser",
        uuid: "browser",
        version: "browser"
      })
      observer.complete();
    })
    
  }

  get deviceInfo() {
    return this.device.cordova ? this.deviceInfoSubject.asObservable() : this.genericInfo;
  }
}
