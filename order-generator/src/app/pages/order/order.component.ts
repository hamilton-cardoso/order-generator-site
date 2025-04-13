import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl, ValidatorFn, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

// Import dos módulos do Angular Material que vamos utilizar:
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';

// Validador customizado para garantir que o preço seja um múltiplo de 0.01:
export function multipleValidator(multiple: number): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } | null => {
    if (control.value == null) return null;
    // Multiplica o valor por 100 e verifica se o resultado é inteiro:
    return Number.isInteger(control.value * 100)
      ? null
      : { 'multiple': { value: control.value } };
  };
}

@Component({
  selector: 'app-order-form',
  standalone: true,
  // Incluímos os módulos necessários para o componente:
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule
  ],
  templateUrl: './order.component.html',
  // Corrigido: usamos "styleUrls" (array) em vez de "styleUrl"
  styleUrls: ['./order.component.scss']
})
export class OrderComponent implements OnInit {
  orderForm!: FormGroup;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    // Inicializamos o formulário com os campos necessários e as validações:
    this.orderForm = this.fb.group({
      symbol: ['PETR4', Validators.required],
      side: ['Compra', Validators.required],
      quantity: [null, [Validators.required, Validators.min(1), Validators.max(99999)]],
      price: [null, [Validators.required, Validators.min(0.01), Validators.max(999), multipleValidator(0.01)]]
    });
  }

  onSubmit(): void {
    if (this.orderForm.valid) {
      // Aqui você pode processar ou enviar os dados da ordem
      console.log('Dados da ordem:', this.orderForm.value);
    } else {
      console.log('Formulário inválido.');
    }
  }
}
