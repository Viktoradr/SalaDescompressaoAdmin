import { Injectable } from '@angular/core';
import PNotify from 'pnotify/dist/es/PNotify';
import PNotifyButtons from 'pnotify/dist/es/PNotifyButtons';

@Injectable({
    providedIn: 'root'
})
export class PNotifyProvider {

    constructor() { }

    getPNotify() {
        PNotifyButtons; // Initiate the module. Important!
        PNotify.defaults.styling = 'bootstrap4';
        return PNotify;
    }

    info(_title: string, _text: string) {
        this.getPNotify().info({
            title: _title,
            text: _text,
            hide: true,
            delay: 3000, 
        });
    }

    success(_title: string, _text: string) {
        this.getPNotify().success({
            title: _title,
            text: _text,
            hide: true,
            delay: 3000, 
        });
    }

    error(_title: string, _text: string) {
        this.getPNotify().error({
            title: _title,
            text: _text,
            hide: true,
            delay: 3000, 
        });
    }

    alert(_title: string, _text: string, _class: string = '', _icon: string = '') {
        this.getPNotify().alert({
            title: _title,
            text: _text,
            addclass: _class,
            icon: _icon,
            hide: true,
            delay: 3000, 
        });
    }
}