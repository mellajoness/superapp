import {Component, ElementRef, NgZone, ViewChild, OnInit} from '@angular/core';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { NativeGeocoder, NativeGeocoderResult, NativeGeocoderOptions } from '@ionic-native/native-geocoder/ngx';
import { Platform, NavController } from '@ionic/angular';
import { SharedData } from 'src/app/shared/shared.components';
import { LocationComponent } from 'src/app/components/location/location.component';
import { Handlers } from 'src/app/shared/handlers';
import { BillspaymentsService } from 'src/app/services/billspayments/billspayments.service';
import { BillspaymentshandlerService } from 'src/app/services/billspaymentshandler/billspaymentshandler.service';
import { MapService } from 'src/app/services/map/map.service';
declare var google: any;

@Component({
  selector: 'app-atmlocations',
  templateUrl: './atmlocations.page.html',
  styleUrls: ['./atmlocations.page.scss', '../../../theme/payments.scss'],
})
export class AtmlocationsPage implements OnInit {

  @ViewChild('Map', {static: true}) mapElement: ElementRef;
  map: any;
  mapOptions: any;

  location = {
    lat: null,
    lng: null
  };

  markerOptions: any = {
    position: null,
    map: null,
    title: null
  };
  address;
  locationName;
  isLocationAvailable;
  atmLocations;

  marker: any;
  showMarker;
  locations;

  directionsService = new google.maps.DirectionsService;
  directionsDisplay = new google.maps.DirectionsRenderer;
  start = 'kruisstraat 50, oss';
  end = 'ridderhof 69, oss';
  locationAvailable;

  icon = {
    url: 'assets/icon/location-marker.png', // custom background image (marker pin)
    scaledSize: new google.maps.Size(30, 30),
  };
  
  constructor (
    public zone: NgZone,
    public geolocation: Geolocation,
    private nativeGeocoder: NativeGeocoder,
    private platform: Platform,
    private navCtrl: NavController,
    public sharedData: SharedData,
    public handlers: Handlers,
    private billsPaymentsService: BillspaymentsService,
    private mapService: MapService,
    private billsPaymentHandlersService: BillspaymentshandlerService,
  ) {

    this.locationAvailable = true;
    this.showMarker = true;
    this.loadMap();
  }

  ngOnInit() {  }

  goBack() {
    this.navCtrl.back();
  }

  ionViewWillEnter() {
    this.showMarker = true;
  }
  
  loadMap() {
    this.getCurrentLocation();
    // this.locate();
  }

  presentModal() {
    if(this.locations) {
      this.handlers.locationModal(LocationComponent)
    }
  }

  getAddressFromCoords(lattitude, longitude) {
    console.log("getAddressFromCoords " + lattitude + " " + longitude);
    let options: NativeGeocoderOptions = { useLocale: true, maxResults: 5 };

    this.nativeGeocoder.reverseGeocode(lattitude, longitude, options)
      .then((result: NativeGeocoderResult[]) => {
        console.log(result)
        // this.locationName = "surulere";
        this.locationName = result[0].subLocality || result[0].subAdministrativeArea;
        this.getAtmLocations(this.locationName);
        this.address = "";
        let responseAddress = [];
        for (let [key, value] of Object.entries(result[0])) {
          if (value.length > 0)
            responseAddress.push(value);
        }
        responseAddress.reverse();
        for (let value of responseAddress) {
          this.address += value + ", ";
        }
        this.address = this.address.slice(0, -2);
        console.log(this.address);
      })
      .catch((error: any) => {
        this.address = "Address Not Available!";
      });

  }

  getCoordsFromAddress(address) {
    console.log("getCpprdsFromAddress " + address);
    let options: NativeGeocoderOptions = { useLocale: true, maxResults: 5 };

    return this.nativeGeocoder.forwardGeocode(address, options)
      .then((result: NativeGeocoderResult[]) => {
        console.log(result);
        return result;
        // this.zone.run(() => {
        // })
      })
      .catch((error: any) => console.log(error));
  }

