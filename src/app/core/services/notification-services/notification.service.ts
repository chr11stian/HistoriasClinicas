import { Injectable } from '@angular/core';
import {MessageService} from "primeng/api";

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  constructor(private messageService: MessageService) {
  }

  successNotification(message: string): void {
    this.messageService.add({
      severity: 'success',
      summary: 'Exito',
      detail: message
    })
  }

  errorNotification(message: string): void {
    this.messageService.add({
      severity: 'error',
      summary: 'Error',
      detail: message
    })
  }

  infoNotification(message: string): void {
    this.messageService.add({
      severity: 'info',
      summary: 'Información',
      detail: message
    })
  }
}
