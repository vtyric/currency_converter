import { Component, Input, OnInit } from '@angular/core';
import { IUser } from "../../../../shared/shared/interfaces";
import { Role } from "../../../../shared/authentification/enums";

@Component({
  selector: 'user-item',
  templateUrl: './user-item.component.html',
  styleUrls: ['./styles/user-item.component.scss']
})
export class UserItemComponent implements OnInit {
  @Input()
  public user!: IUser;
  public infos!: [string, string][];

  private _notFilledLabel: string = "не заполнено";

  constructor() {
  }

  ngOnInit(): void {
    this.infos = [
      [
        'Логин',
        this.user.login
      ],
      [
        'Емэйл',
        this.user.email ?? this._notFilledLabel
      ],
      [
        'Роль',
        this.user.role === Role.User ? 'User' : 'Admin'
      ],
      [
        'ФИО',
        `${this.user.firstName ?? this._notFilledLabel} ${this.user.lastName ?? this._notFilledLabel} ${this.user.middleName ?? this._notFilledLabel}`
      ]
    ];
  }
}