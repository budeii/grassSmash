//globalne zmienne niezbędne do funkcjonowania kodu
let pickedGrass = 0, //trawy wykorzystywane do tworzenia mapy
  pickedTime = 0, //wybrany czas
  gameScore = 0, //aktualny wynik
  catsCurrency = 0, //ilosc kotow dodana na koncu
  letterPlace = 0, //zmienna pomocnicza do wypisywania liter
  isEnemy = 0, //poziom trudnosci wroga
  isDesert = false,
  gameMenu = document.querySelector(".menu"), //przechowanie kodu tworzacego menu
  gameContainer = document.getElementById("menu"),
  areMenuCoords = false, //jednorazowe ustalenie pozycji okna, aby wracalo na srodek niezaleznie od rozdzielczosci
  playDialogue = false, //blokada przewijania dialogu po zakończeniu
  text, //zmienna przechowywujaca aktualny dialog
  letterInterval, //zmienna przechowywujaca funkcje, ktora wypisuje litery
  gameResetTimeout,
  catTalkStart; // zmienna przechowywujaca funkcje, ktora usuwa elementy gry po zakonczeniu


//dźwięki
let clickGrass = new Audio("sounds/pickgrass2.wav"),
pressButton = new Audio("sounds/buttonPress.wav"),
loseGame = new Audio("sounds/gamelose.wav"),
addCatSound = new Audio("sounds/addCat.wav"),
buyPotion = new Audio("sounds/buyPotion.wav"),
orangePotionSound = new Audio("sounds/orangeElixir.wav"),
greenPotionSound = new Audio("sounds/greenElixir.wav"),
purplePotionSound = new Audio("sounds/purpleElixir.wav"),
meadowMusic = new Audio("music/meadow.mp3"),
desertMusic = new Audio("music/desert.mp3"),
menuMusic = new Audio("music/menu.mp3"),
winMusic = new Audio("music/levelwin.mp3");

//sprawdzenie, czy gra uruchamiana jest po raz pierwszy. Jeśli tak - uruchomienie początkowego dialogu
const gameStatus = () => {
  if (localStorage.getItem("started") >= 1 && localStorage.getItem("afterLevel") == "false") {
    catTalkStart = setTimeout(function(){
      pressButton.play();
      dialoguesMenu();
      textTyping();
      catTalkAnimation();
    }, 800)
    document.getElementById("content").innerHTML = `<div id="content"><button onclick="playAdventure()" class="pixel">Przygoda (${localStorage.getItem("currentLevel")})</button> <br> <br>
    <button onclick="playFreeplay()" class="pixel">Swoboda</button> <br> <br>
    <button onclick="enterShop()" class="pixel">Market</button> <br> <br> </div>`
  }
  else if (localStorage.getItem("started") >= 1 && Number(localStorage.getItem("winDialogue")) != 0) {
  winDialogue(Number(localStorage.getItem("winDialogue")), 0)
  }
  else {
    let dialogueNumber = 0;
    gameBegginingDialogues(dialogueNumber);
  }
}

//utworzenie kluczy przetrzymujących m.in walutę czy ilość eliksirów
if (localStorage.getItem("coins")) {}
else {
localStorage.setItem("coins", "0");
localStorage.setItem("cats", "0");
localStorage.setItem("afterLevel", false)
localStorage.setItem("currentLevel", 1);
localStorage.setItem("greenPotion", 0);
localStorage.setItem("orangePotion", 0);
localStorage.setItem("purplePotion", 0);
}

//funkcja wypisująca dialog
const textTyping = () => {
  if (letterPlace<text.length) {
    document.querySelector(".dialogueText").innerHTML += text.charAt(letterPlace);
    letterPlace++
    letterInterval = setTimeout(textTyping,25);
  }
  else {
    letterPlace = 0;
  }
}

