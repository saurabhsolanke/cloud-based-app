import { Component, OnInit } from "@angular/core";
import { FormBuilder } from "@angular/forms";
import { Router } from "@angular/router";
import { ProductService } from "../shared/services/product.service";
import { HostListener } from "@angular/core";
declare var Razorpay: any;

@Component({
  selector: "app-merchant-orders",
  templateUrl: "./merchant-orders.component.html",
  styleUrls: ["./merchant-orders.component.scss"],
})
export class MerchantOrdersComponent implements OnInit {
  user_role: string;
  orders = [];
  userId: any;
  user_session_id: string;
  loggedinname: string;
  dp: string;
  message: any = "Not yet stared";
  paymentId = "";
  error = "";
  title = "angular-razorpay-intergration";
  options = {
    key: "rzp_test_eyXlHRAzLZmgqa",
    amount: "200",
    name: "Krushi kendra",
    description: "Web Development",
    image: "",
    order_id: "",
    handler: function (response: any) {
      var event = new CustomEvent("payment.success", {
        detail: response,
        bubbles: true,
        cancelable: true,
      });
      window.dispatchEvent(event);
    },
    prefill: {
      name: "",
      email: "",
      contact: "",
    },
    notes: {
      address: "",
    },
    theme: {
      color: "#3399cc",
    },
  };
  orderprice: any;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private product_service: ProductService
  ) {}

  ngOnInit() {
    this.user_session_id = sessionStorage.getItem("user_session_id");
    this.loggedinname = sessionStorage.getItem("name");
    console.log(this.loggedinname);
    console.log(this.user_session_id);
    this.getOrder();
  }

  paynow() {
    this.paymentId = "";
    this.error = "";
    this.options.amount = '3000'; //paise
    this.options.prefill.name = "Abcd";
    this.options.prefill.email = "abcd@gmail.com";
    this.options.prefill.contact = "9999999999";
    var rzp1 = new Razorpay(this.options);
    rzp1.open();
    rzp1.on("payment.failed", function (response: any) {
      //this.message = "Payment Failed";
      // Todo - store this information in the server
      console.log(response.error.code);
      console.log(response.error.description);
      console.log(response.error.source);
      console.log(response.error.step);
      console.log(response.error.reason);
      console.log(response.error.metadata.order_id);
      console.log(response.error.metadata.payment_id);
      //this.error = response.error.reason;
    });
  }
  @HostListener("window:payment.success", ["$event"])
  onPaymentSuccess(event: any): void {
    this.message = "Success Payment";
  }

  getOrder() {
    this.product_service.getAllorders().subscribe((data) => {
      this.orders = data;
      this.orderprice = data.filter(
        (order) => order.product.dp 
        );
        console.log(this.orderprice);
    });
  }
}
