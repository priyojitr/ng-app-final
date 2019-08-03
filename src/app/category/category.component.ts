import { Component, OnInit } from '@angular/core';
import { Category } from '../model/category.model';
import { CategoryService } from 'src/app/service/category.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {

  categoryList: Array<Category>;

  header: string[] = ['categorytitle', 'categorydesc', 'action'];

  constructor(private categoryService: CategoryService, private router: Router) {
  }

  ngOnInit() {
    this.getAllCategoriesByUser();
  }

  getAllCategoriesByUser() {
    this.categoryService.getAllCategoriesByUserId().subscribe(
      data => {
        this.categoryList = data;
        this.categoryList = [...this.categoryList];
      }, err => {
        console.log('error....', err);
        alert('error occurred');
      });
  }

  // provide definition for del button event (param ->  row data)
  edit(row: any): void {
    console.log('routing to edit-- ', row.categoryId);
    this.router.navigateByUrl(`/categoryform/${row.categoryId}`);
  }

  delete(row: any): void {
    console.log('-------------', row);
    this.categoryService.deleteCategory(row.categoryId).subscribe(
      data => {
        console.log('succss', data);
        if (data[`isDeleted`] === 'true') {
          console.log('refreshh...');
          this.getAllCategoriesByUser();
        }
      }, err => {
        console.log('error...', err);
      });
  }

}
