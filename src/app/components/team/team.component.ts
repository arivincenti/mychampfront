import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { TeamService } from 'src/app/services/team/team.service';
import { TeamModel } from 'src/app/models/team.model';


@Component({
  selector: 'app-team',
  templateUrl: './team.component.html',
  styleUrls: ['./team.component.css']
})
export class TeamComponent implements OnInit
{

  // @Input('dato') name:string;
  // @Output() childEvent = new EventEmitter();

  teams:TeamModel[] = [];
  errorMsg = "";
  team:TeamModel;

  constructor(private _teamService: TeamService) { }

  ngOnInit()
  {
    this.team = new TeamModel();
    this._teamService.getTeams().subscribe(data => {
      this.teams = data
      console.log(data);
    }, error => this.errorMsg = error);
  }

  changeSelectedFlag(event)
  {
    this.team.bandera= <File>event.target.files[0];
  }

  createTeam()
  {
    this._teamService.createTeam(this.team).subscribe(response =>  
    {
      console.log(response);

    })
  }

  editTeam(team){
    this.team = team;
    console.log(this.team);
  }

  deleteTeam(team:TeamModel){
    
    this._teamService.deleteTeam(team).subscribe(response => {
      console.log(response);
      this.ngOnInit();
    });
    
  }

  // enviar(){
  //   this.childEvent.emit("Hola desde el componente hijo");
  // }

}
