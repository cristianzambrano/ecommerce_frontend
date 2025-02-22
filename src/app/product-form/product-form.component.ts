import { Component, Inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog'; // Importa MAT_DIALOG_DATA
import { MatSnackBar } from '@angular/material/snack-bar';
import { ProductService, Product } from '../services/product.service';

@Component({
  selector: 'app-product-form',
  standalone: true,
  imports: [FormsModule], // Importa FormsModule
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css'],
})
export class ProductFormComponent {
  isEditMode: boolean = false; // Indica si el formulario está en modo edición
  product: Product = {
    id: '',
    nombre: '',
    categoria: '',
    valor: 0,
  };

  constructor(
    private productService: ProductService,
    private snackBar: MatSnackBar,
    private dialogRef: MatDialogRef<ProductFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { product: Product } // Recibe los datos del producto a editar
  ) {
    if (data && data.product) {
      this.isEditMode = true; // Activa el modo edición
      this.product = { ...data.product }; // Copia los datos del producto
    }
  }

  // Método para guardar el producto
  onSubmit(): void {
    if (this.isEditMode) {
      this.productService.updateProduct(this.product.id, this.product).subscribe({
        next: () => {
          this.snackBar.open('Producto actualizado correctamente', 'Cerrar', {
            duration: 3000,
          });
          this.dialogRef.close(true); // Cierra el modal y devuelve true
        },
        error: (err) => {
          this.snackBar.open('Error al actualizar el producto', 'Cerrar', {
            duration: 3000,
          });
          console.error(err);
        },
      });
    } else {
      this.productService.createProduct(this.product).subscribe({
        next: () => {
          this.snackBar.open('Producto creado correctamente', 'Cerrar', {
            duration: 3000,
          });
          this.dialogRef.close(true); // Cierra el modal y devuelve true
        },
        error: (err) => {
          this.snackBar.open('Error al crear el producto', 'Cerrar', {
            duration: 3000,
          });
          console.error(err);
        },
      });
    }
  }

  // Método para cerrar el modal sin guardar
  onCancel(): void {
    this.dialogRef.close(false); // Cierra el modal y devuelve false
  }
}