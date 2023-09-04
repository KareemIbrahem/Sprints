import { Component, Injectable, Input } from '@angular/core';
import { Product } from '../models/productModel';

@Component({
  selector: 'productItem-root',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss'],
})
export class ProductItemComponent {
  @Input() productItem: Product;
  @Input() products!: Product[];
  @Input() filter: String = 'All';

  constructor() {
    this.productItem = new Product();
  }

  largerThan100(product: Product) {
    return product.priceProduct > 100;
  }
  shouldBeViewed(product: Product): boolean {
    if (this.filter == 'All') return true;
    if (this.filter == 'Avaliable' && product.isAvailable) return true;
    if (this.filter == 'Featured' && product.isFeatured) return true;
    return false;
  }
}
