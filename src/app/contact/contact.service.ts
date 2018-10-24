import { Injectable } from '@angular/core';
import {environment} from '../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {FormGroup} from '@angular/forms';

const BACKEND_URL = environment.apiUrl + '/contact';

@Injectable({
  providedIn: 'root'
})
export class ContactService {

  constructor(private http: HttpClient) {}

  createContact(contactForm: FormGroup) {
    const contactData = {
      name: contactForm.value.name,
      phone: contactForm.value.phone,
      email: contactForm.value.email,
      message: contactForm.value.message,
      assetId: contactForm.value.assetId
    };

    return this.http.post<{message: string}>(BACKEND_URL, contactData);
  }
}
