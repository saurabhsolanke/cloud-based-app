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

  
  all_orders_data;
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
  singleOrder: any;
  id: any;
  addEditorderForm1: any;
  individual_product: any;
  user_address: any;
  is_negotiation: boolean;
  negotiation_price: number;
  user_contact_no: Number;
  edit_order_id: any;
  current_order_id: any;
  status: any;
  isshopowner: boolean;

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
      // name: ["", Validators.required],
      // uploadPhoto: ["", Validators.required],
      // productDesc: ["", Validators.required],
      // mrp: ["", Validators.required],
      contact: ["", Validators.required],
      status: ["", Validators.required],
    });
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

  // Search() {
  //   if (this.name == "") {
  //     this.ngOnInit();
  //   } else {
  //     this.all_orders_data = this.all_orders_data.filter(
  //       (res: { name: string }) => {
  //         return res.name
  //           .toLocaleLowerCase()
  //           .match(this.name.toLocaleLowerCase());
  //       }
  //     );
  //   }
  // }

  // key: string = "id";
  // reverse: boolean = false;
  // sort(key: string) {
  //   this.key = key;
  //   this.reverse = !this.reverse;
  // }

  // addProductPopup() {
  //   this.add_product = true;
  //   this.edit_product = false;
  //   this.popup_header = "Add New Product";
  //   this.addEditProductForm.reset();
  // }

  newFunction() {
    return "hello";
  }

  editProductPopup1(order) {
    this.current_order_id = order.id;
    this.user_contact_no = order.contact;
    this.status = order.status;
    const saurabh = this.addEditProductForm1.value;
    console.log(saurabh);
    this.newFunction();
    this.popup_header = "Edit Product : " + order.id;
    this;
    // this.addEditProductForm1.reset();
    // this.customerService.singleOrder(id).subscribe((data) => {
    //   console.log("edit order id :-",id);

    //   this.singleOrder = data;
    //   console.log("single order data",data);
    //   this.edit_order_id = data.id;
    //   console.log("single_data", this.singleOrder)
    //   this.addEditProductForm1.setValue({
    //     status: this.singleOrder.status,
    //   });
    // });
  }
  editProductPopup(order) {
    this.current_order_id = order.id;
    this.user_contact_no = order.contact;
    this.status = order.status;
    this.newFunction();
    this.popup_header = "Edit Product : " + order.id;
    this;
    this.addEditProductForm1.reset();
    this.customerService.singleOrder(this.id).subscribe((data) => {
      console.log("edit order id :-", this.id);
      this.singleOrder = data;
      console.log("single order data", data);
      this.edit_order_id = data.id;
      console.log("single_data", this.singleOrder);
      this.addEditProductForm1.setValue({
        status: this.singleOrder.status,
      });
    });
  }

  updateProduct() {
    this.order_data = this.addEditorderForm1.value;
    console.log(this.order_data);
    this.order_dto = {
      id: this.id,
      userId: this.user_session_id,
      status: this.status,
      // sellerId: 2, //Now it is hard coded, we are not implimented multi farmer functionlity
      product: {
        id: this.order_data.id,
        name: this.order_data.name,
        uploadPhoto: this.order_data.uploadPhoto,
        productDesc: this.order_data.productDesc,
        mrp: this.order_data.mrp,
        dp: this.order_data.dp,
        status: this.order_data.status,
        addedBy: this.order_data.addedBy,
        user_session_id: this.order_data.user_session_id,
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
      is_negotiation: this.is_negotiation,
      negotiation_price: this.negotiation_price,
      contact: this.user_contact_no,
      dateTime: new Date().toLocaleDateString(),
    };
    console.log("Place order dto", this.order_dto);
    console.log(this.edit_order_id);

    // return;
    this.customerService
      .updateOrder1(this.edit_order_id, this.order_dto)
      .subscribe((data) => {
        jQuery("#addEditProductModal").modal("toggle");
        // console.log("Order placed successfully", data);
        alert("Order edited successfully");
        // this.router.navigateByUrl("/merchant/merchant-orders");
        this.router.navigateByUrl("/farmer/purchaserequest");
      });
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

  // user_session_id;
  // single_product_id: number;
  // user_id: number;
  // individual_product: Product;
  // user_detail: User;
  // user_address;
  // user_contact_no: Number;
  // order_dto: Order;
  // id: number;
  // status = "";
  // is_negotiation: boolean;
  // negotiation_price: number;
  // addEditProductForm: any;
  // addEditorderForm: any;
  // order_data: any;
  // single_order_data: any;
  // edit_order_id: any;
  // EditorderForm: FormGroup;
  // orders: any = [];
  // editorder;
  // all_order_data: any;
  // name: string;

  // constructor(
  //   private formBuilder: FormBuilder,
  //   private router: Router,
  //   private product_service: ProductService,
  //   private customerService: CustomerService
  // ) {}

  // ngOnInit() {
  //   this.user_session_id = sessionStorage.getItem("user_session_id");
  //   this.getOrder();
  //   this.EditorderForm = this.formBuilder.group({
  //     status: ["", Validators.required],
  //   });
  // }

  // getOrder() {
  //   this.product_service.getAllorders().subscribe((data) => {
  //     this.orders = data.filter((order) => {
  //       return order.product.user_session_id == this.user_session_id;
  //     });
  //   });
  // }

  // Search() {
  //   if (this.name == "") {
  //     this.ngOnInit();
  //   } else {
  //     this.orders.name = this.orders.name.filter(
  //       (res: { name: string }) => {
  //         return res.name
  //           .toLocaleLowerCase()
  //           .match(this.name.toLocaleLowerCase());
  //       }
  //     );
  //   }
  // }

  // key: string = "id";
  // reverse: boolean = false;
  // sort(key: string) {
  //   this.key = key;
  //   this.reverse = !this.reverse;
  // }

  // edit(id) {
  //   this.customerService.single_order_data(id).subscribe((data) => {
  //     this.single_order_data = data;
  //     this.edit_order_id = data.id;
  //     // console.log("single_product_data", this.single_product_data)
  //     this.EditorderForm.setValue({
  //       status: this.single_order_data.status
  //     });
  //   });
  // }

  // accept() {
  //   console.log(this.order_data);
  //   this.order_data = this.addEditorderForm.value;
  //   this.order_dto = {
  //     id: this.id,
  //     userId: this.user_id,
  //     status: "accept",
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
  //     is_negotiation: this.is_negotiation,
  //     negotiation_price: this.negotiation_price,
  //     contact: this.user_contact_no,
  //     dateTime: new Date().toLocaleDateString(),
  //   };
  //   // console.log("Place order dto", this.order_dto);
  //   this.customerService.updateOrder(this.edit_order_id,this.order_dto).subscribe((data) => {
  //     // console.log("Order placed successfully", data);
  //     alert("Order edited successfully");
  //     // this.router.navigateByUrl("/merchant/merchant-orders");
  //     this.router.navigateByUrl("/farmer/purchaserequest");
  //   });
  // }

  // deleteProduct(id) {
  //   let r = confirm("Do you want to delete the product ID: " + id + "?");
  //   if (r == true) {
  //     this.customerService.deleteorder(id).subscribe(
  //       (data) => {
  //         console.log("deleted successfully", data);
  //         this.getOrder();
  //       },
  //       (err) => {
  //         alert("Some Error Occured");
  //       }
  //     );
  //   } else {
  //     alert("You pressed Cancel!");
  //   }
  // }
}
