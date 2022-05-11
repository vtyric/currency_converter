import { Component, OnDestroy, OnInit } from '@angular/core';
import { NewsRequestService } from "../../../shared/news/services/news-request.service";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { Subject, takeUntil } from "rxjs";

@Component({
  selector: 'app-create-news',
  templateUrl: './create-news.component.html',
  styleUrls: ['./styles/create-news.component.scss'],
})
export class CreateNewsComponent implements OnInit, OnDestroy {

  public form!: FormGroup;

  private _unsubscriber: Subject<void> = new Subject<void>();

  constructor(
    private _newsService: NewsRequestService,
  ) {
  }

  ngOnInit(): void {
    this.form = new FormGroup({
      title: new FormControl(null, [Validators.required]),
      description: new FormControl(null, [Validators.required]),
      content: new FormControl(null, [Validators.required]),
      preview: new FormControl(null),
    });
  }

  public onSubmitButtonClick() {
    this._newsService
      .createPost(
        this.form.value.title,
        this.form.value.description,
        this.form.value.content,
        this.form.value.preview ?? undefined,
        undefined,
      )
      .pipe(
        takeUntil(this._unsubscriber)
      )
      .subscribe();

    this.form.reset();
  }

  ngOnDestroy(): void {
    this._unsubscriber.next();
    this._unsubscriber.complete();
  }

}
