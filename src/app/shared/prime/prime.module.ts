import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
// componentes a exportar
import { MenuModule } from "primeng/menu";
import { InputTextModule } from "primeng/inputtext";
import { InputTextareaModule } from "primeng/inputtextarea";
import { InputNumberModule } from "primeng/inputnumber";
import { ButtonModule } from "primeng/button";
import { PasswordModule } from "primeng/password";
import { PanelMenuModule } from "primeng/panelmenu";
import { MenubarModule } from "primeng/menubar";
import { TieredMenuModule } from "primeng/tieredmenu";
import { ConfirmDialogModule } from "primeng/confirmdialog";
import { AutoCompleteModule } from "primeng/autocomplete";
import { ChartModule } from "primeng/chart";
import { TableModule } from "primeng/table";
import { TagModule } from "primeng/tag";
import { TabViewModule } from "primeng/tabview";
import { DropdownModule } from "primeng/dropdown";
import { CardModule } from "primeng/card";
import { RatingModule } from "primeng/rating";
import { DialogModule } from "primeng/dialog";
import { RadioButtonModule } from "primeng/radiobutton";
import { MegaMenuModule } from "primeng/megamenu";
import { ToastModule } from "primeng/toast";
import { SelectButtonModule } from "primeng/selectbutton";

const importsApi = [
  DialogModule,
  InputNumberModule,
  RadioButtonModule,
  PanelMenuModule,
  MenubarModule,
  TieredMenuModule,
  ConfirmDialogModule,
  MenuModule,
  InputTextModule,
  InputTextareaModule,
  InputNumberModule,
  ButtonModule,
  PasswordModule,
  AutoCompleteModule,
  ChartModule,
  TableModule,
  TagModule,
  TabViewModule,
  DropdownModule,
  CardModule,
  RatingModule,
  TableModule,
  InputTextModule,
  DialogModule,
  ConfirmDialogModule,
  RatingModule,
  InputNumberModule,
  InputTextareaModule,
  RadioButtonModule,
  ButtonModule,
  MegaMenuModule,
  ToastModule,
  SelectButtonModule,
];

@NgModule({
  declarations: [],
  imports: [CommonModule],
  exports: [importsApi],
})
export class PrimeModule {}
