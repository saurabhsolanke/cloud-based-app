import { Component, OnInit } from "@angular/core";
import { FormBuilder } from "@angular/forms";
import { Router } from "@angular/router";
import { ProductService } from "../shared/services/product.service";

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

  getOrder() {
    this.product_service.getAllorders().subscribe((data) => {
      this.orders = data;
      // this.orders = data.filter(
      //   (order) => order.product.user_session_id === this.user_session_id
      // );
    });
  }
}
