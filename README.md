How to run this project?

#npm start

Which version of node js should I use?

#node v14.12.0 or higher

About this project:
Субъективные плюсы таблицы: 
1. Хорошая оптимизация 
2. Возможность работы с большим количеством данных, т.к. в таблице есть страницы, которые можно переключать
3. Переиспользование компонента таблицы
4. Очень веселая таблица

Субъективные минусы: 
1. Не хватило времени доделать до конца. Отсутствует:
- визуальное обновление количества сотрудников в таблице. Успел реализовать подсчет сотрудников в сторе при удалении.
- Выделение выбранных сотрудников цветом
- Не успел реализовать таблицу сотрудников на основе запросов к jsonplaceholder. Использую замоканные данные для таблицы сотрудников.
2. Сложности с добавлением нового функционала

Я делал несколько таблиц, пытаясь найти самый лучший вариант. В силу нехватки времени решил остановиться на библиотеке ract-table. Эта библиотека, как оказалась, удобна для реализации одной таблицы. Я же пытался следовать принципу DRY, дабы была возможность переиспользовать один компонент для двух таблиц. Но библиотека была против меня и данного принципа. Я без проблем мог обновить состояние в сторе, однако заставить ее отображать данные оттуда оказалось сложнее, чем казалось изначально. 
Изначально планировал добавлять данные в таблицу сотрудников на основе id выбранных компаний, однако по какой-то причине, переменная selectedFlatRows, данная мне библиотекой react-table, отображала нажатый чекбокс только со второго раза, в то время как с первого нажатия уже в проверках приходило значение true. Любые другие действия с этой переменной также вызывали большие проблемы
Поэтому пришлось добавлять данные сотрдников сразу же, при первичном рендере. Из-за этого появились проблемы в подсчете страниц в таблице сотрудников

P.s я искренне надеюсь, что вложенных в этот небольшой проект бессонных ночей, эмоциональных качелей будет достаточно, чтобы у меня была возможность попасть на техническое интервью. Если же нет, то спасибо, что потратили время на мою работу

Вот вам прекрасное видео напоследок:
https://www.youtube.com/watch?v=GtL1huin9EE&ab_channel=CSAAInsuranceGroup%2CaAAAInsurer


