import { Component, OnDestroy, OnInit } from '@angular/core';
import { NewsRequestService } from "../../../shared/news/services/news-request.service";
import { INews } from "../../../shared/news/interfaces";
import { Subject, takeUntil, tap } from "rxjs";
import { FormControl } from "@angular/forms";
import { Router } from "@angular/router";

@Component({
  selector: 'app-update-news-list',
  templateUrl: './update-news-list.component.html',
  styleUrls: ['./styles/update-news-list.component.scss']
})
export class UpdateNewsListComponent implements OnInit, OnDestroy {

  public news!: INews[];
  public search: FormControl = new FormControl(null);

  private _unsubscriber: Subject<void> = new Subject<void>();

  constructor(
    private _newsRequestService: NewsRequestService,
    private _router: Router,
  ) {
  }

  ngOnInit(): void {
    this._newsRequestService
      .getPosts()
      .pipe(
        tap(posts => {
          this.news = posts.sort((a, b) => b.postCreationDate.getTime() - a.postCreationDate.getTime());
        }),
        takeUntil(this._unsubscriber)
      )
      .subscribe();
  }

  ngOnDestroy(): void {
    this._unsubscriber.next();
    this._unsubscriber.complete();
  }

  /**
   * Совершает переход на страницу, на которой можно обнновить данные поста.
   * @param {number} id
   */
  public onNewsClick(id: number): void {
    this._router.navigate([`admin/newsExchange/updateNews/${id}`]);
  }
}
