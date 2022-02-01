import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { OfertasService } from 'src/app/core/services/ofertas/ofertas.service';
import { IpressService } from 'src/app/core/services/ipress/ipress.service'
import { RolGuardiaService } from 'src/app/core/services/rol-guardia/rol-guardia.service';
@Component({
  selector: 'app-ofertas',
  templateUrl: './ofertas.component.html',
  styleUrls: ['./ofertas.component.css']
})
export class OfertasComponent implements OnInit {

  form: FormGroup;
  formOfertas: FormGroup;
  ofertasDialog: boolean = false;
  data: any[];
  fecha: Date = new Date();
  datePipe = new DatePipe("en-US");
  idIpress: String ="";
  nombreIpress: String ="";
  servicios: any[];
  ofertaSeleccionada: any;
  horas : any;
  buscoPorDoc: boolean = false;

  constructor(
    private ofertasService: OfertasService,
    private rolGuardiaService: RolGuardiaService,
    private formBuilder: FormBuilder,
    private messageService: MessageService
  ) {
    this.buildForm();
    this.idIpress = "616de45e0273042236434b51";
    this.nombreIpress = "la posta medica";
    this.data = [];
    this.servicios = [];
    this.horas = [];
    this.form.get('fechaFiltro').setValue(this.fecha);
    this.getListaServiciosXIpress();
    this.getListaOfertasXServicio();
  }

  buildForm() {
    this.form = this.formBuilder.group({
      fechaFiltro: [new Date()],
      servicio: [""],
      nroDoc: [""],
    })
    this.formOfertas = this.formBuilder.group({
      nroDoc: [""],
      nombre: [""],
      servicio: [""],
      fecha: [""],
      ambiente: [''],
      nroOfertasActuales: [''],
      nroOfertasAgregar: ['', [Validators.required]]
    })
  }
  /**lista los Servicios por IPRESS**/
  getListaServiciosXIpress() {
    this.rolGuardiaService.getServiciosPorIpress(this.idIpress).subscribe((res: any) => {
      this.servicios = res.object;
      console.log('LISTA DE SERVICIOS DE  IPRESS', this.servicios);
    })
  }


  getListaOfertasXServicio() {
    this.buscoPorDoc= false;
    let data = {
      fechaOferta: this.form.value.fechaFiltro,
      nombreIpress: this.nombreIpress,
      servicio: this.form.value.servicio
    }
    console.log('DATA ', data);

    this.ofertasService.listarOfertasXservicio(data).subscribe((res: any) => {
      this.data = res.object;
      console.log('LISTA OFERTAS X SERVICIO', this.data);
    })
  }

  getListaOfertaXDocumento(){
    this.buscoPorDoc= true;
    let data = {
      tipoDoc: "DNI",
      nroDoc: this.form.value.nroDoc,
      nombreIpress: this.nombreIpress,
    }
    console.log('DATA ', data);

    this.ofertasService.buscarOfertaXPersonal(data).subscribe((res: any) => {
      this.data = res.object;
      console.log('LISTA OFERTAS X DNI', this.data);
    })
  }

  cancelar() {
    this.ofertasDialog = false;
    this.ofertaSeleccionada = {};
    this.showError();
  }

  showSuccess() {
    this.messageService.add({ severity: 'success', summary: 'Generado', detail: 'Oferta generada correctamente' });
  }
  showError() {
    this.messageService.add({ severity: 'error', summary: 'Cancelado', detail: 'Acción cancelada' });
  }

  openNewOfertaAgregar(data){
    this.ofertasDialog=true;
    this.ofertaSeleccionada = data;
    this.horas=this.ofertaSeleccionada.horasCupo;
    this.formOfertas.reset();
    this.formOfertas.get('nroDoc').setValue(data.personal.nroDoc);
    this.formOfertas.get('nombre').setValue(data.personal.nombre);
    this.formOfertas.get('servicio').setValue(data.ipress.servicio);
    this.formOfertas.get('fecha').setValue(data.fechaOferta);
    this.formOfertas.get('ambiente').setValue(data.ambiente);
    this.formOfertas.get('nroOfertasActuales').setValue(data.totalOfertas);
    this.formOfertas.get('nroOfertasAgregar').setValue("");
  }
  guardarOfertasExtra(){
    let data = {
      idOferta: this.ofertaSeleccionada.id,
      nroCupos: this.formOfertas.value.nroOfertasAgregar
    }
    this.ofertasService.agregarOfertasAunaLista(data).subscribe((res: any) => {
      this.showSuccess();
      this.ofertasDialog = false;
      this.ofertaSeleccionada = {};
      console.log('rpta', res.object);
      if (this.buscoPorDoc) this.getListaOfertaXDocumento();
      else this.getListaOfertasXServicio();
    })
  }
  ngOnInit(): void {
  }

}
