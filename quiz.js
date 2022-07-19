const exitButton = document.getElementById("exit-btn");
const retryButton = document.getElementById("retry-btn");
const nextButton = document.getElementById("next-btn");
const resultButton = document.getElementById("result-btn");
const cardQuizElement = document.getElementById("cardQuiz");
const endControlElement = document.getElementById("end-control");
const questionContainerElement = document.getElementById("question-container");
const questionTitleElement = document.getElementById("question-title");
const answerButtonElement = document.getElementById("answer-buttons");
const chooseTypeElement = document.getElementById("choose-type");
const resultElement = document.getElementById("result");
const controlsElement = document.getElementById("controls");
const questionNumberElement = document.getElementById("question-number");
let shuffleQuestions, currentQuestionIndex;
let correctAnswers = 0;
let allQuestions = 0;
const questionTypes = [
  {
    value: 1,
    text: "Kvíz",
  },
  {
    value: 2,
    text: "Kvíz II. (Igaz-Hamis)",
  },
  {
    value: 3,
    text: "Kvíz III. (8-10 éves korosztály)",
  },
];

chooseType();
nextButton.addEventListener("click", () => {
  currentQuestionIndex++;
  setNextQuestion();
});

function chooseType() {
  correctAnswers = 0;
  allQuestions = 0;
  endControlElement.classList.add("hide");
  controlsElement.classList.add("hide");
  resultElement.classList.add("hide");
  resultElement.innerHTML = "";
  answerButtonElement.classList.remove("hide");
  questionContainerElement.classList.add("hide");
  chooseTypeElement.classList.remove("hide");
  questionTypes.forEach((type) => {
    const button = document.createElement("button");
    button.innerText = type.text;
    button.classList.add("btn");
    if (type.value) {
      button.dataset.value = type.value;
    }
    button.addEventListener("click", startGame);
    chooseTypeElement.appendChild(button);
  });
}

function startGame(e) {
  controlsElement.classList.remove("hide");
  chooseTypeElement.classList.add("hide");
  type = questionsOne;
  const selectButton = e.target;
  const typeValue = selectButton.dataset.value;
  console.log("Started");
  if (typeValue == 1) {
    type = questionsOne;
  } else if (typeValue == 2) {
    type = questionsTrueOrFalse;
  } else {
    type = questionsFromEightToTen;
  }
  allQuestions = type.length;
  shuffleQuestions = type.sort(() => Math.random() - 0.5);
  currentQuestionIndex = 0;
  questionContainerElement.classList.remove("hide");
  setNextQuestion();
}

function setNextQuestion() {
  resetState();
  showQuestion(shuffleQuestions[currentQuestionIndex]);
}

function showQuestion(question) {
  questionNumberElement.innerText = currentQuestionIndex+1 + "/" + allQuestions;
  questionTitleElement.innerText = question.question;
  question.answers.forEach((answer) => {
    const button = document.createElement("button");
    button.innerText = answer.text;
    button.classList.add("btn");
    if (answer.correct) {
      button.dataset.correct = answer.correct;
    }
    button.addEventListener("click", selectAnswer);
    answerButtonElement.appendChild(button);

    if (answer.description != "") {
      button.dataset.description = true;
      let description = document.createElement("p");
      description.innerText = answer.description;
      description.setAttribute("id", "desc");
      description.setAttribute("class", "desc-content");
      description.classList.add("hide");
      if (answer.correct) {
        description.classList.add("desc-border-correct");
      } else {
        description.classList.add("desc-border-basic");
      }
      answerButtonElement.appendChild(description);
    }
  });
}

function resetState() {
  clearStatusClass(document.body);
  nextButton.classList.add("hide");
  while (answerButtonElement.firstChild) {
    answerButtonElement.removeChild(answerButtonElement.firstChild);
  }
}

function selectAnswer(e) {
  Array.from(answerButtonElement.children).forEach((button) => {
    clearStatusClass(button);
    button.setAttribute("disabled", "");
  });
  const selectButton = e.target;
  const correct = selectButton.dataset.correct;
  if (correct) {
    correctAnswers++;
    selectButton.classList.add("correct");
  } else {
    selectButton.classList.add("wrong");
    Array.from(answerButtonElement.children).forEach((button) => {
      if (button.dataset.correct) {
        button.classList.add("correct");
      }
    });
  }
  if (selectButton.dataset.description) {
    const descriptionContents = document.getElementsByClassName("desc-content");
    Array.from(descriptionContents).forEach((element) => {
      element.classList.remove("hide");
    });
  }

  if (shuffleQuestions.length > currentQuestionIndex + 1) {
    nextButton.classList.remove("hide");
  } else {
    resultButton.addEventListener("click", showResult);
    resultButton.classList.remove("hide");
  }
}

function showResult() {
  endControlElement.classList.remove("hide");
  resultButton.classList.add("hide");
  chooseTypeElement.innerHTML = "";
  questionContainerElement.classList.add("hide");
  const result = document.createElement("p");
  result.innerText = "Az eredményed: " + correctAnswers + "/" + allQuestions;
  resultElement.appendChild(result);
  resultElement.classList.remove("hide");
  exitButton.addEventListener("click", () => {console.log("exited")});
  retryButton.addEventListener("click", chooseType);
}

function setStatusClasses(element, correct) {
  clearStatusClass(element);
  if (correct) {
    element.classList.add("correct");
  } else {
    element.classList.add("wrong");
  }
}

function clearStatusClass(element) {
  element.classList.remove("correct");
  element.classList.remove("wrong");
}



