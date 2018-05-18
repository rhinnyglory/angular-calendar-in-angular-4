import { Component, OnInit } from '@angular/core';
declare var Razorpay: any;

@Component({
  selector: 'app-razor-pay',
  templateUrl: './razor-pay.component.html',
  styleUrls: ['./razor-pay.component.css']
})
export class RazorPayComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  openCheckout(): void {
    const options = {
      'key': 'rzp_test_7OEjZYyDeWaoBi',
      'amount': '2000', // 2000 paise = INR 20
      'name': 'rhinny',
      'description': 'Purchase Description',
      'image': 'logo.png',
      'handler': function (response) {
        alert(response.razorpay_payment_id);
      },
      'prefill': {
        'name': localStorage.getItem('name'),
        'email': localStorage.getItem('email')
      },
      'notes': {
        'address': 'Hello World'
      },
      'theme': {
        'color': '#F37254'
      }
    };
    const rzp = new Razorpay(options);
    rzp.open();
  }
}
