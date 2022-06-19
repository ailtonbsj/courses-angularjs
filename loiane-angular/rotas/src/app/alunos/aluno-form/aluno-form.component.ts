import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { AlunosService } from '../alunos.service';
import * as M from 'materialize-css';

@Component({
  selector: 'app-aluno-form',
  templateUrl: './aluno-form.component.html',
  styleUrls: ['./aluno-form.component.css']
})
export class AlunoFormComponent implements OnInit {

  router: Subscription = Subscription.EMPTY;
  currAluno: any = null;
  formHasChanged = false;

  get aluno() {
    M.updateTextFields();
    return this.currAluno;
  }

  set aluno(val) {
    this.currAluno = val;
  }

  constructor(private activedRoute: ActivatedRoute, private alunosService: AlunosService) { }

  ngOnInit(): void {
    this.router = this.activedRoute.params.subscribe(param => {
      this.aluno = this.alunosService.getAluno(+param['id']);
    });
  }

  ngDestroy() {
    this.router.unsubscribe();
  }

  saveAluno() {
    alert(this.alunosService.setAluno(this.aluno));
  }

  changedForm() {
    this.formHasChanged = true;
  }

}
