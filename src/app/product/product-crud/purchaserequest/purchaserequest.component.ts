import { Component, OnInit } from "@angular/core";
import { FormBuilder } from "@angular/forms";
import { Router } from "@angular/router";
import { CustomerService } from "src/app/customer/services/customer.service";
import { ProductService } from "src/app/shared/services/product.service";
import { Product, User, Order } from "../../../core/models/object-model";

@Component({
  selector: "app-purchaserequest",
  templateUrl: "./purchaserequest.component.html",
  styleUrls: ["./purchaserequest.component.scss"],
})
export class PurchaserequestComponent implements OnInit {
  user_session_id;
  status = "";

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private product_service: ProductService,
    private customerService: CustomerService,
  ) {}

  orders:any [] = [];

  ngOnInit() {
    this.user_session_id = sessionStorage.getItem("user_session_id");
    this.getOrder();
  }

  getOrder() {
    this.product_service.getAllorders().subscribe((data) => {
      this.orders = data.filter((order) => {
        return order.product.user_session_id == this.user_session_id;
      });
    });
  }

  
  // approveStatus() {
  //   const orderId = this.order.id;
  //   const updatedStatus = 'approved';

  //   this.product_service.updateStatus(orderId, updatedStatus)
  //     .subscribe(
  //       response => {
  //         console.log('Status updated successfully:', response);
  //         this.order.status = updatedStatus;
  //       },
  //       error => {
  //         console.error('Error updating status:', error);
  //       }
  //     );
  // }
  accept(){
    
  }
  // accept() {
  //   this.status = "accept";
  //   console.log("accepted request");
  //   this.order_dto = {
  //     id: this.id,
  //     userId: this.user_id,
  //     // sellerId: 2, //Now it is hard coded, we are not implimented multi farmer functionlity
  //     product: {
  //       id: this.individual_product.id,
  //       name: this.individual_product.name,
  //       uploadPhoto: this.individual_product.uploadPhoto,
  //       productDesc: this.individual_product.productDesc,
  //       mrp: this.individual_product.mrp,
  //       dp: this.individual_product.dp,
  //       status: this.individual_product.status,
  //       addedBy: this.individual_product.addedBy,
  //       user_session_id: this.individual_product.user_session_id,
  //     },
  //     deliveryAddress: {
  //       id: 0,
  //       addLine1: this.user_address.addLine1,
  //       addLine2: this.user_address.addLine2,
  //       city: this.user_address.city,
  //       state: this.user_address.state,
  //       zipCode: Number(this.user_address.zipCode),
  //     },
  //     status: this.status,
  //     is_negotiation: this.is_negotiation,
  //     negotiation_price: this.negotiation_price,
  //     contact: this.user_contact_no,
  //     dateTime: new Date().toLocaleDateString(),
  //   };
  //   // console.log("Place order dto", this.order_dto);
  //   this.customerService.insertNewOrder(this.order_dto).subscribe(
  //     (data) => {
  //       // console.log("Order placed successfully", data);
  //       alert("Order places successfully");
  //       // this.router.navigateByUrl("/merchant/merchant-orders");
  //       this.router.navigateByUrl("/farmer/purchaserequest");
  //     }
  //   )
  // }
}