//funkcja nawigująca tryb przygodowy
const playAdventure = (dialogueNumber = 0) => {
    pressButton.play();
    currentLevel = localStorage.getItem("currentLevel");
    currentLevel = parseInt(currentLevel);
    clearTimeout(catTalkStart);
    clearTimeout(letterInterval);
    letterPlace = 0;
    document.querySelector("button").removeAttribute("onclick");
    document.querySelector("button").removeAttribute("onclick");
    document.querySelector("button").removeAttribute("onclick");
    document.querySelector(".dialogueText").innerHTML = "";
    dialogueNumber += 1;
    switch (currentLevel) {
    case 1:
      switch (dialogueNumber) {
      case 2:
      text = "Pora na trening bojowy!";
      textTyping();
      catTalkAnimation();
      break;
      case 3:
      text = "Nasze podwórko jest wolne od jakichkolwiek wrogów, więc to idealne miejsce na to, abyś nauczył się grać!";
      textTyping();
      catTalkAnimation();
      break;
      case 4:
      text = "Kliknij i zdobądź trzydześci traw.";
      textTyping();
      catTalkAnimation();
      break;
      case 5:
      playDialogue = true; //zablokowanie funkcji przewijającej dialog
      firstLevel();
      }
      break;
    case 2:
      switch (dialogueNumber) {
      case 2:
      text = "Na pobliskich łąkach grasują nasi wrogowie.";
      textTyping();
      catTalkAnimation();
      break;
      case 3:
      text = "Twoją druga misją będzie prześlizgnąć się przez ich jednostki i odnaleźć nasze koty!!";
      textTyping();
      catTalkAnimation();
      break;
      case 4:
      text = "Pamiętaj, aby nie dać się złapać przez tych obślinionych durni, jedno ugryzienie i po tobie!";
      textTyping();
      catTalkAnimation();
      break;
      case 5:
      text = "Potrzebujemy 50 rzeźkiej trawy i wszystkie 5 jednostek, które szlajają się w tych terenach.";
      textTyping();
      catTalkAnimation();
      break;
      case 6:
        text = "Do boju!";
        textTyping();
        catTalkAnimation();
         break;
      case 7:
      playDialogue = true; //zablokowanie funkcji przewijającej dialog
      secondLevel();
      }
      break;
    case 3:
      switch (dialogueNumber) {
        case 2:
        text = "Nasi zwiadowcy z wielkim poświęceniem ruszyli na teren okupywany przez wroga, aby przekazać nam informacje!";
        textTyping();
        catTalkAnimation();
        break;
        case 3:
        text = "Wiadomo, że na odleglejszych terenach żerują szybsze psy - jeden kot wrócił z podgryzioną nogą!";
        textTyping();
        catTalkAnimation();
        break;
        case 4:
        text = "Proszę, uważaj na siebie i uratuj wszystkie 10 kotów, które się tam chowa.";
        textTyping();
        catTalkAnimation();
        break;
        case 5:
        playDialogue = true; //zablokowanie funkcji przewijającej dialog
        thirdLevel();
        }
        break;
    case 4:
      switch (dialogueNumber) {
        case 2:
        text = "Koniecznie potrzebujemy eliksirów dla kotów, które wróciły z pola bitwy!";
        textTyping();
        catTalkAnimation();
        break;
        case 3:
        text = "Musisz zdobyć 100 traw, dzięki którym uwarzymy zdrowotne eliksiry.";
        textTyping();
        catTalkAnimation();
        break;
        case 4:
        text = "To ekstremalnie niebezpieczny teren, dlatego zastanów się proszę nad użyciem zielonego eliksiru!";
        textTyping();
        catTalkAnimation();
        break;
        case 5:
        playDialogue = true; //zablokowanie funkcji przewijającej dialog
        fourthLevel();
        }
        break;
    case 5:
      switch (dialogueNumber) {
        case 2:
        text = "Susza, żwawi wrogowie.";
        textTyping();
        catTalkAnimation();
        break;
        case 3:
        text = "Tak wygląda wojna, młody kocie.";
        textTyping();
        catTalkAnimation();
        break;
        case 4:
        text = "Nasze radio wykrywa mrucz-fale, dlatego zawsze wiemy w którą stronę się kierować.";
        textTyping();
        catTalkAnimation();
        break;
        case 5:
        text = "125 traw. Nie zapomnij o eliksirach!";
        textTyping();
        catTalkAnimation();
        break;
        case 6:
        playDialogue = true; //zablokowanie funkcji przewijającej dialog
        fifthLevel();
        }
        break;
    case 6:
      switch (dialogueNumber) {
        case 2:
        text = "Okolice pustynne nie różnią się szczególnie od łąk.";
        textTyping();
        catTalkAnimation();
        break;
        case 3:
        text = "Najistotniejsza różnica to mniejsza ilość traw, prędkość w jakiej rosną.";
        textTyping();
        catTalkAnimation();
        break;
        case 4:
        text = "Podobno psy na tym etapie przeganiają już Kubicę, wiesz, tego sławnego typa!";
        textTyping();
        catTalkAnimation();
        break;
        case 5:
        text = "Jeśli przejdziesz kolejne poziomy, to równie dobrze możesz zrzucić Kubicę z podium! Piętnaście kotów musi wrócić do obiegu.";
        textTyping();
        catTalkAnimation();
        break;
        case 6:
        playDialogue = true; //zablokowanie funkcji przewijającej dialog
        sixthLevel();
        }
        break;
    case 7:
      switch (dialogueNumber) {
        case 2:
        text = "Siódmy poziom na dziesięć!";
        textTyping();
        catTalkAnimation();
        break;
        case 3:
        text = "175 traw, 70 sekund.";
        textTyping();
        catTalkAnimation();
        break;
        case 4:
        text = "Pamiętaj, że używając eliksirów możesz ogłuszyć wroga na maksymalnie 30 sekund!";
        textTyping();
        catTalkAnimation();
        break;
        case 5:
        playDialogue = true; //zablokowanie funkcji przewijającej dialog
        seventhLevel();
        }
        break;
    case 8:
      switch (dialogueNumber) {
        case 2:
        text = "Pustynna masakra myszką komputerową.";
        textTyping();
        catTalkAnimation();
        break;
        case 3:
        text = "Kojarzysz taki film?";
        textTyping();
        catTalkAnimation();
        break;
        case 4:
        text = "Ja też nie, ale zleciliśmy już o Tobie dokument, także to kwestia czasu.";
        textTyping();
        catTalkAnimation();
        break;
        case 5:
        text = "20 kotów!";
        textTyping();
        catTalkAnimation();
        break;
        case 6:
        playDialogue = true; //zablokowanie funkcji przewijającej dialog
        eightLevel();
        }
        break;
    case 9:
      switch (dialogueNumber) {
        case 2:
        text = "Psy są głupie - kto normalny wysyłałby futrzastą jednostkę na pustynię?";
        textTyping();
        catTalkAnimation();
        break;
        case 3:
        text = "Cerber był praktycznie łysy, właśnie dlatego był takim kozakiem!";
        textTyping();
        catTalkAnimation();
        break;
        case 4:
        text = "Koniec końców liczy się to kto kogo zje, a nie kto ile ma sierści. 255 traw.";
        textTyping();
        catTalkAnimation();
        break;
        case 5:
        playDialogue = true; //zablokowanie funkcji przewijającej dialog
        ninthLevel();
        }
        break;
    case 10:
      switch (dialogueNumber) {
        case 2:
        text = "JESTEŚMY NA FINISZU!";
        textTyping();
        catTalkAnimation();
        break;
        case 3:
        text = "Przeciwko nam najbardziej zaciekłe jednostki.";
        textTyping();
        catTalkAnimation();
        break;
        case 4:
        text = "Wszystkie koty, które siłą nam odebrano w końcu do nas wrócą!";
        textTyping();
        catTalkAnimation();
        break;
        case 5:
        text = "Trzydzieści pięć kotów do odzyskania!!!";
        textTyping();
        catTalkAnimation();
        break;
        case 6:
        playDialogue = true; //zablokowanie funkcji przewijającej dialog
        tenthLevel();
        }
        break;
    }
    document.getElementById("menu").addEventListener("click", function(e){ 
      if ((e.target) && (playDialogue == false))  {
        document.querySelector(".dialogueText").innerHTML = "";
        clearTimeout(letterInterval);
        letterPlace = 0;
        playAdventure(dialogueNumber);
      }
      else {
        return;
      }
    }
    );
  }


