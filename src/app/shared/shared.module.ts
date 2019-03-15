import { NgModule } from '@angular/core';
import { BootstrapModule } from './plugins/boostrap.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ServicesModule } from './services/services.module';
import { ProvidersModule } from './providers/providers.module';
import { TextMaskModule } from 'angular2-text-mask';

@NgModule({
    imports: [
        FormsModule,
        ReactiveFormsModule,
        HttpClientModule,
        BootstrapModule,
        ServicesModule,
        ProvidersModule,
        TextMaskModule,
    ],
    exports: [
        FormsModule,
        ReactiveFormsModule,
        HttpClientModule,
        BootstrapModule,
        ServicesModule,
        ProvidersModule,
        TextMaskModule,
    ]
})
export class SharedModule { }