import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { JSEncrypt } from 'jsencrypt';
import { sha256 } from 'js-sha256';
// import * as sha256 from 'fast-sha256';
import * as CryptoJS from 'crypto-js/sha256';
import * as utf8 from 'utf8';


@Injectable({
  providedIn: 'root'
})
export class AuthenticateService {

  constructor(private http: HttpClient) { }

  ngOnInit() {

  }

  authenticate(username: string, password: string) {
    let passwordHash = sha256(password);

    console.log(passwordHash.toString());

    let encryptedPassword: string = encodeURIComponent(passwordHash);

    let url = 'https://ecogreen20210725013243.azurewebsites.net/User/Login';

    let headers = {
      'accept': 'text/plain',
      'Content-Type': 'application/json'
    };

    let body = {
      'username': username,
      'password': passwordHash
    }

    console.log(body);

    return this.http.post<any>(url, body, { headers });
  }
}