//dialogi po wygranej
const winDialogue = (dialogue, dialogueNumber) => {
  pressButton.play();
  letterPlace = 0;
  dialogueNumber += 1;
  switch (dialogue) {
  case 1:
    switch (dialogueNumber) {
    case 1:
    text = "Widać, że to jeden z nas!";
    textTyping();
    catTalkAnimation();
    break;
    case 2:
    text = "Następne misje będą nieco bardziej wymagające.";
    textTyping();
    catTalkAnimation();
    break;
    case 3:
    text = "Najlepszy trening to praktyka, a więc daj znać, kiedy jesteś gotów!";
    textTyping();
    catTalkAnimation();
    localStorage.setItem("winDialogue", 0);
    localStorage.setItem("afterLevel", false);
    break;
    case 4:
    location.reload() //zablokowanie funkcji przewijającej dialog
    }
    break;
  case 2:
    switch (dialogueNumber) {
    case 1:
    text = "Jasna ciasna, poradziłeś sobie śpiewająco!";
    textTyping();
    catTalkAnimation();
    break;
    case 2:
    text = "Zasługujesz na nagrodę, właśnie przelewam Ci 150💰!";
    textTyping();
    catTalkAnimation();
    break;
    case 3:
    text = "Dostajemy komunikaty o zagubionych kocich oddziałach!";
    textTyping();
    catTalkAnimation();
    break;
    case 4:
    text = "Jestem pewien, że jesteś w gotowości, czekam na sygnał!";
    textTyping();
    catTalkAnimation();
    localStorage.setItem("winDialogue", 0);
    localStorage.setItem("afterLevel", false);
    break;
    case 5:
    localStorage.setItem("coins", Number(localStorage.getItem("coins")) + 150);
    location.reload() //zablokowanie funkcji przewijającej dialog
    }
    break;
  case 3:
    switch (dialogueNumber) {
    case 1:
    text = "Jeszcze nigdy nie widziałem czegoś takiego!";
    textTyping();
    catTalkAnimation();
    break;
    case 2:
    text = "Twoje tygrysie manewry to coś, czego potrzebowaliśmy!";
    textTyping();
    catTalkAnimation();
    break;
    case 3:
    text = "200💰 ląduje w Twojej kieszeni, wydaj je rozsądnie.";
    textTyping();
    catTalkAnimation();
    break;
    case 4:
    text = "Niech ta psia degrengolada się w końcu skończy.";
    textTyping();
    catTalkAnimation();
    localStorage.setItem("winDialogue", 0);
    localStorage.setItem("afterLevel", false);
    break;
    case 5:
    localStorage.setItem("coins", Number(localStorage.getItem("coins")) + 2002);
    location.reload() //zablokowanie funkcji przewijającej dialog
    }
    break;
  case 4:
    switch (dialogueNumber) {
    case 1:
      text = "Śpiewająco, po prostu śpiewająco!";
      textTyping();
      catTalkAnimation();
      break;
      case 2:
      text = "Im głębiej w łąkę, tym bliżej siedziby wroga..";
      textTyping();
      catTalkAnimation();
      break;
      case 3:
      text = "Ale też bardziej niekorzystne, zdradliwe tereny.";
      textTyping();
      catTalkAnimation();
      break;
      case 4:
      text = "Rośnie tutaj mało zdatnych do ukrycia się traw, dlatego nie zawahaj się skorzystać z pomarańczowego eliksiru."
      textTyping();
      catTalkAnimation();
      break;
      case 5:
      text = "Uważaj na siebie!"
      textTyping();
      catTalkAnimation();
      localStorage.setItem("winDialogue", 0);
      localStorage.setItem("afterLevel", false);
      break;
      case 6:
      location.reload() 
    }
    break;
  case 5:
    switch (dialogueNumber) {
    case 1:
      text = "Susza Ci nie straszna, uf.";
      textTyping();
      catTalkAnimation();
      break;
      case 2:
      text = "Podbijamy pustynię!";
      localStorage.setItem("winDialogue", 0);
      localStorage.setItem("afterLevel", false);
      textTyping();
      catTalkAnimation();
      break;
      case 3:
      location.reload() 
    }
    break;
  case 6:
    switch (dialogueNumber) {
    case 1:
      text = "Gdy koty pytają mnie o kolejność - mleko, czy płatki?";
      textTyping();
      catTalkAnimation();
      break;
      case 2:
      text = "Pytam ich czy jedzą płatki z mlekiem, czy mleko z płatkami.";
      textTyping();
      catTalkAnimation();
      break;
      case 3:
      text = "Ciebie nie będę pytać, bo jeszcze przestaniemy się lubić.";
      localStorage.setItem("winDialogue", 0);
      localStorage.setItem("afterLevel", false);
      textTyping();
      catTalkAnimation();
      break;
      case 4:
      text = "Dostajesz ode mnie kieszonkowe - 750💰!";
      localStorage.setItem("winDialogue", 0);
      localStorage.setItem("afterLevel", false);
      textTyping();
      catTalkAnimation();
      break;
      case 5:
      localStorage.setItem("coins", Number(localStorage.getItem("coins")) + 750);
      location.reload() 
    }
    break;
  case 7:
    switch (dialogueNumber) {
    case 1:
      text = "Koty z reguły nie palą, bo nie mają na to psychy.";
      textTyping();
      catTalkAnimation();
      break;
      case 2:
      text = "Zastanawiam się jak z tym jest u Ciebie, kozaku..";
      localStorage.setItem("winDialogue", 0);
      localStorage.setItem("afterLevel", false);
      textTyping();
      catTalkAnimation();
      break;
      case 3:
      location.reload() 
    }
    break;
  case 8:
    switch (dialogueNumber) {
    case 1:
      text = "Połączenie troglodyckiego, wystawionego jęzora z puszystym, eleganckim futerkiem to prawdziwy EKLEKTYZM.";
      textTyping();
      catTalkAnimation();
      break;
      case 2:
      text = "Sprawdź co to znaczy, im więcej atutów wroga znasz - tym mniej się boisz!";
      localStorage.setItem("winDialogue", 0);
      localStorage.setItem("afterLevel", false);
      textTyping();
      catTalkAnimation();
      break;
      case 3:
      location.reload() 
    }
    break;
  case 9:
    switch (dialogueNumber) {
    case 1:
      text = "Przedarliśmy się przez wszystkie bataliony!";
      textTyping();
      catTalkAnimation();
      break;
      case 2:
      text = "To ostatnia prosta!";
      textTyping();
      catTalkAnimation();
      break;
      case 3:
      text = "Czasami tak myślę, że nasza nienawiść wobec psów to tak naprawdę tylko.. latencja?";
      localStorage.setItem("winDialogue", 0);
      localStorage.setItem("afterLevel", false);
      textTyping();
      catTalkAnimation();
      break;
      case 4:
      location.reload() 
    }
    break;
  case 10:
    switch (dialogueNumber) {
    case 1:
      text = "TWOJA MISJA ZOSTAŁA OFICJALNIE UKOŃCZONA!";
      textTyping();
      catTalkAnimation();
      break;
      case 2:
      text = "Należy Ci się OGROMNA NAGRODA, bo to już koniec gry!";
      textTyping();
      catTalkAnimation();
      break;
      case 3:
      text = "Dostajesz ode mnie 2500💰, wydaj je dowolnie! ";
      localStorage.setItem("winDialogue", 0);
      localStorage.setItem("afterLevel", false);
      textTyping();
      catTalkAnimation();
      break;
      case 4:
      text = "Tryb przygodowy ulegnie całkowitemu restartowi. Możesz zacząć przygodę od nowa kiedy tylko chcesz!";
      textTyping();
      catTalkAnimation();
      break;
      case 5:
        text = "Bardzo dziękuję za grę!!!! <3";
        textTyping();
        catTalkAnimation();  
      break;
      case 6:
        localStorage.setItem("coins", Number(localStorage.getItem("coins")) + 2500);
      location.reload() 
      break;
    }
    break;
  }
  document.getElementById("menu").addEventListener("click", function(e){ 
    if ((e.target) && (playDialogue == false))  {
      document.querySelector(".dialogueText").innerHTML = "";
      clearTimeout(letterInterval);
      letterPlace = 0;
      winDialogue(dialogue, dialogueNumber);
    }
    else {}
  })
}


//dialogi menu
const dialoguesMenu = () => {
  switch (Math.floor(Math.random() * 4)) {
    case 0:
    text = "Czuję świeżą trawę, wróciłeś!";
    break;
    case 1:
    text = "Na moje kudły i świętą kocimiętkę! W końcu Cię widzę~"
    break;
    case 2:
    text = "Na początku zatrudniliśmy do zbioru traw Boba Marleya, ale okazało się, że zbyt wiele z niej po prostu znikało."
    break;
    case 3:
    text = "Jakiego jestem gatunku? Jestem kotem egipskim. Nie, nie dam namiarów na fryzjera." 
    break;
    }
}

