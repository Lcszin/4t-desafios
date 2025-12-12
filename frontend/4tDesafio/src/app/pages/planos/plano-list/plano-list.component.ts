import { Component } from '@angular/core';
import { Plano } from '../../../models/plano.model';
import { PlanoService } from '../../../services/plano.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-plano-list',
  standalone: false,
  templateUrl: './plano-list.component.html',
  styleUrl: './plano-list.component.scss',
})
export class PlanoListComponent {
  planos: Plano[] = [];

  constructor(private planoService: PlanoService) {  }

  ngOnInit() : void {
    this.carregarPlanos();
  }

  carregarPlanos(): void {
    this.planoService.getPlanos().subscribe({
      next: (dados) => {
        this.planos = dados;
      },
      error: (erro) => {
        console.error('Erro ao buscar planos', erro);
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Não foi possível carregar os planos. Tente novamente mais tarde.',
          toast: true,
          position: 'top-end',
          showConfirmButton: false,
          timer: 4000
        });
      }
    });
  }

  deletarPlano(id: number): void {
    Swal.fire({
          title: 'Tem certeza?',
          text: "Você não poderá reverter isso!",
          icon: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#d33',
          cancelButtonColor: '#3085d6',
          confirmButtonText: 'Sim, excluir!',
          cancelButtonText: 'Cancelar'
        }).then((result) => {
          if (result.isConfirmed) {
            this.planoService.deletePlano(id).subscribe({
              next: () => {
                this.planos = this.planos.filter(b => b.id !== id);
                Swal.fire('Excluído!', 'O plano foi removido.', 'success');
              },
              error: () => Swal.fire('Erro!', 'Erro ao excluir Plano.', 'error')
            });
          }
        });
  }
}
