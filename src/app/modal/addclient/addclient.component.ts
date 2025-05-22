import { Component, Output, EventEmitter} from '@angular/core';

@Component({
  selector: 'app-addclient',
  standalone: false,
  templateUrl: './addclient.component.html',
  styleUrl: './addclient.component.css'
})
export class AddclientComponent {
  @Output() onClose = new EventEmitter<void>();

  close() {
    this.onClose.emit();
  }

}
