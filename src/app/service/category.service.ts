import { Injectable } from '@angular/core';
import { AuthenticationService } from './authentication.service';
import { HttpClient } from '@angular/common/http';
import { Category } from '../model/category.model';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  private url: string;

  constructor(private authService: AuthenticationService, private httpClient: HttpClient) {
    this.url = 'http://localhost:8083/api/v1/category';
  }

  getAllCategoriesByUserId() {
    console.log('calling category api - get all categories');
    return this.httpClient.get<Category[]>(`${this.url}/${this.authService.getUserId()}`);
  }

  getCategoryById(categoryId: string) {
    console.log('calling category api - get by id', categoryId);
    return this.httpClient.get<Category>(`${this.url}/${this.authService.getUserId()}/${categoryId}`);
  }

  createCategory(category: Category) {
    category.categoryCreatedBy = this.authService.getUserId();
    console.log('calling category api - create', category);
    return this.httpClient.post<Category>(`${this.url}`, category);
  }

  updateCategory(category: Category) {
    console.log('calling category api - update', category);
    return this.httpClient.post<Category>(`${this.url}/update/${category.categoryId}`, category);
  }

  deleteCategory(categoryId: string) {
    console.log('calling category api - delete', categoryId);
    return this.httpClient.get(`${this.url}/delete/${categoryId}`);
  }

}
