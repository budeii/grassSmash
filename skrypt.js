//globalne zmienne niezbędne do funkcjonowania kodu
let trawy = 0,
  czas = 0,
  wynik = 0,
  wynikCombo = 20,
  onlyOnce = 0,
  gameMenu = document.querySelector(".menu"),
  gameContainer = document.getElementById("menu");

  const fullScreen = () => {
  if (document.fullscreenEnabled) {
    document.getElementById("root").requestFullscreen();
}
}

//utworzenie klucza przetrzymującego ilość waluty jeśli jeszcze nie istnieje
  if (localStorage.getItem("coins")) {}
    else {
      localStorage.setItem("coins", "0");
  }

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
    height = document.getElementById("myCanvas").offsetHeight - 100;
  let random_width = Math.floor(Math.random() * width),
    random_height = Math.floor(Math.random() * height);
  return (values = [random_width, random_height]);
};

//konfiguracja częstotliwości efektów combo
const comboIteration = () => {
  wynikCombo+= 20;
  return wynikCombo;
};

//przy kliknięciu tworzone są kolejne trawy, takim samym sposobem jak te pierwotne
const grassSpawnContinue = () => {
  trawy++;
  window.value.push(trawy);
  randomPixel();
  fitGrass(values);
  let element = document.createElement("div");
  element.setAttribute(
    "style",
    `left:${values[0] + "px"};top:${values[1] + "px"};position:absolute;`
  );
  element.setAttribute("id", `${trawy}`);
  element.setAttribute("class", "points");
  let canva = document.getElementById("myCanvas");
  canva.appendChild(element);
  if (wynik === wynikCombo) {
    document.body.setAttribute("class", "combo");
    setTimeout(function () {
      document.body.removeAttribute("class");
      comboIteration();
    }, 5000);
  }
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
const addCat = (number) => {
let catPlace = document.getElementById(number);
let catHeight = catPlace.style.top,
catWidth = catPlace.style.left,
catId = `${"cat" + number}`,
canva = document.getElementById("myCanvas");
catStyle = `left:${catWidth};top:${catHeight};position:absolute;`;
let catAnimation = document.createElement("div");
catAnimation.setAttribute("style", catStyle);
catAnimation.setAttribute("id", catId);
catAnimation.setAttribute("class", "cat");
canva.appendChild(catAnimation);
setTimeout(function() {
  if (document.getElementById)
  deleteElementById(catId);
}, 1000)
}

//funkcja umożliwiająca nadanie funkcjonalności dynamicznie pojawiającym się trawom
const addPoints = () => {
  document.getElementById("myCanvas").addEventListener("click", function (e) {
    if (e.target && e.target.matches("div.points")) {
      let Id = e.target.id;
      addCat(Id);
      deleteElementById(Id);
      //dodanie punktów do wyniku przy kliknięciu
      wynik++;
      let score = document.getElementById("theScore");
      score.innerHTML = `${wynik + "🐈"}`;
      grassTrack(trawy);
      grassSpawnContinue();
    }
  });
};

//dodanie waluty po każdej rozgrywce. Większa ilość traw ma słabszy przelicznik.
const addCoins = () => {
let coinsSession = wynik,
percent = 0.01;
    switch (window.trawy) {
        case "30":
            percent*= 15;
            coinsSession = (coinsSession - (coinsSession * percent)) / 5;
            break;
        case "20":
            percent*= 7.5;
            coinsSession = (coinsSession - (coinsSession * percent)) / 5;
            break;
        case "10":
            coinsSession /= 5;
            break;
    }
    localStorage.setItem("coins", `${Math.floor(Number(localStorage.getItem("coins")) + coinsSession)}`);
    wynik = 0;
    return Math.floor(coinsSession);
}

const interval = (x) => {
  value = 0;
  let interval = setInterval(function() {
    value+= 45;
    x.setAttribute("style", `margin-left:${value}px`);
    if (value >= window.menuCoords){
      let calc = value - window.menuCoords;
      value_precise = value - calc;
      x.setAttribute("style", `margin-left:${value_precise}px`);
      clearInterval(interval);
    }
  }, 10);
}

//powrót do menu po zakończonej grze
const backToMenuResults = () => {
  document.getElementById("backToMenu").addEventListener("click", function (e){
  if (e.target) {
  endScore.remove();
  endCoins.remove();
  backToMenu.remove();  
  document.body.appendChild(gameContainer);
  gameContainer.appendChild(gameMenu);
  gameMenu.removeAttribute("style")
  }
})
}


//powrót do menu z okna sklepu
const backToMenuShop = () => {
  let shop = document.querySelector("div.menuSklep");
  let interval_menu = setInterval(function() {
    value+= 45;
    shop.setAttribute("style", `margin-left:${value}px`);
  }, 10);
  setTimeout(function(){
    clearInterval(interval_menu);
    shop.remove();
    let menu = document.body.appendChild(gameMenu);
    interval(menu);
  }, 1000)
}

//funkcja tworząca sklep i animację, która występuje przy wejściu 
const createShop = () => {
  let shop = document.createElement("div"),
  writtingTop = document.createElement("h1"),
  button = document.createElement("button"),
  catDiv = document.createElement("div");
  shop.setAttribute("class", "menuSklep");
  shop.setAttribute("id", "sklep");
  writtingTop.setAttribute("style", "font-family:\"pixel\";font-size:50px");
  catDiv.setAttribute("class", "menuCat");
  writtingTop.innerText = localStorage.getItem("coins") + "💰";
  button.innerText = "Menu";
  document.body.appendChild(shop);
  shop.appendChild(catDiv);
  shop.appendChild(writtingTop);
  shop.appendChild(button);
  interval(shop);
  shop.addEventListener("click", function(e){
    if (e.target && e.target.matches("button")) {
      backToMenuShop();
    }
  })
}

//funkcja animująca menu przy przejściu do sklepu
const enterShop = () => {
  let menu = document.querySelector(".menu"),
  menuContainer = document.getElementById("menu");
  menuContainer.appendChild(menu);
  menu.removeAttribute("style");
  onlyOnce++;
    if (onlyOnce === 1) {
    window.menuCoords = menu.getBoundingClientRect().x;
  }
  let value = 0;
  let interval = setInterval(function() {
    value+= 45;
    menu.setAttribute("style", `margin-left:${value}px`);
  }, 10);
  setTimeout(function(){
    clearInterval(interval);
    menu.removeAttribute("style");
    menu.remove();
    createShop();
  }, 1000)
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
    element.setAttribute("class", "points");
    let canva = document.getElementById("myCanvas");
    canva.appendChild(element);
  }
  addPoints();
  setTimeout(function () {;  //Usuniecie elementów gry po wybranym w menu czasie, koniec gry
    myCanvas.remove();
    myScoreboard.remove();
    let endScore = document.createElement("h1"),
      endCoins = document.createElement("h1"),
      backToMenu = document.createElement("div");
    endScore.setAttribute("id", "endScore");
    endCoins.setAttribute("id", "endCoins");
    backToMenu.setAttribute("id", "backToMenu");
    endScore.innerText = wynik + "🐈";
    endCoins.innerText = addCoins() + "💰";
    document.body.appendChild(endScore);
    document.body.appendChild(endCoins);
    document.body.appendChild(backToMenu);
      setTimeout(function(){
      backToMenu.addEventListener("click", backToMenuResults());
      }, 3000)
}, czas * 1000);
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
const startGame = () => {
  trawy = document.getElementById("trawy").innerText,
  czas = document.getElementById("czas").innerText;
  menu = document.querySelector(".menu");
  menu.removeAttribute("style");
  menu.remove();
  gameCreation();
}

//utworzenie elementów gry
const gameCreation = () => {
  let canva = document.createElement("div"),
    score = document.createElement("h1"),
    scoreboard = document.createElement("div"),
    timer = document.createElement("h1");
    window.trawy = trawy; //wartość trawy ulega zmianie, pomocnicza zmienna zapamiętuje pierwotną wartość
  score.setAttribute("id", "theScore");
  score.innerHTML = wynik + "🐈";
  scoreboard.setAttribute("id", "myScoreboard");
  canva.setAttribute("id", "myCanvas");
  timer.setAttribute("id", "myTimer");
  timer.innerHTML = czas;
  document.body.appendChild(canva);
  document.body.appendChild(scoreboard);
  scoreboard.appendChild(score);
  scoreboard.appendChild(timer);
  timerFunction(czas);
  grassSpawn(grassTrack(trawy));
  return score;
};



/* TODO 
>utworzenie sklepu
>Ekran końcowy - tabela wyników
>Animacja i grafika
>Sklep z przedmiotami - animacje, ulepszenia
*/
