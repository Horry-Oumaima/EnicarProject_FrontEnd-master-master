import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Project} from "../models/project.model";

import {Category} from "../models/category.model";
@Injectable({
  providedIn: 'root'
})
export class ProjectServiceService {

  



  public host: string = "http://localhost:8080/";

  constructor(private httpClient: HttpClient) {
  }

  public getProducts(page: number, size: number):Observable<Project> {
    return this.httpClient.get<Project>(this.host + "projects?page=" + page + "&size=" + size);
  }

  public deleteResource(url) {
    return this.httpClient.delete(url);
  }
  public doSearchByKeyWord(keyword: string, page: number, size: number) : Observable<Project> {
    return this.httpClient.get<Project>(this.host + "projects/search/designation?desc=" + keyword + "&page=" + page + "&size=" + size);
  }

  public findAllByCategory(id: number, page: number, size: number) : Observable<Project>{
    return this.httpClient.get<Project>(this.host + "projects/search/byCategory?c=" + id + "&page=" + page + "&size=" + size);
  }

  public findAllCategory() :Observable<Category>{
    return this.httpClient.get<Category>(this.host + "catProjects");
  }
  public findCategory(id:number) :Observable<Category>{
    return this.httpClient.get<Category>(this.host + "catProjects/"+id);
  }

  public postData(value)  {
    return this.httpClient.post(this.host+"projects",value);
  }

  public getCategoryOfProduct(url:string) :Observable<Category>{
    return this.httpClient.get<Category>(url);
  }

  public editProduct(url,value) {
    return this.httpClient.put(url, value);
  }
  public findProduct(url:string) : Observable<Project>{
    return this.httpClient.get<Project>(url);
  }

}