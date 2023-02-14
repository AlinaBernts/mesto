/*Находим форму в DOM*/
/*Кнопка редактирования*/
const editButton = document.querySelector('.profile__edit-button');
/*Попап*/
const popup = document.querySelector('.popup');
/*Кнопка закрытия*/
const closeButton = popup.querySelector('.popup__button-close');
/*Кнопка сохранения*/
const saveButton = popup.querySelector('.popup__button-save');
/*формы*/
const formElement = popup.querySelector('.popup__form');
/*форма имени*/
const nameInput = popup.querySelector('.popup__input_type_name');
/*форма описания*/
const infoInput = popup.querySelector('.popup__input_type_info');
/*ввод значения имени*/
const profileTitle = document.querySelector('.profile__title');
/*ввод значения описания*/
const profileSubtitle = document.querySelector('.profile__subtitle');

/*открытие попапа*/
function handleEditButtonClick() {
  popup.classList.add('popup_opened'); /*добавляем модификатор открытия*/
  nameInput.value = profileTitle.textContent; /*указываем, какие значения должеы быть в формах*/
  infoInput.value = profileSubtitle.textContent;
}

/*закрытие попапа*/
function handleCloseButtonClick() {
popup.classList.remove('popup_opened');
}

/*редактирование формы*/
function handleFormSubmit(evt) {
  evt.preventDefault();
  profileTitle.textContent = nameInput.value; /*сохраняем новые введенные данные*/
  profileSubtitle.textContent = infoInput.value;
  handleCloseButtonClick(); /*закрываем попап при нажатии кнопки сохранить*/
}

/*Сохраняем отредактированные данные*/
formElement.addEventListener('submit', handleFormSubmit);

editButton.addEventListener('click', handleEditButtonClick); /*добавляем выполнение функционала кнопке редактирования*/
closeButton.addEventListener('click', handleCloseButtonClick); /* доавляем выполнение функционала кнопке закрытия формы*/