//animacja rozmawiajacego kota
const catTalkAnimation = () => {
let catTalk = setInterval(function(){
  if ((letterPlace<text.length)&&(document.getElementById("menuCat"))) {
  document.getElementById("menuCat").setAttribute("class", "menuCatTalk");
  }
  else if (document.getElementById("menuCat")) {
  document.getElementById("menuCat").setAttribute("class", "menuCatStatic");
  clearInterval(catTalk);
  }
}, 10)
}

//dialogi sklepowe
const dialoguesShop = () => {
  switch (Math.floor(Math.random() * 6)) {
    case 0:
    text = "W PRZECIWIEŃSTWIE DO KOCICH DRESÓW MY PIRACI CHCEMY, ŻEBYŚ SIĘ INTERSOWAŁ!"
    break;
    case 1:
    text = "KTO JEST W KOCIM GANGU TO W KOCIM GANGU ZOSTAJE!"
    break;
    case 2:
    text = "KRAKEN? POTWÓR SPAGHETTI BYŁ ZDECYDOWANIE SMACZNIEJSZY!"
    break;
    case 3:
    text = "KUPUJ ŚMIAŁO, SFINANSUJESZ MI NOWĄ OPASKĘ!"
    break;
    case 4:
    text = "JAK JA UWIELBIAM MONOPOL.."
    break;
    default:
    text = "ARRRRRR~!"
  }
}

//Funkcja rekurencyjna, która zawiera początkowe dialogi. Przy każdym wykonaniu odtwarza kolejny tekst.
const gameBegginingDialogues = (dialogueNumber) => {
  dialogueNumber += 1;
  pressButton.play();
  switch (dialogueNumber) {
    case 1:
    text = "Gra wykonana przez Jakuba Budę. Muzyka w tle stworzona przez https://www.fesliyanstudios.com. Kliknij gdziekolwiek, aby kontynuować.";
    textTyping();
    break;
    case 2:
    text = "NA KŁACZEK KOTA W BUTACH, W KOŃCU PRZYBYŁEŚ!!";
    textTyping();
    catTalkAnimation();
    break;
    case 3:
    text = "Musisz odnaleźć zagubione w krzakach koty, bo jako jedyny z nas masz umiejętność KLIKNIĘCIA!";
    textTyping();
    catTalkAnimation();
    break;
    case 4:
    text = "Jestem Cwanyś, szef kociej mafii. Wspaniale Cię poznać!";
    textTyping();
    catTalkAnimation();
    break;
    case 5:
    text = "W naszej ostatniej misji doszło do przebrzydłego napadu na naszą ekipę.";
    textTyping();
    catTalkAnimation();
    break;
    case 6:
    text = "Zakładamy, że dokonał tego nasz arcywróg. Nazywamy ich psiarską bandą.";
    textTyping();
    catTalkAnimation();
    break;
    case 7:
    text = "Każdy kot wierzy w to, że zostanie uratowany, więc nie zawaha się do Ciebie dołączyć. Jeśli zwrócisz mi moją załogę to z pewnością doczekasz się wynagrodzenia!";
    textTyping();
    catTalkAnimation();
    break;
    case 8:
    text = "Zbieramy też trawy. Potrzebujemy jej do kominka, bo każdy kot kocha kominek! Jeśli zbierzesz trawy to z pewnością Ci za nie zapłacę, meow!";
    textTyping();
    catTalkAnimation();
    break;
    case 9:
    text = "Kliknij gdziekolwiek, aby kontynuować grę!";
    textTyping()
    break;
    case 10:
    localStorage.setItem("started", 1);
    location.reload()
    return;
  }
  document.getElementById("menu").addEventListener("click", function(e){ 
    if (e.target) {
      document.querySelector(".dialogueText").innerHTML = "";
      clearTimeout(letterInterval);
      letterPlace = 0;
      gameBegginingDialogues(dialogueNumber);
    }
  })
}

//strzalki modyfikujace kluczowe zmienne gry - czas i ilosc traw
const incGrass = () => {
  let arrowRight = document.getElementById("trawy");
  let value = Number(arrowRight.innerText);
  if (value !== 35) {
  arrowRight.innerText = value + 1;
  }

}
const decGrass = () => {
  let arrowLeft = document.getElementById("trawy");
  let value = Number(arrowLeft.innerText);
  if (value !== 5) {
  arrowLeft.innerText = value - 1;
  }

}
const incTime = () => {
  let arrowRight = document.getElementById("czas");
  let value = Number(arrowRight.innerText);
  if (value !== 120) {
  arrowRight.innerText = value + 10;
  }
}

const decTime = () => {
  let arrowLeft = document.getElementById("czas");
  let value = Number(arrowLeft.innerText);
  if (value !== 10) {
  arrowLeft.innerText = value - 10;
  }
}

const incDog = () => {
  let arrowRight = document.getElementById("dog");
  let value = Number(arrowRight.innerText);
  if (value !== 6) {
  arrowRight.innerText = value + 1;
  }

}
const decDog = () => {
  let arrowLeft = document.getElementById("dog");
  let value = Number(arrowLeft.innerText);
  if (value !== 0) {
  arrowLeft.innerText = value - 1;
  }
}

//poziomy i ich ustawienia
const firstLevel = () => {
    startGame(10,60,0,0);
    setInterval(function(){
      if (gameScore >= 30) {
        gameEnd();
        localStorage.setItem("winDialogue", 1);
        localStorage.setItem("afterLevel", true); 
        localStorage.setItem("currentLevel", 2);
      }
    }, 500)
  }
  

const secondLevel = () => {
  startGame(10,120,1,10);
  setInterval(function(){
    if (gameScore >= 50 && catsCurrency >= 5) {
      gameEnd();
      localStorage.setItem("winDialogue", 2);
      localStorage.setItem("afterLevel", true); 
      localStorage.setItem("currentLevel", 3);
    }
  }, 500)
}

const thirdLevel = () => {
  startGame(7,120,2,10);
  setInterval(function(){
    if (catsCurrency >= 10) {
      gameEnd();
      localStorage.setItem("winDialogue", 3);
      localStorage.setItem("afterLevel", true); 
      localStorage.setItem("currentLevel", 4);
    }
  }, 500)
}

const fourthLevel = () => {
  startGame(20,60,3,10);
  setInterval(function(){
    if (gameScore >= 100) {
      gameEnd();
      localStorage.setItem("winDialogue", 4)
      localStorage.setItem("afterLevel", true); 
      localStorage.setItem("currentLevel", 5);
    }
  }, 500)
}

const fifthLevel = () => {
    startGame(4,70,2,10, true);
    setInterval(function(){
      if (gameScore >= 125) {
        gameEnd();
        localStorage.setItem("winDialogue", 5)
        localStorage.setItem("afterLevel", true); 
        localStorage.setItem("currentLevel", 6);
      }
    }, 500)
  }

const sixthLevel = () => {
    startGame(3,60,3,10, true);
    setInterval(function(){
      if (catsCurrency >= 15) {
        gameEnd();
        localStorage.setItem("winDialogue", 6)
        localStorage.setItem("afterLevel", true); 
        localStorage.setItem("currentLevel", 7);
      }
    }, 500)
  }
