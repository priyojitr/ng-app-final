import { Component, OnInit } from '@angular/core';
import { Category } from 'src/app/model/category.model';
import { FormGroup, FormControl, Validators, FormControlDirective, FormControlName, FormGroupDirective } from '@angular/forms';
import { CategoryService } from 'src/app/service/category.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-category-form',
  templateUrl: './category-form.component.html',
  styleUrls: ['./category-form.component.css']
})
export class CategoryFormComponent implements OnInit {

  category: Category;
  fmMode: string;

  categoryForm = new FormGroup({
    categoryName: new FormControl('', Validators.required),
    categoryDescription: new FormControl('', Validators.required)
  });

  constructor(private router: Router, private actRt: ActivatedRoute, private categoryService: CategoryService) {
    this.category = new Category();
  }

  ngOnInit() {
    if (this.actRt.snapshot.params.categoryid === undefined) {
      this.fmMode = 'Create';
    } else {
      this.fmMode = 'Edit';
      this.getCategory(this.actRt.snapshot.params.categoryid);
    }
  }

  getCategory(categoryId: string) {
    this.categoryService.getCategoryById(categoryId).subscribe(
      data => {
        console.log('success....', data);
        this.category = data;
        this.categoryForm.get('categoryName').setValue(this.category.categoryName);
        this.categoryForm.get('categoryDescription').setValue(this.category.categoryDescription);
      }, err => {
        console.log('error....', err);
      }
    );
  }

  submitCategory(categoryFormDir: FormGroupDirective) {
    console.log(`category submit --> mode: ${this.fmMode}`);
    this.category.categoryName = this.categoryForm.get('categoryName').value;
    this.category.categoryDescription = this.categoryForm.get('categoryDescription').value;
    if (this.fmMode === 'Create') {
      // subscribe and retrn tto cate list pag
      this.categoryService.createCategory(this.category).subscribe(
        data => {
          console.log('success', data);
          categoryFormDir.resetForm();
          this.category = new Category();
        }, err => {
          console.log('error....', err);
        }
      );
    } else {
      this.category.categoryId = this.actRt.snapshot.params.categoryid;
      this.categoryService.updateCategory(this.category).subscribe(
        data => {
          console.log('note updated --', data);
          alert('note update ok');
          this.router.navigate(['categories']);
        }, err => {
          console.log('error --', err);
        }
      );
    }
  }

  resetCategory(categoryFormDir: FormGroupDirective) {
    categoryFormDir.resetForm();
  }

  getCategoryNameBlankMessage() {
    return this.categoryForm.get('categoryName').hasError('required') ? 'category name field cannot be blank' : '';
  }

  getCategoryDescriptionBlankMessage() {
    return this.categoryForm.get('categoryDescription').hasError('required') ? 'category description field cannot be blank' : '';
  }



}
