import { Component, OnInit } from '@angular/core';
import { TournamentService } from 'src/app/services/tournament/tournament.service';


@Component({
  selector: 'app-tournament',
  templateUrl: './tournament.component.html',
  styleUrls: ['./tournament.component.css']
})
export class TournamentComponent implements OnInit {

  tournaments= [];

  constructor(private _tournamentService: TournamentService) { }

  ngOnInit() {
  }

}
