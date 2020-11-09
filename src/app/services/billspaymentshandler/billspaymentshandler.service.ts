import { Injectable } from '@angular/core';
import { SharedData } from 'src/app/shared/shared.components';

@Injectable({
  providedIn: 'root'
})
export class BillspaymentshandlerService {

  constructor(
    public sharedData: SharedData
  ) { }

  //Utlities Object
  getElectricity(data) {
    let electricity;

    if (data) {
      data.filter((obj) => {
        if (obj.categoryId === "A") {
          electricity = obj;
        }
      })
    }
    return electricity;
  }

  //BoroPower Object
  getBoroPower(data) {
    let boroPower;
    
    if (data) {
      data.filter((obj) => {
        if (obj.categoryId === "A") {
          boroPower = obj;
        }
      })
    }
    return boroPower;
  }

  //CableTV Object
  getCableTV(data) {
    let cableTv;

    if (data) {
      data.filter((obj) => {
        if (obj.categoryId === "B") {
          cableTv = obj;
        }
      })
    }
    return cableTv;
  }

  //Airtime Object
  getAirtime(data) {
    let airtime;

    if (data) {
      data.filter((obj) => {
        if (obj.categoryId === "C") {
          airtime = obj;
        }
      })
    }
    return airtime;
  }

  //Internet Service Object
  getInternetService(data) {
    let internetService;

    if (data) {
      data.filter((obj) => {
        if (obj.categoryId === "D") {
          internetService = obj;
        }
      })
    }
    return internetService;
  }

  insertSeletedBill(data) {
    let bill;

    if (data) {
      data.filter((obj) => {
        if (obj.billerId === this.sharedData.billsPaymentsService) {
          bill = obj.billerName
        }
      })
    }
    return bill;
  }

  billTypeChange(data, type) {
    let accountType;

    if (data && type) {
      data.filter((obj) => {
        if (obj.planName === type) {
          accountType = obj.value
        }
      })
    }
    return accountType;
  }

  getBillerID(data, name) {
    let id;

    if (data && name) {
      data.filter((obj) => {
        if (obj.billerName === name) {
          id = obj.billerId
        }
      })
    }
    return id;
  }

  getBillerObj(data, name) {
    let billerObj;

    if (data && name) {
      data.filter((obj) => {
        if (obj.billerName === name) {
          billerObj = obj
        }
      })
    }
    return billerObj;
  }

  getCableTvAmount(data, name) {
    let amount;

    if (data && name) {
      data.filter((obj) => {
        if (obj.name === name) {
          amount = obj.amount
        }
      })
    }
    return amount;
  }

  getCableBouquetObj(data, name) {
    let cableBouquetObj;

    if (data && name) {
      data.filter((obj) => {
        if (obj.name === name) {
          cableBouquetObj = obj
        }
      })
    }
    return cableBouquetObj;
  }

  getInternetPlanAmount(data, name) {
    let amount;

    if (data && name) {
      data.filter((obj) => {
        if (obj.bundleDescription === name) {
          amount = obj.bundlePrice
        }
      })
    }
    return amount;
  }

  getInternetPlanObj(data, name) {
    let internetPlanObj;

    if (data && name) {
      data.filter((obj) => {
        if (obj.bundleDescription === name) {
          internetPlanObj = obj
        }
      })
    }
    return internetPlanObj;
  }


  getFirstIndex(item) {
    let name;

    if (item) {
      name = item.split(" ");
      name = name[0];
    }
    return name;
  }

  getDistanceFromLatLonInKm(lat1,lon1,lat2,lon2) {
    var R = 6371; // Radius of the earth in km
    var dLat = this.deg2rad(lat2-lat1);  // deg2rad below
    var dLon = this.deg2rad(lon2-lon1); 
    var a = 
      Math.sin(dLat/2) * Math.sin(dLat/2) +
      Math.cos(this.deg2rad(lat1)) * Math.cos(this.deg2rad(lat2)) * 
      Math.sin(dLon/2) * Math.sin(dLon/2)
      ; 
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
    var d = R * c;
    return Math.round(d*10)/10;
  }

  deg2rad(deg) {
    return deg * (Math.PI/180)
  }

  getBettingData(billers, code) {
    let bill;
    billers.map(x => {
      if(x.billerName === code) {
        bill = x;
      }
    })
    return bill;
  }

  getBettingOfferObj(billers, name) {
    let offer;
    billers.map(x => {
      if(x.paymentitemname === name) {
        offer = x;
      }
    })
    return offer;
  }

}
