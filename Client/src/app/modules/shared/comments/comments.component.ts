import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { INews } from '../news/interfaces';
import { UserService } from '../shared/services/user.service';
import { mergeMap, of, Subject, takeUntil, tap } from 'rxjs';
import { IUser } from '../shared/interfaces';
import { CommentService } from './services/comment.service';
import { IComment } from './interfaces';
import { FormControl, Validators } from '@angular/forms';

@Component({
    selector: 'app-comments',
    templateUrl: './comments.component.html',
    styleUrls: ['./styles/comments.component.scss']
})
export class CommentsComponent implements OnInit, OnDestroy {

    @Input()
    public news!: INews | undefined;
    @Input()
    public userId!: string | null;
    public form: FormControl = new FormControl(null, [Validators.required, Validators.minLength(3)]);
    public comments!: IComment[];
    public user!: IUser | null;

    private _unsubscriber: Subject<void> = new Subject<void>();

    constructor(
        private _userService: UserService,
        private _commentService: CommentService,
    ) {
    }

    public ngOnInit(): void {
        this._commentService
            .getCommentByNewsId(this.news?.id ?? 2)
            .pipe(
                tap((comments: IComment[]) => {
                    this.comments = comments;
                }),
                mergeMap(() => this.userId
                    ? this._userService.getUserById(Number.parseInt(this.userId))
                    : of(null)
                ),
                tap((user: null | IUser) => {
                    this.user = user;
                }),
                takeUntil(this._unsubscriber)
            )
            .subscribe();
    }

    public ngOnDestroy(): void {
        this._unsubscriber.next();
        this._unsubscriber.complete();
    }

    /**
     * Метод, срабатывающий при нажатии на кнопку отправить комментарий.
     */
    public onAddButtonClick(): void {
        if (this.userId !== null && this.news && this.news?.id !== null) {
            this._commentService
                .addComment(Number.parseInt(this.userId), this.news.id, this.form.value)
                .pipe(
                    takeUntil(this._unsubscriber)
                )
                .subscribe();

            this.form.reset();
        }
    }
}
