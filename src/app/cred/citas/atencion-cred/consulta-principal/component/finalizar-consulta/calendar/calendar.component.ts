import { Component, DoCheck, OnInit } from "@angular/core";
import esLocale from "@fullcalendar/core/locales/es";
import {
  CalendarOptions,
  DateSelectArg,
  EventInput,
  EventClickArg,
  EventApi,
} from "@fullcalendar/angular";
import Swal from "sweetalert2";
import { FormBuilder, FormControl, FormGroup } from "@angular/forms";
import { DialogService, DynamicDialogRef } from "primeng/dynamicdialog";
import { DatePipe } from "@angular/common";
import { FinalizarConsultaService } from "../../../services/finalizar-consulta.service";
import { dato } from "../../../../../models/data";

interface event {
  title: string;
  start: string | Date;
}

@Component({
  selector: "app-calendar",
  templateUrl: "./calendar.component.html",
  styleUrls: ["./calendar.component.css"],
  providers: [DialogService],
})
export class CalendarComponent implements OnInit, DoCheck {
  attributeLocalS = "documento";
  data: dato;
  datePipe = new DatePipe("en-US");
  fecha: Date = new Date();
  dateSelect: DateSelectArg;
  dialogAcuerdos: boolean;
  title: string = "";
  formAcuerdos: FormGroup;
  ref: DynamicDialogRef;
  calendarVisible = true;
  event: event[] = [];
  proxCita: string = "";
  calendarOptions: CalendarOptions = {
    initialEvents: this.planService.list,
    headerToolbar: {
      left: "prev,next today",
      center: "title",
      right: "listYear,dayGridMonth,timeGridWeek,timeGridDay",
    },
    locale: esLocale,
    initialView: "listYear", // alternatively, use the `events` setting to fetch from a feed
    weekends: true,
    editable: true,
    selectable: true,
    selectMirror: true,
    dayMaxEvents: true,
    select: this.handleDateSelect.bind(this),
    eventsSet: this.handleEvents.bind(this),
    /* you can update a remote database when these fire:
        eventAdd:
        eventChange:
        eventRemove:
        */
  };

  currentEvents: EventApi[] = [];

  constructor(
    private formBuilder: FormBuilder,
    private dialog: DialogService,
    private planService: FinalizarConsultaService
  ) {}

  ngOnInit(): void {
    this.data = <dato>JSON.parse(localStorage.getItem(this.attributeLocalS));
    this.formAcuerdos = this.formBuilder.group({
      hour: new FormControl(""),
      descripcionAcuerdo: new FormControl("", []),
    });
  }

  cancel() {
    Swal.fire({
      icon: "warning",
      title: "Cancelado...",
      text: "",
      showConfirmButton: false,
      timer: 1000,
    });
    this.dialogAcuerdos = false;
  }

  save() {
    let title = this.formAcuerdos.value.descripcionAcuerdo;
    //const title = prompt('Please enter a new title for your event');
    const calendarApi = this.dateSelect.view.calendar;
    let aux =
      this.dateSelect.startStr +
      this.datePipe.transform(this.formAcuerdos.value.hour, "THH:mm");
    calendarApi.unselect(); // clear date selection
    this.proxCita = this.dateSelect.endStr;
    if (title) {
      calendarApi.addEvent({
        title,
        start: aux,
      });
    }
    this.event.push({
      title: title,
      start: this.dateSelect.startStr,
    });
    //console.log(this.event);
    /*this.currentEvents.map((aux: any) => {
            console.log(aux._def.title)
            console.log(aux._instance.range.end)
        })*/
    this.dialogAcuerdos = false;
  }

  handleDateSelect(selectInfo: DateSelectArg) {
    this.dateSelect = selectInfo;
    this.formAcuerdos.reset();
    this.formAcuerdos.get("descripcionAcuerdo").setValue("");
    this.dialogAcuerdos = true;
    //let title = this.title
  }

  ngDoCheck() {
    if (this.proxCita !== "") {
      this.planService.proxCita = this.proxCita;
    }
  }

  handleEvents(events: EventApi[]) {
    this.currentEvents = events;
  }

  input() {
    this.formAcuerdos.reset();
    this.formAcuerdos.get("descripcionAcuerdo").setValue("");
    this.dialogAcuerdos = true;
  }
}

