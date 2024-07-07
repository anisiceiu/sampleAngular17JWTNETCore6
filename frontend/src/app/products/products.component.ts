import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {Product} from './../models/product'
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { FormBuilder, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Observable } from 'rxjs';
import { ProductService } from '../services/product.service';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [ReactiveFormsModule,CommonModule,RouterModule],
  templateUrl: './products.component.html',
  styleUrl: './products.component.css'
})
export class ProductsComponent implements OnInit{
  ProductList: Product[];
  sortBy:string = 'id';

  displayedProducts: Product[] = [];
  pageSize = 5;
  pageIndex = 0;
  totalPages = 0;
  
  massage = "";
  productId = 0;

  constructor(private formbulider: FormBuilder,
     private productService: ProductService,private router: Router,
     private jwtHelper : JwtHelperService,private toastr: ToastrService) { 
      this.ProductList=new Array<Product>();
     }
  ngOnInit() {
    
    this.getProductList();
  }

  sortProducts(by: string): void {
    this.sortBy = by;
    
    this.ProductList.sort((a, b) => {
      if (by === 'id') {
        return a.id - b.id;
      } else if (by === 'name') {
        return a.name!.localeCompare(b.name!);
      } else if (by === 'description') {
        return a.description!.localeCompare(b.description!);
      } else if (by === 'price') {
        return a.price! - b.price!;
      } else if (by === 'quantity') {
        return a.quantity! - b.quantity!;
      } else {
        return 0;
      }
    });
    this.updateDisplayedProducts();
  }

  updateDisplayedProducts(): void {
    const startIndex = this.pageIndex * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    this.displayedProducts = this.ProductList.slice(startIndex, endIndex);
  }

  goToPage(page: number): void {
    if (page >= 0 && page < this.totalPages) {
      this.pageIndex = page;
      this.updateDisplayedProducts();
    }
  }

  nextPage(): void {
    if (this.pageIndex < this.totalPages - 1) {
      this.pageIndex++;
      this.updateDisplayedProducts();
    }
  }

  previousPage(): void {
    if (this.pageIndex > 0) {
      this.pageIndex--;
      this.updateDisplayedProducts();
    }
  }


  getProductList() {
    this.productService.getProductList().subscribe(data=>{
      this.ProductList = data;
      this.updateDisplayedProducts();
      this.totalPages = Math.ceil(this.ProductList.length / this.pageSize);
    });
    
  }

  ProductDetailsToEdit(id: number) {
    this.router.navigateByUrl('/product/'+id);
  }
  
  DeleteProduct(product:Product) {
    if (confirm('Do you want to delete this product?')) {
      this.productService.deleteProduct(product).subscribe(() => {
        this.toastr.success('Data Deleted Successfully');
        this.getProductList();
      });
    }
  }
  
  public logOut = () => {
    localStorage.removeItem("jwt");
    this.router.navigate(["/"]);
  }
  
  isUserAuthenticated() {
    const token = localStorage.getItem("jwt");
    if (token && !this.jwtHelper.isTokenExpired(token)) {
      return true;
    }
    else {
      return false;
    }
  }
}
