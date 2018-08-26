import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {
  contactForm: FormGroup;
  latitude = 51.678418;
  longtitude = 7.809007;
  locationChosen = false;

  ngOnInit() {
    this.contactForm = new FormGroup({
      'name': new FormControl(null, Validators.required),
      'phone': new FormControl(null, Validators.required),
      'email': new FormControl(null, [Validators.required, Validators.email]),
      'message': new FormControl(null, Validators.required),
    });
  }

  onSubmit() {
    console.log(this.contactForm);
    // this.contactForm.reset();
  }

  onChosedLocation(event) {
    this.latitude = event.coords.lat;
    this.longtitude = event.coords.lng;
    this.locationChosen = true;
  }
}
