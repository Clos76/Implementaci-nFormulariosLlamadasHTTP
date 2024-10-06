# Form Templates

Este proyecto fue generado por [Angular CLI](https://github.com/angular/angular-cli) versión 18.2.5.

## Servidor de desarrollo

Ingresar `ng serve` para un dev servidor. Navega al url indicado o a `http://localhost:4200/`. La aplicación se cargará automáticamente si hay algún cambio. 


## Compilando

Ingresa `ng build` para crear el proyecto. Los artefactos del build serán guardados en el `dist/` directorio.

## Running unit tests

# Proyecto Angular de Implementación de Formularios y Llamadas de HTTP. 

## Descripción General
Este proyecto es una aplicación Angular que demuestra el uso de formularios de tipo "Template Driven Forms" y de "Model Driven Forms". Se creó la llamada a un API llamado Json Place Holder para simular la llamada de un API el cual se encuentra en el archivo (httpCall.component.ts). En el archivo (modelDriven.component.ts) se implementó el uso de Model Driven Forms y también la inserción de datos para el formulario en el cual se creó un POST al API. En este formulario, el usuario tiene que ingresar su nombre, correo electrónico y una contraseña. Si el usuario solo da click a algunos de estos campos pero no ingresa los datos, se le da un mensaje de error diciendo que el nombre, correo electrónico y contraseña son requeridos y también tiene que tener un mínimo de tres caracteres. Si el usuario ingresa los datos en los campos exitosamente, se le dará un mensaje de alerta que los datos fueron ingresados correctamente. Al hacer esto, podrá verificar en la consola los datos ingresados. 

## Características
-**Formulario Reactivo (Model-Driven)**Permite a los usuarios ingresar datos en un formulario el cual contienen validaciones integradas. 
- El nombre, correo electrónico y la contraseña son requeridos y tienen un mínimo de 3 caracteres para que sean válidos. 
- Mientras no ingrese los datos correctos, el botón de Submit no será activado. 
- Se crearon variables para los datos del formulario.
- Se creó una variable privada para guardar el URL del API.
- Se creó un constructor privado llamado http que implementa el la clase HttpClient
- Para la manipulación de los datos ingresados, se creó el método onSubmit() el cual contiene la alerta que emite al usuario si los datos fueron ingresados correctamente o si no.
- Se implementó el uso de error por si los datos ingresados no fueron ingresados correctamente y se imprime el error.

- **Formulario llamada HTTP**Este archivo contiene el llamado a un API llamado Json Place Holder el cual simula la llamada de HTTP a ciertos datos por medio de GET. Aquí, podemos ver los datos del primer usuario, junto con su id y su título.
- Se exportó la clase HTTPCreated que implementa OnInit el cual contiene los métodos para hacer la llamada.
- Se creó un método público de apiUrl el cual contiene la dirección de URL.
- Se creó el constructor privado http que implementa el HttpClient.
- En el método ngOnInit, se implementa el fetchDetails para obtener los resultados.
- Se creó el método público fetchDetails el cual implementa un GET al API con el url obtenido, se suscribe y se regresa la respuesta.

## Código de ejemplo 

```TypeScript
**modelDriven.component.ts **
@Component ({
selector: 'model-driven-form',
standalone: true, 
imports: [FormsModule, ReactiveFormsModule, FormsModule,CommonModule, HttpClientModule, HttpCreated],
template: `

<h1>Reactive Form Component Con HTTP Client Post</h1>

<form [formGroup]="myForm" (ngSubmit)="onSubmit()"><!--Crear Trigger al presionar submit-->

<!--Crear sección de forma para nombre, con requerimientos -->
    <label for="name">Nombre: </label>
    <input type="text" id="name" formControlName="name">
    <div *ngIf="myForm.controls.name.errors?.['required'] && myForm.controls.name.touched">Name is required.</div>
  <div *ngIf="myForm.controls.name.errors?.['minlength'] && myForm.controls.name.touched">Name must be at least 3 characters long</div>

  <!--Crear sección de forma para correo electrónico, con requerimientos -->
  <label for="email">Correo electrónico: </label>
    <input type="email" id="email" formControlName="email">
    <div *ngIf="myForm.controls.email.errors?.['required'] && myForm.controls.email.touched">Correo electrónico requerido.</div>
  <div *ngIf="myForm.controls.email.errors?.['minlength'] && myForm.controls.email.touched">Su correo tiene que ser válido. </div>

    <!--Crear sección de forma para contraseña con requerimientos -->
  <label for="password">Contraseña </label>
    <input type="password" id="password" formControlName="password">
    <div *ngIf="myForm.controls.password.errors?.['required'] && myForm.controls.password.touched">Una contraseña es requerida.</div>
  <div *ngIf="myForm.controls.password.errors?.['minlength'] && myForm.controls.password.touched">Su contraseña tiene que ser al menos 3 caracteres</div>

 <!--Deshabilitar el botón si no ha cumplido con requerimientos-->
  <button [disabled]="myForm.invalid">Submit</button>
</form>

export class ReactiveFormComponent implements OnInit{

    //variables para la forma con valores de texto
    myForm = new FormGroup({
        name: new FormControl('', [Validators.required, Validators.minLength(3)]) ,
        email: new FormControl('', [Validators.required, Validators.minLength(3)]),
        password: new FormControl('', [Validators.required, Validators.minLength(3)])
    });

//crear data publico para usarlo para recibir los datos
    public data : any;

    //crear API para mandar la informacion del formulario
    private apiUrl = 'https://jsonplaceholder.typicode.com/todos'

    //método privado para injectar httpClient
    constructor(private http: HttpClient){
        
    }

    ngOnInit(): void {
    
    }

//utilizar fetch para realizar el Get al API
    public fetchDetails(){
        this.http.get(this.apiUrl).subscribe(
            (response:any)=> {
                console.log(response);
                this.data=response; 
            }
        )
    }

    //método para controlar la entrega de datos ingresados
    onSubmit(){
        if(this.myForm.valid){
            const formData = this.myForm.value;
            this.send Data(formData).subscribe(
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
    //método para enviar datos del formulario al API
    sendData(data:any ) {
        return this.http.post(this.apiUrl, data);
    }
}
```

## Código de ejemplo 
** httpCall.component.ts**
```TypeScript
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
```

#Estructura del Proyecto
/src
  /app
    /model.Driven.component.ts   #Componente del formulario modelado implementando POST
    /httpCall.component.ts       #Componente para realizar llamadas HTTP
    /app.component.ts            #Componente principal de la aplicación 
  /styles.css                     #Estilos globales de la aplicación 




