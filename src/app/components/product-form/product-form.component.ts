import { Component, OnInit } from "@angular/core";
import { FormBuilder, Validators } from "@angular/forms";
import { CategoryModelServer } from "src/app/models/category.model";
import { CategoryService } from "@app/services/category.service";
import { ProductService } from "@app/services/product.service";
import { Router } from "@angular/router";

@Component({
  selector: "app-product-form",
  templateUrl: "./product-form.component.html",
  styleUrls: ["./product-form.component.scss"],
})
export class ProductFormComponent implements OnInit {
  public productForm;

  public categories: CategoryModelServer[];
  constructor(
    private formBuilder: FormBuilder,
    private categoryService: CategoryService,
    private productService: ProductService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.buildProductForm();

    this.retrieveCategories();
  }

  private buildProductForm() {
    this.productForm = this.formBuilder.group({
      title: ["", [Validators.required]],
      description: ["", [Validators.required]],
      shortDesc: ["", [Validators.required]],
      image: ["", [Validators.required]],
      price: ["", [Validators.required]],
      quantity: ["", [Validators.required]],
      catId: ["", [Validators.required]],
    });
  }

  private retrieveCategories() {
    this.categoryService
      .getAllCategories()
      .subscribe((data) => (this.categories = data.categories));
  }

  public insertProduct() {
    if (this.productForm.invalid) return;
    this.productService.insertProduct({ ...this.productForm.value }).subscribe(
      (data) => {
        console.log(data);
        alert("product stored successfully");
        this.router.navigateByUrl("/admin");
      },
      (error) => {
        alert("product could not be stored");
      }
    );
  }
}
