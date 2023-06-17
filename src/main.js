import "./style.css";

import * as Storage from "./js/service/storage";

const ref = {
  form: document.querySelector("#feedback-form"),
  feedbackList: document.querySelector("#feedback"),
};

const LOCAL_STORAGE_KEY = "feedbackList";
const feedbackListData = Storage.load(LOCAL_STORAGE_KEY) ?? [];

console.log(feedbackListData);

const renderMarkup = (array, ref) => {
  ref.innerHTML = "";

  const markup = array
    .map(
      ({ email, message }) => /* html */ `
        <li class="feedback-item">
          <span>${email}</span>
          <span>${message}</span>
        </li>`
    )
    .join("");

  ref.insertAdjacentHTML("beforeend", markup);
};

renderMarkup(feedbackListData, ref.feedbackList);

const onFormSubmit = (evt) => {
  evt.preventDefault();

  const { email, message } = evt.target.elements;

  const feedback = {
    email: email.value,
    message: message.value,
  };

  feedbackListData.push(feedback);

  Storage.save(LOCAL_STORAGE_KEY, feedbackListData);

  renderMarkup(feedbackListData, ref.feedbackList);
};

ref.form.addEventListener("submit", onFormSubmit);
