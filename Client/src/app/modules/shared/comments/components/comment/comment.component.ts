import { Component, Input } from '@angular/core';
import { IComment } from '../../interfaces';

@Component({
    selector: 'app-comment',
    templateUrl: './comment.component.html',
    styleUrls: ['./styles/comment.component.scss']
})
export class CommentComponent {

    @Input()
    public comment!: IComment;

    constructor() {
    }
}
