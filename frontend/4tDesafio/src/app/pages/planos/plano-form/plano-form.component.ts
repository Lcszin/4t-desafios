import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Plano } from '../../../models/plano.model'
import { PlanoService } from '../../../services/plano.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-plano-form',
  standalone: false,
  templateUrl: './plano-form.component.html',
  styleUrl: './plano-form.component.scss',
})
export class PlanoFormComponent {
  form: FormGroup;
  isEdicao = false;
  idPlano: number | null = null;
  constructor(
    private fb: FormBuilder,
    private planoService: PlanoService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.form = this.fb.group({
      nome: ['', [Validators.required, Validators.minLength(3)]],
      codigo_registro_ans: ['', [Validators.required]]
    });
  }

  get f() { return this.form.controls; }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if(id){
      this.isEdicao = true;
      this.idPlano = Number(id);
      this.carregarDados(this.idPlano);
    }
  }

  carregarDados(id: number): void {
    this.planoService.getPlanoById(id).subscribe({
      next: (plano) => {
        this.form.patchValue({
          nome: plano.nome,
          codigo_registro_ans: plano.codigo_registro_ans
        });
      },
      error: () => {
        this.mostrarErro('Erro ao carregar plano.');
        this.router.navigate(['/planos']);
      }
    });
  }
  salvar(): void {
    if (this.form.invalid) {
      return;
    }

    const plano: Plano = this.form.value;

    if (this.isEdicao && this.idPlano) {
      plano.id = this.idPlano;
      this.planoService.updatePlano(plano).subscribe({
        next: () => {
          Swal.fire({
            title: 'Sucesso!',
            text: 'Plano atualizado com sucesso.',
            icon: 'success',
            timer: 1500,
            showConfirmButton: false
          }).then(() => this.router.navigate(['/planos']));
        },
        error: () => this.mostrarErro('Erro ao atualizar plano.')
      });
    } else {
      this.planoService.createPlano(plano).subscribe({
    next: () => {
      Swal.fire({
        title: 'Sucesso!',
        text: 'Plano salvo com sucesso.',
        icon: 'success',
        timer: 1500,
        showConfirmButton: false
      }).then(() => {
        this.router.navigate(['/planos']);
      });
    },
    error: () => this.mostrarErro('Erro ao salvar plano')
  });
    }
  }

  cancelar(): void {
    this.router.navigate(['/planos']);
  }

  private mostrarErro(mensagem: string) {
    Swal.fire('Erro!', mensagem, 'error');
  }
}