const questionsOne = [
  {
    question:
      "Az alábbi csomagolóanyagok közül melyik a leginkább környezetbarát?",
    answers: [
      {
        text: "Papír",
        correct: false,
        description:
          "Egy tonna fehér papír előállításához kb. 2 tonna fára és kb. 400 m³ vízre van szükség. Ezzel szemben egy tonna újrapapír előállításához kb. 1 tonna fekete-fehér újságpapír és 100 m³ víz szükséges. Papírból ma már nagyon sokféle van, és ezek típustól függően 1-5 hónap alatt bomlanak le.",
      },
      {
        text: "Műanyag",
        correct: false,
        description:
          "A műanyagok kőolajból, adalékok hozzáadásával készült mesterséges termékek, melyek között megkülönböztetünk hőre lágyuló, hőre keményedő és rugalmas fajtákat. Ezekből a mesterséges módon előállított szerves polimer anyagú termékekből évente 25 millió tonna hulladék képződik csak Európában. A műanyag lebomlási ideje, típustól függően több száz és egymillió év között változik",
      },
      {
        text: "Fém",
        correct: true,
        description:
          "Az alumínium csomagolóanyagok minőségromlás nélkül újrahasznosíthatók. Ez az eljárás rendkívüli mértékű energia-megtakarítással jár az elsődleges alumíniumgyártáshoz képest.",
      },
    ],
  },
  {
    question:
      "Az italoskartonokat milyen színű szelektív hulladékgyűjtő kukában kell gyűjteni",
    answers: [
      {
        text: "Sárga",
        correct: false,
        description:
          "A sárga színű hulladékgyűjtő kukákba a műanyaghulladékot, és a fémhulladékot kell gyűjteni, amit később a válogatóműben különítenek el egymástól. Ide kerülnek például az üdítős, ásványvizes PET palackok (kilapítva), háztartási flakonok és lecsavart kupakjaik, tiszta fóliák, kimosott tejfölös és joghurtos poharak, háztartási fémhulladékok.",
      },
      {
        text: "Kék",
        correct: true,
        description:
          "Győrött a kék színű szelektív hulladékgyűjtő tárolókba kerül a papírhulladék. Ide kell kidobni az újságokat, folyóiratokat, füzeteket, könyveket, hullámpapírokat, kartondobozokat, zsírmentes csomagolópapírokat, üdítősdobozokat (lapítva). Budapesten 2022-től a Fővárosi Közművek keretében működő FKF Hulladékgazdálkodási Divízió valamennyi begyűjtési rendszerében az italos kartondoboz (Tetra Pak) átkerült a kevert csomagolási hulladékok közé (sárga színű szelektív hulladékgyűjtők).",
      },
      {
        text: "Fehér",
        correct: false,
        description:
          "A fehér színű hulladékgyűjtő tartályokban kell elhelyezni a fehér, átlátszó üveg anyagú hulladékot, míg a színesüveg hulladék számára általában külön gyűjtőtartályok vannak kihelyezve. A különféle hulladékudvarokban az adott település és a környékbeli lakosság bármilyen mennyiségben adhat le üveget. Az üveg lebomlási ideje a természetben 1-2 millió év, vagyis nagyon nagy a környezetterhelése, ugyanakkor az üveghulladék újrafeldolgozással korlátlanul felhasználható.",
      },
    ],
  },
  {
    question:
      "A globális műanyagtermelés hány százalékát teszik ki a csomagolások?",
    answers: [
      {
        text: "20%",
        correct: false,
        description:
          "A világban összesen előállított műanyagmennyiség 20 %-át az építőiparban hasznosítják.",
      },
      {
        text: "30%",
        correct: false,
        description:
          "Az autóiparban, a gépgyártásban, a mezőgazdaságban, a bútoriparban, az orvosi eszközök és a különféle egyéb készülékek gyártásához együttesen felhasznált műanyagmennyiség a teljes műanyagtermelés 30%-át teszi ki.",
      },
      {
        text: "40%",
        correct: true,
        description:
          "A legjobb, ha már vásárláskor megnézed a csomagolás PIC-kódját. Ez egy 1 és 7 közötti, nyilakból formázott háromszög közepébe írt szám, ami minden műanyag csomagoláson megtalálható. Újrahasznosítás szempontjából az 1-es, 2-es és 5-ös számmal ellátott műanyagok vannak a legjobb helyzetben: ezekből PET palackok, poharak, háztartási szerek flakonjai, hordók, játékok, zacskók, vajas, joghurtos poharak, műanyag edények készülnek.",
      },
    ],
  },
  {
    question:
      "A teljes műanyag gyártás kb. hány százalékát teszik ki az egyszer használatos műanyagok?",
    answers: [
      {
        text: "62%",
        correct: false,
        description:
          "A világ legnagyobb egyszer használatos műanyag hulladék szennyezője az ExxonMobil amerikai olaj- és gázipari nagyvállalat, amely évente 5,9 millió tonnával járul hozzá a globális hulladéktermelés ezen részéhez. Összesen húsz vállalat felelős a világ egyszer használatos műanyag hulladékának az 55 %-áért",
      },
      {
        text: "40%",
        correct: true,
        description:
          "Az előállított műanyag termékek mintegy harmada polietilén. A polietilén felhasználás tipikus példája a „reklámszatyor” vagy a „nejlonzacskó”, nagyon stabil szerkezetű, nehezen lebontható. 400 ºC felett gáz-, és folyadékállapotú szénhidrogének és szenes maradék marad vissza belőle.",
      },
      {
        text: "25%",
        correct: false,
        description:
          "A Csendes-óceáni szemétsziget a nyugati-hosszúság 135. és 155. illetve az északi-szélesség 35-45. foka között található hatalmas, a víz felszínén lebegő szeméthalom, amit az óceánba szórt illetve a folyók által a szárazföldről az óceánba hordott hulladékból tereltek össze a tengeráramlatok.",
      },
    ],
  },
  {
    question:
      "Az Európai Unió területén 2018-ban megtermelt, összesen 359 millió tonna műanyag hány százaléka lett újrahasznosítva?",
    answers: [
      {
        text: "32,5%",
        correct: true,
        description:
          "2018-ban a főbb ásványi hulladékok kivételével összesen 689 millió tonna hulladékot kezeltek az EU-ban. A keletkező hulladék 55,4 %-át, azaz 387 millió tonnát hasznosítottak újra. 2019-ben a kutatók becslése szerint 850 millió tonna üvegházhatású gáz jutott a levegőbe műanyagok előállítása és elégetése következtében. Az EU-ban 2009 és 2019 között a lakosonkénti műanyagszemét termelés 24%-kal nőtt.",
      },
      {
        text: "44,7%",
        correct: false,
        description:
          "2019-ben az Európai Unió tagállamai közül kilencben a műanyaghulladék több mint felét már újrahasznosítják. Ezek az országok: Litvánia (70%), Csehország (61%), Bulgária (59%), Hollandia (57%), Svédország és Szlovákia (53%), Spanyolország (50%) Ciprus (51%) és Szlovénia (50%).",
      },
      {
        text: "58,2%",
        correct: false,
        description:
          "2019-ben az Európai Unió alábbi országaiban a műanyaghulladék kevesebb, mint harmada lett újrahasznosítva: Málta (11%), Franciaország (27%), Írország (28%), Ausztria (31%), Lengyelország (32%), Magyarország (33%).",
      },
    ],
  },
  {
    question:
      "A teljes üvegház hatású gázkibocsátás hány százalékáért felelős az élelmiszerpazarlás?",
    answers: [
      {
        text: "5%",
        correct: false,
        description:
          "A világ üvegházhatású gázkibocsátásának 5,2%-át adják a cementgyártás, valamint a vegyipar és petrolkémia ipari folyamatai.",
      },
      {
        text: "10%",
        correct: true,
        description:
          "Az élelmiszerpazarlás a fiatalabb korosztályokra jellemzőbb. Az 30 évnél fiatalabbak dobják ki a legtöbb élelmiszert, míg a 60 évnél idősebbek a legkevesebbet.",
      },
      {
        text: "14%",
        correct: false,
        description:
          "Világszinten a teljes üvegházhatású gázkibocsátás 12%-át adja a közúti közlekedés, amit még további 4,2%-kal növel a közlekedés és szállítás egyéb formái (repülés, hajózás, vasút).",
      },
    ],
  },
  {
    question:
      "Hány kiló élelmiszer végzi a szemétben világszerte évente egy főre számítva?",
    answers: [
      {
        text: "47 kg/fő",
        correct: false,
        description:
          "Az ENSZ fenntartható fejlesztési céljaival összhangban, a tagállamoknak a kidobott élelmiszer mennyiségét 2025-re 30%-kal, 2030-ra 50%-kal kell csökkenteni. Az Európai Élelmiszerbank Egyesület (European Food Banks Federation - FEBA) magyarországi tagja a Magyar Élelmiszerbank Egyesület 2005 óta áll fenn és munkálkodik azon, hogy a Magyarországon évente keletkező 1,8 millió tonna élelmiszerfelesleg minél nagyobb részét sikerüljön eljuttatni sok ezer magyar nélkülöző számára. 2020-ban 8300 tonna élelmiszert sikerült megmenteniük a kidobástól és szétosztani a rászorulók között.",
      },
      {
        text: "85 kg/fő",
        correct: false,
        description:
          "Az élelmiszerláncról és hatósági felügyeletéről szóló 2008. évi XLVI. törvény és a kiskereskedelmi adóról szóló 2020. évi XLV. törvény módosításával a már meglévő magyar élelmiszerbank mellett létrejött egy állami szervezet is élelmiszermentési céllal. A 2021 december 22-én elfogadott, 2021. évi CLI törvény értelmében a 100 milliárd forintnál nagyobb nettó árbevétellel rendelkező, napi fogyasztási cikkeket értékesítő, élelmiszer kereskedelemmel foglalkozó cégek kötelesek árucikkeiket, azok minőségmegőrzési időtartamának lejárta előtt legalább 48 órával az Élelmiszermentő Központ Nonprofit Kft.-nek felajánlani, amely felelős az élelmiszermentési folyamatért, melynek célja az így átvett élelmiszerek rászorulókhoz való eljuttatása.",
      },
      {
        text: "121 kg/fő",
        correct: true,
        description:
          "A Food Waste Index 2019-es évre vonatkozó becslések szerint a megtermelt élelmiszer 17%-a, összesen 931 millió tonna ment veszendőbe. Ennek 61%-a a háztartásokban, 26%-a a vendéglátásban, 13%-a pedig a kiskereskedelemben termelődik.",
      },
    ],
  },
  {
    question:
      "Az ország vegyes szemetének, vagyis a települések szilárdhulladékának hány százaléka végzi hulladéklerakókban?",
    answers: [
      {
        text: "38%",
        correct: false,
        description:
          "A világ legnagyobb szeméttelepei között nagy eltérések vannak fejlettség és környezetterhelés tekintetében. A dél-koreai Sudokwon lerakó napi szinten 18 ezer tonna kommunális hulladékot fogad. A 4856 hektár alapterületű Apex 2007-ben 15 ezer tonna hulladékot vett át naponta, 2009-re pedig már 50 millió tonna szemetet rejtett összesen. A szeméttelep 1993-ban épült és várhatóan még 200 évig nem telik meg.",
      },
      {
        text: "56%",
        correct: false,
        description:
          "A nigériai Lagos szemétvárosa, az Olusosun lerakó, valaha a város szélén helyezkedett el, azonban a város terjeszkedésével belenőtt Lagos közepébe, így sok ezer ember él a napi 10 ezer tonna kapacitású szeméttelepen és közvetlenül körülötte. Az Olusosun területén 2018-ban kitört hatalmas tűzvész óta a kormány azon dolgozik, hogy áthelyezze a telepet.",
      },
      {
        text: "67%",
        correct: true,
        description:
          "2020-ban a Magyar Közút vállalat térképet készített az utak mentén illegálisan lerakott hulladékról. A felmérés eredménye azt mutatta, hogy 2020-ban a közúthálózat mentén, több mint 4300 köbméternyi illegálisan lerakott hulladék hevert.",
      },
    ],
  },
  {
    question: "Hol található Magyarország legnagyobb, modern hulladéklerakója?",
    answers: [
      {
        text: "Bátaapáti",
        correct: false,
        description:
          "Bátaapátiban, a helyi népszavazás után három évvel, 2008 októberében adták át a Paksi atomerőmű kis és közepes radioaktivitású felszerelések, eszközök, védőruhák tárolására alkalmas Nemzeti Radioaktívhulladék-tárolót.",
      },
      {
        text: "Százhalombatta",
        correct: false,
        description:
          "Százhalombatta a 20. század második felében, a Barátság kőolajvezeték végpontján épült Dunai Olajfinomító és annak melléktermékeit hasznosító Dunamenti Erőmű révén indult fejlődésnek, és kapott városi rangot 1970-ben.",
      },
      {
        text: "Pusztazámor",
        correct: true,
        description:
          "A Pusztazámori Regionális Hulladékkezelő Központ (PRHK), az előírásoknak megfelelően, kellő távolságra (3-5 km) helyezkedik el minden környező településtől, és az M7-es autópályáról letérve, lakott területeket elkerülve megközelíthető. Az 1999-2000-ben épült telep fogadja a Budapesten képződő évi 700 ezer tonna települési szilárdhulladék kb. 35%-át, a lerakó környékén fekvő települések kommunális hulladéka mellett. A területén levő lerakóteret öt ütemben töltik majd fel, az első ütem már átmeneti rekultivációval rendelkezik, a második ütemet pedig 2013-ban kezdték művelni. A PRHK környezetvédelmi ellenőrzését 19 db talajvízfigyelőkút, valamint 4 db felszíni vízmintavételi, 5 db zaj-rezgésvédelmi, 5 db talajvédelmi és 4 db levegőminőség-ellenőrző mérőpont biztosítja.",
      },
    ],
  },
  {
    question: "Hol található az ország egyetlen hulladéktüzelésű erőműve?",
    answers: [
      {
        text: "Budapest",
        correct: true,
        description:
          "A Fővárosi Hulladékhasznosító Mű üzemeltetője a Fővárosi Közterület-fenntartó Zártkörűen Működő Nonprofit Rt. Az 1982-ben üzembe helyezett, 2005-ben korszerűsített erőmű jelenleg évi 420 ezer tonna kommunális hulladék termikus hasznosítását teszi lehetővé. Ezzel a kapacitással az erőmű a Budapesten keletkező települési szilárd hulladék 60 százalékának ártalmatlanítására képes.",
      },
      {
        text: "Pécs",
        correct: false,
        description:
          "A Pécs határában található hőerőmű 2007-ben a Veolia Energia Magyarország Zrt. tulajdonába került. A 2004-2013 között lezajlott tüzelőanyag-váltás eredményeképpen két biomassza tüzelésű berendezés, egy 49,9 MW tejesítményű faapríték-tüzelésű és egy 35 MW teljesítményű, bálázott lágyszárú mezőgazdasági melléktermékekkel fűtött, kazán kezdte meg az áramtermelést.",
      },
      {
        text: "Visonta",
        correct: false,
        description:
          "Visontán működik Magyarország legnagyobb széntüzelésű erőműve, a Mátrai Erőmű. A 950 MW teljesítményű (884 MW lignit- és 66 MW földgáztüzelés) erőműben 2019 novemberében gázszivárgás történt. A balesetet követően a magyar állam felvásárolta az erőművet és bejelentette, hogy korszerűsíteni fogják.",
      },
    ],
  },
  {
    question:
      "Hány tonna hulladékot gyűjtött be a GYHG (Győri Hulladékgazdálkodási Nonprofit Kft.) 2019-ben?",
    answers: [
      {
        text: "25 670 tonna",
        correct: false,
        description:
          "A 2019. év folyamán Győrött begyűjtött szelektív hulladék tömege volt ekkora.",
      },
      {
        text: "46 614 tonna",
        correct: false,
        description:
          "Nem szelektált, egyéb települési hulladékból, és vegyes települési hulladékból gyűlt össze ennyi 2019-ben Győrött.",
      },
      {
        text: "86 409 tonna",
        correct: true,
        description:
          "Annak ellenére, hogy Győr lakossága az utóbbi években fokozatosan csökkent hivatalosan, a hulladék mennyisége a városban folyamatosan növekszik.",
      },
    ],
  },
  {
    question:
      "Győrben a szelektív hulladékgyűjtők hány százalékába kerül nem oda való szemét?",
    answers: [
      {
        text: "16%",
        correct: false,
        description:
          "A régi típusú gyűjtőedények harang alakúra cserélésével is igyekezett korlátozni a GYHG az adott szelektív hulladéktárolóba nem illó hulladék bedobását.",
      },
      {
        text: "32%",
        correct: false,
        description:
          "A szelektív hulladékgyűjtőkben a nem odavaló szemét elhelyezése szintén illegális hulladéklerakásnak számít, amit 50 ezer forinttal büntetnek a városban.",
      },
      {
        text: "43%",
        correct: true,
        description:
          "Győrött a szelektív visszagyűjtés aránya 20 %, ami országos szinten jónak számít, az európai uniós irányelv értelmében ezt az arányt 2030-ra 75%-ra kell növelni.",
      },
    ],
  },
  {
    question:
      "Kiről nevezték el a Győr Megyei Jogú Város Közgyűlése által 1999-ben alapított Környezetvédelmi Emlékérem díjat?",
    answers: [
      {
        text: "Xántus János",
        correct: false,
        description:
          "Xántus János (1825-1894) magyar természettudós, utazó, néprajzkutató, a Magyar Tudományos Akadémia levelező tagja. Növény- és állattani kollekciójával jelentősen gyarapította a Magyar Nemzeti Múzeum gyűjteményét. Ő volt a Fővárosi Állat- és Növénykert első igazgatója. Több növény és állatfaj tudományos neve állít emléket Xántusnak, ilyen például az őszirózsafélék családjába tartozó Chaenactis xantiana.",
      },
      {
        text: "Kőnig Gyula",
        correct: false,
        description:
          "Kőnig Gyula (1849-1913) magyar matematikus, egyetemi tanár, aki matematikai analízissel, algebrával, halmazelmélettel, matematikai logikával foglalkozott. 1880-tól a Magyar Tudományos Akadémia levelező, 1889-től pedig rendes tagja. Eötvös Lóránddal együtt alapította meg a Mathematikai és Physikai Társulatot, amely a Mathematikai és Physikai Lapok-at adta ki. Két fia, Dénes és György apjuk emlékére alapította az egykori Kőnig Gyula-díjat a matematikában fontos eredményeket elért tudósok elismerésére.",
      },
      {
        text: "Kitaibel Pál",
        correct: true,
        description:
          "Kitaibel Pál (1757-1817) természettudós, botanikus és kémikus. Összegyűjtötte és leírta Magyarország növényeit, kőzeteit, és ásványvizeit (Hydrographia Hungariae - 1829). Magyarország ritka növényeinek leírása és képei címmel, latin nyelven, 1799 és 1812 között Bécsben megjelent, 280 színes rézmetszettel illusztrált munkája befejezetlen maradt. 15 000 lapból álló hagyatékát József nádor vásárolta fel és ajándékozta a Nemzeti Múzeumnak, ami később a Magyar Természettudományi Múzeum növénytárának alapját képezte.",
      },
    ],
  },
  {
    question: "Melyik évben rendezték meg az I. Győri Klíma Expót?",
    answers: [
      {
        text: "2019",
        correct: false,
        description:
          "2019-ben Győr város önkormányzata kiadta véglegesített Környezetvédelmi Nyilatkozatát, amiben bemutatta a 2019-2021-es időszakra vonatkozó Környezetvédelmi Programját.",
      },
      {
        text: "2020",
        correct: false,
        description:
          "2020. március 9-én megalakult a győri önkormányzat Környezetvédelmi Bizottsága. A Környezetvédelmi Bizottság első elnöke dr. Szálasy László, alelnöke dr. Sik Sándor, képviselő tagja Bárány István, míg nem képviselő tagjai Fekete Mária és Markó-Valentyik Anna.",
      },
      {
        text: "2021",
        correct: true,
        description:
          "2021. szeptember 11-12-én rendezték meg ZöldGyőr címmel a város első klímarendezvényét az Olimpiai Sportparkban. A klíma expo során a város hulladékgazdálkodással, víztisztítással, környezetvédelemmel, és a környezettudatos életmód népszerűsítésével foglalkozó helyi cégei hívták fel a rendezvényre kilátogatók figyelmét a klímaváltozással kapcsolatos teendők fontosságára.",
      },
    ],
  },
  {
    question:
      "Győr város klímamérlege deficites, ami azt jelenti, hogy a város több üvegház hatású gázt bocsát ki annál, mint amennyi elnyelésére képes területtel rendelkezik. Hány százalékos Győr városának elnyelő kapacitása az összes üvegház hatású gáz kibocsátásához képest?",
    answers: [
      {
        text: "1%",
        correct: true,
        description:
          "Győr károsanyag-kibocsátásához a gyárakon kívül jelentős mértékben járul hozzá a tél folyamán a lakossági tüzelés, a közúti közlekedés, és a szelektív hulladékgyűjtés nem megfelelő hatékonysága.",
      },
      {
        text: "18%",
        correct: false,
        description:
          "Győr Megyei Jogú Város közigazgatási területén elterülő erdők és zöld felületek évente nagyságrendileg 3779,14 tonna szén-dioxidot nyelnek el évente, ami kevesebb, mint 1%-a a város területén egy évben kibocsátott teljes üvegházhatású gáz mennyiségének.",
      },
      {
        text: "23%",
        correct: false,
        description:
          "2018-ban Győr városának üvegházhatású gázkibocsátása 725 266,53 tonna szén-dioxidból, 37 339,92 tonna metánból, és 8 518,23 tonna dinitrogén-oxidból tevődött össze.",
      },
    ],
  },
  {
    question:
      "A 2015. november 24-én átadásra került Bőnyi Hőközponttal megindult (a Győri Geotermikus Projekt keretében) Győr városának geotermikus energiával való ellátása. Mekkora mennyiségű üvegházhatású gáz kiváltására képes a teljes kapacitással üzemelő Győri Geotermikus Rendszer éves szinten?",
    answers: [
      {
        text: "49 000 tonna",
        correct: false,
        description:
          "A Magyarországon egyedülálló erőmű 2018 októberétől három termelőkúttal üzemel. A geotermikus erőmű 24 ezer lakás fűtési igényének 40%-át képes fedezni, illetve az Audi Hungária Zrt. gyárkomplexumának fűtési energiáját 80%-ban biztosítani.",
      },
      {
        text: "67 000 tonna",
        correct: true,
        description:
          "Magyarország adottságai kedvezőek a megújuló geotermikus energia kitermelése szempontjából. A Győri Geotermikus Hőenergia Hasznosítási Rendszere 3 bőnyi termelő kútból, 2 db péri visszasajtoló kútból, 17 km hosszú hőszállító vezetékrendszerből és a Bőnyi Hőközpontból áll.",
      },
      {
        text: "82 000 tonna",
        correct: false,
        description:
          "Az 1922-ben alapított Pannonplast műanyaggyártó cég jogutódjaként működő PannErgy Nyrt. a tulajdonában lévő Győri Geotermikus Projekt mellett más geotermikus erőműveket is üzemeltet az országban. Ilyenek a Miskolci Geotermikus Projekt, Szentlőrinci Geotermikus Projekt, Berekfürdő Projekt.",
      },
    ],
  },
  {
    question: "Melyik textilipari anyag előállítása környezetbarát?",
    answers: [
      {
        text: "lenvászon",
        correct: true,
        description:
          "A lenvászon a len növényből készül, mely nem igényel különös gondozást. Organikus lenvászon előállításához kevés víz szükséges, nem használnak műtrágyát, vegyszereket, teljesen növényi alapú, ezért természetesen lebomló anyag. A lenvászont tartják a legjobb textilnek, ami a bőrrel érintkezhet, jól szellőzik és nagyon könnyű anyag.",
      },
      {
        text: "viszkóz",
        correct: false,
        description:
          "A viszkóz, mint növényi (cellulóz) alapú textil az egyik legelterjedtebb a textiliparban, hiszen széles körben felhasználható és könnyen keverhető más anyagokkal is, mint például a pamut. Bár sok gyártó környezetbarát megoldásként reklámozza, azonban gyártása nagy terheket ró a környezetre. Előállítása során a rengeteg víz felhasználása mellett kénsavat és egyéb erőteljesen maró kémiai anyagokat használnak fel. A gyárak pusztítják a környező folyókat, szennyezik a levegő minőségét és közvetve súlyos káros hatással van a lakók egészségére.",
      },
      {
        text: "selyem",
        correct: false,
        description:
          "1 kg selyem előállításához legalább 6600 selyemhernyót kell megölni és a táplálásukhoz legalább 10 tonnányi eperfalevélre van szükség. A bőr után a legszennyezőbb anyag a divatiparban a selyem, hiszen hiába természetes eredetű, nagyon sok kemikáliát használnak, mire szövet készül belőle.",
      },
    ],
  },
  {
    question: "Mennyi vizet használunk egy fürdőkádas fürdés során?",
    answers: [
      {
        text: "35-70 liter",
        correct: false,
        description:
          "Egy átlagos zuhanyzás során kb. ennyi vizet használunk el, mely kis odafigyeléssel fele annyi elfolyatott vizet jelent a fürdőkádas tisztálkodással szemben. Érdemes bizonyos tisztálkodási folyamatok alatt elzárnia vizet (pl. hajmosáskor), ezzel is csökkentve fogyasztásunk.",
      },
      {
        text: "25 liter",
        correct: false,
        description:
          "Egy korszerű mosogatógép egy mosás során maximum 25 liter víz felhasználásával tisztítja meg edényeinket, szemben a folyóvízzel történő kézi mosogatással, amely meghaladhatja a 60-70 litert is. Továbbá a mosogatógép előnye a magas hőfoknak köszönhető hatékony fertőtlenítés.",
      },
      {
        text: "80 liter",
        correct: true,
        description:
          "Kádban történő fürdés során átlagosan 80 liter vizet használunk el.",
      },
    ],
  },
  {
    question: "Mit jelent a „fenntarthatóság” kifejezés?",
    answers: [
      {
        text: "környezetvédelem",
        correct: false,
        description:
          "A környezetvédelem fontos része a fenntarthatóságnak, hiszen a természeti értékeink megőrzése, a biodiverzitás óvása nagy mértékben hozzájárul a jelenlegi környezeti állapot konzerválásához, a növény-és állatvilág további pusztulásának megakadályozáséhoz. Azonban a fogalom nem veszi figyelembe a gazdaságot (pl. fogyasztás), a közgazdaságtan ennek nem része.",
      },
      {
        text: "környezettudatosság",
        correct: true,
        description:
          "A környezettudatosság fogalma lefedi a környezetvédelmet és a tudatos fogyasztást is, mind az egyén szintjén, mind pedig globális aspektusban. A fenntarthatóság jelmondatának tekinthetőek azon tevékenységeink és cselekedeteink, melyek a jelenben úgy elégítik ki az igényeinket, hogy az nem vesz el a jövő generációjától sem. A megújuló energiaforrások használata alapvető fontosságú a fenntarthatóság szempontjából, ennek egyes megoldásai (például a lakossági napelemek) lehetővé teszik, hogy az emberek a háztartásuk számára szükséges energiát, környezetbarát módon maguk termeljék meg.",
      },
      {
        text: "gazdaságosság",
        correct: false,
        description:
          "A gazdaságosság, tudatosság egyik alappillére a fenntarthatóságnak, azonban csupán gazdasági megközelítés szerint tekint rá, és nagy részben figyelmen kívüli hagyja a természeti értékeket, környezetünk megóvását.",
      },
    ],
  },
  {
    question:
      "Az ökológiai lábnyom mértékegysége a gha (globális hektár) azt mutatja meg, mekkora területre van szükség az adott életvitel folytatásához. Fenntarthatóság szempontjából az 1 gha lenne az ideális, míg a maximum értéknek 4 gha körül kéne maradnia. Mekkora volt Magyarország lakosainak ökológiai lábnyoma 2019-ben?",
    answers: [
      {
        text: "2,92 gha",
        correct: true,
        description:
          "A világ ökológiai lábnyom mérete 2019-ben 1,8 gha volt, míg Magyarországé 2,92 gha. E mérőszám alapján, fenntarthatósági szempontból, a magyar lakosok 2019 augusztusában már a jövő évre szánt tartalékokból fedezték fogyasztásukat.",
      },
      {
        text: "4,06 gha",
        correct: false,
        description:
          "Szlovákia ökológiai lábnyoma 2019-ben 4,06 gha volt. Ez azt jelenti, hogy Szlovákia lakossága már májustól elkezdte felélni a következő évre szánt erőforrásait.",
      },
      {
        text: "8,22 gha",
        correct: false,
        description:
          "Az Amerikai Egyesült Államok lakosainak ökológiai lábnyoma 8,22 gha volt 2019-ben. Ha mindenki úgy élne, ahogy az USA lakossága, akkor a világ már márciusig felélné az adott évre szánt erőforrásait.",
      },
    ],
  },
  {
    question:
      "Hány magyarországi település került be az IQAir 2020-as adatok alapján készített összesítésében Európa 200 legszennyezettebb levegőjű városa közé?",
    answers: [
      {
        text: "6",
        correct: true,
        description:
          "A legszennyezettebb levegőjű európai városok 2020. évi listáján a magyarországi városok közül Sajószentpéter érte el a legrosszabb eredményt a lista 62. helyének megszerzésével.",
      },
      {
        text: "8",
        correct: false,
        description:
          "A lista első 200 helyezettje közül Sajószentpéter után következik Miskolc a 71., Kazincbarcika a 107., Szeged a 176., Debrecen a 181., Nyíregyháza pedig a 198. helyezéssel a magyar városok közül.",
      },
      {
        text: "12",
        correct: false,
        description:
          "Az IQAir által vizsgált magyar települések közül a 2020-as adatok alapján Balassagyarmaton volt a legjobb a levegő. A Nógrád megyei városban a szállópor koncentrációjának éves átlaga a WHO (World Health Organisation) határértéke alatt maradt, és az év nyolc hónapjában egyszer sem haladta meg a határértéket.",
      },
    ],
  },
  {
    question: "Hozzávetőlegesen hány ember él vízhiányos régiókban a Földön?",
    answers: [
      {
        text: "1 milliárd",
        correct: false,
        description:
          "A világ leginkább vízhiányos területei Észak-Afrika, Dél-Afrika, a Közel-Kelet, India, Közép-Ázsia, Dél-Kína, Chile, Kolumbia, Kanada és Ausztrália. A vízhiányt tovább súlyosbítja, hogy az általa érintett afrikai és ázsiai területek népessége rohamosan nő, miközben a mezőgazdaság és az ipar is egyre több vizet használ fel.",
      },
      {
        text: "1,5 milliárd",
        correct: false,
        description:
          "A vízhiány mellet a vízkezelés hiányából adódó további problémákat okoz, hogy a Földön 4,5 milliárd ember szennyvízének kezelése nem megoldott és 2 több mint milliárd ember kénytelen szennyezett vizet fogyasztani, mert nem jut hozzá biztonságos ivóvízhez. A szomszédos országok között egyre komolyabb konfliktusok alakulnak ki a folyóvizekért, mint például Egyiptom és Etiópia esetében a Nílus, vagy Irak és Törökország esetében a Tigris és az Eufrátesz kapcsán.",
      },
      {
        text: "2,5 milliárd",
        correct: true,
        description:
          "WHO 2017-es jelentése szerint a Föld népességének 36%-a, nagyjából 2 és fél milliárd ember él vízhiányos területeken. Ezeken a területeken állítják elő a föld GDP-jének 20%-át. A WHO előrejelzése szerint 2030-ra már az emberiség fele súlyos vízhiánnyal fog szembesülni, ennek következtében pedig mintegy 700 millió ember kényszerülhet elhagyni az otthonát.",
      },
    ],
  },
];

