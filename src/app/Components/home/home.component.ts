
import { Component, OnInit } from '@angular/core';
import { IProduct } from '../../interface/IProducts';
import { ICategory } from '../../interface/ICategory';
import { ProductsService } from '../../services/products.service';
import { CategoriesService } from '../../services/categories.service';
import { Subscription } from 'rxjs';
import { RouterLink } from '@angular/router';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterLink,CarouselModule ],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
productList:IProduct[] = [];
categoryList : ICategory[] = [];
productSubscription !: Subscription;
categorySubscription !: Subscription;
bannerImages : string[] = [
  "./assets/images/img1.avif",
  "./assets/images/img2.avif",
  "./assets/images/img3.avif",
  "./assets/images/img4.avif",
  "./assets/images/img5.avif",
  "./assets/images/img6.avif",
  "./assets/images/img7.avif",
]


// category options
categoryOptions: OwlOptions = {
  loop: true,
  mouseDrag: true,
  touchDrag: true,
  pullDrag: false,
  autoplay: true,
  autoplaySpeed: 800,
  autoplayTimeout: 1000,
  autoplayHoverPause: true,
  dots: false,
  navSpeed: 700,
  navText: ['', ''],
  responsive: {
    0: {
      items: 1
    },
    400: {
      items: 2
    },
    740: {
      items: 3
    },
    940: {
      items: 6
    }
  },
  nav: true
}

// products options
productOptions: OwlOptions = {
  loop: true,
  mouseDrag: true,
  touchDrag: true,
  pullDrag: false,
  autoplay: true,
  autoplaySpeed: 800,
  autoplayTimeout: 2000,
  dots: true,
  navSpeed: 700,
  responsive: {
    0: {
      items: 1
    }
  },
  nav: false
}

constructor(private _prodcut : ProductsService, private _category : CategoriesService) { }

  ngOnInit() {
  //  get product
    this.productSubscription = this._prodcut.getProducts().subscribe({
      next:(res) => {
        this.productList = res.data;
      },
      error:(err) =>{
        console.log(err.message);
        return;
      }
    })

    // get categoryList
    this.categorySubscription = this._category.getCategories().subscribe({
      next:(res) =>{
        this.categoryList = res.data;
      },
      error:(err) =>{
        console.log(err.message);
        return;
      }
    })
  }
  
}
