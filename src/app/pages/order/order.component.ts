import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl, ValidatorFn, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { FixOrderResultDto, OrderDto, OrderService } from '../../services/order.service';
// Angular Material
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatRadioModule } from '@angular/material/radio';


// Validador para garantir que o preço seja um múltiplo de 0.01:
export function multipleValidator(multiple: number): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } | null => {
    if (control.value == null) return null;

    const factor = 1 / multiple;
    const value = control.value;
    const isValid = Math.abs(Math.round(value * factor) - value * factor) < 1e-6;

    return isValid ? null : { 'multiple': { value: control.value } };
  };
}

@Component({
  selector: 'app-order-form',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatSnackBarModule,
    MatRadioModule
  ],
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss']
})
export class OrderComponent implements OnInit {
  orderForm!: FormGroup;
  responseMessage: string | null = null;
  isError: boolean = false;

  constructor(private readonly fb: FormBuilder, private readonly orderService: OrderService, private readonly snackBar: MatSnackBar) {}

  ngOnInit(): void {
    this.orderForm = this.fb.group({
      symbol: ['PETR4', Validators.required],
      side: ['Compra', Validators.required],
      quantity: [null, [Validators.required, Validators.min(1), Validators.max(99999)]],
      price: [null, [Validators.required, Validators.min(0.01), Validators.max(999), multipleValidator(0.01)]]
    });
  }

  onSubmit(): void {
    if (this.orderForm.valid) {
      const order: OrderDto = this.orderForm.value;
      this.orderService.sendOrder(order).subscribe({
        next: (res: FixOrderResultDto) => {
          if (res.status === 'REJEITADA') {
            this.snackBar.open(`❌ Ordem rejeitada: ${res.detail}`, 'Fechar', {
              duration: 5000,
              panelClass: ['snackbar-error']
            });
          } else {
            this.snackBar.open('✅ Ordem aceita com sucesso!', 'Fechar', {
              duration: 3000,
              panelClass: ['snackbar-success']
            });
          }
        },
        error: () => {
          this.snackBar.open('❗ Erro na requisição. Tente novamente.', 'Fechar', {
            duration: 4000,
            panelClass: ['snackbar-error']
          });
        }
      });
    }
  }
}
