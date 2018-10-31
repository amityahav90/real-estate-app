import {Component, HostListener, Input, OnInit, ViewChild} from '@angular/core';
import {FormControl, FormGroup, FormGroupDirective, Validators} from '@angular/forms';
import {Asset} from '../../assets/asset.model';
import {ContactService} from '../contact.service';
import {ModalDirective} from 'angular-bootstrap-md';

@Component({
  selector: 'app-contact-form',
  templateUrl: './contact-form.component.html',
  styleUrls: ['./contact-form.component.css']
})
export class ContactFormComponent implements OnInit {
  contactForm: FormGroup;
  disabledSubmitButton = true;
  @Input() asset: Asset;
  @ViewChild('successModal') successModal: ModalDirective;

  @HostListener('input') oninput() {
    if (this.contactForm.valid) {
      this.disabledSubmitButton = false;
    }
  }

  constructor(private contactService: ContactService) {}

  ngOnInit() {
    this.contactForm = new FormGroup({
      'name': new FormControl(
        null,
        {validators: [Validators.required]}
        ),
      'phone': new FormControl(
        null,
        {validators: [Validators.required, Validators.pattern(/^\d{10}$/)]}),
      'email': new FormControl(
        null,
        {validators: [Validators.required, Validators.email]}
        ),
      'message': new FormControl(
        null
      )
    });
  }

  onSubmit(formDirective: FormGroupDirective) {
    if (this.asset) {
      this.contactForm.addControl('assetId', new FormControl(this.asset._id));
    }
    this.contactService.createMessage(this.contactForm)
      .subscribe(result => {
        if (result.message === 'success') {
          this.successModal.show();
          this.successModal.onHide.subscribe(res => {
            formDirective.resetForm();
          });
        }
      });
  }
}
