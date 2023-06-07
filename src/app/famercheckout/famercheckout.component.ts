import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { Product, User, Order } from "../core/models/object-model";
import { CustomerService } from "../customer/services/customer.service";
@Component({
  selector: "app-famercheckout",
  templateUrl: "./famercheckout.component.html",
  styleUrls: ["./famercheckout.component.scss"],
})
export class FamercheckoutComponent implements OnInit {
  single_product_id: number;
  user_id: number;
  individual_product: Product;
  user_detail: User;
  user_address;
  user_contact_no: Number;
  order_dto: Order;
  id: number;
  status = "Ordered";
  is_negotiation: boolean;
  negotiation_price: number;
  isshopowner: boolean;

  constructor(
    private customerService: CustomerService,
    private router: Router
  ) {}

  ngOnInit() {
    this.customerService.currentProduct.subscribe(
      (product) => (this.single_product_id = product)
    );
    this.user_id = Number(sessionStorage.getItem("user_session_id"));
    this.productDetail(this.single_product_id);
    this.userAddress(this.user_id);
  }

  productDetail(single_product_id) {
    this.customerService.individualProduct(single_product_id).subscribe(
      (data) => {
        this.individual_product = data;
        // console.log("One Product", this.individual_product);
      },
      (error) => {
        console.log("My error", error);
      }
    );
  }
  userAddress(user_id) {
    this.customerService.userDetail(user_id).subscribe(
      (data) => {
        // this.user_detail = data.address;
        this.user_address = data.address;
        this.user_contact_no = data.mobNumber;
      },
      (error) => {
        console.log("My error", error);
      }
    );
  }

  placeOrder() {
    this.order_dto = {
      orderid: this.id,
      userId: this.user_id,
      // sellerId: 2, //Now it is hard coded, we are not implimented multi farmer functionlity
      product: {
        id: this.individual_product.id,
        name: this.individual_product.name,
        uploadPhoto: this.individual_product.uploadPhoto,
        productDesc: this.individual_product.productDesc,
        mrp: this.individual_product.mrp,
        dp: this.individual_product.dp,
        status: this.individual_product.status,
        addedBy: this.individual_product.addedBy,
        user_session_id: this.individual_product.user_session_id,
        isshopowner: this.isshopowner,
      },
      deliveryAddress: {
        id: 0,
        addLine1: this.user_address.addLine1,
        addLine2: this.user_address.addLine2,
        city: this.user_address.city,
        state: this.user_address.state,
        zipCode: Number(this.user_address.zipCode),
      },
      status: this.status,
      is_negotiation: this.is_negotiation,
      negotiation_price: this.negotiation_price,
      contact: this.user_contact_no,
      dateTime: new Date().toLocaleDateString(),
    };
    // console.log("Place order dto", this.order_dto);
    this.customerService.insertNewOrder(this.order_dto).subscribe((data) => {
      // console.log("Order placed successfully", data);
      alert("Order places successfully");
      // this.router.navigateByUrl("/merchant/merchant-orders");
      this.router.navigateByUrl("/farmer/orders");
    });
  }

  negotiatedOrder() {
    this.order_dto = {
      orderid: this.id,
      userId: this.user_id,
      is_negotiation: true,
      negotiation_price: this.negotiation_price,
      // sellerId: 2, //Now it is hard coded, we are not implimented multi farmer functionlity
      product: {
        id: this.individual_product.id,
        name: this.individual_product.name,
        uploadPhoto: this.individual_product.uploadPhoto,
        productDesc: this.individual_product.productDesc,
        mrp: this.individual_product.mrp,
        dp: this.individual_product.dp,
        status: this.individual_product.status,
        addedBy: this.individual_product.addedBy,
        user_session_id: this.individual_product.user_session_id,
        isshopowner: this.isshopowner,
      },
      deliveryAddress: {
        id: 0,
        addLine1: this.user_address.addLine1,
        addLine2: this.user_address.addLine2,
        city: this.user_address.city,
        state: this.user_address.state,
        zipCode: Number(this.user_address.zipCode),
      },
      status: this.status,
      contact: this.user_contact_no,
      dateTime: new Date().toLocaleDateString(),
    };
    // console.log("Place order dto", this.order_dto);
    this.customerService.insertNewOrder(this.order_dto).subscribe(
      (data) => {
        // console.log("Order placed successfully", data);
        alert("Order places successfully");
        // this.router.navigateByUrl("/merchant/merchant-orders");
        this.router.navigateByUrl("/farmer/purchaserequest");
      },
      (err) => {
        alert("Some Error Occured");
      }
    );
  }
}
