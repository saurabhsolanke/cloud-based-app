import { HttpClient } from "@angular/common/http";
import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { ProductService } from "src/app/shared/services/product.service";

@Component({
  selector: "app-cart",
  templateUrl: "./cart.component.html",
  styleUrls: ["./cart.component.scss"],
})
export class CartComponent implements OnInit {
  cart: any[] = [];
  total = 0;
  count = 0;

  my_product_data: any = [];

  constructor(
    private product_service: ProductService,
    private http: HttpClient,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.product_service.cartitems().subscribe((Res: any) => {
      console.log(Res);
      this.cart = Res;
      for (var i = 0; i < this.cart.length; i++) {
        // this.total=this.total+parseInt(this.cart[i]['price']);
        this.total += parseInt(this.cart[i]["price"]);
        this.count = this.cart.length;
      }
    });
  }

  deletecartitems(cartitemId: any) {
    this.product_service
      .deleteCartItem(cartitemId)
      .subscribe((response: any) => {
        this.product_service.cartitems().subscribe((Res: any) => {
          console.log(Res);
          this.total = 0;
          this.cart = Res;
          for (var i = 0; i < this.cart.length; i++) {
            // this.total=this.total+parseInt(this.cart[i]['price']);
            this.total += parseInt(this.cart[i]["price"]);
          }

          this.product_service.cartitems().subscribe((Res: any) => {
            console.log(Res);
            this.cart = Res;
            for (var i = 0; i < this.cart.length; i++) {
              // this.total=this.total+parseInt(this.cart[i]['price']);
              this.total = 0;
              this.total += parseInt(this.cart[i]["price"]);
              this.count = this.cart.length;
            }
          });
        });
      });
  }
}
