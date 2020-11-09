export class SharedData {

    public TOKEN;
    public SESSIONID;
    public PHONENUMBER;
    public NOTIFICATIONS;
    public PLAYER_ID = 'no-player-id';
    public isLoading;
    public userProfile;
    public userPhone;
    public userAccounts;
    public modalOption;
    public paymentType;
    public billsPaymentData;
    public billsPaymentsMode;
    public billsPaymentsService;
    public airtimeData;
    public utilitiesData;
    public cableTvData;
    public internetServicesData;
    public bettingBiller;
    public paymentObj = {};
    public paymentInfo = {};
    public previousRoute;
    public action;
    public action_;
    public reloadAccount;
    public paymentDetails;
    public customAlertView;
    public accounts;
    public fromValidatePage;
    public beneficiary;
    public isModalActive;
    public tranType;
    public transferBeneficiaries;
    public walletBeneficiaries;
    public isBiometericsAvailable;
    public biometricEnrolled;
    public fromLandingPage;
    public firstlaunch;
    public walletBeneficiary;
    public walletBank;
    public walletBanks;
    public dashboardEventsSubscription;
    public resetWalletPinData;
    public travel = {
        cityPlaceholder: null,
        departureCity: [],
        arrivalCity: [],
        searchParameters: {
            flightType: null,
            departureDate: [],
            arrivalDate: [],
            cabin: null
        },
        searchResult: null,
        index: null,
        roundtrip: false,
        selectedItinerary: null,
        bookingDetails: null,
        paymentComplete: false,
        pnrResponse: null,
        bookingInfoType: null,
        passengers: {
            adult: null,
            child: null,
            infant: null
        },
        countries: null,
        ticketDetails: null,
        ascending: null,
        searchResultImmutable: null,
        arilinesChecked: [],
        listAirlines: null,
        pageCount: null,
        truncated: {
            allItineraries: null,
            length: null,
            max: null,
            view: null
        },
    }

    public wallet = {
        modalView: null,
        pageView: null,
        refreshWallet: null,
        walletBalance: null,
        refreshDashboardWallet: null,
        transactionData: null,
        walletData: null,
        url: null,
    };
    public identityType;
    public userChanged;
    public fidelityPhoneNumber;
    public firstPayment;

    public investLimit;


    resetTravel = () => {
        this.travel = {
            cityPlaceholder: null,
            departureCity: [],
            arrivalCity: [],
            searchParameters: {
                flightType: null,
                departureDate: [],
                arrivalDate: [],
                cabin: null
            },
            searchResult: null,
            index: null,
            roundtrip: false,
            selectedItinerary: null,
            bookingDetails: null,
            paymentComplete: false,
            pnrResponse: null,
            bookingInfoType: null,
            passengers: {
                adult: null,
                child: null,
                infant: null
            },
            countries: null,
            ticketDetails: null,
            ascending: null,
            searchResultImmutable: null,
            arilinesChecked: [],
            listAirlines: null,
            pageCount: null,
            truncated: {
                allItineraries: null,
                length: null,
                max: null,
                view: null
            }
        }
    }

    public atmLocations;

    public ATMLOCATIONS = [
        {
            img: '../../../assets/icon/atm1.svg',
            name: 'Fidelity ATM Fadeyi',
            distance: '1.2 miles. 1hr 5mins drive',
            address: 'No 28, Fadeyi-Ikorodu Road, Lagos',
            rate: {
                rating: 5,
                rateCount: 5
            }
        },
        {
            img: '../../../assets/icon/atm2.svg',
            name: 'Fidelity ATM Tejuosho',
            distance: '5.2 miles. 30mins drive',
            address: 'No 28, Fadeyi-Ikorodu Road, Lagos',
            rate: {
                rating: 5,
                rateCount: 3
            }
        },
        {
            img: '../../../assets/icon/atm3.svg',
            name: 'Fidelity ATM Aguda',
            distance: '10 miles. 80mins drive',
            address: 'No 28, Fadeyi-Ikorodu Road, Lagos',
            rate: {
                rating: 5,
                rateCount: 5
            }
        },
        {
            img: '../../../assets/icon/atm1.svg',
            name: 'Fidelity ATM Yaba',
            distance: '6.2 miles. 40mins drive',
            address: 'No 28, Fadeyi-Ikorodu Road, Lagos',
            rate: {
                rating: 5,
                rateCount: 4
            }
        },
        {
            img: '../../../assets/icon/atm2.svg',
            name: 'Fidelity ATM Ilupeju',
            distance: '1.2 miles. 50mins drive',
            address: 'No 28, Fadeyi-Ikorodu Road, Lagos',
            rate: {
                rating: 5,
                rateCount: 3
            }
        }
    ]

    public location;

    resetBills = () => {
        this.TOKEN = null;
        this.userProfile = null;
        this.userPhone = null;
        this.userAccounts = null;
        this.modalOption = null;
        this.paymentType = null;
        this.billsPaymentData = null;
        this.billsPaymentsMode = null;
        this.billsPaymentsService = null;
        this.airtimeData = null;
        this.utilitiesData = null;
        this.cableTvData = null;
        this.internetServicesData = null;
        this.paymentObj = null;
        this.paymentInfo = null;
        this.previousRoute = null;
        this.action = null;
        this.paymentDetails = null;
    }

}