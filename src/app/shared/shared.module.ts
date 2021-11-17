import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {GraphicComponent} from './components/graphic/graphic.component';
import {NgxEchartsModule} from "ngx-echarts";


@NgModule({
    declarations: [
        GraphicComponent
    ],
    exports: [
        GraphicComponent
    ],
    imports: [
        CommonModule,
        NgxEchartsModule
    ]
})
export class SharedModule {
}
