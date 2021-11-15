import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-necesidades-parto",
  templateUrl: "./necesidades-parto.component.html",
  styleUrls: ["./necesidades-parto.component.css"],
})
export class NecesidadesPartoComponent implements OnInit {
  constructor() {}
  twoOptions: any[];
  ngOnInit(): void {
    this.twoOptions = [
      { value: "si", label: "si" },
      { value: "no", label: "no" },
    ];
  }
}
