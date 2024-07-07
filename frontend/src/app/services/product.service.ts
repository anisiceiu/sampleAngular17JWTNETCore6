import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Product } from '../models/product';
import { Observable } from 'rxjs';
import { AppSetting } from '../app.settings';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  url = AppSetting.API_BASE_URL + '/api/product/';
  constructor(private http: HttpClient) { }
  getProductList(): Observable<Product[]> {
    return this.http.get<Product[]>(this.url + 'ProductList');
  }
  postProductData(productData: Product): Observable<Product> {
    const httpHeaders = { headers:new HttpHeaders({'Content-Type': 'application/json'}) };
    return this.http.post<Product>(this.url + 'CreateProduct', productData, httpHeaders);
  }
  updateProduct(product: Product): Observable<Product> {
    const httpHeaders = { headers:new HttpHeaders({'Content-Type': 'application/json'}) };
    return this.http.put<Product>(this.url + 'UpdateProduct', product, httpHeaders);
  }
  deleteProduct(product:Product): Observable<any> {
    const httpHeaders = { headers:new HttpHeaders({'Content-Type': 'application/json'}) };
    return this.http.post<any>(this.url + "DeleteProduct",product,httpHeaders);
  }
  getProductDetailsById(id: number): Observable<Product> {
    return this.http.get<Product>(this.url + 'ProductDetail?id=' + id);
  }
}
