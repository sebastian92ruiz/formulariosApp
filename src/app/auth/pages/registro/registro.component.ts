import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { nombreApellidoPattern, emailPattern, noPuedeSerStrider } from '../../../shared/validators/validaciones';
import { ValidatorsService } from 'src/app/shared/validators/validators.service';
import { EmailValidatorService } from '../../../shared/validators/email-validator.service';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styles: [
  ]
})
export class RegistroComponent implements OnInit {

  miFormulario: FormGroup = this.fb.group({
    nombre: ['', [Validators.required, Validators.pattern(this.vs.nombreApellidoPattern)]],
    email: ['', [Validators.required, Validators.pattern(this.vs.emailPattern)], [this.emailValidator]],
    username: ['', [Validators.required, this.vs.noPuedeSerStrider]],
    password: ['', [Validators.required, Validators.minLength(6)]],
    password2: ['', [Validators.required]],
  }, {
    validators: [ this.vs.camposIguales('password','password2') ]
  })

  constructor( private fb: FormBuilder,
               private vs: ValidatorsService,
               private emailValidator: EmailValidatorService ) { }

  ngOnInit(): void {
    this.miFormulario.reset({
      nombre: 'Sebastian Ruiz',
      email: 'test1@test.com',
      username: 'sebas9201',
      password: '123456',
      password2: '123456',
    })
  }

  campoNoValido(campo: string) {
    return this.miFormulario.get(campo)?.invalid
            && this.miFormulario.get(campo)?.touched;
  }

  get emailErrorMSG(): string {
    const errors= this.miFormulario.get('email')?.errors;
    if(errors?.['required']){
      return 'El correo es obligatorio'
    }
    if(errors?.['pattern']){
      return 'Escribe un correo con @ y final.com etc'
    }
    if(errors?.['emailTomado']){
      return 'Este correo ya está en uso'
    }
 
    return ''
  }

  summitFormulario() {
    console.log(this.miFormulario.value);
    this.miFormulario.markAllAsTouched();
  }

}
