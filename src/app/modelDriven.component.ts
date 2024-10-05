import { Component, OnInit } from "@angular/core";
import { FormGroup, FormControl, Validators, FormsModule } from "@angular/forms";
import { ReactiveFormsModule } from "@angular/forms";
import { CommonModule } from "@angular/common";
import { HttpClient, HttpClientModule } from "@angular/common/http";
import { HttpCreated } from "./httpCall.component";

@Component ({
selector: 'model-driven-form',
standalone: true, 
imports: [FormsModule, ReactiveFormsModule, FormsModule,CommonModule, HttpClientModule, HttpCreated],
template: `

<h1>Reactive Form Component Con HTTP Client Post</h1>

<form [formGroup]="myForm" (ngSubmit)="onSubmit()"><!--Crear Trigger al presionar submit-->


    <label for="name">Nombre: </label>
    <input type="text" id="name" formControlName="name">
    <div *ngIf="myForm.controls.name.errors?.['required'] && myForm.controls.name.touched">Name is required.</div>
  <div *ngIf="myForm.controls.name.errors?.['minlength'] && myForm.controls.name.touched">Name must be at least 3 characters long</div>

  <label for="email">Correo electronico: </label>
    <input type="email" id="email" formControlName="email">
    <div *ngIf="myForm.controls.email.errors?.['required'] && myForm.controls.email.touched">Correo electronico requerido.</div>
  <div *ngIf="myForm.controls.email.errors?.['minlength'] && myForm.controls.email.touched">Su correo tiene que ser valido. </div>

  <label for="password">Contraseña </label>
    <input type="password" id="password" formControlName="password">
    <div *ngIf="myForm.controls.password.errors?.['required'] && myForm.controls.password.touched">Una contraseña es requerida.</div>
  <div *ngIf="myForm.controls.password.errors?.['minlength'] && myForm.controls.password.touched">Su contraseña tiene que ser almenos 3 caracters</div>
 <!--Disable the submit button if form is invalid-->
  <button [disabled]="myForm.invalid">Submit</button>
</form>



`,

})

export class ReactiveFormComponent implements OnInit{
    myForm = new FormGroup({
        name: new FormControl('', [Validators.required, Validators.minLength(3)]) ,
        email: new FormControl('', [Validators.required, Validators.minLength(3)]),
        password: new FormControl('', [Validators.required, Validators.minLength(3)])
    });


    public data : any;
    //crear API para mandar la informacion del formulario
    private apiUrl = 'https://jsonplaceholder.typicode.com/todos'

    //metodo privado para injectar httpClient
    constructor(private http: HttpClient){
        
    }

    ngOnInit(): void {
    
    }


    public fetchDetails(){
        this.http.get(this.apiUrl).subscribe(
            (response:any)=> {
                console.log(response);
                this.data=response;

              
               
            }
        )
    }

    //metodo para controlar la entrega de datos ingresados
    onSubmit(){
        if(this.myForm.valid){
            const formData = this.myForm.value;
            this.sendData(formData).subscribe(
                (response:any) => {
                    alert('Datos ingresados correctamente.')
                    console.log('Datos ingresados correctamente', response)
                },
                (error)=> {
                    alert('Error al registrar datos.')
                    console.error('Error al registrar datos.', error)
                }
            )
        }
    }
    //metodo para enviar datos del formulario al API
    sendData(data:any ) {
        return this.http.post(this.apiUrl, data);
    }
}