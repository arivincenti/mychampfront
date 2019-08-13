import { Component, OnInit, Input } from '@angular/core';
import { TeamModel } from 'src/app/models/team.model';

@Component({
  selector: 'app-team-form',
  templateUrl: './team-form.component.html',
  styleUrls: ['./team-form.component.css']
})
export class TeamFormComponent implements OnInit {

  @Input() team:TeamModel;

  constructor() { }

  ngOnInit() {
  }

}
