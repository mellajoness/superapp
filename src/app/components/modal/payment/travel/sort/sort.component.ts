import { element } from 'protractor';
import { Component, OnInit } from '@angular/core';
import { SharedData } from 'src/app/shared/shared.components';
import { Handlers } from 'src/app/shared/handlers';
import { LoaderService } from 'src/app/services/utilities/loader.service';

@Component({
  selector: 'app-sort',
  templateUrl: './sort.component.html',
  styleUrls: ['./sort.component.scss']
})
export class SortComponent implements OnInit {

  sortType;
  tab;
  // availableAirlines;
  airlines;

  constructor(
    public sharedData: SharedData,
    private handlers: Handlers,
    private loaderService: LoaderService
  ) {
    // this.airlines = [];
    this.tab = 'sort';
    this.listAirlines();
    // this.availableAirlines = this.listAirlines();
  }

  ngOnInit() {
  }

  ascending() {
    if(this.sharedData.travel.ascending) {
      this.handlers.popoverDismiss();
      return;
    }
    this.handlers.popoverDismiss();
    this.loaderService.showLoader();
    setTimeout(
      () => {
        this.sharedData.travel.ascending = true;
        this.sharedData.travel.searchResult.data.body.data.itineraries = this.sharedData.travel.searchResult.data.body.data.itineraries.slice().reverse();
        this.truncateResults(this.sharedData.travel.searchResult.data.body.data.itineraries);
        this.loaderService.hideLoader();
      }, 500
    )
  }

  descending() {
    if(!this.sharedData.travel.ascending) {
      this.handlers.popoverDismiss();
      return;
    }
    this.handlers.popoverDismiss();
    this.loaderService.showLoader();
    setTimeout(
      () => {
        this.sharedData.travel.ascending = false;
        this.sharedData.travel.searchResult.data.body.data.itineraries = this.sharedData.travel.searchResult.data.body.data.itineraries.slice().reverse();
        this.truncateResults(this.sharedData.travel.searchResult.data.body.data.itineraries);
        this.loaderService.hideLoader();
      }, 500
    )

  }

  segmentChanged(event) {
    const segment = event.detail.value;
  }

  listAirlines() {
    if (this.sharedData.travel.listAirlines != null) {
      return;
    }
    // let airlines = [];
    this.sharedData.travel.listAirlines = [];
    let itineraries = this.sharedData.travel.searchResultImmutable.data.body.data.itineraries;
    itineraries.map(
      (itinerary) => {
        itinerary.origin_destinations.map(
          (o_d) => {
            o_d.segments.map(
              (segment) => {
                if (
                  this.sharedData.travel.listAirlines.some(
                    element => element.code === segment.marketing_airline.code
                  )
                ) { }
                else {
                  segment.marketing_airline['checked'] = false;
                  this.sharedData.travel.listAirlines.push(segment.marketing_airline);
                  // this.airlines.push(segment.marketing_airline)
                }
              }
            )
          }
        )
      }
    )
    // return this.sharedData.travel.listAirlines.sort()
  }

  // listAirlines() {
  //   let airlines = [];
  //   let itineraries = this.sharedData.travel.searchResult_.data.body.data.itineraries;
  //   itineraries.map(
  //     (itinerary) => {
  //       itinerary.origin_destinations.map(
  //         (o_d) => {
  //           o_d.segments.map(
  //             (segment) => {
  //               if (airlines.includes(segment.operating_airline.name)) {}
  //               else {
  //                 airlines.push(segment.operating_airline.name)
  //               }
  //             }
  //           )
  //         }
  //       )
  //     }
  //   )
  //   return airlines.sort()
  // }

  // filterByAirline(airline: any) {
  //   console.log(airline);
  //   let filtered = []
  //   this.sharedData.travel.searchResult = this.sharedData.travel.searchResult_;
  //   this.sharedData.travel.searchResult.data.body.data.itineraries.map(
  //     (itinerary) => {
  //       itinerary.origin_destinations.map(
  //         (o_d) => {
  //           o_d.segments.map(
  //             (segment) => {
  //               // airlines.map(
  //               // (airline) => {
  //               if (airline.code === segment.marketing_airline.code) {
  //                 filtered.push(itinerary);
  //               }
  //               // }
  //               // )
  //             }
  //           )
  //         }
  //       )
  //     }
  //   )
  //   this.sharedData.travel.searchResult.data.body.data.itineraries = filtered;
  // }

