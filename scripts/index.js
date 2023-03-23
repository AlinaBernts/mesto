/*Находим форму в DOM*/

/*Переменные*/

const popupProfile = document.querySelector('.popup-profile');/*Попап профиля*/
const popupElement = document.querySelector('.popup-element');/*Попап добавления карточки*/
const popupImage = document.querySelector('.popup-image');//Попап картинки

const editButton = document.querySelector('.profile__edit-button');/*Кнопка редактирования профиля*/
const addButton = document.querySelector('.profile__add-button');/*Кнопка добавления картинки*/

const formProfile = document.querySelector('.popup__form_profile');/*форма профиля*/
const formElement = document.querySelector('.popup__form_element');/*форма карточки*/

const nameInput = document.querySelector('.popup__input_type_name');/*форма имени*/
const infoInput = document.querySelector('.popup__input_type_info');/*форма описания*/

const profileTitle = document.querySelector('.profile__title');/*ввод значения имени*/
const profileSubtitle = document.querySelector('.profile__subtitle');/*ввод значения описания*/

const nameImageAdd = document.querySelector('.popup__input_type_title');//название картинку
const linkImageAdd = document.querySelector('.popup__input_type_link');// ссылка на картинку

const imageClick = document.querySelector('.popup__image');//картинка в открывшемся попапе
const captionImage = document.querySelector('.popup__caption');//подпись в открывшемся попапе

const element = document.querySelector('.element'); //блок всех карточек
const elementTemplate = document.querySelector('.template__element').content; //шаблон карточек
const elementList = document.querySelector('.element__list');


/*                      ОБЩЕЕ                     */

//открытие попапа
const openPopup = function(popup) {
  popup.classList.add('popup_opened');
  document.addEventListener('keydown', closePopupOverlay);
  document.addEventListener('keydown', closePopupEsc);
}

//закрытие попапа
const closePopup = function(popup) {
  popup.classList.remove('popup_opened');
  document.removeEventListener('keydown', closePopupOverlay);
  document.removeEventListener('keydown', closePopupEsc);
}

//все кнопки закрыия попап
const closeButtons = document.querySelectorAll('.popup__button-close');/*Кнопка закрытия попапов*/
closeButtons.forEach((button) => {
  const popup = button.closest('.popup');
  button.addEventListener('click', () => closePopup(popup));//слушатель закрытия по клику
});

/*                    ЗАКРЫТИЕ ПОПАПА КЛИКОМ НА ОВЕРЛЕЙ             */
const closePopupOverlay = document.querySelectorAll('.popup');
closePopupOverlay.forEach((popup) => {
  popup.addEventListener('click', (evt) => {
    if (evt.target === popup) {
      closePopup(popup);
    };
  });
});


/*                    ЗАКРЫТИЕ ПОПАПА КЛИКОМ НА ESC                 */
const closePopupEsc = (evt) => {
  if(evt.key === 'Escape') {
    const popup = document.querySelector('.popup_opened');
    closePopup(popup);
  }
}

/*                          ПОПАП ПРОФИЛЯ                */

/*редактирование формы профиля пользователя*/
function handleFormProfileSubmit (evt) {
  evt.preventDefault();

  profileTitle.textContent = nameInput.value; /*сохраняем новые введенные данные*/
  profileSubtitle.textContent = infoInput.value;

  closePopup(popupProfile); /*закрываем попап при нажатии кнопки сохранить*/
}

//делаем открытие и редактирование полей попап профиля нажатием на кнопку редактирования
editButton.addEventListener('click', function () {
  openPopup(popupProfile);
  nameInput.value = profileTitle.textContent;
  infoInput.value = profileSubtitle.textContent;
});

/*                          ПОПАП КАРТОЧКИ                   */

//делаем открытие и редактирование полей попап карточки нажатием на кнопку добавить
addButton.addEventListener('click', function () {
  openPopup(popupElement);
});

/* Создаем новую карточку */
function createCard(item) {
  const elementListItem = elementTemplate.querySelector('.element__list-item').cloneNode(true); //элемент самой карточки

  const elementName = elementListItem.querySelector('.element__title');//подпись карточки
  elementName.textContent = item.name

  const elementImage =  elementListItem.querySelector('.element__image')//переменная картинки
  elementImage.src = item.link;
  elementImage.alt = item.name;
  elementImage.title = item.name;

  //удалить карточку кликом по урне
  const buttonDelete = elementListItem.querySelector('.element__delete-button'); //кнопка удаления
  buttonDelete.addEventListener('click', function () {
    const parentsOfDelete = buttonDelete.closest('.element__list-item')
    parentsOfDelete.remove();
  });

  //лайк карточки
  const buttonLike = elementListItem.querySelector('.element__like-button'); //кнопка лайка
  buttonLike.addEventListener('click', function () {
    buttonLike.classList.toggle('element__like-button_active');
  });

  //открытие попап с картинкой по клику на карточку
  elementImage.addEventListener('click', function () {
    imageClick.src = item.link;
    imageClick.alt = item.name;
    captionImage.textContent = item.name;

    openPopup(popupImage)
  });

  return elementListItem;
};

//отправить форму данных карточки
const addElementSubmit = (evt) => {
  evt.preventDefault();

  const newElement = {name: nameImageAdd.value, link: linkImageAdd.value}
  elementList.prepend(createCard(newElement));

  evt.target.reset();
  closePopup(popupElement);
};

initialCards.forEach(function (item) {
  elementList.append(createCard(item));
});

/*Сохраняем отредактированные данные*/
popupProfile.addEventListener('submit', handleFormProfileSubmit); //Слушатель открытия попапа редактирования профиля
formElement.addEventListener('submit', addElementSubmit);//Слушатель открытия попапа добавления карточки

