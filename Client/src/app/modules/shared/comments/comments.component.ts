import { Component, Input, OnChanges, OnDestroy, SimpleChanges } from '@angular/core';
import { INews } from '../news/interfaces';
import { UserService } from '../shared/services/user.service';
import { Subject, takeUntil, tap } from 'rxjs';
import { CommentService } from './services/comment.service';
import { IComment } from './interfaces';
import { FormControl, Validators } from '@angular/forms';

@Component({
    selector: 'app-comments',
    templateUrl: './comments.component.html',
    styleUrls: ['./styles/comments.component.scss']
})
export class CommentsComponent implements OnDestroy, OnChanges {

    @Input()
    public news!: INews | undefined;
    @Input()
    public userId!: string | null;
    public form: FormControl = new FormControl(null, [Validators.required, Validators.minLength(3)]);
    public comments!: IComment[];

    private _unsubscriber: Subject<void> = new Subject<void>();

    constructor(
        private _userService: UserService,
        private _commentService: CommentService,
    ) {
    }

    public ngOnChanges(changes: SimpleChanges): void {
        if (changes['news'].currentValue) {
            this._commentService
                .getCommentByNewsId(changes['news'].currentValue.id)
                .pipe(
                    tap((comments: IComment[]) => {
                        this.comments = comments;
                    }),
                    takeUntil(this._unsubscriber)
                )
                .subscribe();
        }
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
            window.location.reload();
        }
    }
}
