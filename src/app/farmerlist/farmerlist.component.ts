import { Component, OnInit } from "@angular/core";
import { FormBuilder } from "@angular/forms";
import { Router } from "@angular/router";
import { ProductService } from "../shared/services/product.service";

@Component({
  selector: "app-farmerlist",
  templateUrl: "./farmerlist.component.html",
  styleUrls: ["./farmerlist.component.scss"],
})
export class FarmerlistComponent implements OnInit {
  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private product_service: ProductService
  ) {}

  all_farmers = [];
  user_role = "";

  ngOnInit() {
    this.getAllFarmers();
  }
  getAllFarmers() {
    this.product_service.getAllusers().subscribe((data) => {
      this.all_farmers = data.filter((data) => data.role == "farmer");
      // this.all_merchants = data;
    });
  }
}
