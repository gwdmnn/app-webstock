import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { INovaPrevisao, IPrevisao } from 'src/interfaces/interface';
import { AuthService } from './login/auth.service';

@Injectable({
  providedIn: 'root'
})

export class PrevisaoService {
  previsoes: IPrevisao [] = [
    {
      idPrevisao: 0,
      dataPrevista: new Date(),
      ordem: "",
      quantidadePrevista: 0,
      finalizada: false,
      item: {
        descricao:"",
        estoqueSeguranca:0,
        familia:"",
        grupo:"",
        unidade:""
      },
      usuario: {
        email:"",
        perfil:"",
        senha:"",
        nome:""
      }
    }
  ]

  constructor(private http: HttpClient, private auth:AuthService) { }

  consultarPrevisoes(){
    return this.http.get<[IPrevisao]>("http://localhost:8081/previsoes", {
      headers: this.auth.getHeaderWithToken()
    });
  }

  consultarPrevisoesPorIdItem(idItem: number){
    
    if(isNaN(idItem)){
      throw Error("ID Inválido!")
    }

    return this.http.get<[IPrevisao]>(`http://localhost:8081/previsoes/iditem/${idItem}`, {
      headers: this.auth.getHeaderWithToken()
   });
  }
  cadastroPrevisao(prev:INovaPrevisao){
    return this.http.post<IPrevisao>(`http://localhost:8081/previsoes`, prev, {
      headers: this.auth.getHeaderWithToken()
    });
  }
}
