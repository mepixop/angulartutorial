import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-messenger',
  templateUrl: './messenger.component.html',
  styleUrls: ['./messenger.component.css']
})
export class MessengerComponent {
  @Output() messenger = new EventEmitter<string>();

  onSayHello() {
    this.messenger.emit("Hello")
  }
  onSayName() {
    this.messenger.emit("my name is Blub")
  }

}
