import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { HisReportesComponent } from "./components/his-reportes/his-reportes.component";
import { reportesRoutingModule } from "./reportes-routing.module";
import { PrimeModule } from "../shared/prime/prime.module";
import { PdfViewerModule } from "ng2-pdf-viewer";
@NgModule({
    declarations: [HisReportesComponent],
    imports: [
        CommonModule,
        reportesRoutingModule,
        PrimeModule,
        PdfViewerModule
    ],
})
export class ReportesModule {}
