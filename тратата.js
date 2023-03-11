const popupElement = document.querySelector('.popup'); //попап

const popupEditProfileBtn = document.querySelector('.profile__edit-button') //редактировать карандашик
const popupEditProfile = document.querySelector('.popup_type_edit') //попап профиля

const popupAddCardBtn = document.querySelector('.profile__add-button') // добавить описание и имя
const popupAddCard = document.querySelector('.popup_type_add') //попап карточки

const popupSubmit = document.querySelector('.popup__submit'); //сохранить
const profileName = document.querySelector('.profile__title'); //имя
const profileJob = document.querySelector('.profile__subtitle'); //о себе

const formEditProfile = document.querySelector('.popup__form_type_edit'); //форма заполнения профиля
const formAddCard = document.querySelector('.popup__form_type_add'); //форма заполнения карточки

const nameProfileInput = formEditProfile.querySelector('.popup__input_type_name');  //форма имени
const jobProfileInput = formEditProfile.querySelector('.popup__input_type_des'); //форма о себе

const nameCardInput = formAddCard.querySelector('.popup__input_type_name-card'); //название картинки
const linkCardInput = formAddCard.querySelector('.popup__input_type_link-card'); //ссылка на картинку

const cardTemplate = document.querySelector('#place-template').content  //шаблон карточек
const cardList = document.querySelector('.places__list'); //карточка

const buttonClosePopup = document.querySelectorAll('.popup__close-button'); //кнопка закрытия

const popupImage = document.querySelector('.popup__image'); //картинка
const popupImageCap = document.querySelector('.popup__image-cap') ; //подпись
const popupZoomImage = document.querySelector('.popup_type_zoom'); //попап картинки





const addCardFormSubmit = (evt) => {
  evt.preventDefault()

  const newRenderCard = {name: nameCardInput.value, link: linkCardInput.value}
  cardList.prepend(createCard(newRenderCard))

  formAddCard.reset()

  closePopup(popupAddCard)
}

const renderInitialCard = (card) => {
  cardList.append(createCard(card))
}

initialCards.forEach((item) => {
  renderInitialCard(item)
})

popupEditProfileBtn.addEventListener('click', () => openPopup(popupEditProfile))
popupAddCardBtn.addEventListener('click', () => openPopup(popupAddCard))

formAddCard.addEventListener('submit', addCardFormSubmit)
formEditProfile.addEventListener('submit', submitEditProfileForm);









const openPopup = function(popupElement) {
  popupElement.classList.add('popup_is-opened');
}

const closePopup = function(popupElement) {
  popupElement.classList.remove('popup_is-opened');
}

buttonClosePopup.forEach((button) => {
  const popupElement = button.closest('.popup');
  button.addEventListener('click', () => closePopup(popupElement));
});



const submitEditProfileForm =  (evt) => {
  evt.preventDefault();
    profileName.textContent = nameProfileInput.value;
    profileJob.textContent = jobProfileInput.value;

    closePopup(popupEditProfile)
}

const saveProfileData = () => {
  nameProfileInput.value = profileName.textContent
  jobProfileInput.value = profileJob.textContent

}
saveProfileData(popupEditProfile)




const createCard = (card) =>  {
  const cardElement = cardTemplate.querySelector('.place').cloneNode(true)

  const buttonCardLike = cardElement.querySelector('.place__like')
  const buttonCardDel = cardElement.querySelector('.place__del')
  const placeImage = cardElement.querySelector('.place__image')

  cardElement.querySelector('.place__text').textContent = card.name
  placeImage.alt = card.name
  placeImage.src = card.link

  buttonCardDel.addEventListener('click', () => {
    cardElement.remove();
  });

  buttonCardLike.addEventListener('click', (evt) => {
    evt.target.classList.toggle('place__like_active');
  });

  placeImage.addEventListener('click', (evt) => {

    popupImage.src = evt.target.src
    popupImage.alt = card.name
    popupImageCap.textContent = card.name

    openPopup(popupZoomImage)
  })

  return cardElement
}