const seventhLevel = () => {
    startGame(6,70,3,10, true);
    setInterval(function(){
      if (gameScore >= 175) {
        gameEnd();
        localStorage.setItem("winDialogue", 7)
        localStorage.setItem("afterLevel", true); 
        localStorage.setItem("currentLevel", 8);
      }
    }, 500)
  }
const eightLevel = () => {
    startGame(5,70,4,10, true);
    setInterval(function(){
      if (catsCurrency >= 20) {
        gameEnd();
        localStorage.setItem("winDialogue", 8)
        localStorage.setItem("afterLevel", true); 
        localStorage.setItem("currentLevel", 9);
      }
    }, 500)
  }
const ninthLevel = () => {
    startGame(7,160,4,10, true);
    setInterval(function(){
      if (gameScore >= 225) {
        gameEnd();
        localStorage.setItem("winDialogue", 9)
        localStorage.setItem("afterLevel", true); 
        localStorage.setItem("currentLevel", 10);
      }
    }, 500)
  }
const tenthLevel = () => {
    startGame(6,100,5,10, true);
    setInterval(function(){
      if (catsCurrency >= 35) {
        gameEnd();
        localStorage.setItem("winDialogue", 10)
        localStorage.setItem("afterLevel", true); 
        localStorage.setItem("currentLevel", 1);
      }
    }, 500)
  }

  
const gameBegginingDialoguesShop = (dialogueNumber = 0) => {
    pressButton.play();
    switch (dialogueNumber) {
    case 0:
    text = "Kliknij gdziekolwiek, aby porozmawiać z kocim handlarzem.";
    textTyping();
    break;
    case 1:
    text = "AHOJ!";
    textTyping();
    break;
    case 2:
    text = "WITAJ W NASZEJ STREFIE HANDLOWEJ!!";
    textTyping();
    break;
    case 3:
    text = "MYŚLISZ, ŻE ZNANI JESTEŚMY TYLKO Z KRZAKÓW JAGODOWYCH? BŁĄD!";
    textTyping();
    break;
    case 4:
    text = "HANDLUJEMY TEŻ ZNANYMI W OKRĘGU TRZECH STANÓW ELIKSIRAMI!!";
    textTyping();
    break;
    case 5:
    text = `ABY ICH UŻYĆ NACIŚNIJ JEDEN Z GUZIKÓW PODCZAS GRY. ZIELONY TO "A", POMARAŃCZOWY TO "S", FIOLETOWY TO "D". MOŻNA UŻYĆ KAŻDEGO Z NICH TYLKO RAZ PODCZAS GRY.`;
    textTyping();
    break;
    case 6:
    text = "NAJEDŹ NA KTÓRYŚ Z TYCH BAJERÓW, A OPOWIEM CI O CO BIEGA. KLIKNIJ PONOWNIE, A PIENIĄŻKI BĘDĄ MOJE.";
    textTyping();
    break;
    case 7:
    text = "MIAŁEM NA MYŚLI, ŻE DOSTANIESZ ŚWIEŻY ELIKSIR W SWOJE RĘCE!";
    textTyping();
    localStorage.setItem("started", 2);
    playDialogue = true;
    break;
    }
  document.getElementById("bodyId").addEventListener("click", function(e){ 
    dialogueNumber += 1;
    if ((e.target) && (playDialogue == false)) {
      document.querySelector(".dialogueText").innerHTML = "";
      clearTimeout(letterInterval);
      letterPlace = 0;
      gameBegginingDialoguesShop(dialogueNumber);
    }
    else {}
  }
  );
}

//funkcja pomocnicza do usuwania obiektów pierowtnie istniejących
const deleteElementById = (Id) => {
  let element = document.getElementById(Id);
  element.parentNode.removeChild(element);
};

//Nadanie numeru każdej trawie, aby można było stworzyć indywidualne obiekty na mapie
const grassTrack = (trawy) => {
  window.value = [];
  for (int = 1; int <= trawy; int++) {
    window.value.push(int);
  }
  return window.value;
};

//losowe koordynaty, na których będą pojawiać się trawy
const randomPixel = () => {
  let width = document.getElementById("myCanvas").offsetWidth - 50,
    height = document.getElementById("myCanvas").offsetHeight - 120;
  let random_width = Math.floor(Math.random() * width),
    random_height = Math.floor(Math.random() * height);
  return (values = [random_width, random_height]);
};

//przy kliknięciu tworzone są kolejne trawy, takim samym sposobem jak te pierwotne
const grassSpawnContinue = () => {
  pickedGrass++;
  window.value.push(pickedGrass);
  randomPixel();
  fitGrass(values);
  let element = document.createElement("div");
  element.setAttribute(
    "style",
    `left:${values[0] + "px"};top:${values[1] + "px"};position:absolute;`
  );
  element.setAttribute("id", `${pickedGrass}`);
  if (isDesert == true) {
  element.setAttribute("class", "pointsDesert");
  }
  else { 
    debugger
    element.setAttribute("class", "points");
}
  let canva = document.getElementById("myCanvas");
  canva.appendChild(element);
};

//uniemożliwienie pojawienia się traw poza planszą
const fitGrass = (values) => {
  let width = document.getElementById("myCanvas").offsetWidth,
    height = document.getElementById("myCanvas").offsetHeight;
  if (values[0] < 50) {
    values[0] += 50;
  } else if (values[0] > width - 175) {
    values[0] = values[0] - 175;
  } else if (values[1] < 50) {
    values[1] += 50;
  } else if (values[1] > height - 250) {
    values[1] = values[1] - 175;
  }
  return values;
};

//animacja kota generuje się w tym samym miejscu, w którym była wcześniej kliknięta trawa
const addCat = (Id, difficulty) => {
  let multiplier;
  switch (difficulty) {
  case 0:
  multiplier = 1
  break;
  case 1:
  multiplier = 1.4
  break;
  case 2:
  multiplier = 1.7
  break;
  case 3:
  multiplier = 2
  break;
  case 4:
  multiplier = 2.3
  break;
  case 5:
  multiplier = 2.6
  break;
  case 6:
  multiplier = 3
  break;
  }
  if ((Math.floor(Math.random() * (90 / multiplier))) < 5) {
    addCatSound.play();
    let catPlace = document.getElementById(Id);
    let catHeight = catPlace.style.top,
    catWidth = catPlace.style.left,
    catId = `${"cat" + Id}`,
    canva = document.getElementById("myCanvas"),
    catScore = document.getElementById("theCats"),
    catStyle = `left:${catWidth};top:${catHeight};position:absolute;`;
    let catAnimation = document.createElement("div");
    catAnimation.setAttribute("style", catStyle);
    catAnimation.setAttribute("id", catId);
    catAnimation.setAttribute("class", "cat");
    canva.appendChild(catAnimation);
    catsCurrency++;
    catScore.innerHTML = `${catsCurrency + "🐱"}`;
    setTimeout(function() {
      if (document.getElementById(catId)) {
      deleteElementById(catId);
      }
    }, 600)
  }
}

