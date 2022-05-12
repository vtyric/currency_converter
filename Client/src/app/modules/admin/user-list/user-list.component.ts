import { Component, OnDestroy, OnInit } from '@angular/core';
import { UserService } from '../../shared/shared/services/user.service';
import { IUser } from '../../shared/shared/interfaces';
import { Subject, takeUntil, tap } from 'rxjs';
import { FormControl } from '@angular/forms';

@Component({
    selector: 'app-user-list',
    templateUrl: './user-list.component.html',
    styleUrls: ['./styles/user-list.component.scss']
})
export class UserListComponent implements OnInit, OnDestroy {

    public users!: IUser[];
    public search: FormControl = new FormControl(null);

    private _unsubscriber: Subject<void> = new Subject<void>();

    constructor(private _userService: UserService) {
    }

    public ngOnInit(): void {
        this._userService.getAllUsers()
            .pipe(
                tap((value: IUser[]) => {
                    this.users = value;
                }),
                takeUntil(this._unsubscriber)
            )
            .subscribe();
    }

    public ngOnDestroy(): void {
        this._unsubscriber.next();
        this._unsubscriber.complete();
    }

}
