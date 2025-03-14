import { Component, computed, effect, EventEmitter, Input, input, output, Output, Signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { IUser } from '../../interfaces/iuser.interface';

@Component({
  selector: 'app-form-user',
  imports: [ReactiveFormsModule],
  templateUrl: './form-user.component.html',
  styleUrl: './form-user.component.css'
})
export class FormUserComponent {
  user = input<IUser | any>()
  operation = input<string>()
  sendFormEvent = output<IUser>()
  title: Signal<String> = computed(() => this.operation() === 'update' ? 'ACTUALIZAR USUARIO' : 'NUEVO USUARIO');
  btnName: Signal<String> = computed(() => this.operation() === 'update' ? 'Actualizar' : 'Guardar');
  userForm!: FormGroup

  constructor(){
    this.userForm = new FormGroup({
      first_name: new FormControl('', [Validators.required]),
      last_name: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required]),
      image: new FormControl('', [Validators.required])
    })

    effect(() => {
      if (this.user()) {
        this.updateForm(this.user());
      }
    });
  }

  sendData() {
    if (this.userForm.valid) {
      this.sendFormEvent.emit(this.userForm.value);
    }
  }

  updateForm(user: IUser) {
    this.userForm.patchValue({
      first_name: user.first_name,
      last_name: user.last_name,
      email: user.email,
      image: user.image
    });
  }

  hasError(field: string): boolean {
    let error = false
    if(this.userForm.controls[field].invalid && (this.userForm.controls[field].dirty || this.userForm.controls[field].touched)){
      error = true
    }
    return error
  }

  getMessageError(field: string) {
    return `El campo ${field} es obligatorio`
  }
}