//funkcja umożliwiająca nadanie funkcjonalności dynamicznie pojawiającym się trawom
const addPoints = () => {
  document.getElementById("myCanvas").addEventListener("click", function (e) {
    if (e.target && e.target.matches("div.points") ||  e.target.matches("div.pointsDesert") ) {
      let Id = e.target.id;
      addCat(Id, isEnemy); //dodanie punktów do wyniku przy kliknięciu
      gameScore++;
      clickGrass.play();
      deleteElementById(Id);
      let score = document.getElementById("theScore");
      score.innerHTML = `${gameScore + "🌿"}`;
      grassTrack(pickedGrass);
      grassSpawnContinue();
    }
  });
};

//dodanie waluty po każdej rozgrywce. Większa ilość traw ma słabszy przelicznik.
const addCoins = () => {
let coinsSession = gameScore;
let trawyMultip = 1 - (window.trawy * 0.01);
  coinsSession *= trawyMultip;
  localStorage.setItem("coins", `${Math.floor(Number(localStorage.getItem("coins")) + coinsSession)}`);
  gameScore = 0;
  return Math.floor(coinsSession);
}

//dodanie waluty kotów po każdej rozgrywce.
const addCatValue = () => {
  catValue = catsCurrency;
  localStorage.setItem("cats", `${Number(localStorage.getItem("cats")) + catsCurrency}`);
  catsCurrency = 0;
  return catValue;
}

//Przesunięcie elementu w miejsce, w którym na początku znajdywało się menu
const moveElement = (x, isMenu) => {
  value = 0;
  let interval = setInterval(function() {
    value+= 45;
    x.setAttribute("style", `margin-left:${value}px`);
    if (value >= window.menuCoords){
      let calc = value - window.menuCoords;
      value_precise = value - calc;
      x.setAttribute("style", `margin-left:${value_precise}px`);
      clearInterval(interval);
      if (isMenu === true) {
        location.reload();
      }
    }
  }, 10);
}

//powrót do menu po zakończonej grze
const backToMenuFromResults = () => {
  clearTimeout(letterInterval);
  document.getElementById("backToMenu").addEventListener("click", function (e){
  if (e.target) {
  location.reload();
  }
})
}


//powrót do menu z okna sklepu
const backToMenuFromShop = () => {
  pressButton.play();
  clearInterval(letterInterval);
  let shop = document.querySelector("div.menuSklep");
  let interval_menu = setInterval(function() {
    value+= 45;
    shop.setAttribute("style", `margin-left:${value}px`);
  }, 10);
  setTimeout(function(){
    clearInterval(interval_menu);
    shop.remove();
    let menu = document.body.appendChild(gameMenu);
    document.querySelector("p").innerHTML = "";
    moveElement(menu, true);
  }, 1000)
}

//kupno eliksirow
function buyGreen() {
  if (Number(localStorage.getItem("coins")) >= 100) {
  buyPotion.play();
  localStorage.setItem("coins", Number(localStorage.getItem("coins")) - 100);
  document.getElementById("money").innerText = localStorage.getItem("coins") + "💰" + "    " + localStorage.getItem("cats") + "🐱";
  localStorage.setItem("greenPotion", Number(localStorage.getItem("greenPotion")) + 1);
  }
}

function buyOrange() {
  if (Number(localStorage.getItem("coins")) >= 125) {
  buyPotion.play();
  localStorage.setItem("coins", Number(localStorage.getItem("coins")) - 125);
  document.getElementById("money").innerText = localStorage.getItem("coins") + "💰" + "    " + localStorage.getItem("cats") + "🐱";
  localStorage.setItem("orangePotion", Number(localStorage.getItem("orangePotion")) + 1);
  }
}

function buyPurple() {
  if (Number(localStorage.getItem("coins")) >= 150) {
  buyPotion.play();
  localStorage.setItem("coins", Number(localStorage.getItem("coins")) - 150);
  document.getElementById("money").innerText = localStorage.getItem("coins") + "💰" + "    " + localStorage.getItem("cats") + "🐱";
  localStorage.setItem("purplePotion", Number(localStorage.getItem("purplePotion")) + 1);
  }
}


//funkcja tworząca sklep i animację, która występuje przy wejściu 
const createShop = () => {
  let shop = document.createElement("div"),
  money = document.createElement("h1"),
  catValue = document.createElement("h1"),
  button = document.createElement("button"),
  menuPotion = document.createElement("div"),
  greenPotion = document.createElement("div"),
  orangePotion = document.createElement("div"),
  purplePotion = document.createElement("div"),
  catDiv = document.createElement("div"),
  catDialogue = document.createElement("div"),
  catText = document.createElement("p");
  shop.setAttribute("class", "menuSklep");
  shop.setAttribute("id", "sklep");
  menuPotion.setAttribute("class", "menuPotion");
  greenPotion.setAttribute("class", "greenPotion");
  purplePotion.setAttribute("class", "purplePotion");
  orangePotion.setAttribute("class", "orangePotion");
  money.setAttribute("style", "font-family:\"pixel\";font-size:50px;margin-top:175px;line-height:20px");
  money.setAttribute("id", "money")
  catValue.setAttribute("style", "font-family:\"pixel\";font-size:50px;");
  catDiv.setAttribute("class", "sklep");
  catDialogue.setAttribute("class", "dialogueBox");
  catText.setAttribute("class", "dialogueText");
  money.innerText = localStorage.getItem("coins") + "💰" + "    " + localStorage.getItem("cats") + "🐱";
  button.innerText = "Menu";
  shop.addEventListener("mouseover", function(e){
    if (localStorage.getItem("started") == 2) {
      if ((e.target && e.target.matches(".greenPotion"))) {
      document.querySelector(".dialogueText").innerHTML = "";
      clearInterval(letterInterval);
      letterPlace = 0;
      if (Number(localStorage.getItem("cats") >= 20)) {
      document.querySelector(".greenPotion").addEventListener('click', buyGreen);
      text = `ZIELONY ELIKSIR POD GUZIKIEM "A" SPRAWIA, ŻE WRÓG PRZEZ 25 SEKUND NIE MOŻE SIĘ PODNIEŚĆ! NACIŚNIJ, ABY KUPIĆ! 100💰.`
      textTyping();
      }
      else {
      text = `W SPRZEDAŻY TYLKO DLA ZAUFANYCH. MINIMUM 20 🐱.`
      textTyping();
      }
    }
    if ((e.target && e.target.matches(".orangePotion"))) {
      document.querySelector(".dialogueText").innerHTML = "";
      clearInterval(letterInterval);
      letterPlace = 0;
      if (Number(localStorage.getItem("cats") >= 40)) {
      text = `POMARAŃCZOWY ELIKSIR POD GUZIKIEM "S" ZWIĘKSZA ILOŚĆ TRAW O 15 NA CZAS ROZGRYWKI! NACIŚNIJ, ABY KUPIĆ! 125💰.`
      textTyping();
      document.querySelector(".orangePotion").addEventListener('click', buyOrange);
      }
      else {
      text = `W SPRZEDAŻY TYLKO DLA ZAUFANYCH. MINIMUM 40 🐱.`
      textTyping();
      }
    }
    if ((e.target && e.target.matches(".purplePotion"))) {
      document.querySelector(".dialogueText").innerHTML = "";
      clearInterval(letterInterval);
      letterPlace = 0;
      if (Number(localStorage.getItem("cats") >= 60)) {
      text = `PURPUROWY ELIKSIR POD GUZIKIEM "D" JEDNORAZOWO ZRYWA WSZYSTKIE TRAWY Z MAPY I OGŁUSZA WROGA NA 20S! NACIŚNIJ, ABY KUPIĆ! 150💰.`
      textTyping();
      document.querySelector(".purplePotion").addEventListener('click', buyPurple);
      }
      else {
      text = `W SPRZEDAŻY TYLKO DLA ZAUFANYCH. MINIMUM 60 🐱.`
      textTyping();
      }
    }
  }
  } )
  document.body.appendChild(shop);
  shop.appendChild(catDiv);
  shop.appendChild(catDialogue);
  shop.appendChild(money);
  shop.appendChild(menuPotion);
  menuPotion.appendChild(greenPotion);
  menuPotion.appendChild(orangePotion);
  menuPotion.appendChild(purplePotion);
  catDialogue.appendChild(catText);
  shop.appendChild(button);
  moveElement(shop, false);
  clearInterval(letterInterval);
  letterPlace = 0;
  shop.addEventListener("click", function(e){
    if (e.target && e.target.matches("button")) {
      dialoguesMenu();
      letterPlace = text.length;
      backToMenuFromShop();
    }
  })
  if (localStorage.getItem("started") == 2) {
  dialoguesShop();
  textTyping();
  }
  else if (localStorage.getItem("started") == 1) {
  document.querySelector(".dialogueText").innerHTML = "";
  gameBegginingDialoguesShop();
  }
  clearInterval(catTalk);

}

