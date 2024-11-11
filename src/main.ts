// document.getElementsByClassName()
// document.getElementsByTagName()
// document.getElementById()
// document.querySelector()
type Mode = "add" | "wait" | "stop";
const addTodoButton: HTMLButtonElement | null =
  document.querySelector("button"); /** Szukamy buttona */
const addBannButton =
  document.querySelector(".button-ban"); /** szukamu buttona ban lista */
const deleteFromAddBtn = document.querySelector(".deleteFromAdd");
const deleteFromBanBtn = document.querySelector(".deleteFromBan");
const todoInput = document.querySelector("input"); /** Szukamy inputa */
const banInput = document.querySelector(".ban-input"); // input dla zablokowanych
const todoList = document.querySelector(".list"); /** Szukamy klsy "list" */
const banList = document.querySelector(".banned-ul"); // szukamy klasy dla listy dla zabk=lokowanych zadań
const modeStatusOnPage: Element | null =
  document.querySelector(".mode"); /** Szukamy klasy mode */
const banModeStatusOnPage = document.querySelector(".mode-2"); //szukamy klasy mode-2
const showAlert = () => {
  alert("To zadanie jest niedostępne usuń je z czerwonej listy");
};
const deleteLastChild = function (list: HTMLUListElement): void {
  if (list.lastChild) {
    list.removeChild(list.lastChild);
  }
};
let numberOfLiInUl = 0; /** ilość naszych todusów w liście (nie większa niz 5) */
let numberOfBanLiInUl = 0;
let mode: Mode =
  "add"; /** chcemy zby powczytaniu strony mode add zeby cokolwiek dodać */
let mode2: Mode =
  "add"; /** chcemy zby powczytaniu strony mode add zeby cokolwiek dodać x2*/
let arrayOfBanedTasks: String[] = [];
let arrayOfToDoList: String[] = [];
if (modeStatusOnPage) {
  modeStatusOnPage.textContent = mode;
}

if (banModeStatusOnPage) {
  banModeStatusOnPage.textContent = mode2;
}

addTodoButton?.addEventListener("click", () => {
  /** nasłuchiwać na klikniecie buttona  */
  // sprawdzic w jakim jestem trybie
  // jezeli jestem w trybie dodawania,
  // dodać element z inputa DONE
  // wyczyścić input DONE
  // zmienic tryb DONE
  // disable na inpucie DONE
  if (mode === "add") {
    /** jeśli mode = add to wykonaj... */
    const inputValue =
      todoInput?.value; /** wartość wpisaną z inputa przypisujemy do zmiennej */
    if (numberOfLiInUl >= 5) {
      /** jeśli jest 5 li to */
      mode = "stop"; /** zmień mode z add na stop */
      todoInput.disabled = true; /** zablokuj mozliwość wpisywania do inputa */
      addTodoButton.textContent =
        "Too Much Elements"; /** zmień tekst na buttonie na too much elements */
      modeStatusOnPage.textContent = mode;
      return;
    }
    for (let i = 0; i < arrayOfBanedTasks.length; i++) {
      if (inputValue === arrayOfBanedTasks[i]) {
        console.log("zgadza sie");
        modeStatusOnPage.textContent = mode;
        showAlert();
        todoInput.value = "";
        return;
      }
    }
    const li =
      document.createElement("li"); /** tworzymy element li w ul na stronie*/
    li.textContent =
      inputValue; /** jako text w li przypisz wartość wpisaną do inputa */
    todoList.appendChild(li); //* dodaj  li jako ostatnie dziecko listy */
    numberOfLiInUl++; /** dodajemy 1 do zeby kontrolowac ilosc li */
    arrayOfToDoList.push(li.textContent);
    console.log(arrayOfToDoList);
    todoInput.value = ""; //* usuń to co wpisaliśmy do inputa
    mode = "wait"; /** zmień mode z add na wait */
    todoInput.disabled = true; /** zablokuj mozliwość wpisywania do inputa */
    addTodoButton.textContent =
      "Waiting"; /** zmień tekst na buttonie na waiting */
    modeStatusOnPage.textContent = mode; /** zmień tryb na stronir na wait */
    return; // kończymy i czekamy na kolejne klikniecie w button
  }
  // jezeli nie jestem w trybie dodawania,
  // zmienic tryb na tryb dodawania
  // enable na inpucie
  if (mode === "wait") {
    /** jeśli mode = wait to wykonaj... */
    mode = "add"; /** zmień mode na add */
    modeStatusOnPage.textContent = mode; /**  zmień trybna stronie na add */
    todoInput.disabled = false; // odblikuj input
    addTodoButton.textContent = "Add todo element"; // zmień napis w buttonie na add todo....
  }
});
// @ts-ignore
addBannButton.addEventListener("click", () => {
  // na kliknięcie wykonaj
  if (mode2 === "add") {
    // jeśli mode2 == add to
    const banValue = banInput.value; // banValue to wartość z inputa
    if (numberOfBanLiInUl >= 5) {
      mode2 = "stop";
      banInput.disabled = true;
      addBannButton.textContent = "Too Much Elements";
      banModeStatusOnPage.textContent = mode2;
      return;
    }
    const li = document.createElement("li"); // zmienna li to tworzenie nowego li
    li.textContent = banValue; // to co jest w inpucie wpisz do nowo powstałego li
    banList?.appendChild(li); // dla ban list ostatnie dziecko (zrób nowe li)
    numberOfBanLiInUl++; // dodaj 1 do zmiennej, aby kontrolować ilość li
    banInput.value = ""; // usówamy to co wpisano do inputa
    mode2 = "wait"; // zmieniamy mode na wait
    banInput.disabled = true; // blikujemy input ban
    addBannButton.textContent = "Waiting"; //zmieniamy napis na buttonie na waiting
    banModeStatusOnPage.textContent = mode2; // zminiemy napis na stronie pod aktualny mode czyli "wait"
    arrayOfBanedTasks.push(banValue);
    console.log(arrayOfBanedTasks);
    return;
  }
  if (mode2 === "wait") {
    // jeśli mode = wait
    mode2 = "add"; // zmień mode na add
    banModeStatusOnPage.textContent = mode2; //
    banInput.disabled = false;
    addBannButton.textContent = "Add banned element";
    return;
  }
});