  getCurrentLocation() {
    /*Get Current location*/
    this.isLocationAvailable = undefined;
    let options = {timeout: 5000, enableHighAccuracy: true, maximumAge: 0};
    this.geolocation.getCurrentPosition(options).then((position) =>  {
      this.location.lat = position.coords.latitude;
      this.location.lng = position.coords.longitude;
      if(this.platform.is('cordova')) {
        this.getAddressFromCoords(this.location.lat, this.location.lng);
      } else {
        this.address = "Address Not Available!";
      }
    });
  }

  locate() {
    this.mapOptions = { center: this.location, zoom: 10, mapTypeControl: false, mapTypeId: google.maps.MapTypeId.ROADMAP };
    setTimeout(() => { 
      this.map = new google.maps.Map(this.mapElement.nativeElement, this.mapOptions);
      this.locationAvailable = true;
      //TAKE NOTE OF THE LINE BELOW
      console.log("TAKE NOTE OF THE LINE BELOW");
      this.directionsDisplay.setMap(this.map);

      if(this.locations && this.locations.length > 0) {
        this.getMarkers()
      } else {
        this.myLocations();
      }
    }, 2000);

  }

  getMarkers() {
    // tslint:disable-next-line:variable-name
    for (let _i = 0; _i < this.locations.length; _i++) {
      if (_i > 0) { this.addMarkersToMap(this.locations[_i]); }
    }
  }

  addMarkersToMap(locations) {
    const position = new google.maps.LatLng(locations.latitude, locations.longitude);
    this.marker = new google.maps.Marker({ position, title: locations.name, animation: google.maps.Animation.BOUNCE, icon: this.icon });
    this.marker.setMap(this.map);
    this.showMarker = false;    
  }

  myLocations() {
    // /*Map options*/
    this.markerOptions.position = this.location;
    this.markerOptions.map = this.map;
    this.markerOptions.title = 'My Location';
    this.markerOptions.animation = google.maps.Animation.BOUNCE;
    this.markerOptions.icon = this.icon;
    this.marker = new google.maps.Marker(this.markerOptions);
    this.showMarker = false;
    
    console.log(this.marker)
    const global = this;
    this.marker.addListener('click', function() {
      this.map.setZoom(15);
      this.map.setCenter(global.marker.getPosition());
    });

  }

  calculateAndDisplayRoute() {
    this.directionsService.route({
      origin: this.start,
      destination: this.end,
      travelMode: 'DRIVING'
    }, (response, status) => {
      if (status === 'OK') {
        this.directionsDisplay.setDirections(response);
      } else {
        console.log('Directions request failed due to ' + status);
      }
    });
  }

  getAtmLocations(address) {
    this.billsPaymentsService.Location(address)
    .subscribe(
      (res: any) => {
        console.log(res)
        if(res && res.code === '00' && res.data && res.data.length > 0) {
          this.isLocationAvailable = true
          this.atmLocations = res.data;
          let dists = this.atmLocations.map(x => {
            return this.getCoordsFromAddress(x.address);
          })
          Promise.all(dists).then( dist => {
            dist.forEach((d, i) => {
              this.atmLocations[i]['state'] = d[0]['administrativeArea'];
              this.atmLocations[i]['longitude'] = d[0]['longitude']
              this.atmLocations[i]['latitude'] = d[0]['latitude'];
              this.atmLocations[i]['distanceFromLocation'] = this.billsPaymentHandlersService.getDistanceFromLatLonInKm(this.location.lat, this.location.lng, d[0]['latitude'], d[0]['longitude']);
            })
            console.log(this.atmLocations);
            
            this.locations = this.atmLocations;
            this.sharedData.atmLocations = this.atmLocations;
            this.locate();
          })

        } else {
          this.isLocationAvailable = false;
          this.locate()
        }
      },
      err => {
        console.log(err)
        this.isLocationAvailable = false;
        this.locate();
      }
    )
  }

  hide() {
    this.locationAvailable = false;
  }
}
