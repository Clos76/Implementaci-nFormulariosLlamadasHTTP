import { HttpClient, HttpClientModule } from "@angular/common/http";
import { Component, Injectable, OnInit } from "@angular/core";
import { response } from "express";

@Component({
   selector: 'httpCall',
   standalone: true, 
   template: `


<div>
    <h1>Llamado de HTTP a API</h1>
    <div>User Id: {{data.id}} </div>
    <div>User Title: {{data.title}} </div>
</div>

   
   
   `,
   imports: [HttpClientModule]
})

export class HttpCreated implements OnInit{

public data : any;

private apiUrl = 'https://jsonplaceholder.typicode.com/todos/1'

    constructor(private http: HttpClient){
        // this service can now make http requests vias this.http
    }

    //need to use this once implemented onInit
    ngOnInit(): void {
        this.fetchDetails();
    }

    public fetchDetails(){
        this.http.get(this.apiUrl).subscribe(
            (response:any)=> {
                console.log(response);
                this.data = response;
               
            }
        )
    }

    createPost(post:any){
        return this.http.post(this.apiUrl+'/'+this.data.id,post);
    }
}