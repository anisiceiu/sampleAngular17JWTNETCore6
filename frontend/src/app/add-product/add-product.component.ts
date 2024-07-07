import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { ToastrService } from 'ngx-toastr';
import { ProductService } from '../services/product.service';
import { FormBuilder, Validators } from '@angular/forms';
import { Product } from '../models/product';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-add-product',
  standalone: true,
  imports: [FormsModule,ReactiveFormsModule,CommonModule,RouterModule],
  templateUrl: './add-product.component.html',
  styleUrl: './add-product.component.css'
})
export class AddProductComponent {
  productForm: any;
  id:number = 0;

  

  constructor(private route: ActivatedRoute,private formbulider: FormBuilder,
  private productService: ProductService,private router: Router,
     private jwtHelper : JwtHelperService,private toastr: ToastrService) {
      this.productForm = this.formbulider.group({
        name: ['', [Validators.required]],
        price: ['', [Validators.required]],
        description: ['', [Validators.required]],
        quantity: ['', [Validators.required]]
      });

      }
     
  ngOnInit() {

    this.id =Number(this.route.snapshot.paramMap.get('id'));
    
    if(this.id == 0)
    {
      this.productForm = this.formbulider.group({
        name: ['', [Validators.required]],
        price: ['', [Validators.required]],
        description: ['', [Validators.required]],
        quantity: ['', [Validators.required]]
      });
    }
    else
    {
      this.productService.getProductDetailsById(this.id).subscribe(data=>{

        this.productForm.patchValue({
          name: data.name,
          price: data.price,
          description: data.description,
          quantity: data.quantity,
        });

      });
      
    }
    
    
  }

  SaveProduct(product:Product)
  {
    product.id = this.id;
    
    if(product.id>0)
    {
      this.UpdateProduct(product);
    }
    else{
      this.PostProduct(product);
    }
  }

  PostProduct(product: Product) {
    const product_Master = this.productForm.value;
    this.productService.postProductData(product_Master).subscribe(
      () => {
        this.productForm.reset();
        this.toastr.success('Data Saved Successfully');
      }
    );
  }

  UpdateProduct(product: Product) {
    product.id = this.id;
    const product_Master = this.productForm.value;
    this.productService.updateProduct(product_Master).subscribe(() => {
      this.toastr.success('Data Updated Successfully');
      this.productForm.reset();
      
    });
  }

  Clear(product: Product){
    this.productForm.reset();
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