  filterByAirline(airline: any) {
    console.log(airline);

    const add = () => {
      let filtered = [];
      // this.sharedData.travel.searchResult.data.body.data.itineraries = [...this.sharedData.travel.searchResultImmutable.data.body.data.itineraries];
      this.sharedData.travel.searchResultImmutable.data.body.data.itineraries.map(
        (itinerary) => {
          this.sharedData.travel.arilinesChecked.map(
            arlineChecked => {
              if (arlineChecked.code === itinerary.validating_airline_code) {
                filtered.push(itinerary);
                // this.sharedData.travel.searchResult.data.body.data.itineraries.push(itinerary);
              }
            }
          )
        }
      )
      this.sharedData.travel.searchResult.data.body.data.itineraries = [...filtered];
      this.truncateResults(this.sharedData.travel.searchResult.data.body.data.itineraries);
    }



    const remove = (airline) => {
      let filtered = [];
      console.log(`meant to remove ${airline.name}`);
      this.sharedData.travel.searchResult.data.body.data.itineraries.map(
        (itinerary, index) => {
          console.log('============' + itinerary.validating_airline_code)
          if (itinerary.validating_airline_code === airline.code) {
            console.log(`Removing ${itinerary.validating_airline_code}`);
            // this.sharedData.travel.searchResult.data.body.data.itineraries.splice(index, 1);
          }
          else {
            console.log(`Skipping ${itinerary.validating_airline_code}`);
            filtered.push(itinerary);
          }
        }
      )

      if (filtered.length < 1) {
        this.sharedData.travel.searchResult.data.body.data.itineraries = [...this.sharedData.travel.searchResultImmutable.data.body.data.itineraries];
        this.truncateResults(this.sharedData.travel.searchResult.data.body.data.itineraries);
      }
      else {
        this.sharedData.travel.searchResult.data.body.data.itineraries = [...filtered];
        this.truncateResults(this.sharedData.travel.searchResult.data.body.data.itineraries);
      }

      // this.sharedData.travel.searchResult.data.body.data.itineraries = filtered.length===0 ? [...this.sharedData.travel.searchResultImmutable.data.body.data.itineraries] : [...filtered];
      console.log(`Finished removing ${airline.name}`);
      console.log(this.sharedData.travel.searchResult.data.body.data.itineraries);
    }

    const remove_ = (airline) => {
      let filtered = this.sharedData.travel.searchResult.data.body.data.itineraries.filter(
        (itinerary) => {
          return (itinerary.validating_airline_code !== airline.code)
        }
      )
      if (filtered.length < 1) {
        this.sharedData.travel.searchResult.data.body.data.itineraries = [...this.sharedData.travel.searchResultImmutable.data.body.data.itineraries];
        this.truncateResults(this.sharedData.travel.searchResult.data.body.data.itineraries);
      }
      else {
        this.sharedData.travel.searchResult.data.body.data.itineraries = [...filtered];
        this.truncateResults(this.sharedData.travel.searchResult.data.body.data.itineraries);
      }
    }








    if (airline.checked) {
      remove(airline);
      airline['checked'] = false;

      this.sharedData.travel.arilinesChecked.map(
        (airlineChecked, index) => {
          if (this.sharedData.travel.arilinesChecked.some(
            element => element.code === airlineChecked.code
          )) {
            // Set Checked Property To False
            this.sharedData.travel.listAirlines.map(
              (listAirline) => {
                if (listAirline.code === airline.code) {
                  listAirline.checked = false;
                }
              }
            )
            this.sharedData.travel.arilinesChecked.splice(index, 1);
          }
        }
      )


      return;
    }


    if (this.sharedData.travel.arilinesChecked.length === 0) {
      airline['checked'] = true;
      this.sharedData.travel.arilinesChecked.push(airline);
      this.sharedData.travel.searchResult.data.body.data.itineraries = [];
      add();
    }
    else {
      if (this.sharedData.travel.arilinesChecked.some(
        element => element.code === airline.code
      )) {
        // this.sharedData.travel.arilinesChecked.splice(this.sharedData.travel.arilinesChecked.indexOf(element), 1);
        this.sharedData.travel.arilinesChecked.map(
          (airlineChecked, index) => {
            if (this.sharedData.travel.arilinesChecked.some(
              element => element.code === airlineChecked.code
            )) {
              // Set Checked Property To False
              this.sharedData.travel.listAirlines.map(
                (listAirline) => {
                  if (listAirline.code === airline.code) {
                    listAirline.checked = false;
                  }
                }
              )
              this.sharedData.travel.arilinesChecked.splice(index, 1);
            }
          }
        )
      }
      else {
        airline['checked'] = true;
        this.sharedData.travel.arilinesChecked.push(airline);
        add();
      }
    }




    // let filtered = [];
    // this.sharedData.travel.searchResult.data.body.data.itineraries = [...this.sharedData.travel.searchResultImmutable.data.body.data.itineraries];
    // this.sharedData.travel.searchResult.data.body.data.itineraries.map(
    //   (itinerary) => {
    //     if (airline.code === itinerary.validating_airline_code) {
    //       filtered.push(itinerary);
    //     }
    //   }
    // )
    // this.sharedData.travel.searchResult.data.body.data.itineraries = filtered;



  }


  clearFilters() {
    this.sharedData.travel.searchResult.data.body.data.itineraries = [...this.sharedData.travel.searchResultImmutable.data.body.data.itineraries];
    this.truncateResults(this.sharedData.travel.searchResult.data.body.data.itineraries);
    this.sharedData.travel.arilinesChecked = [];
    this.sharedData.travel.searchResult.data.body.data.itineraries.map(
      (itinerary) => {
        itinerary.origin_destinations.map(
          (o_d) => {
            o_d.segments.map(
              (segment) => {
                segment.marketing_airline['checked'] = false;
              }
            )
          }
        )
      }
    )
  }


  truncateResults(itineraries) {
    let truncatedItineraries = [];
    if (itineraries.length > 10) {
      const length = itineraries.length;
      for (let i = 0; i < length; i += 10) {
        const x = itineraries.slice(i, i + 10);
        truncatedItineraries.push(x);
      }
    }
    else {
      truncatedItineraries.push(itineraries);
    }
    this.sharedData.travel.truncated.allItineraries = JSON.parse(JSON.stringify(truncatedItineraries));
    this.sharedData.travel.truncated.length = truncatedItineraries.length;
    this.sharedData.travel.truncated.max = truncatedItineraries.length - 1;
    this.sharedData.travel.truncated.view = 0;
  }


}
