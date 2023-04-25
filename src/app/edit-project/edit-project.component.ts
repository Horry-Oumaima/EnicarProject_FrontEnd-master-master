import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {ProjectServiceService} from "../services/project-service.service";


@Component({
  selector: 'app-edit-project',
  templateUrl: './edit-project.component.html',
  styleUrls: ['./edit-project.component.scss']
})
export class EditProjectComponent implements OnInit {

  url:string
  project:any

  category: any;
  constructor(private  service:ProjectServiceService,private router:Router,
              private activeRoute:ActivatedRoute
              ) { }

  ngOnInit() {
    this.url=atob(this.activeRoute.snapshot.params.id);
    this.service.findProduct(this.url).subscribe(
        data=>{
          this.project = data
        })
    }

  EditProduct(value: any) {
    this.service.editProduct(this.url, value).subscribe(data=>{
      return this.router.navigateByUrl("/menu/projects");
    },error =>{
      console.log(error)
    });

  }
}


