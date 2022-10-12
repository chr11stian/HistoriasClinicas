import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, AbstractControl } from '@angular/forms';
import { DynamicDialogConfig } from 'primeng/dynamicdialog';
import { RolGuardiaService } from 'src/app/core/services/rol-guardia/rol-guardia.service';
import { ConsultaGeneralService } from 'src/app/cred/citas/atencion-cred/consulta-principal/services/consulta-general.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-inteconsulta-obstetricia-modal',
  templateUrl: './inteconsulta-obstetricia-modal.component.html',
  styleUrls: ['./inteconsulta-obstetricia-modal.component.css']
})
export class InteconsultaObstetriciaModalComponent implements OnInit {
  datePipe = new DatePipe('en-US');
  // consulta=JSON.parse(localStorage.getItem('datosConsultaActual'))
  interconsultaFG:FormGroup;
  listaServicios:any[]=[]
  listaInterconsulta:any[]=[]
  loading:boolean=false
  idConsulta:''
  listaNivelUrgencia = [
    { name: "No urgente", code: "Nivel 5" },
    { name: "Menos Urgente", code: "Nivel 4" },
    { name: "Urgente", code: "Nivel 3" },
    { name: "Emergencia", code: "Nivel 2" },
    { name: "Reanimacion", code: "Nivel 1" },
  ];

  constructor(private rolGuardiaService: RolGuardiaService,
              private consultaGeneralService: ConsultaGeneralService,
              private config: DynamicDialogConfig) { 
    this.buildForm();
    this.idConsulta=this.config.data.idConsulta
  }

  ngOnInit(): void {
    this.getServicios()
    this.getListaInterconsulta();
  }
  buildForm(){
    this.interconsultaFG=new FormGroup({
      fecha:new FormControl(new Date(),Validators.required),
      motivo:new FormControl('',Validators.required),
      servicio:new FormControl('',Validators.required),
      urgencia:new FormControl('',Validators.required),
      
    })
  }
  getFC(control:string):AbstractControl{
    return this.interconsultaFG.get(control)
  }
  getServicios() {
    let idIpress = JSON.parse(localStorage.getItem("usuario")).ipress.idIpress;
    this.rolGuardiaService
      .getServiciosPorIpress(idIpress)
      .subscribe((res: any) => {
        this.listaServicios = res.object;
      });
  }
  getListaInterconsulta() {
    this.consultaGeneralService
      .listInterconsulta(this.idConsulta)
      .subscribe((r: any) => {
        this.listaInterconsulta = r.object;
      });
  }
  
  agregarInterconsulta(){
    if(this.interconsultaFG.invalid){
      Swal.fire({
        icon: "error",
        title: "Datos Requeridos",
        text: "Todos los datos son necesarios",
        showConfirmButton: false,
        timer: 1500,
      });
      return
    }
    const inputRequest={
      fecha:this.datePipe.transform(this.getFC('fecha').value,'yyyy-MM-dd'),
      motivo:this.getFC('motivo').value,
      servicio:this.getFC('servicio').value,
      nivelUrgencia:this.getFC('urgencia').value
    }
    
    this.consultaGeneralService .addInterconsulta(this.idConsulta, inputRequest)
    .subscribe((r: any) => {
      Swal.fire({
        icon: "success",
        title: "Agregado correctamente",
        text: "",
        showConfirmButton: false,
        timer: 1500,
      });
      this.getListaInterconsulta()
      this.interconsultaFG.reset()
    });
  }
  eliminarInterconsulta(rowData) {
    // this.listInterconsulta.splice(index, 1);
    // console.log();
    this.consultaGeneralService.deleteInterconsulta(this.idConsulta, rowData.idCupos).subscribe((r: any) => {
      Swal.fire({
        icon: "success",
        title: "Elemento eliminado",
        text: "",
        showConfirmButton: false,
        timer: 1500,
      });
        this.getListaInterconsulta()
      })
  }
  changeServicios(){

  }
  getNivel(rowData){
    const nivel= this.listaNivelUrgencia.find((item)=>{
        return rowData==item.code
    })
    return nivel.name
  }

}
