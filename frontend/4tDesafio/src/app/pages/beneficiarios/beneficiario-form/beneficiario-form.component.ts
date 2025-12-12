import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { BeneficiarioService } from '../../../services/beneficiario.service';
import { PlanoService } from '../../../services/plano.service';
import { Beneficiario } from '../../../models/beneficiario.model';
import { Plano } from '../../../models/plano.model';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-beneficiario-form',
  templateUrl: './beneficiario-form.component.html',
  styleUrls: ['./beneficiario-form.component.scss'],
  standalone: false
})
export class BeneficiarioFormComponent implements OnInit {
  form: FormGroup;
  isEdicao = false;
  idBeneficiario: number | null = null;
  listaPlanos: Plano[] = [];
  get f() {
    return this.form.controls;
  }

  constructor(
    private fb: FormBuilder,
    private beneficiarioService: BeneficiarioService,
    private planoService: PlanoService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.form = this.fb.group({
      nome_completo: ['', [Validators.required]],
      cpf: ['', [Validators.required]],
      data_nascimento: ['', [Validators.required]],
      status: ['ATIVO', [Validators.required]],
      plano_id: ['', [Validators.required]]
    });
  }

  ngOnInit(): void {
    this.carregarPlanos();
    
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.isEdicao = true;
      this.idBeneficiario = Number(id);
      this.carregarDadosBeneficiario(this.idBeneficiario);
    }
  }

  carregarPlanos(): void {
    this.planoService.getPlanos().subscribe(planos => {
      this.listaPlanos = planos;
    });
  }

  carregarDadosBeneficiario(id: number): void {
    this.beneficiarioService.getBeneficiarioById(id).subscribe({
      next: (dados) => this.form.patchValue(dados),
      error: () => {
        this.mostrarErro('Beneficiário não encontrado.');
        this.router.navigate(['/beneficiarios']);
      }
    });
  }

  salvar(): void {
    if (this.form.invalid) return;
    const dadosForm = {
      ...this.form.value,
      plano_id: Number(this.form.value.plano_id)
    };
    const observer = {
    next: () => this.mostrarSucesso(this.isEdicao ? 'Beneficiário atualizado!' : 'Beneficiário criado!'),
    error: () => this.mostrarErro('Ocorreu um erro ao salvar.')
  };
    if (this.isEdicao && this.idBeneficiario) {
      const beneficiario: Beneficiario = { id: this.idBeneficiario, ...dadosForm };
      this.beneficiarioService.updateBeneficiario(beneficiario).subscribe(observer);
    } else {
      this.beneficiarioService.createBeneficiario(dadosForm).subscribe(observer);
    }
  }

  cancelar(): void {
    this.router.navigate(['/beneficiarios']);
  }

  private mostrarSucesso(mensagem: string) {
    Swal.fire({
      title: 'Sucesso!',
      text: mensagem,
      icon: 'success',
      timer: 1500,
      showConfirmButton: false
    }).then(() => {
      this.router.navigate(['/beneficiarios']);
    });
  }
  private mostrarErro(mensagem: string) {
    Swal.fire('Erro!', mensagem, 'error');
  }
}