import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CustomerService } from 'src/app/customer/services/customer.service';

@Component({
  selector: 'app-pesticides-seeds',
  templateUrl: './pesticides-seeds.component.html',
  styleUrls: ['./pesticides-seeds.component.scss']
})
export class PesticidesSeedsComponent implements OnInit {

  all_products;
  show_checkout: Boolean = false;

  constructor(private router: Router, private customerService: CustomerService) { }

  ngOnInit() {
    this.getAllProduct()
  }

  getAllProduct() {
    this.customerService.allProduct().subscribe(data => {
      this.all_products = data;
      // console.log("ALl Product", this.all_products);
    }, error => {
      console.log("My error", error);
    })
  }

  buyProduct(id) {
    this.show_checkout = true;
    this.customerService.quickBuyProduct(id) //We pass to serice from service we can access in another component
    this.router.navigateByUrl("/checkout");
  }

  addToCart() {
  }


}
