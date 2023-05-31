[Макет проекта](https://www.figma.com/file/7XYjjppAZ95Ohc71xUSn5u/Pineapple?node-id=0%3A1&t=G6MMcIFyJkWsXjgc-0)

Шаблонизатор __Hadlebars__

Компиляция и рендер на клинете - "@anikin/parcel-transformer-handlebars-precompile

##### Запуcк в develop
```
npm run dev
```

http://localhost:1234


##### Запуск dist
```
npm start
```

http://localhost:3000

[Deploy](https://spectacular-monstera-566ed5.netlify.app/)


Компиляция и рендер на клиенте
.parcelrc
```
{
  "extends": "@parcel/config-default",
  "transformers": {
    "*.hbs": ["@anikin/parcel-transformer-handlebars-precompile"]
  }
}
```
