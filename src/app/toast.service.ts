import { Injectable } from '@angular/core';
import { MessageService } from 'primeng/api';

@Injectable({
  providedIn: 'root',
})
export class ToastService {
  constructor(private messageService: MessageService) {}
  showSuccess(message: string, summary: string = 'Success') {
    this.messageService.add({
      severity: 'success',
      summary: summary,
      detail: message,
    });
  }

  showInfo(message: string, summary: string = 'Info') {
    this.messageService.add({
      severity: 'info',
      summary: summary,
      detail: message,
    });
  }

  showWarn(message: string, summary: string = 'Warning') {
    this.messageService.add({
      severity: 'warn',
      summary: summary,
      detail: message,
    });
  }

  showError(message: string, summary: string = 'Error') {
    this.messageService.add({
      severity: 'error',
      summary: summary,
      detail: message,
    });
  }
}
