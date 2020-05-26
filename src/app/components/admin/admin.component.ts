import { Component, OnInit } from "@angular/core";
import { ProductService } from "src/app/services/product.service";
import { ProductModelServer } from "src/app/models/product.model";

@Component({
  selector: "app-admin",
  templateUrl: "./admin.component.html",
  styleUrls: ["./admin.component.scss"],
})
export class AdminComponent implements OnInit {
  public products: ProductModelServer[];
  public productCount: number;

  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    this.retriveProducts();
  }

  private retriveProducts() {
    this.productService.getAllProducts().subscribe((data) => {
      this.productCount = data.count;
      this.products = data.products;
      console.log(this.products);
    });
  }

  public edit(productId) {
    alert("edit clicked");
  }

  public delete(productId) {
    alert("delete clicked");
    this.productService.deleteProduct(productId).subscribe((data) => {
      this.products = this.products.filter(
        (element) => {
          console.log(element);
          return element.id !== productId;
        },
        (error) => {
          alert("item could not be deleted");
        }
      );
      alert("item has been deleted");
    });
  }
}
