import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { CustomerService } from "src/app/customer/services/customer.service";
import { ProductService } from "src/app/shared/services/product.service";

@Component({
  selector: "app-pesticides-seeds",
  templateUrl: "./pesticides-seeds.component.html",
  styleUrls: ["./pesticides-seeds.component.scss"],
})
export class PesticidesSeedsComponent implements OnInit {
  all_products;
  show_checkout: Boolean = false;
  isshopowner: boolean;
  shoporderhistory: boolean;

  constructor(
    private router: Router,
    public productservice: ProductService,
    private customerService: CustomerService
  ) {}

  ngOnInit() {
    this.getAllProduct();
  }

  getAllProduct() {
    this.customerService.allProduct().subscribe((data) => {
      this.all_products = data;
    });
  }

  buyProduct(id) {
    this.show_checkout = true;
    this.isshopowner = true;
    this.customerService.quickBuyProduct(id); //We pass to serice from service we can access in another component
    this.router.navigateByUrl("/farmer/krishi-checkout");
  }

  addToCart(id) {
    this.show_checkout = true;
    this.isshopowner = true;
    this.customerService.quickBuyProduct(id); //We pass to serice from service we can access in another component
    this.router.navigateByUrl("/farmer/cart");
  }

}