deleteFromAddBtn.addEventListener("click", () => {
  if (arrayOfToDoList.length === 0) {
    return;
  }
  deleteLastChild(todoList);
  arrayOfToDoList.pop();
  mode = "add";
  modeStatusOnPage.textContent = mode;
  todoInput.value = "";
  todoInput.disabled = false;
  addTodoButton.textContent = "Add todo element";
  numberOfLiInUl--;
  return;
});

deleteFromBanBtn.addEventListener("click", () => {
  if (arrayOfBanedTasks.length === 0) {
    return;
  }
  deleteLastChild(banList);
  arrayOfBanedTasks.pop();
  mode2 = "add";
  banModeStatusOnPage.textContent = mode2;
  banInput.value = "";
  banInput.disabled = false;
  numberOfBanLiInUl--;
  return;
});

// Zadanie domowe
// Dodać wyświetlenie trybu [done]
// Dodać maksimum dodanych elementów do listy [done]
// Stworzyć listę zablokowanych [done]
// Obok tego inputu, pojawił się osobny formularz z zablokowanymi zadaniami, których nie można dodać do głównej listy
// wyświetlanie tekstu z informacją dla użytkownika, że tekst jest zbanowany po inputem głownym
// przy rozpoczęciu wpisywania w główny input usuwanie errora
// zadanie z gwiazdką*
// dorzucić usuwanie elementów z jednej i drugiej listy

// 2. Dodać maksimum dodanych elementów do listy
// policzyć ile elementów ma lista na stronie
// a)
// jeśli wynik jest równy 5 lub więcej
// uruchom tryb wait
// wyświetl komunikat, ze jest za duzo pozycji
// return
// b)
// jesli jest mniej niz 5 wykonaj kod który juz jest napisany

// 3. zablokować dodawanie zdań, które są w liście ban
// pobrać aktalną listę zbanowanych zdań [done]
// porównać ją z nowym inputem
// jeśli zdanie znajduje się w liście ban zablokkować dodawanie
//
//
//
// 1 PRZEŁACZANIE INPUTOW */
// todo input disabled = true x2
// todo input disabled = false x2
// ban input disabled = true x2
// ban input disabled = false x2
// 2 ZMIANA TRYBOW
// mode = stop x1
// mode = add x2
// mode = wait x1
// mode2 = stop x1
// mode2 = add x2
// mode2 = wait x1
// 3 PRZYPISANIE TEXT CONTENT = MODE
// mode x5
// mode2 x4
// 4 ZEROWANIE INPUTA (INPUT VALUE = "")
// to do input x 3
// ban input x 2
// 5 ZLICZNIE ILOŚCI LI (NUM LI IN UL)
// ban ++ x1
// ban -- x1
// add ++ x1
// add -- x1
//
//
//
// type Mode = "add" | "wait" | "stop";
// const addTodoButton: HTMLButtonElement | null =
//   document.querySelector("button");
// const addBannButton = document.querySelector(".button-ban");
// const deleteFromAddBtn = document.querySelector(".deleteFromAdd");
// const deleteFromBanBtn = document.querySelector(".deleteFromBan");
// const todoInput = document.querySelector("input");
// const banInput = document.querySelector(".ban-input");
// const todoList = document.querySelector(".list");
// const banList = document.querySelector(".banned-ul");
// const modeStatusOnPage: Element | null = document.querySelector(".mode");
// const banModeStatusOnPage = document.querySelector(".mode-2");
// const showAlert = () => {
//   alert("To zadanie jest niedostępne usuń je z czerwonej listy");
// };
// const deleteLastChild = function (list: HTMLUListElement): void {
//   if (list.lastChild) {
//     list.removeChild(list.lastChild);
//   }
// };
// let numberOfLiInUl = 0;
// let numberOfBanLiInUl = 0;
// let mode: Mode = "add";
// let mode2: Mode = "add";
// let arrayOfBanedTasks: String[] = [];
// let arrayOfToDoList: String[] = [];
// if (modeStatusOnPage) {
//   modeStatusOnPage.textContent = mode;
// }

