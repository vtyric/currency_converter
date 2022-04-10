import { Injectable } from '@angular/core';
import { INews, INewsMenuItem } from '../interfaces';
import { FilterType } from '../types';

@Injectable()
export class NewsService {

  private _news: INews[] = [
    {
      id: 1,
      title: 'Заголовок первой новости',
      description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Autem, quae!',
      content: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquam, architecto consequatur culpa, cum' +
        ' delectus dignissimos doloremque eligendi esse exercitationem facere fugiat iure nam quaerat quidem quo repellat' +
        ' repellendus totam velit voluptatem, voluptatibus. Consequuntur delectus dicta dolore doloribus dolorum, earum eligendi ' +
        'exercitationem explicabo, facilis totam voluptates voluptatum! Alias assumenda ea, id in mollitia nihil optio quis quisquam?' +
        ' Ad consequuntur deserunt dolorem fuga maxime nesciunt perspiciatis placeat quis ullam? A autem dolorem ea eaque eveniet fuga,' +
        ' hic, mollitia nam nemo neque recusandae sit unde? A atque dolores exercitationem explicabo ipsa ipsam itaque, laudantium natus ' +
        'perspiciatis, quia vel voluptate. Ad atque aut beatae commodi consectetur culpa cum dignissimos dolor eaque earum est ' +
        'excepturi facilis inventore itaque molestiae natus necessitatibus neque nostrum odit officia quae quasi qui repellendus' +
        ' reprehenderit similique sit, temporibus, unde? Culpa est illo numquam odio. A animi cumque debitis eaque expedita' +
        ' id iste maiores, necessitatibus nesciunt nihil nisi quasi qui reiciendis reprehenderit suscipit temporibus totam' +
        ' ullam ut vitae voluptatem. Beatae, commodi cumque dolor doloremque ea enim eos facere id impedit incidunt laboriosam ' +
        'laborum magni maxime minus nisi nobis nostrum nulla odio officiis optio praesentium quae quasi, quibusdam quod rerum sed' +
        ' similique sint. Consequatur dolore expedita illum quibusdam unde? Animi beatae dignissimos eaque eius error laboriosam ' +
        'praesentium provident repellendus soluta voluptates. Cumque, dolore illo maiores quas tempora velit voluptatem.' +
        ' Culpa fuga hic nulla provident!',
      type: 'news',
      postCreationDate: new Date(Date.now()),
      preview: 'https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcQrhmgXe8zn0htM-sLnsM3QpL-FVpMoVTX2ss7lIyb4skSN75B3'
    },
    {
      id: 2,
      title: 'Заголовок второй новости',
      description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eius molestias officiis ut?',
      content: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquam, architecto consequatur culpa, cum' +
        ' delectus dignissimos doloremque eligendi esse exercitationem facere fugiat iure nam quaerat quidem quo repellat' +
        ' repellendus totam velit voluptatem, voluptatibus. Consequuntur delectus dicta dolore doloribus dolorum, earum eligendi ' +
        'exercitationem explicabo, facilis totam voluptates voluptatum! Alias assumenda ea, id in mollitia nihil optio quis quisquam?' +
        ' Ad consequuntur deserunt dolorem fuga maxime nesciunt perspiciatis placeat quis ullam? A autem dolorem ea eaque eveniet fuga,' +
        ' hic, mollitia nam nemo neque recusandae sit unde? A atque dolores exercitationem explicabo ipsa ipsam itaque, laudantium natus ' +
        'perspiciatis, quia vel voluptate. Ad atque aut beatae commodi consectetur culpa cum dignissimos dolor eaque earum est ' +
        'excepturi facilis inventore itaque molestiae natus necessitatibus neque nostrum odit officia quae quasi qui repellendus' +
        ' reprehenderit similique sit, temporibus, unde? Culpa est illo numquam odio. A animi cumque debitis eaque expedita' +
        ' id iste maiores, necessitatibus nesciunt nihil nisi quasi qui reiciendis reprehenderit suscipit temporibus totam' +
        ' ullam ut vitae voluptatem. Beatae, commodi cumque dolor doloremque ea enim eos facere id impedit incidunt laboriosam ' +
        'laborum magni maxime minus nisi nobis nostrum nulla odio officiis optio praesentium quae quasi, quibusdam quod rerum sed' +
        ' similique sint. Consequatur dolore expedita illum quibusdam unde? Animi beatae dignissimos eaque eius error laboriosam ' +
        'praesentium provident repellendus soluta voluptates. Cumque, dolore illo maiores quas tempora velit voluptatem.' +
        ' Culpa fuga hic nulla provident!',
      type: 'news',
      postCreationDate: new Date(Date.now()),
      source: 'https://meduza.io/',
      preview: 'https://cdn-st1.rtr-vesti.ru/vh/pictures/xw/210/625/3.jpg'
    },
    {
      id: 3,
      title: 'Мой пост',
      description: 'Просто какой то текст для поста',
      content: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquam, architecto consequatur culpa, cum' +
        ' delectus dignissimos doloremque eligendi esse exercitationem facere fugiat iure nam quaerat quidem quo repellat' +
        ' repellendus totam velit voluptatem, voluptatibus. Consequuntur delectus dicta dolore doloribus dolorum, earum eligendi ' +
        'exercitationem explicabo, facilis totam voluptates voluptatum! Alias assumenda ea, id in mollitia nihil optio quis quisquam?' +
        ' Ad consequuntur deserunt dolorem fuga maxime nesciunt perspiciatis placeat quis ullam? A autem dolorem ea eaque eveniet fuga,' +
        ' hic, mollitia nam nemo neque recusandae sit unde? A atque dolores exercitationem explicabo ipsa ipsam itaque, laudantium natus ' +
        'perspiciatis, quia vel voluptate. Ad atque aut beatae commodi consectetur culpa cum dignissimos dolor eaque earum est ' +
        'excepturi facilis inventore itaque molestiae natus necessitatibus neque nostrum odit officia quae quasi qui repellendus' +
        ' reprehenderit similique sit, temporibus, unde? Culpa est illo numquam odio. A animi cumque debitis eaque expedita' +
        ' id iste maiores, necessitatibus nesciunt nihil nisi quasi qui reiciendis reprehenderit suscipit temporibus totam' +
        ' ullam ut vitae voluptatem. Beatae, commodi cumque dolor doloremque ea enim eos facere id impedit incidunt laboriosam ' +
        'laborum magni maxime minus nisi nobis nostrum nulla odio officiis optio praesentium quae quasi, quibusdam quod rerum sed' +
        ' similique sint. Consequatur dolore expedita illum quibusdam unde? Animi beatae dignissimos eaque eius error laboriosam ' +
        'praesentium provident repellendus soluta voluptates. Cumque, dolore illo maiores quas tempora velit voluptatem.' +
        ' Culpa fuga hic nulla provident!',
      type: 'post',
      postCreationDate: new Date(Date.now()),
    },
  ];

  public newsMenuItems: INewsMenuItem[] = [
    {
      label: 'Всё подряд',
      filter: null,
    },
    {
      label: 'Новости',
      filter: 'news',
    },
    {
      label: 'Посты',
      filter: 'post',
    },
  ];

  constructor() {
  }

  /**
   * Возвращает все новости с каким то фильтром.
   * @param { FilterType } filter без филтра null, только посты 'post', толко новости 'news'
   * @return { INews[] }
   */
  public getNews(filter: FilterType): INews[] {
    return filter ? this._news.filter(n => n.type === filter) : this._news;
  }

  /**
   * Получает новость по id.
   * @param { number } id новости
   * @return { INews | undefined }
   */
  public getNewsById(id: number): INews | undefined {
    return this._news.find(n => n.id === id);
  }

}
