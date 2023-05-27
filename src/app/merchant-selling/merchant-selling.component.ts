import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { ProductService } from '../shared/services/product.service';

@Component({
  selector: 'app-merchant-selling',
  templateUrl: './merchant-selling.component.html',
  styleUrls: ['./merchant-selling.component.scss']
})
export class MerchantSellingComponent implements OnInit {

   constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private product_service: ProductService
  ){ }

  all_merchants=[];
  user_role = '';

  ngOnInit() {
    this.getAllMerchants();
  }

  getAllMerchants() {
    this.product_service.getAllusers().subscribe(data => {
      this.all_merchants=data.filter(
        (data) => data.role == 'merchant');
      // this.all_merchants = data;
    }
  );
}
}