//funkcja animująca menu przy przejściu do sklepu
const enterShop = () => {
  pressButton.play();
  let menu = document.querySelector(".menu"),
  menuContainer = document.getElementById("menu");
  menuContainer.appendChild(menu);
  menu.removeAttribute("style");
  areMenuCoords = true;
    if (areMenuCoords === true) { //pobiera koordynaty menu i przechowuje je
    window.menuCoords = menu.getBoundingClientRect().x;
  }
  let value = 0;
  let elementMove = setInterval(function() {
    value+= 45;
    menu.setAttribute("style", `margin-left:${value}px`);
  }, 10);
  setTimeout(function(){
    clearInterval(elementMove);
    menu.removeAttribute("style");
    menu.remove();
    createShop();
  }, 1000)
}

//funkcja kończąca sesję gry
const gameEnd = () => {
  desertMusic.pause();
  meadowMusic.pause();
  winMusic.play();
  window.usedOrange = false;
  playDialogue = false;
  myCanvas.remove();
  myScoreboard.remove();
  gameBackToMenu.remove();
  gamePotionStatus.remove();
  let endScore = document.createElement("h1"),
    endCoins = document.createElement("h1"),
    backToMenu = document.createElement("h1");
    endCats = document.createElement("h1");
  endScore.setAttribute("id", "endScore");
  endCoins.setAttribute("id", "endCoins");
  backToMenu.setAttribute("id", "backToMenu");
  endCats.setAttribute("id", "endCats");
  endScore.innerText = gameScore + "🌿";
  endCoins.innerText = "+" + addCoins() + "💰";
  endCats.innerText = "+" + addCatValue() + "🐱";
  backToMenu.innerText = "Powrót do menu!";
  document.body.appendChild(endScore);
  document.body.appendChild(endCoins);
  document.body.appendChild(endCats);
  document.body.appendChild(backToMenu);
  setTimeout(function(){
      backToMenuFromResults()
    }, 1500)
}

//implementacja traw wraz z koordynatami na planszę
const grassSpawn = (array) => {
  for (let each of array) {
    let element = document.createElement("div");
    randomPixel();
    fitGrass(values);
    element.setAttribute(
      "style",
      `left:${values[0] + "px"};top:${values[1] + "px"};position:absolute;`
    );
    element.setAttribute("id", `${each}`);
    if (isDesert == true) {
    element.setAttribute("class", "pointsDesert");
    }
    else {
    element.setAttribute("class", "points");
    }
    let canva = document.getElementById("myCanvas");
    canva.appendChild(element);
  }
  addPoints();
  gameResetTimeout = setTimeout(function () {;  //Usuniecie elementów gry po wybranym w menu czasie, koniec gry
  gameEnd();
}, pickedTime * 1000);
};


//nadanie licznikowi funkcjonalności
const timerFunction = (czas) => {
  let czas_2 = czas;
  let timer = document.getElementById("myTimer");
  setInterval(function () {
    czas_2--;
    timer.innerHTML = czas_2;
    if (czas == 0) {
      clearInterval(timer());
    }
  }, 1000);
};

//wymuszenie na graczu wybrania poziomu trudności w menu
const startGame = (grass = 15, time = 30, enemy = 0, enemySpeed = 10, desert = false) => {
  menuMusic.pause();
  if (document.getElementById("trawy") && !document.querySelector(".marginDiv")) {
  pickedGrass = document.getElementById("trawy").innerText,
  pickedTime = document.getElementById("czas").innerText;
  isEnemy = document.getElementById("dog").innerText;
  isEnemy = parseInt(isEnemy);
  }
  else {
    pickedGrass = grass;
    pickedTime = time;
    isEnemy = enemy;
    if (desert == true) {
      isDesert = true;
      desertMusic.play();
    }
    else {
      meadowMusic.play();
    }
  }
  menu = document.querySelector(".menu");
  menu.removeAttribute("style");
  menu.remove();
  gameCreation(isEnemy, enemySpeed, desert);
  document.getElementById("bodyId").setAttribute("style", "background:url(misc/backgroundscore.png)")
}

//Powrót do wyboru pomiędzy przygodą a sandboxem
const returnToChoiceMenu = () => {
  pressButton.play();
  let innerHTML = `<div id="content"><button onclick="playAdventure()" class="pixel">Przygoda (${localStorage.getItem("currentLevel")})</button> <br> <br>
  <button onclick="playFreeplay()" class="pixel">Swoboda</button> <br> <br>
  <button onclick="enterShop()" class="pixel">Market</button> <br> <br> </div>`,
  marginDiv = document.createElement("div");
  marginDiv.setAttribute("class", "marginDiv");
  board.appendChild(marginDiv);
  document.getElementById("content").remove();
  board.innerHTML = board.innerHTML + innerHTML;
}

//Wejście w tryb swobodny, w którym można wybrać ilość traw i czasu
const playFreeplay = () => {
  pressButton.play();
  let innerHTML = `<div id="content"><div id="strzalkaLewoTrawy" onclick="decGrass()"></div><span id="trawy" class="pixel">10</span><span>🌿</span>
                <div id="strzalkaPrawoTrawy" onclick="incGrass()"></div><br> 
                <div id="strzalkaLewoCzas" onclick="decTime()"></div><span id="czas" class="pixel">60</span><span>🕰</span> 
                <div id="strzalkaPrawoCzas" onclick="incTime()"></div><br>
                <div id="strzalkaLewoPies" onclick="decDog()"></div><span id="dog" class="pixel">0</span><span>🐕</span> 
                <div id="strzalkaPrawoPies" onclick="incDog()"></div> <br> <br>
                <button onclick="startGame()" class="pixel">Graj</button> <br> <br>
                <button onclick="returnToChoiceMenu()" class="pixel">Powrót</button></div>`
                
  content = document.getElementById("content");
  board = document.getElementById("board");
  document.querySelector(".marginDiv").remove();
  content.remove();
    board.innerHTML = board.innerHTML + innerHTML;
  }

