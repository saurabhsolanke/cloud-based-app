import { ThrowStmt } from "@angular/compiler";
import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { CustomerService } from "src/app/customer/services/customer.service";
import { ProductService } from "src/app/shared/services/product.service";
import {
  Product,
  User,
  Order,
  Address,
} from "../../../core/models/object-model";
declare var jQuery: any;

@Component({
  selector: "app-purchaserequest",
  templateUrl: "./purchaserequest.component.html",
  styleUrls: ["./purchaserequest.component.scss"],
})
export class PurchaserequestComponent implements OnInit {
  addEditProductForm1: FormGroup;
  orders;
  popup_header: string;

  order_data;
  order_dto: Order;

  single_product_data;
  edit_id;
  user_session_id: any;
  name: any;
  loggedinname = "";
  user_role = "";
  singleOrder;
  id: any;
  // addEditorderForm1: any;
  individual_product: Product;
  user_address: any;
  is_negotiation: boolean;
  negotiation_price: number;
  user_contact_no: Number;
  edit_order_id: any;
  current_order_id: any;
  status: any;
  isshopowner: boolean;
  orderId: any;
  editing: any;
  edit: boolean = false;
  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private product_service: ProductService,
    private customerService: CustomerService
  ) {}

  ngOnInit() {
    
    this.user_role = sessionStorage.getItem("role");
    this.loggedinname = sessionStorage.getItem("name");
    this.user_session_id = sessionStorage.getItem("user_session_id");
    this.addEditProductForm1 = this.formBuilder.group({
      orderid: [""],
      name: [""],
      uploadPhoto: [""],
      productDesc: [""],
      mrp: [""],
      dp: [""],
      addedBy: [""],
      contact: [""],
      status: [""],
      dateTime: [""],
      addLine1: [""],
      addLine2: [""],
      city: [""],
      state: [""],
      zipCode: [""],
    });
    console.log(this.order_data);
    this.getOrders();
    // this.getmyProduct();
  }
  get rf() {
    return this.addEditProductForm1.controls;
  }
  getOrders() {
    this.product_service.getAllorders().subscribe((data) => {
      this.orders = data.filter((order) => {
        console.log(order);
        return order.product.user_session_id == this.user_session_id;
      });
    });
  }

  editProductPopup(id) {
    // this.current_order_id = Order.id;
    // this.user_contact_no = order.contact;
    // this.status = order.status;
    this.edit = true;
    this.popup_header = "Update Order Status : " + id;
    this.addEditProductForm1.reset();
    this.customerService.singleOrder(id).subscribe((data) => {
      this.singleOrder = data;
      this.edit_order_id = data.id;
      console.log("single order", this.singleOrder);
      this.addEditProductForm1.setValue({
        orderid: this.singleOrder.id || "",
        name: this.singleOrder.product.name || "",
        uploadPhoto: this.singleOrder.product.uploadPhoto || "",
        productDesc: this.singleOrder.product.productDesc || "",
        mrp: this.singleOrder.product.mrp || "",
        dp: this.singleOrder.product.dp || "",
        addedBy: this.singleOrder.product.addedBy || "",
        addLine1: this.singleOrder.deliveryAddress.addLine1 || "",
        addLine2: this.singleOrder.deliveryAddress.addLine2 || "",
        city: this.singleOrder.deliveryAddress.city || "",
        state: this.singleOrder.deliveryAddress.state || "",
        zipCode: this.singleOrder.deliveryAddress.zipCode || "",
        status: this.singleOrder.status || "",
        contact: this.singleOrder.contact || "",
        dateTime: this.singleOrder.dateTime || "",
      });
    });
  }

  // CHAT GPT

  updateProduct(): void {
    if (this.addEditProductForm1.valid) {
      this.order_data = this.addEditProductForm1.value;
      this.order_dto = {
        // const updatedOrder = {
        orderid: this.singleOrder.id,
        userId: this.order_data.user_id,
        product: {
          // id: this.individual_product.id,
          id: 0,
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
        is_negotiation: this.order_data.is_negotiation,
        negotiation_price: this.order_data.negotiation_price,
        contact: this.order_data.user_contact_no,
        dateTime: this.order_data.dateTime,
        status: this.order_data.status,
      };
      this.customerService
        .updateorder(this.edit_order_id, this.order_dto)
        .subscribe((data) => {
          console.log(data);

          jQuery("#addEditProductModal").modal("toggle");
          alert("Order edited successfully");
          this.router.navigateByUrl("/farmer/purchaserequest");
        });

      // Call the update method in your service to update the order
      // this.customerService.updateOrder(updatedOrder).subscribe((response) => {
      //   console.log("Order updated successfully", response);
      // });
    }
  }

  deleteProduct(id) {
    let r = confirm("Do you want to delete the product ID: " + id + "?");
    if (r == true) {
      this.customerService.deleteorder(id).subscribe(
        (data) => {
          console.log("deleted successfully", data);
          this.getOrders();
        },
        (err) => {
          alert("Some Error Occured");
        }
      );
    } else {
      alert("You pressed Cancel!");
    }
  }

}