const questionsTrueOrFalse = [
  {
    question:
      "Igaz vagy hamis? Minden percben elpazarolunk egy teherautónyi ruhát?",
    answers: [
      {
        text: "Igaz",
        correct: true,
        description:
          "Az ún. ’fast-fashion’ (gyors divat) üzletláncok elterjedése által rengeteg ruhát felhalmozunk életünk során. A különböző márkák kollekciói évente 4-5 alkalommal frissülnek és kedvező áruknak köszönhetően bárki számára könnyen elérhetőek. Az olcsó ruha pedig hamar kimegy a divatból vagy tönkremegy, így tonnaszám gyűlik a hulladéklerakókban.  A divatipar méretével együtt nő az okozott környezeti pusztítás is, mivel nincs olyan olcsó alapanyag és gyártási technológia, ami ne járna extrém szén-dioxid-kibocsátással, vízpazarlással és vegyszeres szennyezéssel.",
      },
      {
        text: "Hamis",
        correct: false,
        description:
          "A legtöbb országban a ruhagyűjtő helyek és a textil újrahasznosítása nem megoldott, továbbá nem elegendő számban vannak jelen az adományközpontok és túrkálók száma. A textilipar számos kemikáliát, műanyagot tartalmazó ruhát forgalmaz, ezért kerüljük a kommunális hulladéklerakókban történő elhelyezését.",
      },
    ],
  },
  {
    question:
      ".Igaz vagy hamis? A kevesebb húst, feldolgozott élelmiszert fogyasztóknak kisebb az ökológiai lábnyomuk, vagyis fogyasztásukkal kevésbé terhelik meg a környezetüket.",
    answers: [
      {
        text: "Igaz",
        correct: true,
        description:
          "Az ökológiai lábnyom mértékegység számszerűsíti azt, hogy mennyi erőforrásra van szükség az adott társadalom/egyén életszínvonalának fenntartásához, beleértve az ipari javak, élelmiszerek előállítását, illetve a megtermelt hulladék kezelését vagy megsemmisítését.",
      },
      {
        text: "Hamis",
        correct: false,
        description:
          "Ökológiailag fenntarthatóbb nem feldolgozott, nem nagyipari módszerekkel előállított élelmiszert vásárolni. A húsfélék közül a marhahús előállításához használják fel a legtöbb vizet, gabonát és energiát, így ennek fogyasztása a legkevésbé környezetkímélő.",
      },
    ],
  },
  {
    question:
      "A Föld nem megújuló erőforrásai korlátozott mennyiségben állnak rendelkezésre. A túlfogyasztás napja azt mutatja meg, hogy egy adott ország lakossága, ha a világon mindenki az ő életvitelüket folytatná, mikor élné fel a bolygónk, arra az évre kiszámított erőforrásait. Igaz vagy hamis? Magyarország 2021-ben július 29-éig elfogyasztotta az arra az évre szánt erőforrásait a Földnek.",
    answers: [
      {
        text: "Igaz",
        correct: true,
        description:
          "2018-as adatok alapján, ha a bolygón mindenki olyan életvitelt folytatna, mint az Amerikai Egyesült Államok lakói, akkor március 4-éig elfogyasztanánk a bolygó éves tartalékait.",
      },
      {
        text: "Hamis",
        correct: false,
        description:
          "2018-as adatok alapján, ha a bolygón mindenki olyan életvitelt folytatna, mint a vietnámi lakosok, akkor 10 nappal az év vége előtt élnénk fel az adott évre szánt tartalékait a Földnek.",
      },
    ],
  },
  {
    question:
      "Igaz vagy hamis? A globális klímasemlegesség célja, az üvegházhatást okozó gázok kibocsátásának nullára csökkentése 2050-re, annak érdekében, hogy a légkör felmelegedése ne legyen 2 foknál több az iparosodás előtti időszakhoz képest.",
    answers: [
      {
        text: "Igaz",
        correct: true,
        description:
          "Az IPCC (International Panel on Climate Change) nemzetközi szervezet, 2021-es hatodik jelentésében arról számolt be, hogy a maximálisan elfogadhatónak tartott 1,5-2 fokos légköri melegedést már 2030-ra el fogja érni az emberiség. Ebben az ütemben haladva, változtatások nélkül, 2100-ra 4-5 fokos átlaghőmérséklet növekedés várható, ami meglehetősen instabillá tenné a földi klímát és olyan visszafordíthatatlan változásokat idézne elő, ami élhetetlenné tenné a bolygót az emberiség számára.",
      },
      {
        text: "Hamis",
        correct: false,
        description:
          "A fejlett, gazdag, ipari országok nagyobb részben felelősek a károsanyag kibocsátásért, mint a többi állam. Az Európai Unió és az Egyesült Államok, miközben a világ népességének 10%-át adják közösen, a károsanyag-kibocsátás 23%-a tőlük származik.",
      },
    ],
  },
  {
    question:
      "Igaz vagy hamis? A WWF (World Wide Fund for Nature) Léptem elnevezésű applikációjával bárki kiszámolhatja, hozzávetőlegesen mekkora ökológiai lábnyoma van annak, ahogyan él.",
    answers: [
      {
        text: "Igaz",
        correct: true,
        description:
          "Bár az ökológiai lábnyom értékének kiszámítása nagyon sok összetevőből áll, a Léptem-hez hasonló applikációk használata segít abban, hogy megtudjuk nagyjából mekkora környezetterheléssel járnak bizonyos szokásaink.",
      },
      {
        text: "Hamis",
        correct: false,
        description:
          "Az ökológiai lábnyomunk nem csak saját fogyasztásunkból áll össze, hanem azokból a szolgáltatásokból, amiknek részesei vagyunk. Például iskolák, egészségügy, hulladékszállítás, az utak karbantartása, és minden egyéb szolgáltatás, amiért nem közvetlenül, hanem az adókon keresztül fizetünk.",
      },
    ],
  },
  {
    question:
      "Igaz vagy hamis? Az 1901 óta mért hazai hőmérsékletadatok alapján 2018, majd pedig 2019 volt ez eddigi legmelegebb év Magyarországon, míg 2020 a hatodik legmelegebb év volt az utóbbi 120 évben.",
    answers: [
      {
        text: "Igaz",
        correct: true,
        description:
          "A klímaváltozással járó globális felmelegedés nem egyenletesen jelentkezik a bolygó teljes területén. A Föld klímája rendkívül bonyolult rendszer, amit még mai technikával sem lehet tökéletesen modellezni. Az egyre növekvő hőmérséklet következtében például egyre pusztítóbb trópusi viharok tombolnak, és egyre gyakrabban szembesül az emberiség szélsőséges időjárási körülményekkel.",
      },
      {
        text: "Hamis",
        correct: false,
        description:
          "2020 február elején néhány napig 10 fokkal volt melegebb, mint az addig mért sokéves átlag. Alig két hónappal később, április első három napján pedig országos napi minimumhőmérsékleti rekordok dőltek meg.",
      },
    ],
  },
  {
    question:
      "Igaz vagy hamis? A világ teljes széndioxid kibocsátásának több mint harmadát összesen 20 nagyvállalat adja.",
    answers: [
      {
        text: "Igaz",
        correct: true,
        description:
          "Az amerikai Chevron, az ExxonMobil, a brit British Petrol, a holland-brit tulajdonú Royal Dutch Shell, a szaúdi Aramco, az orosz tulajdonú Gazprom, az Iráni Nemzeti Olaj Társaság, a francia Total S.A, az indiai Coal India, a kínai PetroChina, a brazil Petrobras a legismertebb fosszilis nyersanyagok kitermelését és értékesítését végző nagyvállalatok a listán.",
      },
      {
        text: "Hamis",
        correct: false,
        description:
          "A Szaúdi állam tulajdonában lévő Saudi Aramco vállalat egymaga felel a világ teljes széndioxid kibocsátásának 4,38%-áért. A világ 20 legkörnyezetszennyezőbb nagyvállalata közül 12 állami tulajdonban van.",
      },
    ],
  },
  {
    question:
      "Igaz vagy hamis? A tengerek és óceánok legnagyobb szennyezői az óceánjáró üdülőhajók.",
    answers: [
      {
        text: "Igaz",
        correct: true,
        description:
          "A 2016-ban munkába álló Harmony of the Seas a világ egyik legnagyobb óceánjáró luxus üdülőhajója. A hajó két darab, négy emelet magas, tizenhat literes motorja naponta 210 tonna dízelolajat éget el. Mivel a hajó által használt dízel üzemanyag az egyik legkárosabb a dízelolajok közül, kén-dioxid kibocsátása 376 millió személygépkocsiéval ér fel, miközben nitrogén-dioxid kibocsátása egy város közúti közlekedésének a szennyezésével azonos mértékű.",
      },
      {
        text: "Hamis",
        correct: false,
        description:
          "A világon jelenleg 5 darab oázis osztályú luxus óceánjáró sétahajó üzemel. A rendkívül szennyező dízelüzemanyag elégetésével okozott légszennyezésen túl ezek a hajók a fáradt olaj mellett minden szemetüket, szennyvizüket válogatás nélkül a nemzetközi vizekbe ürítik.",
      },
    ],
  },
  {
    question:
      "Igaz vagy hamis? Az elektromos járművek gyártása kevesebb károsanyag kibocsátással jár, mint a benzines autóké.",
    answers: [
      {
        text: "Igaz",
        correct: false,
        description:
          "Az elektromos járművek gyártása, a gyártó országtól függően 30-40 %-kal több káros anyag kibocsátással jár, mint egy robbanómotoros autó előállítása. Ennek legfőbb oka, főleg a lítium-ion akkumulátorok gyártásából származó többletkibocsátás. 2021-ben a világ lítium-ion akkumulátorcelláinak mintegy négy-ötöde Kínában készült.",
      },
      {
        text: "Hamis",
        correct: true,
        description:
          "A lítium-ion üzemanyag cellák előállítása 30-40 %-kal nagyobb környezetkárosítással jár, a robbanómotor gyártásánál. Az elektromos autó fenntartása sem környezetkímélő, abban az esetben, ha a töltés során felhasznált elektromos áram egy szénerőműből származik például. Az elektromos autók kiégett energiacelláiból szintén nagyon keveset hasznosítanak újra a vállalatok, ami pedig további környezetterhelést jelent.",
      },
    ],
  },
  {
    question:
      "Igaz vagy hamis? 2019-ben Magyarországon Budapesten volt a legszennyezettebb a levegő.",
    answers: [
      {
        text: "Igaz",
        correct: false,
        description:
          "Az IQAir 2019. évi nemzetközi felmérése alapján a világ 20 legszennyezettebb levegőjű városából 14 Indiában található. Magyarország fővárosa az ország hatodik legszennyezettebb levegőjű városa volt 2019-ben.",
      },
      {
        text: "Hamis",
        correct: true,
        description:
          "Az IQAir 2019. évi felmérése alapján Miskolc volt Magyarország legszennyezettebb levegőjű városa. Miskolcot a listán Szolnok, Szeged, Pécs és Kecskemét követte az első öt helyen.",
      },
    ],
  },
  {
    question: "Igaz vagy hamis? Magyarország vízben gazdag országnak számít?",
    answers: [
      {
        text: "Igaz",
        correct: false,
        description:
          "Annak ellenére, hogy Magyarország vízkészletei fedezni tudják az ország jelenlegi vízigényét, mivel az ország felszíni vízkészletének több mint 90%-a külföldről származik. Mivel a természetes körforgásban kevesebb mint 1000 m³/fő/év csapadék jut az ország területére, Magyarország vízben szegény országnak számít.",
      },
      {
        text: "Hamis",
        correct: true,
        description:
          "Miközben Magyarország vízkészletének kb. 85%-a a Duna, 15%-a pedig a Tisza vízrendszeréhez kötődik, addig a vízfelhasználásban az igények 59%-a kötődik a Duna, 41%-a pedig a Tisza vízgyűjtő rendszeréhez, ami, különösen aszályos időszakokban a Tisza térségében okozhat vízellátási gondokat.",
      },
    ],
  },
  {
    question:
      "Igaz vagy hamis? Magyarország területének egytizede félsivatagos.",
    answers: [
      {
        text: "Igaz",
        correct: true,
        description:
          "A hozzávetőlegesen 10 000 km²-en elterülő, Duna-Tisza közi homokhátságot 2020-ban hivatalosan is félsivatagos vidékké nyilvánították. Magyarország folyóközi területén az 1950-es évektől kezdve egyre intenzívebb módon kezdtek csatornaépítésekbe, amely az évtizedek alatt drasztikus környezeti változásokhoz vezetett. A térségben a talajvíz szintje 2 métert csökkent, a térség 24 víztározója közül mára pedig már csak négyben van víz.",
      },
      {
        text: "Hamis",
        correct: false,
        description:
          "A Homokhátság területén kiépített csatornarendszer hatására 700 mm víz párolog és távozik el évente arról a tájegységről, ahova éves szinten 500-550 mm csapadék érkezik. A Duna-Tisza közében évtizedek óta zajló vízelvezetés hatására a talajvízszint helyenként 5-9 méter mélyre süllyedt, és mintegy 600 természetes tó száradt ki. A terület vízügyi helyzetének javítását a vizek visszatartásával lehet elérni, amit a használaton kívüli, tönkrement zsilipek felújításával próbálnak megvalósítani.",
      },
    ],
  },
  {
    question:
      "Igaz vagy hamis? A klímaváltozás miatt az elmúlt 120 évben negyedével csökkent a fagyos napok száma Magyarországon?",
    answers: [
      {
        text: "Igaz",
        correct: false,
        description:
          "A globális felmelegedés hatására a 20. század eleji évi nagyjából 120 napról 80 nap alá csökkent mostanra a fagyos napok átlagos éves száma Magyarországon. Ez azt jelenti, hogy egy évben átlagosan harmadával kevesebb olyan nap van, amikor 0 fok alá csökken a napi minimumhőmérséklet, mint az előző évszázad elején.",
      },
      {
        text: "Hamis",
        correct: true,
        description:
          "Szabó Péter éghajlatkutató és Pongrácz Rita meteorológus 2022 év elején publikált elemzése alapján azt lehet megállapítani, hogy Magyarországon a 20. század eleji 120 napról 80 nap alá, vagyis harmadával csökkent napjainkra a fagyos napok átlagos éves száma Magyarországon. Az extrém hidegek előfordulásának gyakorisága eközben lényegében nem változott az elmúlt 120 évben hazánkban.",
      },
    ],
  },
];

