import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ContactsService } from '../contacts/contacts.service';
import { phoneTypeValues, addressTypeValues } from '../contacts/contact.model';
import { restrictedWords } from '../validators/restricted-words-validator';

@Component({
  templateUrl: './edit-contact.component.html',
  styleUrls: ['./edit-contact.component.css']
})
export class EditContactComponent implements OnInit {
  phoneTypes = phoneTypeValues;
  addressTypes = addressTypeValues;
  
  contactForm = this.fb.nonNullable.group({
    id:'',
    icon: '',
    personal: false,
    firstName:['', [Validators.required, Validators.minLength(3)]],
    lastName:'',
    dateOfBirth: <Date | null>null,
    favoritesRanking: <number | null>null,
    phones: this.fb.array([this.createPhoneGroup()]),
    address: this.fb.nonNullable.group({
      streetAddress:['', Validators.required],
      city:['', Validators.required],
      state:['', Validators.required],
      postalCode:['', Validators.required],
      addressType:['', Validators.required],
    }),
    notes: ['', restrictedWords(['foo', 'bar'])],
});

// This was the original, but was simplified with the above code. 
// contactForm = new FormGroup({
//   id: new FormControl(),
//   firstName: new FormControl('', Validators.required),
//   lastName: new FormControl(),
//   dateOfBirth: new FormControl(),
//   favoritesRanking: new FormControl(),
//   phone: new FormGroup({
//     phoneNumber: new FormControl(),
//     phoneType: new FormControl(),
//   }),
//   address: new FormGroup({
//     streetAddress: new FormControl(),
//     city: new FormControl(),
//     state: new FormControl(),
//     postalCode: new FormControl(),
//     addressType: new FormControl(),
//   })

  constructor(private route: ActivatedRoute,
     private contactsService: ContactsService,
     private router: Router,
     private fb: FormBuilder) { }

  ngOnInit() {
    const contactId = this.route.snapshot.params['id'];
    if (!contactId) return

    this.contactsService.getContact(contactId).subscribe((contact) => {
      if (!contact) return;

        // The lines below allow us to only update part of the contact form with 'patchValue'

        // const names = { firstName: contact.firstName, lastName: contact.lastName };
        // this.contactForm.patchValue(names);
      for(let i = 1; i < contact.phones.length; i ++) {
        this.contactForm.controls.phones.push(this.createPhoneGroup())
      }
        this.contactForm.setValue(contact); // This one line replaces all of the code below.

        // this.contactForm.controls.id.setValue(contact.id);
        // this.contactForm.controls.firstName.setValue(contact.firstName);
        // this.contactForm.controls.lastName.setValue(contact.lastName);
        // this.contactForm.controls.dateOfBirth.setValue(contact.dateOfBirth);
        // this.contactForm.controls.favoritesRanking.setValue(contact.favoritesRanking);
        // this.contactForm.controls.phone.controls.phoneNumber.setValue(contact.phone.phoneNumber);
        // this.contactForm.controls.phone.controls.phoneType.setValue(contact.phone.phoneType);
        // this.contactForm.controls.address.controls.streetAddress.setValue(contact.address.streetAddress);
        // this.contactForm.controls.address.controls.city.setValue(contact.address.city);
        // this.contactForm.controls.address.controls.state.setValue(contact.address.state);
        // this.contactForm.controls.address.controls.postalCode.setValue(contact.address.postalCode);
        // this.contactForm.controls.address.controls.addressType.setValue(contact.address.addressType);
    });
  }

  createPhoneGroup() {
    return this.fb.nonNullable.group({
      phoneNumber:'',
      phoneType:'',
    })
  }

  addPhone() {
    this.contactForm.controls.phones.push(this.createPhoneGroup());
  }

  get firstName() {
    return this.contactForm.controls.firstName; // This allows us to access firstName in our html w/o having to type 'contactFrom.controls.firstName'. this is called a 'getter'
  }

  get notes() {
    return this.contactForm.controls.notes; 
  }

  saveContact() {
    this.contactsService.saveContact(this.contactForm.getRawValue()).subscribe({
      next: () => this.router.navigate(['/contacts'])
    });
  }
}