//tworzenie wroga
const createEnemy = (difficulty = 1, enemySpeed = 10) => {
  let enemy = document.createElement("div"),
  width = document.getElementById("myCanvas").offsetWidth,
    height = document.getElementById("myCanvas").offsetHeight,
    canva = document.getElementById("myCanvas");
    enemy.setAttribute("class", "enemyRunRight");
  width = width / 2;
  height = height / 2;
  enemy.style.top = height - 40 + "px";
  enemy.style.left = width - 40 + "px";
  enemy.setAttribute("id", "dogEnemy")
  canva.appendChild(enemy);
  setTimeout(function(){enemy.addEventListener("mouseover", function(e) {
    if (e.target) {
      loseGame.play();
      gameEnd();
    }
  })},300)
  canva.addEventListener("mousemove", function(e){
    window.Y = e.y - 60;
  })
  canva.addEventListener("mousemove", function(e){
    window.X = e.x - 60;
  })
  setInterval(function() {
    let Y = enemy.style.top,
    X = enemy.style.left;
    Y.replace(/[^0-9]/g,'');
    X.replace(/[^0-9]/g,'');
    Y = parseInt(Y);
    X = parseInt(X);
    if (window.usedPotionGreen == true) {
      enemy.setAttribute("class", "enemyGreenPotion");
    }
    else if(window.usedPotionPurple == true) {
      enemy.setAttribute("class", "enemyPurplePotion");
    }
    else {
    if ((X < window.X) && (X < canva.offsetWidth - 110)){
      enemy.style.left = `${X + difficulty}px`
      enemy.setAttribute("class", "enemyRunRight");
    }
    else if ((X > window.X) && (X > canva.offsetWidth + 5 - canva.offsetWidth)){
      enemy.style.left = `${X - difficulty}px`
      enemy.setAttribute("class", "enemyRunLeft");
    }
    if ((Y > window.Y) && (Y > canva.offsetHeight + 5 - canva.offsetHeight)){
      enemy.style.top = `${Y - difficulty}px`
    }
    else if ((Y < window.Y) && (Y < canva.offsetHeight - 110)){
      enemy.style.top = `${Y + difficulty}px`
    }
  }
  }, enemySpeed)
}

function usePotion(button) {
  if (button.key === "a" && Number(localStorage.getItem("greenPotion") >= 1 && window.usedGreen == false)) {
  greenPotionSound.play();
  window.usedGreen = true;
  let amount = parseInt(localStorage.getItem("greenPotion"))
  localStorage.setItem("greenPotion", amount - 1);
  document.getElementById("greenPotion").innerText = amount - 1;
  window.usedPotionGreen = true;
  setTimeout(function(){
    window.usedPotionGreen = false;
  }, 25000)
}
else if (button.key === "s" && Number(localStorage.getItem("orangePotion") >= 1 && window.usedOrange == false)) {
  orangePotionSound.play();
  window.usedOrange = true;
  let amount = parseInt(localStorage.getItem("orangePotion"))
  document.getElementById("orangePotion").innerText = amount - 1;
  localStorage.setItem("orangePotion", amount - 1);
  for (let int = 0; int < 15; int++) {
    grassSpawnContinue()
  }
}
else if (button.key === "d" && Number(localStorage.getItem("purplePotion") >= 1 && window.usedPurple == false)) {
  purplePotionSound.play();
  window.usedPurple = true;
  let amount = parseInt(localStorage.getItem("purplePotion"));
  if (window.usedOrange) {
  }
  for (let i = 0; window.trawy + 15 >= i; i++) {
    debugger
    if (document.querySelector(".points")) {
    document.querySelector(".points").click();
    }
    else {
    document.querySelector(".pointsDesert").click();
    }
  }
  document.getElementById("purplePotion").innerText = amount - 1;
  window.usedPotionPurple = true;
  setTimeout(function(){
    window.usedPotionPurple = false;
  }, 20000)
}
}

//utworzenie elementów gry
const gameCreation = (isEnemy, enemySpeed = 10, isDesert) => {
  window.usedOrange = false;
  window.usedGreen = false;
  window.usedPurple = false;
  let canva = document.createElement("div"),
    scoreboard = document.createElement("div"),
    potionboard = document.createElement("div"),
    backButton = document.createElement("div"),
    score = document.createElement("h1"),
    greenElixir = document.createElement("h1"),
    orangeElixir = document.createElement("h1"),
    purpleElixir = document.createElement("h1"),
    timer = document.createElement("h1"),
    cats = document.createElement("h1");
    pickedGrass = parseInt(pickedGrass);
    window.trawy = pickedGrass; //wartość trawy ulega zmianie, pomocnicza zmienna zapamiętuje pierwotną wartość
  score.setAttribute("id", "theScore");
  score.innerHTML = 0 + "🌿";
  cats.setAttribute("id", "theCats");
  cats.innerHTML = 0 + "🐱";
  scoreboard.setAttribute("id", "myScoreboard");
  backButton.setAttribute("id", "gameBackToMenu");
  potionboard.setAttribute("id", "gamePotionStatus");
  greenElixir.setAttribute("id", "greenPotion");
  orangeElixir.setAttribute("id", "orangePotion");
  purpleElixir.setAttribute("id", "purplePotion");
  backButton.innerText = "Menu";
  canva.setAttribute("id", "myCanvas");
  if (isDesert == true) {
      canva.setAttribute("style", "background:url(misc/gamebackgrounddesert.png");
  }
  timer.setAttribute("id", "myTimer");
  timer.innerHTML = pickedTime;
  document.body.appendChild(canva);
  document.body.appendChild(scoreboard);
  document.body.appendChild(potionboard);
  document.body.appendChild(backButton);
  window.addEventListener("keypress", usePotion);
  backButton.addEventListener("click", function(e) {
    if (e.target) {
      gameEnd();
      clearTimeout(gameResetTimeout);
    }
  })
  potionboard.appendChild(greenElixir);
  potionboard.appendChild(orangeElixir);
  potionboard.appendChild(purpleElixir);
  greenElixir.innerText = localStorage.getItem("greenPotion");
  orangeElixir.innerText = localStorage.getItem("orangePotion");
  purpleElixir.innerText = localStorage.getItem("purplePotion");
  scoreboard.appendChild(score);
  scoreboard.appendChild(cats);
  scoreboard.appendChild(timer);
  timerFunction(pickedTime);
  grassSpawn(grassTrack(pickedGrass));
  if (isEnemy>0){
  setTimeout(createEnemy(isEnemy, enemySpeed), 3000);
  }
  return score;
};