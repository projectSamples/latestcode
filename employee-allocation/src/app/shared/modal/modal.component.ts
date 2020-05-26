import {Component, ElementRef, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent implements OnInit {

  @Input() title: string;
  @Input() disable = false;
  @Input() showCA = true;
  @Output() apply = new EventEmitter<boolean>();

  constructor(private elRef: ElementRef) { }

  /**
   * Add an event listener to close the modal when clicking outside
   */
  ngOnInit() {
    this.elRef.nativeElement.addEventListener('click', (event: any) => {
      if (event.target.className === 'overlay') {
        this.cancel();
      }
    });
  }

  save() {
    this.apply.emit(true);
  }

  cancel() {
    this.apply.emit(false);
  }
}


