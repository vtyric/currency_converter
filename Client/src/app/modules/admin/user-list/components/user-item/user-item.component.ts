import { Component, Input, OnInit } from '@angular/core';
import { IUser } from '../../../../shared/shared/interfaces';
import { IUserInfoItem } from '../../interfaces';

@Component({
    selector: 'app-user-item',
    templateUrl: './user-item.component.html',
    styleUrls: ['./styles/user-item.component.scss']
})
export class UserItemComponent implements OnInit {
    @Input()
    public user!: IUser;
    public infos!: IUserInfoItem[];

    private _notFilledLabel: string = 'не заполнено';

    constructor() {
    }

    public ngOnInit(): void {
        this.infos = [
            {
                userInfoName: 'Логин',
                userInfo: this.user.login
            },
            {
                userInfoName: 'Емэйл',
                userInfo: this.user.email ?? this._notFilledLabel
            },
            {
                userInfoName: 'Роль',
                userInfo: this.user.role
            },
            {
                userInfoName: 'ФИО',
                userInfo: `${ this.user.firstName ?? this._notFilledLabel } ${ this.user.lastName ?? this._notFilledLabel } ${ this.user.middleName ?? this._notFilledLabel }`
            }
        ];
    }
}
