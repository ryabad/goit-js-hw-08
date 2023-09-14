import throttle from 'lodash.throttle';

const form = document.querySelector('.feedback-form');
const localStorageKey = 'feedback-form-state';

const load = key => {
  try {
    const serializedState = localStorage.getItem(key);
    return serializedState === null ? undefined : JSON.parse(serializedState);
  } catch (error) {
    console.error('Get state error: ', error.message);
  }
};

const save = (key, value) => {
  try {
    const serializedState = JSON.stringify(value);
    localStorage.setItem(key, serializedState);
  } catch (error) {
    console.error('Set state error: ', error.message);
  }
};

const remove = key => {
  try {
    const serializedState = load(key);
    if (serializedState !== undefined) {
      localStorage.removeItem(key);
    } else {
      console.log(`item ${key} not found`);
    }
  } catch (error) {
    console.error('Remove error: ', error.message);
  }
};

try {
  const parsed = load(localStorageKey);
  const { email, message } = parsed;
  form.elements.email.value = email ?? '';
  form.elements.message.value = message ?? '';
} catch (error) {
  console.log(error.name, error.message);
}

form.addEventListener('input', throttle(saveData, 500));
form.addEventListener('submit', handleSubmit);

function saveData(event) {
  const data = {};
  const emailValue = event.currentTarget.elements.email.value;
  const messageValue = event.currentTarget.elements.message.value;

  data['email'] = emailValue;
  data['message'] = messageValue;
  save(localStorageKey, data);
}

function handleSubmit(event) {
  if (
    event.currentTarget.elements.email.value === '' ||
    event.currentTarget.elements.message.value === ''
  ) {
    alert('All fields must be filled');
  } else {
    event.preventDefault();
    console.log(load(localStorageKey));
    form.reset();
    remove(localStorageKey);
  }
}
