import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { ApiService } from '../../core/services/api.service';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from 'src/app/core/models/object-model';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  public product_url = environment.server_url + '/products/';

  constructor(private apiService: ApiService, private http: HttpClient) { }

  allProduct(user_session_id): Observable<any> {
    return this.apiService.get(this.product_url)
  }
  addNewProduct(product_dto): Observable<any> {
    return this.apiService.post(this.product_url, product_dto);
  }

  getAllusers(){
    return this.apiService.get(environment.server_url + "/user")
  }

  getAllorders(){
    return this.apiService.get(environment.server_url + "/orders")
  }

  singleProduct(id) {
    return this.apiService.get(this.product_url + id)
  }
  updateProduct(id, product_dto): Observable<any> {
    return this.apiService.put(this.product_url + id, product_dto);
  }
  deleteProduct(id): Observable<any> {
    return this.apiService.delete(this.product_url + id);
  }
  cartitems(){
    let resp: any = this.http.get(this.product_url+"/cart");
    return resp;
  }

  deleteCartItem(id:any){
    let resp:any=this.http.delete(this.product_url+"/cart/"+id);
    return resp;
  }

  cartcount(productslist){
    let resp: any = this.http.get(productslist);
    return resp;
  }

}
