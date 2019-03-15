import { NgModule } from '@angular/core';
import { ButtonsModule, BsDropdownModule, CollapseModule, BsDatepickerModule, ModalModule, TabsModule, TooltipModule, AccordionModule, TimepickerModule, PopoverModule } from 'ngx-bootstrap';

@NgModule({
    imports: [
        ButtonsModule.forRoot(),
        BsDropdownModule.forRoot(),
        CollapseModule.forRoot(),
        ModalModule.forRoot(),
        TabsModule.forRoot(),
        TooltipModule.forRoot(),
        PopoverModule.forRoot(),
        //BsDatepickerModule.forRoot(),
        AccordionModule.forRoot(),
        TimepickerModule.forRoot()
    ],
    exports: [
        ButtonsModule,
        BsDropdownModule,
        CollapseModule,
        ModalModule,
        TabsModule,
        TooltipModule,
        PopoverModule,
        //BsDatepickerModule,
        AccordionModule,
        TimepickerModule
    ]
})
export class BootstrapModule { }