import { Subscription } from 'rxjs';
import { Component, OnInit , OnDestroy } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
 
import { ICategory } from '../../interface/ICategory';
import { CategoriesService } from '../../services/categories.service';
 
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { IProduct } from '../../interface/IProducts';
import { ProductsService } from '../../services/products.service';
import { FilterProductPipe } from '../../pips/filter-product.pipe';
import { FormsModule } from '@angular/forms';
import { CartsService } from '../../services/carts.service';
@Component({
  selector: 'app-product',
  standalone: true,
  imports: [CommonModule,RouterLink,FormsModule,FilterProductPipe,CommonModule],
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit, OnDestroy {
  categories:ICategory[] = [];
  products: IProduct[] = [];
  addedToCartIds = new Set<string>(); // this is for make product added to cart icon red
  filter:string='';
  selectedCategoryId: string | null = null;
  appPageSize: number = 16; 
  totalItems: number = 0;
  itemsPerPage: number = 16;
  currentPage: number = 1;
  Subscription !: Subscription
  constructor( private _CategoriesService : CategoriesService,
    private toaster: ToastrService,private _ActivatedRoute: ActivatedRoute, 
    private _ProductsService : ProductsService,private router: Router,
    private _CartsService : CartsService) { }

  ngOnInit() {
    this.getCategories();

    // Listen for category changes in the query params
    this._ActivatedRoute.queryParams.subscribe(params => {
      this.selectedCategoryId = params['category'];
      this.currentPage = 1; // Reset the page number to 1 when category changes
      this.loadCategoryProducts(this.selectedCategoryId);
    });
  }
loadCategoryProducts(categoryId: string | null) {
    if (categoryId) {
      this.getProductsByCategory(categoryId, this.itemsPerPage, this.currentPage);
      
    } else {
      this.getAllProducts();
    }
  }
getCategories(){
  this.Subscription =  this._CategoriesService.getCategories().subscribe({
      next:(res) =>{
       this.categories = res.data;
      
      },
      error: (err) => {
        this.toaster.error(`${err.error.message}`, 'Error', {
          timeOut: 3000,
          positionClass: 'toast-top-right',
        })
      }
    })
  }
getAllProducts() {
 this.Subscription = this._ProductsService.getProducts(this.itemsPerPage, this.currentPage).subscribe({
    next: (res) => {
      this.products = res.data;
      this.totalItems = res.results;
    },
    error: (err) => {
      this.toaster.error(`${err.error.message}`, 'Error', {
        timeOut: 3000,
        positionClass: 'toast-top-right',
      });
    }
  });
}
getProductsByCategory(categoryId: string | null,itemsPerPage: number, currentPage: number) {
    this.currentPage = 1;
    if (categoryId) {
     this.Subscription = this._ProductsService.getProductsByCategory(categoryId,itemsPerPage, currentPage).subscribe({
        next: (res) => {
          this.products = res.data;
          this.totalItems = res.results;
          
        },
        error: (err) => {
          this.toaster.error(`${err.error.message}`, 'Error', {
            timeOut: 3000,
            positionClass: 'toast-top-right',
          });
        }
      });
    }
}
 get totalPages(): number {
    return Math.ceil(this.totalItems / this.appPageSize);
  }
getPages(): number[] {
    const pages: number[] = [];
    for (let i = 1; i <= this.totalPages; i++) {
      pages.push(i);
    }
    return pages;
  }
changePage(page: number): void {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
      this.loadCategoryProducts(this.selectedCategoryId);
    }
  }
getProductDetail(id: string) {
    this.Subscription = this._ProductsService.getProductById(id).subscribe({
      next: (res) => {
        this.router.navigate([`/product/${id}`]);
      },
      error: (err) => {
        this.toaster.error(`${err.error.message}`, 'Error', {
          timeOut: 3000,
          positionClass: 'toast-top-right',
        });
      }
    })
  }
  addToCart(productId: string) {
    this._CartsService.addProductToCart(productId).subscribe({
      next: (res) => {
        this.addedToCartIds.add(productId);
        this.toaster.success(res.message, 'Success', {
          timeOut: 3000,
          positionClass: 'toast-bottom-right',
        });
        this._CartsService.updateCartCount(res.numOfCartItems);
        // this._CartsService.getCart().subscribe(cartRes => {
        //   this._CartsService.updateCartCount(cartRes.numOfCartItems);
        // });
      },
      error: (err) => {
        this.toaster.error(`${err.error.message}`, 'Error', {
          timeOut: 3000,
          positionClass: 'toast-top-right',
        });
      }
    });
  }
  ngOnDestroy(): void {
    if (this.Subscription) {
      this.Subscription.unsubscribe();
    }
  }
}