// if (banModeStatusOnPage) {
//   banModeStatusOnPage.textContent = mode2;
// }

// addTodoButton?.addEventListener("click", () => {
//   if (mode === "add") {
//     const inputValue = todoInput?.value;
//     if (numberOfLiInUl >= 5) {
//       mode = "stop"; // 2
//       todoInput.disabled = true; // 1
//       addTodoButton.textContent = "Too Much Elements";
//       modeStatusOnPage.textContent = mode; // 3
//       return;
//     }
//     for (let i = 0; i < arrayOfBanedTasks.length; i++) {
//       if (inputValue === arrayOfBanedTasks[i]) {
//         console.log("zgadza sie");
//         modeStatusOnPage.textContent = mode; //3
//         showAlert();
//         todoInput.value = ""; // 4
//         return;
//       }
//     }
//     const li = document.createElement("li");
//     li.textContent = inputValue;
//     todoList.appendChild(li);
//     numberOfLiInUl++; // 5
//     arrayOfToDoList.push(li.textContent);
//     console.log(arrayOfToDoList);
//     todoInput.value = ""; // 4
//     mode = "wait"; // 2
//     todoInput.disabled = true; // 1
//     addTodoButton.textContent = "Waiting";
//     modeStatusOnPage.textContent = mode; // 3
//     return;
//   }

//   if (mode === "wait") {
//     mode = "add"; // 2
//     modeStatusOnPage.textContent = mode; // 3
//     todoInput.disabled = false; // 1
//     addTodoButton.textContent = "Add todo element";
//   }
// });

// addBannButton.addEventListener("click", () => {
//   if (mode2 === "add") {
//     const banValue = banInput.value;
//     if (numberOfBanLiInUl >= 5) {
//       mode2 = "stop"; // 2.1
//       banInput.disabled = true; // 1
//       addBannButton.textContent = "Too Much Elements";
//       banModeStatusOnPage.textContent = mode2; // 3
//       return;
//     }
//     const li = document.createElement("li");
//     li.textContent = banValue;
//     banList?.appendChild(li);
//     numberOfBanLiInUl++; //5
//     banInput.value = ""; // 4
//     mode2 = "wait"; // 2.1
//     banInput.disabled = true; // 1
//     addBannButton.textContent = "Waiting";
//     banModeStatusOnPage.textContent = mode2; // 3
//     arrayOfBanedTasks.push(banValue);
//     console.log(arrayOfBanedTasks);
//     return;
//   }
//   if (mode2 === "wait") {
//     mode2 = "add"; // 2.1
//     banModeStatusOnPage.textContent = mode2; //3
//     banInput.disabled = false; // 1
//     addBannButton.textContent = "Add banned element";
//     return;
//   }
// });

// deleteFromAddBtn.addEventListener("click", () => {
//   if (arrayOfToDoList.length === 0) {
//     return;
//   }
//   deleteLastChild(todoList);
//   arrayOfToDoList.pop();
//   mode = "add"; // 2
//   modeStatusOnPage.textContent = mode; // 3
//   todoInput.value = ""; // 4
//   todoInput.disabled = false; // 1
//   addTodoButton.textContent = "Add todo element";
//   numberOfLiInUl--; // 5
//   return;
// });

// deleteFromBanBtn.addEventListener("click", () => {
//   if (arrayOfBanedTasks.length === 0) {
//     return;
//   }
//   deleteLastChild(banList);
//   arrayOfBanedTasks.pop();
//   mode2 = "add"; // 2.1
//   banModeStatusOnPage.textContent = mode2; //3
//   banInput.value = ""; // 4
//   banInput.disabled = false; // 1
//   numberOfBanLiInUl--; // 5
//   return;
// });
