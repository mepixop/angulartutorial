import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-alert-popup',
  templateUrl: './alert-popup.component.html',
  styleUrls: ['./alert-popup.component.css']
})
export class AlertPopupComponent {
  @Input() message: string;
  @Output() closeComponent = new EventEmitter<void>();

  closeMsg() {
    this.closeComponent.emit();
  }
}
