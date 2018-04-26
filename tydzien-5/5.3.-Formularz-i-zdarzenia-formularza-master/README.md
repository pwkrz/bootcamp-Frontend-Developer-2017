# Angular2

This project was generated with [angular-cli](https://github.com/angular/angular-cli) version 1.0.0-beta.19-3.

## 3. Formularz i zdarzenia formularza

Jak pewnie zauważyłeś, formularz edycji playlisty nie został umieszczony w elemencie
<form>. Jest to specjalny zabieg i w następnym tygodniu zobaczysz jak można dużo lepiej
obsługiwać formularze w Angularze. Tymczasem jednak jeśli masz już działające pola
edycji formularza z użyciem ngModel, spróbuj dodać element <form> obejmujący
wszystkie pola edycji playlisty. Angular powinien wyświetlić błąd mówiący o brakujących
nazwach pól. Napraw błąd zgodnie z tym co podaje komunikat błędu w konsoli. Gdy
formularz zacznie działać, dodaj obsługę zdarzenia submit na elemencie formularza w taki
sam sposób, jak dodawałeś inne zdarzenia. Jeśli dodałeś zdarzenie prawidłowo, zarówno
przycisk zapisz jak i wciśnięcie klawisza Enter na dowolnym polu, powinno wykonywać
metodę podpiętą do zdarzenia submit formularza.