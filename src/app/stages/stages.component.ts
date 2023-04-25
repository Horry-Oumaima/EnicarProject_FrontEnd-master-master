import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-stages',
  templateUrl: './stages.component.html',
  styleUrls: ['./stages.component.scss']
})
export class StagesComponent implements OnInit {

  public students:any;

  constructor(private httpClient:HttpClient) { }

  ngOnInit() {
  }

  onGetStage() {
    this.httpClient.get("http://localhost:8080/students/all") .subscribe(data=>{
      this.students=data;
    },err=>{
      console.log(err);
    })

  }

}
