import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError as observableThrowError} from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { TeamModel } from 'src/app/models/team.model';

@Injectable({
  providedIn: 'root'
})
export class TeamService {

  private _url:string = 'http://mychampapi.test/api/teams';

  constructor(private http:HttpClient) { 
    console.log("servicio Team funcionando");
  }

  getTeams(){
    return this.http.get(this._url).pipe(
      map(data =>{
        return data['data'];
      }),
      catchError(this.handleError)
    );
  }

  createTeam(team){

    var formData = new FormData();

    formData.append("name", team.name);
    formData.append("team_type_id", team.team_type_id);
    formData.append("flag", team.flag);

    return this.http.post(this._url, formData).pipe(
      catchError(this.handleError)
    );
  }

  deleteTeam (team:TeamModel){
    console.log(team.identificador);
    return this.http.delete('http://mychampapi.test/api/teams/' + team.identificador);
  }

  handleError(error: HttpErrorResponse) {
    return observableThrowError(error.message || 'Server error');
  }

}
