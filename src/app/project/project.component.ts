import { Component, OnInit } from '@angular/core';
import {ProjectServiceService} from "../services/project-service.service";
import {Router} from "@angular/router";
import {Category} from "../models/category.model";
@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.scss']
})
export class ProjectComponent implements OnInit {

 


  projects:any;
  size:number=5;
  currentPage:number=0
  totalPages:number=0
  pages:Array<number>;
  categories: any;
  category:Category
  
  constructor(private service:ProjectServiceService, private router:Router) { }

  ngOnInit() {

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
            this.projects=data ;
     },error=>{
      console.log(error);
    })
  }

  onTapeKeyword (value){
    this.service.doSearchByKeyWord(value.keyword,this.currentPage,this.size).subscribe(data =>{
      this.projects=data ;
    },error=>{
      console.log(error);
    })
  }

  onProductPage(i: number) {
    this.currentPage=i;
    this.onGetProducts()
  }

  onDeleteProduct(p) {
    let conf=confirm("Etes-vous de supprimer cet element?")
    if (conf){
      this.service.deleteResource(p._links.self.href).subscribe( success=>{
        this.onGetProducts();
      },erro=>{
        console.log(erro)
      });

    }
  }

  
  onAdd() {
    this.router.navigateByUrl('/menu/newProj');
  }

  

  onEditProduct(p) {
    let url =  p._links.self.href;
    return this.router.navigateByUrl("/menu/editProj/"+ btoa(url));
  }



  onChangeSelect(value) {
    this.service.findAllByCategory(value.id,this.currentPage,this.size).subscribe(data =>{
      this.projects=data ;
    },error=>{
      console.log(error);
    })
  }


  getCategory(href:string){
    return this.service.getCategoryOfProduct(href).subscribe(c =>{
      this.category=c
      console.log(this.category);
      return "ok";
    });
  }

}
