// castowanie

// type Left = "left";
// type Right = "right";
// type Top = Left | Right;

// const top: Top = "left";
// const left: Right = top as Right; // zly typ, ale typescript przez casting zmuszony to przyjąć

// document.getElementsByClassName()
// document.getElementsByTagName()
// document.getElementById()
// document.querySelector()

const LIST_MAX_ELEMENTS = 5;
type Mode = "add" | "wait" | "stop";

const addTodoButton = document.querySelector("button"); /** Szukamy buttona */
const addBannButton: HTMLButtonElement | null =
  document.querySelector(".button-ban"); /** szukamu buttona ban lista */
const deleteFromAddBtn = document.querySelector(".deleteFromAdd");
const deleteFromBanBtn = document.querySelector(".deleteFromBan");
const todoInput = document.querySelector("input"); /** Szukamy inputa */
const banInput: HTMLInputElement | null = document.querySelector(".ban-input"); // input dla zablokowanych
const todoList = document.querySelector(".list"); /** Szukamy klsy "list" */
const banList = document.querySelector(".banned-ul"); // szukamy klasy dla listy dla zabk=lokowanych zadań
const modeStatusOnPage: Element | null =
  document.querySelector(".mode"); /** Szukamy klasy mode */
const banModeStatusOnPage = document.querySelector(".mode-2"); //szukamy klasy mode-2

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
let arrayOfBanedTasks: string[] = [];
let arrayOfToDoList: string[] = [];
if (modeStatusOnPage) {
  modeStatusOnPage.textContent = mode;
}

if (banModeStatusOnPage) {
  banModeStatusOnPage.textContent = mode2;
}

const hasListTooManyElements = (elementsInList: number): boolean =>
  elementsInList >= LIST_MAX_ELEMENTS;

const isTaskBanned = (task: string): boolean =>
  arrayOfBanedTasks.includes(task);

const createListElement = (taskName: string): HTMLLIElement => {
  const li =
    document.createElement("li"); /** tworzymy element li w ul na stronie*/
  li.textContent =
    taskName; /** jako text w li przypisz wartość wpisaną do inputa */
  return li;
};

const addElementToList = (
  list: HTMLUListElement,
  newLI: HTMLLIElement,
  arr: string[],
): void => {
  list.appendChild(newLI); //* dodaj  li jako ostatnie dziecko listy */
  arr.push(newLI?.textContent ?? "");
};

const handleAddClick = (listType: "todo" | "ban") => (_: any) => {
  let input = listType === "todo" ? todoInput : banInput;
  let button: HTMLButtonElement | null =
    listType === "todo" ? addTodoButton : addBannButton;
  let modeStatus = listType === "todo" ? modeStatusOnPage : banModeStatusOnPage;
  let list = listType === "todo" ? todoList : banList;
  let array = listType === "todo" ? arrayOfToDoList : arrayOfBanedTasks;
  let listMode = listType === "todo" ? mode : mode2;

  if (!input || !button || !modeStatus || !list || !array) return;

  const setTooManyElementsStatus = () => {
    listMode = "stop"; /** zmień mode z add na stop */
    input.disabled = true; /** zablokuj mozliwość wpisywania do inputa */
    button.textContent =
      "Too Much Elements"; /** zmień tekst na buttonie na too much elements */
    modeStatus.textContent = listMode;
  };

  const setTaskIsBanned = () => {
    modeStatus.textContent = listMode;
    alert("To zadanie jest niedostępne usuń je z czerwonej listy");
    input.value = "";
  };

  const setAfterAddItemStatus = () => {
    input.value = ""; //* usuń to co wpisaliśmy do inputa
    listMode = "wait"; /** zmień mode z add na wait */
    input.disabled = true; /** zablokuj mozliwość wpisywania do inputa */
    button.textContent = "Waiting"; /** zmień tekst na buttonie na waiting */
    modeStatus.textContent = listMode; /** zmień tryb na stronir na wait */
  };

  if (listMode === "wait") {
    if (hasListTooManyElements(array.length)) {
      setTooManyElementsStatus();
      return;
    }

    const inputValue =
      input.value; /** wartość wpisaną z inputa przypisujemy do zmiennej */

    if (isTaskBanned(inputValue)) {
      setTaskIsBanned();
      return;
    }
    const newElement = createListElement(inputValue);
    addElementToList(list as HTMLUListElement, newElement, array);

    setAfterAddItemStatus();
    return; // kończymy i czekamy na kolejne klikniecie w button
  }

  if (listMode === "wait") {
    listMode = "add"; /** zmień mode na add */
    modeStatus.textContent = listMode; /**  zmień trybna stronie na add */
    input.disabled = false; // odblikuj input
    button.textContent = "Add todo element"; // zmień napis w buttonie na add todo....
  }
};

addTodoButton?.addEventListener("click", handleAddClick("todo"));
addBannButton?.addEventListener("click", handleAddClick("ban"));

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
