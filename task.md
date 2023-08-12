payload.parts.body.data






Hi, I need a script/program developed for GMAIL. I have no idea if this idea is possible, so please advise accordingly. Basically, I want to be able to find duplicate emails from specific senders in gmail. I want to be able to search a senders name, and see all of the emails they sent me multiple times. Basic Function: I want to find duplicate emails by sender. So let’s say I get emails from "example1@gmail.com”. I want to be able to search "example1@gmail.com" and have it show me all of the emails that have the same body text in the email. The main purpose is to find emails with the same body text. Finding emails with the same subject line can be an additional feature. Filtering Options: Percentage Match I want to be able to filter results for duplicate emails based on percentage body text that matches. For example, I want to find emails that have 60% of the same body text, or 70% of the same body text, or 80% of the same etc. Number of Duplicates I also want to be able to filter results by number of duplicates. For example, I want to be able to only show duplicates that have been sent twice or more… or show duplicates that exist 3+ times, or 4+ times etc. Let me know if this sounds like something you can do.

Once we have the final version developed as a google script and everything works as intended, do you think this is something that could be eventually developed into a chrome extension/website? Basically, you'd be able to connect the chrome extension to your gmail account, run the extension, and then have the results displayed on a website, instead of a google sheet. My goal right now is just to have this developed for personal use. But once it is working, and it does everything I need it to do, I would be interested in turning this into a product that can be shared with the public.


My proposal as following:
- The script will be created within the Google Sheets. - You can run it manually or by the time-based trigger.
- This script will pull the emails from Gmail to the Sheet from the inbox of the Google account by which you run the script.
- All the emails will be in the spreadsheets as a table with necessary fields (id, datetime, email, subject, body)
- Another script will be able to analyze the list with emails and create a report with duplicated subjects.
- As for a body, in my current offer I include only the simplest fuzzy method that will show a percent of similarity. If you need to get a percentage more precisely then we can consider it additionally in the next order. We can integrate AI or something else, there are options depending on your goals.

note that the fuzzy method will not work very well on long text.

everything else that you described will be possible to do, that is, we can group it on the sheets as you want and show the information in a convenient way

Его коммент
Also, the script needs to pull emails from ALL folders. (primary, promotions, and social)





Здравствуйте, мне нужно разработать скрипт/программу для GMAIL. Я понятия не имею, возможна ли эта идея, поэтому прошу дать соответствующие рекомендации. В принципе, я хочу иметь возможность находить дубликаты писем от определенных отправителей в gmail. Я хочу иметь возможность искать имя отправителя и видеть все письма, которые он отправил мне несколько раз. Основная функция: Я хочу найти дубликаты писем по отправителю. Допустим, я получаю письма от "example1@gmail.com". Я хочу, чтобы при поиске по "example1@gmail.com" мне были показаны все письма с одинаковым основным текстом. Основная цель - найти письма с одинаковым основным текстом. Поиск писем с одинаковыми темами может быть дополнительной функцией. Параметры фильтрации: Процентное совпадение Я хочу иметь возможность фильтровать результаты поиска дубликатов писем на основе процентного совпадения основного текста. Например, я хочу найти письма, в которых 60% текста совпадает с текстом письма, или 70% текста совпадает с текстом письма, или 80% текста совпадает с текстом письма и т.д. Количество дубликатов Я также хочу иметь возможность фильтровать результаты по количеству дубликатов. Например, я хочу иметь возможность показывать только те дубликаты, которые были отправлены дважды или более... или показывать дубликаты, которые существуют 3+ раза, или 4+ раза и т.д. Дайте мне знать, если это похоже на то, что вы можете сделать.

Как вы думаете, если мы разработаем окончательную версию скрипта для google и все будет работать как надо, можно ли сделать из этого расширение для chrome/веб-сайт? По сути, вы сможете подключить расширение chrome к своей учетной записи gmail, запустить расширение, а затем вывести результаты на веб-сайт, а не на лист google. Сейчас моя цель - разработать это расширение для личного использования. Но как только оно заработает и будет делать все, что мне нужно, я буду заинтересован в том, чтобы превратить его в продукт, которым можно будет поделиться с общественностью.


Мое предложение заключается в следующем:
- Скрипт будет создан внутри Google Sheets. - Его можно запускать вручную или по триггеру, привязанному ко времени.
- Этот скрипт будет извлекать письма из Gmail в лист из папки "Входящие" того аккаунта Google, с которого вы запускаете скрипт.
- Все письма будут находиться в электронной таблице в виде таблицы с необходимыми полями (id, datetime, email, subject, body).
- Другой скрипт сможет проанализировать список с письмами и создать отчет с дублирующимися темами.
- Что касается тела, то в текущем предложении я включаю только простейший нечеткий метод, который покажет процент сходства. Если вам нужно получить процент более точно, то мы можем рассмотреть это дополнительно в следующем заказе. Мы можем интегрировать искусственный интеллект или что-то еще, варианты зависят от ваших целей.

обратите внимание, что нечеткий метод не очень хорошо работает на длинных текстах.

все остальное, что вы описали, мы сможем сделать, то есть сгруппировать на листах так, как вы хотите, и показать информацию в удобном виде

Его коммент
Также скрипт должен вытаскивать письма из ВСЕХ папок. (основная, рекламные акции и социальная)







. Неужели мне для этого надо выдирать айдишнкики в какой-нибудь массив с одного запроса, а потом слать сотни/тысячи запросов к серверу? Это же не может быть правдой.

Сожалею, но это правда. Потому что она указана в документации явным образом: "Note that each message resource contains only an id and a threadId. Additional message details can be fetched using the messages.get method." 