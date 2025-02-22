import { Component, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductService, Product } from '../services/product.service';
import { HttpClientModule } from '@angular/common/http';
import { MatTableModule, MatTableDataSource } from '@angular/material/table';
import { MatPaginatorModule, MatPaginator } from '@angular/material/paginator';
import { MatSortModule, MatSort } from '@angular/material/sort';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatDialog, MatDialogModule } from '@angular/material/dialog'; // Importa MatDialog
import { ProductFormComponent } from '../product-form/product-form.component'; // Importa el formulario

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [
    CommonModule,
    HttpClientModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatButtonModule,
    MatIconModule,
    MatSnackBarModule,
    ProductFormComponent, // Importa el componente del formulario
  ],
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css'],
})
export class ProductListComponent implements OnInit {
  displayedColumns: string[] = ['id', 'nombre', 'categoria', 'valor', 'acciones'];
  dataSource = new MatTableDataSource<Product>();

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private productService: ProductService,
    private snackBar: MatSnackBar,
    private dialog: MatDialog // Inyecta MatDialog
  ) {}

  ngOnInit(): void {
    this.cargarProductos();
  }

  cargarProductos(): void {
    this.productService.getProducts().subscribe((data) => {
      this.dataSource.data = data;
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

  eliminarProducto(id: string): void {
    if (confirm('¿Estás seguro de que deseas eliminar este producto?')) {
      this.productService.deleteProduct(id).subscribe({
        next: () => {
          this.snackBar.open('Producto eliminado correctamente', 'Cerrar', {
            duration: 3000,
          });
          this.cargarProductos();
        },
        error: (err) => {
          this.snackBar.open('Error al eliminar el producto', 'Cerrar', {
            duration: 3000,
          });
          console.error(err);
        },
      });
    }
  }

    // Método para abrir el modal de editar producto
    editarProducto(product: Product): void {
      const dialogRef = this.dialog.open(ProductFormComponent, {
        width: '400px', // Ancho del modal
        data: { product }, // Pasa el producto a editar
      });

      // Escucha el resultado del modal
      dialogRef.afterClosed().subscribe((result) => {
        if (result) {
          this.cargarProductos(); // Recargar la lista de productos si se actualizó un producto
        }
      });
    }

  // Método para manejar la creación de un nuevo producto
  onProductCreated(): void {
    this.cargarProductos(); // Recargar la lista de productos
  }

  // Método para abrir el modal de agregar producto
openAddProductDialog(): void {
  const dialogRef = this.dialog.open(ProductFormComponent, {
    width: '400px', // Ancho del modal
  });

  // Escucha el resultado del modal
  dialogRef.afterClosed().subscribe((result) => {
    if (result) {
      this.cargarProductos(); // Recargar la lista de productos si se creó un producto
    }
  });
}
}