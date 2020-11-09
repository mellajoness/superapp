
import { Injectable } from '@angular/core';
import * as CryptoJS from 'crypto-js';

@Injectable()

export class Encryption {

    protected salt;

    constructor() {
        this.salt = {
            SHA512_Flight: 'N0wThisH@pNsPlEas3B3$afe',
            AES256_Flight_key: 'bjw638bxyn7vdbw8',
            AES256_Flight_iv: 'HR$2pIjHR$2pIj12',
            AES256_CBC_key: 'civwydt7vy87hsd2',
            AES256_CBC_iv: 'HR$2pIjHR$2pIj12',
            AES256_TRANSFERS_key: 'bywospbe6k2lzy8I',
            AES256_TRANSFERS_iv: 'HR$2pIjHR$2pIj12',
        };

    }

    hash_SHA512(start, end?) {
        try {
            const value = start.toString() + this.salt.SHA512_Flight + end;
            const encryptedValue = CryptoJS.SHA512(value);
            return encryptedValue.toString();
        } catch (e) {
            console.log(e);
        }
    }

    hash_SHA512Bills(val) {
        try {
            const value = val;
            const encryptedValue = CryptoJS.SHA512(value);
            return encryptedValue.toString();
        } catch (e) {
            console.log(e);
        }
    }

    encrypt_AES256_CBC(val) {
        try {
            const value = val;
            const encryptedValue = CryptoJS.AES.encrypt(value, CryptoJS.enc.Utf8.parse(this.salt.AES256_CBC_key), {
                iv: CryptoJS.enc.Utf8.parse(this.salt.AES256_CBC_iv),
                mode: CryptoJS.mode.CBC
            });
            return encryptedValue.toString();
            
        } catch (e) {
            console.log(e);
        }
    }

    encrypt_AES256_TRANSFERS(val) {
        try {
            const value = val;
            const encryptedValue = CryptoJS.AES.encrypt(value, CryptoJS.enc.Utf8.parse(this.salt.AES256_TRANSFERS_key), {
                iv: CryptoJS.enc.Utf8.parse(this.salt.AES256_TRANSFERS_iv),
                mode: CryptoJS.mode.CBC
            });
            return encryptedValue.toString();
            
        } catch (e) {
            console.log(e);
        }
    }

    encrypt_AES256_Flight(val) {
        try {
            const value = val;
            const encryptedValue = CryptoJS.AES.encrypt(value, CryptoJS.enc.Utf8.parse(this.salt.AES256_Flight_key), {
                iv: CryptoJS.enc.Utf8.parse(this.salt.AES256_Flight_iv),
                mode: CryptoJS.mode.CBC
            });
            return encryptedValue.toString();
            
        } catch (e) {
            console.log(e);
        }
    }

    hash_SHA512_Login(start) {
        try {
            const value = start.toString();
            const encryptedValue = CryptoJS.SHA512(value);
            return encryptedValue.toString();
        } catch (e) {
            console.log(e);
        }
    }
}
