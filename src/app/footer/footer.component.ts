import { Component, OnInit } from '@angular/core';
import { Category } from 'src/app/model/category.model';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {

  categories: Array<Category>;
  category: Category;

  constructor() {
    this.category = new Category();
    this.categories = [];
  }

  ngOnInit() {
  }

  func() {
    console.log('myfoot');
    this.category.categoryId = 'cat-id';
    this.category.categoryName = 'cat-name';
    this.category.categoryDescription = 'cat-desc';
    this.category.categoryCreatedBy = 'cat-by';
    this.category.categoryCreationDate = 'cat-dt';
    this.categories.push(this.category);
    console.log(this.categories);
  }

}
