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
import { CalendarModule } from "primeng/calendar";
import { StepsModule } from "primeng/steps";
import { CheckboxModule } from "primeng/checkbox";
import { ToolbarModule } from "primeng/toolbar";
import { FieldsetModule } from "primeng/fieldset";
import { PanelModule } from "primeng/panel";
import { ReactiveFormsModule } from "@angular/forms";
import { AccordionModule } from 'primeng/accordion';
import { DynamicDialogModule } from 'primeng/dynamicdialog';
import { DividerModule } from 'primeng/divider';
import { SplitterModule } from 'primeng/splitter';
import {MessagesModule} from 'primeng/messages';
import {MessageModule} from 'primeng/message';

const importsApi = [
  MessagesModule,
  MessageModule,
  ToolbarModule,
  SelectButtonModule,
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
  CalendarModule,
  StepsModule,
  CheckboxModule,
  ToolbarModule,
  FieldsetModule,
  PanelModule,
  ReactiveFormsModule,
  ToolbarModule,
  FieldsetModule,
  AccordionModule,
  DynamicDialogModule,
  DividerModule,
  SplitterModule
];

@NgModule({
  declarations: [],
  imports: [CommonModule],
  exports: [importsApi],
})
export class PrimeModule {}
