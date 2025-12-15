import { Component, OnInit } from '@angular/core';
import { BeneficiarioService } from '../../../services/beneficiario.service';
import { PlanoService } from '../../../services/plano.service';
import { Beneficiario } from '../../../models/beneficiario.model';
import { Plano } from '../../../models/plano.model';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-beneficiario-list',
  templateUrl: './beneficiario-list.component.html',
  styleUrls: ['./beneficiario-list.component.scss'],
  standalone: false
})
export class BeneficiarioListComponent implements OnInit {
  beneficiarios: Beneficiario[] = [];
  planos: Plano[] = [];
  
  filtroStatus: string = 'Todos';
  filtroPlano: string = '';

  constructor(
    private beneficiarioService: BeneficiarioService,
    private planoService: PlanoService
  ) {}

  ngOnInit(): void {
    this.carregarPlanos();
    this.buscarBeneficiarios();
  }

  carregarPlanos(): void {
    this.planoService.getPlanos().subscribe(dados => this.planos = dados);
  }

  buscarBeneficiarios(): void {
    const planoIdNumber = this.filtroPlano ? Number(this.filtroPlano) : undefined;
    
    this.beneficiarioService.getBeneficiarios(this.filtroStatus, planoIdNumber).subscribe({
      next: (dados) => {
        this.beneficiarios = dados;
      },
      error: () => this.mostrarErro('Erro ao buscar beneficiários.')
    });
  }

  deletarBeneficiario(id: number): void {
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
        this.beneficiarioService.deleteBeneficiario(id).subscribe({
          next: () => {
            this.beneficiarios = this.beneficiarios.filter(b => b.id !== id);
            Swal.fire('Excluído!', 'O beneficiário foi removido.', 'success');
          },
          error: () => this.mostrarErro('Erro ao excluir beneficiário.')
        });
      }
    });
  }

  filtrar(): void {
    this.buscarBeneficiarios();
  }

  private mostrarErro(mensagem: string) {
      Swal.fire('Erro!', mensagem, 'error');
    }
}