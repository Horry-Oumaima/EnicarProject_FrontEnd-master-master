import { Component, OnInit } from '@angular/core';
import {ProjectServiceService} from "../services/project-service.service";
import {ActivatedRoute, Router} from "@angular/router";


@Component({
  selector: 'app-new-project',
  templateUrl: './new-project.component.html',
  styleUrls: ['./new-project.component.scss']
})
export class NewProjectComponent implements OnInit {

  categories: any;
  products:any;
  size:number=5;
  currentPage:number=0
  totalPages:number=0
  pages:Array<number>;
  category:any;
  private  currentProduct:any;
  constructor(private service:ProjectServiceService, private router:Router) { }

  ngOnInit() {
    this.onGetProducts();
    this.service.findAllCategory().subscribe(data =>{
      this.categories=data ;
    },error=>{
      console.log(error);
    })
  }

  onGetProducts() {
    this.service.getProducts(this.currentPage, this.size).subscribe(data =>{
      this.totalPages=data["page"].totalPages;
      this.pages= new Array<number>(this.totalPages);
      this.products=data ;
    },error=>{
      console.log(error);
    })
  }

  onProductPage(i: number) {
    this.currentPage=i;
    this.onGetProducts()
  }

  saveProduct(value) {

    this.service.findCategory(value.category).subscribe(data=>{
      this.category = data
    });
    value = {
      "sujet": value.sujet,
      "description":value.description,
      "specialtite":value.specialtite,
      "category": this.category
    }
    this.service.postData(value).subscribe(d =>{
      this.currentProduct =  d;
    return this.router.navigateByUrl("/menu/newProj");
    });
  }

}
