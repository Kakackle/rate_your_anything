# Supabase Auth, logowanie sie, sesje

Generalnie Supabase udostepnia wbudowane modele Auth, wzgledem ktorych przez odpowiednie funkcje clienta (zob. client.js) mozna dokonywac operacji logowania sie, rejestrowania itd.

Przy logowaniu sie supabase zwraca obiekt sesji, w ktorym zawarte jest token i zalogowany uzytkownik. Istnieja tez funkcje uzyskiwania, odswiezania sesji itd.

Tak uzyskany obiekt, mozesz potem przekazywac do komponentow i bedzie on informowal o zalogowanym uzytkowniku.

**W jaki sposob?**

Np w ogolnych App.jsx, z klientem supabase pozyskujesz poprzez getSession() sesje, a poprzez onAuthStateChange aktualizujesz przy zmianach

i jesli jest tylko jeden glowny render, mozesz przekazac jako prop
jesli jednak stosujesz react router, mozesz do wszystkich sciezek routera przekazac w <Outlet> poprzez context={session} 

~~i nastepnie w sciezkach odbierac jako prop {session} by miec dostep do obiektu
i poniewaz App.jsx nasluchuje zmian w sesji, metody supabase jak .signInWithPassword zmieniaja ten obiekt i aktualizuje sie w App, co jest przekazywane nizej~~

i nastepnie jesli cos jest globalnie, np navbar, mozesz przekazywac to poprzez prop, ale jesli nie jest, tylko idzie przez outlet, to w stronie ktora chce z korzystac z sesji, trzeba zawrzec

`import { useOutletContext } from 'react-router-dom'`

a potem 

`const session = useOutletContext();`

# Filtracja i sortowanie supabase notki

- Najpierw filtracja potem sortowanie - standard

- Jesli chcesz filtrowac po foreign table, normalnie selectujac robisz
```
.select(`something,
        table(
            something2
        )`)
```
a filtrujac msuisz zrobic
```
.select(`something,
        table!inner(
        )
)
```