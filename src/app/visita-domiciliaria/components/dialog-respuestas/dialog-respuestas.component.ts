import { Component, OnInit } from "@angular/core";
import { DynamicDialogRef, DynamicDialogConfig } from "primeng/dynamicdialog";

@Component({
  selector: "app-dialog-respuestas",
  templateUrl: "./dialog-respuestas.component.html",
  styleUrls: ["./dialog-respuestas.component.css"],
})
export class DialogRespuestasComponent implements OnInit {
  data:any []=[];
  display: boolean = true;
  constructor(
    private ref: DynamicDialogRef,
    public config: DynamicDialogConfig
  ) {
    config.data.edit === undefined ? this.data = config.data : this.data = config.data.data;
    console.log(this.data);
  }
  ngOnInit(): void {}

  getDate(date: string) {
    let dateString = new Date(date);
    return (
      dateString.getDate() +
      "/" +
      (dateString.getMonth() + 1) +
      "/" +
      dateString.getFullYear().toString().substring(2, 4)
    );
  }
}
