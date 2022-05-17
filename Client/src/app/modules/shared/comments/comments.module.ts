import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CommentsComponent } from './comments.component';
import { CommentComponent } from './components/comment/comment.component';
import { CommentService } from './services/comment.service';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
    declarations: [
        CommentsComponent,
        CommentComponent
    ],
    imports: [
        CommonModule,
        ReactiveFormsModule
    ],
    exports: [
        CommentsComponent
    ],
    providers: [
        CommentService,
    ]
})
export class CommentsModule {
}
