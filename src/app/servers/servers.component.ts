import { Component } from '@angular/core';

@Component({
  selector: 'app-servers',
  templateUrl: './servers.component.html',
  styleUrls: ['./servers.component.css']
})
export class ServersComponent {
  allowNewServer: boolean = false
  serverCreationStatus: string = 'no server was created'
  serverName: string = 'Testserver'

  validName: boolean = false
  personCreationStatus: string = 'noone has been created'
  personName: string = ''

  constructor() {
    setTimeout(() => {
      this.allowNewServer = true
    }, 2000)
  }

  onCreateServer() {
    this.serverCreationStatus = 'following server was created ' + this.serverName
  }

  onUpgradeServerName(event: any) {
    this.serverName = (<HTMLInputElement>event.target).value;
  }

  checkValidName(event: Event) {
    if (this.personName.length > 0) {
      this.validName = true
    }
    else {
      this.validName = false
    }
  }

  onAddName() {
    this.personCreationStatus = 'has been created ' + this.personName
    this.personName = ''
  }
}
