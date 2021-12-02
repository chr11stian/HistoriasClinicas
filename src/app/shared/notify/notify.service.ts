import { Injectable, TemplateRef } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class NotifyService {

  toasts: any[] = [];

  show(textOrTpl: string | TemplateRef<any>, options: any = {}) {
    this.toasts.push({ textOrTpl, ...options });
  }

  showExito(mensaje: string) {
    this.show(mensaje, {
      classname: "bg-success text-light"
    });
  }
  showError(mensaje: string) {
    this.show(mensaje, {
      classname: "bg-danger text-light"
    });
  }
  remove(toast) {
    this.toasts = this.toasts.filter(t => t !== toast);
  }

  constructor() { }
}
