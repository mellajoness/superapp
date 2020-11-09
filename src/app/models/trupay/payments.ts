import { Handlers } from "./../../shared/handlers";
import { BillspaymentsService } from "./../../services/billspayments/billspayments.service";
import { SharedData } from "src/app/shared/shared.components";
import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
  })

export class PaymentsModel {
  constructor(
    private billsPaymentsService: BillspaymentsService,
    private sharedData: SharedData,
    private handlers: Handlers
  ) {
    // this.getAllBillers();
  }

  getAllBillers() {
      console.log("getAllBillers called from the Payments model");
    return new Promise((resolve, reject) => {
      const allBillersdata = {
        isBorrowService: false,
        userId: this.sharedData.userProfile.phoneNumber,
        channelId: "trupay",
        userToken: this.sharedData.TOKEN + '::' + this.sharedData.SESSIONID,
      };

      this.billsPaymentsService.GetAllBillers(allBillersdata).subscribe(
        (res: any) => {
          if (res && res.code === "00" && res.data) {
            // this.allBillers = res.data;
            this.sharedData.billsPaymentData = res.data;
            resolve(res);
          } else if (res && res.code !== "00" && res.message) {
            reject(res.message);
          } else {
            reject(this.handlers.responseMsgs().errorOccurredTryLater);
          }
          console.log(res);
        },
        (err) => {
          reject(this.handlers.responseMsgs().errorOccurredTryLater);
          console.log(err);
        }
      );
    });
  }
}
