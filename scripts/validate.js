const objectValidation = {
  formSelector: '.popup__form', //форма
  inputSelector: '.popup__input',//поле ввода
  submitButtonSelector: '.popup__button-save', //кнопка сохранения
  inactiveButtonClass: 'popup__button-save_inactive', //неактивная кнопка сохранения
  inputErrorClass: 'popup__input_error', //добавили модификатор ошибки
  errorClass: 'popup__error_visible' //ошибка которую видим при невалидном значении формы
};


//добавим класс с ошибкой
const showInputError = (object, formElement, inputElement) => {
  const errorMessage = inputElement.validationMessage;
  //с применением шаблонных строк найдем ошибку
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);//тут я нашла элемент ошибки по классу поля ввода к которому она относится внутри formSelector
  inputElement.classList.add(object.inputErrorClass);//добавила графе класс с модификатором ошибки
  errorElement.textContent = errorMessage;//параметр errorMessage со значением textContent чтобы текст ошибки попал в нужное место
  errorElement.classList.add(object.errorClass); // сделает ошибку видимой, когда в поле ввода добавят некорректный текст
};

//удалим класс с ошибкой
const hideInputError = (object, formElement, inputElement) => {
  //дублируем с функции выше
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.remove(object.inputErrorClass);//удалим класс inputErrorClass
  errorElement.classList.remove(object.errorClass);//удалим и видимую ошибку тоже
  errorElement.textContent = ''; //присвоим пустую строку, чтобы очистить текстовое содержимое элемента
};

// создадим функцию, которая создадут активную и неактивную кнопку отправки формы карточки
const disabledButtonSave = (object, buttonElement) => {
  buttonElement.classList.add(object.inactiveButtonClass);
  buttonElement.disabled = true;
};

const activeButtonSave = (object, buttonElement) => {
  buttonElement.classList.remove(object.inactiveButtonClass);
  buttonElement.disabled = false;
};

//функция принимает массив полей формы и возвращает тру, если нашло хотя бы одно невалидное поле(сразу останавливает поиск), и вернет фолс если все поля валидны.
const hasInvalidInput = (inputList) => {
  return inputList.some((inputElement) => {//прошлись по массиву методом some
    return !inputElement.validity.valid;//если поле невалидно- тру, на этом обход массива останавливается
  });
};

//функция, которая проверит валидность полей и включит (или отключит) кнопку сохранить
const toggleButtonState = (object, inputList, buttonElement) => {
  if (hasInvalidInput(inputList)){
    disabledButtonSave(object, buttonElement);
  } else {
    activeButtonSave(object, buttonElement);
  }
};


//функция, которая проверяет валидность поля
const checkInputValidity = (object, formElement, inputElement) => {
  if (!inputElement.validity.valid) { //если поле не проходит валидацию, покажем ошибку
    showInputError(object, formElement, inputElement, inputElement.validationMessage);
  } else { //если проходит валидацию, скроем ошибку
    hideInputError(object, formElement, inputElement);
  }
};

const  setEventListeners = (object, formElement) => {
  const inputList = Array.from(//найдем все поля ввода и сделаем их массивом
    formElement.querySelectorAll(object.inputSelector)
  );
  //найдем кнопку отправки
  const buttonElement = formElement.querySelector(object.submitButtonSelector);
  toggleButtonState(object, inputList, buttonElement);//вызовем toggleButtonState чтобы проверить состояние кнопки в самом начале

  inputList.forEach((inputElement) => {//обойдем массив
    inputElement.addEventListener('input', function () {//добавим обработчик событий input каждому полю ввода
      checkInputValidity(object, formElement, inputElement);
      toggleButtonState(object, inputList, buttonElement);//вызовем toggleButtonState и передадим массив полей ввода и кнопки
    });
  });
};

const enableValidation = (object) => {
  const formList = Array.from(document.querySelectorAll(object.formSelector));//найдем все формы с классом в DOM и сделаем из них массив
  formList.forEach((formElement) => {//проходим по массиву
    formElement.addEventListener('submit'  , (evt) => evt.preventDefault());
    setEventListeners(object, formElement);//вызовем функцию setEventListeners для каждой формы
  });
};

enableValidation(objectValidation);