const questionsFromEightToTen = [
  {
    question: "Mit jelent a környezetvédelem?",
    answers: [
      {
        text: "az élővilág, a természet védelmét",
        correct: true,
        description: "" 
      },
      {
        text: "az épületek, az utak védelmét",
        correct: false,
        description: "" 
      },
      {
        text: "a munkahelyek, a dolgozók védelmét",
        correct: false,
        description: "" 
      },
    ],
  },
  {
    question: "Melyik közlekedési eszköz szennyezi legkevésbé a környezetet?",
    answers: [
      { text: "benzines autó", correct: false, description: "" },
      { text: "elektromos roller", correct: false, description: "" },
      { text: "kerékpár", correct: true, description: "" },
    ],
  },
  {
    question: "Melyik közlekedési eszköz szennyezi leginkább a környezetet?",
    answers: [
      { text: "repülőgép", correct: true, description: "" },
      { text: "vonat", correct: false, description: "" },
      { text: "távolsági busz", correct: false, description: "" },
    ],
  },
  {
    question:
      "Miért fontos az üvegházhatású gázok (metán, szén-dioxid) csökkentése?",
    answers: [
      {
        text: "hogy tisztább legyen a levegő	",
        correct: false,
        description: "",
      },
      {
        text: "hogy ne melegedjen tovább a klíma",
        correct: true,
        description: "",
      },
      {
        text: "hogy ne legyen olyan száraz a levegő",
        correct: false,
        description: "",
      },
    ],
  },
  {
    question: " Melyik élelmiszer fogyasztása a leginkább környezetbarát?",
    answers: [
      { text: "trópusi gyümölcs", correct: false, description: "" },
      { text: "helyi zöldségek, gyümölcsök", correct: true, description: "" },
      { text: "marhahús", correct: false, description: "" },
    ],
  },
  {
    question: "Melyik nem megújuló energiaforrás?",
    answers: [
      { text: "szénenergia", correct: true, description: "" },
      { text: "napenergia", correct: false, description: "" },
      { text: "vízenergia", correct: false, description: "" },
    ],
  },
  {
    question: "Mire jó a műszaki cikkeken feltüntetett energia címke?",
    answers: [
      {
        text: "arra, hogy össze lehessen hasonlítani az energiafogyasztásukat",
        correct: true,
        description: "",
      },
      {
        text: "arra, hogy feltüntessék rajta a termék árát	",
        correct: false,
        description: "",
      },
      {
        text: "arra, hogy rövid leírást adjon a termékről",
        correct: false,
        description: "",
      },
    ],
  },
  {
    question: "Melyik csomagolás újrahasznosítható a legjobban?",
    answers: [
      { text: "üveg üdítőspalack", correct: false, description: "" },
      { text: "műanyag üdítősflakon", correct: false, description: "" },
      { text: "fém üdítősdoboz", correct: true, description: "" },
    ],
  },
  {
    question: "Miért kell válogatva (szelektíven) gyűjteni a szemetet?",
    answers: [
      {
        text: "mert a szeméttelepen elkülönítve rakják le a szemetet",
        correct: false,
        description: "",
      },
      {
        text: "mert a szemét nagy része újrahasznosítható",
        correct: true,
        description: "",
      },
      {
        text: "mert így jobban elfér a szemét a kukákban",
        correct: false,
        description: "",
      },
    ],
  },
  {
    question:
      "Mit nem kell csinálni a szelektíven gyűjtött hulladékkal, mielőtt kidobja az ember a megfelelő kukába?",
    answers: [
      { text: "felaprítani", correct: false, description: "" },
      { text: "elmosni", correct: false, description: "" },
      { text: "szétválogatni", correct: true, description: "" },
    ],
  },
  {
    question:
      "Mi a legfőbb oka annak, hogy élelmiszerhulladékot termelnek az emberek?",
    answers: [
      { text: "pazarlás", correct: true, description: "" },
      { text: "figyelmetlenség", correct: false, description: "" },
      { text: "étvágytalanság", correct: false, description: "" },
    ],
  },
  {
    question: "Mihez lehet újrahasznosítani a hungarocellt?",
    answers: [
      {
        text: "építőanyagnak (polisztirolbeton)",
        correct: true,
        description: "",
      },
      { text: "tüzelőanyagnak (brikett)", correct: false, description: "" },
      {
        text: "szigetelőanyagnak (üveggyapot)",
        correct: false,
        description: "",
      },
    ],
  },
  {
    question:
      "Miből nem lehet lakások fűtésére használható brikettet készíteni az alábbi hulladékok közül?",
    answers: [
      { text: "napraforgó-maghéjból", correct: false, description: "" },
      { text: "szalmából", correct: false, description: "" },
      { text: "banánhéjból", correct: true, description: "" },
    ],
  },
  {
    question: "Mi nem készül az elhasznált autók gumiabroncsaiból?",
    answers: [
      { text: "útburkolat (gumibitumen)", correct: false, description: "" },
      { text: "cipőtalp", correct: false, description: "" },
      { text: "esőkabát", correct: true, description: "" },
    ],
  },
  {
    question: "Miből lehet ehető, illetve lebomló tányért készíteni?",
    answers: [
      { text: "búzakorpából", correct: true, description: "" },
      { text: "tökmagból", correct: false, description: "" },
      { text: "narancshéjból", correct: false, description: "" },
    ],
  },
];
