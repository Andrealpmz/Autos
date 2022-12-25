import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { __values } from 'tslib';
import { ClienteService } from './services/cliente/cliente.service';
import { SedeService } from './services/sede/sede.service';
import { VehiculoService } from './services/vehiculo/vehiculo.service';
import { VendedorService } from './services/vendedor/vendedor.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{


  vendedorForm: FormGroup;
  clienteForm: FormGroup;
  vehiculoForm: FormGroup;
  sede: any;
  vendedor: any;
  cliente: any;
  vehiculo: any;

  constructor(
    public fb: FormBuilder,
    public clienteService: ClienteService,
    public sedeService: SedeService,
    public vehiculoService: VehiculoService,
    public vendedorService: VendedorService,

  ){

  }
  ngOnInit(): void {
    this.vendedorForm = this.fb.group({
      id: [''],
      cedula : ['', Validators.required],
      nombre : ['', Validators.required],
      apellido : ['', Validators.required],
      sede : ['', Validators.required],})
    this.clienteForm = this.fb.group({
      id: [''],
        cedula : ['', Validators.required],
        nombre : ['', Validators.required],
        apellido : ['', Validators.required],
      vehiculo: ['', Validators.required],})
      this.vehiculoForm = this.fb.group({
        id: [''],
          marca : ['', Validators.required],
          color : ['', Validators.required],
          año : ['', Validators.required],
        placa: ['', Validators.required],
        valor: ['', Validators.required],
    });;

    this.sedeService.getAllSedes().subscribe(resp=> {
        this.sede = resp;
    },
    error => { console.error(error) } 
    );

    this.vendedorService.getAllVendedor().subscribe(resp=> {
      this.vendedor = resp;
     },
   error => { console.error(error) }
   );


  this.vehiculoService.getAllVehiculo().subscribe(resp=> {
    this.vehiculo = resp;
  },
  error => { console.error(error) }
  
  );
  
  this.clienteService.getAllCliente().subscribe(resp=> {
  this.cliente = resp;
  },
  error => { console.error(error) }
  
  );
}
guardar():void{
this.vendedorService.saveVendedor(this.vendedorForm.value).subscribe(resp=>{
this.vendedorForm.reset();
alert('Se guardó el registro');
this.vendedor=this.vendedor.filter((vendedor: { id: any; })=> resp.id!=vendedor.id);
this.vendedor.push(resp);
},
error => { console.error(error) }
)
}


eliminar(vendedor: { id: string; }){
  this.vendedorService.deleteVendedor(vendedor.id).subscribe(resp=>{
   console.log(resp)
   if(resp===true){
    alert('Se eliminó correctamente');
    this.vendedor.pop();
   }
})
}

editar(vendedor: { id: any; cedula: any; nombre: any; apellido: any; sede: any; }){
  this.vendedorForm.setValue({
    id: vendedor.id,
    cedula : vendedor.cedula,
    nombre : vendedor.nombre,
    apellido : vendedor.apellido,
    sede : vendedor.sede
  })
}

guardarCli():void{
this.clienteService.saveCliente(this.clienteForm.value).subscribe(resp=>{
this.clienteForm.reset();
alert('Se guardó el registro');
this.cliente=this.cliente.filter((cliente: { id: any; })=> resp.id!=cliente.id);
this.cliente.push(resp);
},
error => { console.error(error) }
)
}


eliminarCli(cliente: { id: string; }){
this.clienteService.deleteCliente(cliente.id).subscribe(resp=>{
console.log(resp)
if(resp===true){
alert('Se eliminó correctamente');
this.cliente.pop();
}
})
}

editarCli(cliente: { id: any; cedula: any; nombre: any; apellido: any; vehiculo: any; }){
  this.clienteForm.setValue({
    id: cliente.id,
    cedula : cliente.cedula,
    nombre : cliente.nombre,
    apellido : cliente.apellido,
    vehiculo : cliente.vehiculo
  })
}

guardarVeh():void{
  this.vehiculoService.saveVehiculo(this.vehiculoForm.value).subscribe(resp=>{
  this.vehiculoForm.reset();
  alert('Se guardó el registro');
  this.vehiculo=this.vehiculo.filter((vehiculo: { id: any; })=> resp.id!=vehiculo.id);
  this.vehiculo.push(resp);
  },
  error => { console.error(error) }
  )
  }
  
  
  eliminarVeh(vehiculo: { id: string; }){
  this.vehiculoService.deleteVehiculo(vehiculo.id).subscribe(resp=>{
  console.log(resp)
  if(resp===true){
  alert('Se eliminó correctamente');
  this.vehiculo.pop();
  }
  })
  }
  
  editarVeh(vehiculo: { id: any; valor: any; }){
    this.clienteForm.setValue({
      id: vehiculo.id,
      valor : vehiculo.valor
    })
  }


}
