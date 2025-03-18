import { Component, ElementRef, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import {Modal} from 'bootstrap'

@Component({
  selector: 'app-modal',
  imports: [],
  templateUrl: './modal.component.html',
  styleUrl: './modal.component.css'
})
export class ModalComponent {
  @Input() username!: string | any
  @Output() acceptEmit: EventEmitter<Boolean> = new EventEmitter()

  @ViewChild('myModal', { static: false}) modalElement!: ElementRef;
  private modalInstance!: Modal;

  accept() {
    console.log("Aceptar elimina desde modal")
    this.acceptEmit.emit(true)
  }

  open(){
    if(this.modalElement){
      this.modalInstance = new Modal(this.modalElement.nativeElement)
      this.modalInstance.show()
    }
  }

  close() {
    if(this.modalInstance){
      this.modalInstance.hide()
    }
  }
}
