import { Component } from '@angular/core';
// import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faAngleDown } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'cms-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  faAngleDown = faAngleDown;

  // @Output() selectedFeatureEvent = new EventEmitter<string>();

  // onSelected(selectedEvent: string) {
  //   this.selectedFeatureEvent.emit(selectedEvent);
  // }
}
