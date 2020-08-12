import { Component, OnInit } from '@angular/core';
import { Aluno } from '../../../common/aluno';
import { AlunoService } from './aluno.service';


  @Component({
   selector: 'app-root',
   templateUrl: './alunos.component.html',
   styleUrls: ['./alunos.component.css']
 })
 export class AlunosComponent implements OnInit {

    aluno: Aluno = new Aluno();
    alunos: Aluno[] = [];
    cpfduplicado: boolean = false;
    githubduplicado: boolean = false;

    constructor(private alunoService: AlunoService) {}

     criarAluno(a: Aluno): void {
       this.alunoService.criar(a)
              .subscribe(
                ar => {
                  if (ar) {
                    this.alunos.push(ar);
                    this.aluno = new Aluno();
                  } else {
                    if (this.alunos.find(al => al.cpf == a.cpf) && this.alunos.find(al => al.GitHub == a.GitHub)) {
                      this.cpfduplicado = true;
                      this.githubduplicado = true;
                    } else if (this.alunos.find(al => al.GitHub == a.GitHub)) {
                      this.githubduplicado = true;
                    } else if (this.alunos.find(al => al.cpf == a.cpf)) {
                      this.cpfduplicado = true;
                    }
                  } 
                },
                msg => { alert(msg.message); }
              );
    } 

      removerAluno(a: Aluno): void {
        // var index = this.alunos.indexOf(a);
        // this.alunos.splice(index, 1);
        this.alunoService.remover(a)
                .subscribe(
                  ar => {
                  if (ar) {
                    var index = this.alunos.indexOf(ar);
                    this.alunos.splice(index, 1);
                  }
                },
                msg => { alert(msg.message);}
                ); 
      }

    onMove(): void {
       this.cpfduplicado = false;
       this.githubduplicado = false;
    }

     ngOnInit(): void {
       this.alunoService.getAlunos()
             .subscribe(
               as => { this.alunos = as; },
               msg => { alert(msg.message); }
              );
     }

  }