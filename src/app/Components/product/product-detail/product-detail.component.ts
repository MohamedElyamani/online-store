import { routes } from './../../../app.routes';
import { ProductsService } from './../../../services/products.service';
import { Component, inject, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { IProduct } from '../../../interface/IProducts';
import { ActivatedRoute } from '@angular/router';
import { OwlOptions,CarouselModule } from 'ngx-owl-carousel-o';
import { CartsService } from '../../../services/carts.service';

@Component({
  selector: 'app-product-detail',
  standalone: true,
  imports: [CarouselModule ],
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {
  productDetails : IProduct = {} as IProduct;
  productDetailOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: false,
    autoplay: true,
    autoplaySpeed: 800,
    autoplayTimeout: 2000,
    dots: false,
    navText: ['<i class="fa-solid fa-angles-left"></i>',  '<i class="fa-solid fa-angles-right"></i>'],
    navSpeed: 700,
    responsive: {
      0: {
        items: 1
      }
    },
    nav: true
  }
  private _CartsService = inject(CartsService);
  private toaster = inject(ToastrService);
  private route = inject(ActivatedRoute);
  private _ProductsService = inject(ProductsService);
 

  ngOnInit() {
    this.route.paramMap.subscribe({
      next: (params) => {
        const id = params.get('id');
        if (id) {
          this.getProductDetail(id);
        }
      }
    });
  }

  // get the product detail with id
  getProductDetail(id: string) {
    this._ProductsService.getProductById(id).subscribe({
      next: (res) => {
        this.productDetails = res.data;
      },
      error: (err) => {
        this.toaster.error(`${err.error.message}`, 'Error', {
          timeOut: 3000,
          positionClass: 'toast-top-right',
        });
      }
    })
  }

  // function to add to cart
  addToCart(product: IProduct) {
    this._CartsService.addProductToCart(product._id).subscribe({
      next: (res) => {
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
          positionClass: 'toast-bottom-right',
        });
      }
    })
  }
}
