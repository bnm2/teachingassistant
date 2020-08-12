import { Aluno } from '../common/aluno';

export class CadastroDeAlunos {
   alunos: Aluno[] = [];

    cadastrar(aluno: Aluno): Aluno {
     var result = null;
     if (this.cpfNaoCadastrado(aluno.cpf) && this.githubNaoCadastrado(aluno.GitHub)) {
       result = new Aluno();
       result.copyFrom(aluno);
       this.alunos.push(result);
     }
     return result;
   }
    remover(aluno: Aluno): Aluno {
      var result: Aluno = this.alunos.find(a => a.cpf == aluno.cpf);
      var index = this.alunos.indexOf(result);
      this.alunos.splice(index, 1);
      return result;
    }
    cpfNaoCadastrado(cpf: string): boolean {
      return !this.alunos.find(a => a.cpf == cpf);
   }
   
   githubNaoCadastrado(GitHub: string): boolean {
     return !this.alunos.find(a => a.GitHub == GitHub);
   }
    atualizar(aluno: Aluno): Aluno {
     var result: Aluno = this.alunos.find(a => a.cpf == aluno.cpf);
     if (result) result.copyFrom(aluno);
     return result;
   }

    getAlunos(): Aluno[] {
     return this.alunos;
   }
}