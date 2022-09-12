import { CuposService } from "./../../../core/services/cupos.service";
import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-tab-view",
  templateUrl: "./tab-view.component.html",
  styleUrls: ["./tab-view.component.css"],
})
export class TabViewComponent implements OnInit {
  constructor(private cupoService: CuposService) {}

  ngOnInit(): void {}
  handleChange(e) {
    this.cupoService.tab = e.index;
  }
}
