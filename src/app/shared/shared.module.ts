import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GraphicComponent } from './components/graphic/graphic.component';
import {NgxEchartsModule} from 'ngx-echarts';
import { SelectBtnComponent } from './components/select-btn/select-btn.component'
import {PrimeModule} from './prime/prime.module';
import { CalendarPAIComponent } from './components/calendar-pai/calendar-pai.component'



@NgModule({
    declarations: [
        GraphicComponent,
        SelectBtnComponent,
        CalendarPAIComponent
    ],
    exports: [
        GraphicComponent,
        SelectBtnComponent
    ],
    imports: [
        CommonModule,
        NgxEchartsModule,
        PrimeModule
    ]
})
export class SharedModule { }
