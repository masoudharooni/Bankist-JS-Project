'use strict';

// Data
const account1 = {
  owner: 'Jonas Schmedtmann',
  movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
  interestRate: 1.2, // %
  pin: 1111,
};

const account2 = {
  owner: 'Jessica Davis',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,
};

const account3 = {
  owner: 'Steven Thomas Williams',
  movements: [200, -200, 340, -300, -20, 50, 400, -460],
  interestRate: 0.7,
  pin: 3333,
};

const account4 = {
  owner: 'Sarah Smith',
  movements: [430, 1000, 700, 50, 90],
  interestRate: 1,
  pin: 4444,
};

const accounts = [account1, account2, account3, account4];

// Elements
const labelWelcome = document.querySelector('.welcome');
const labelDate = document.querySelector('.date');
const labelBalance = document.querySelector('.balance__value');
const labelSumIn = document.querySelector('.summary__value--in');
const labelSumOut = document.querySelector('.summary__value--out');
const labelSumInterest = document.querySelector('.summary__value--interest');
const labelTimer = document.querySelector('.timer');

const containerApp = document.querySelector('.app');
const containerMovements = document.querySelector('.movements');

const btnLogin = document.querySelector('.login__btn');
const btnTransfer = document.querySelector('.form__btn--transfer');
const btnLoan = document.querySelector('.form__btn--loan');
const btnClose = document.querySelector('.form__btn--close');
const btnSort = document.querySelector('.btn--sort');

const inputLoginUsername = document.querySelector('.login__input--user');
const inputLoginPin = document.querySelector('.login__input--pin');
const inputTransferTo = document.querySelector('.form__input--to');
const inputTransferAmount = document.querySelector('.form__input--amount');
const inputLoanAmount = document.querySelector('.form__input--loan-amount');
const inputCloseUsername = document.querySelector('.form__input--user');
const inputClosePin = document.querySelector('.form__input--pin');
let currentAccount;
let sortMethod = 'beforeend';

const displayMovements = function (movements) {
  containerMovements.innerHTML = '';
  movements.forEach(function (mov, index) {
    const movementType = mov > 0 ? 'deposit' : 'withdrawal';
    const html = `
      <div class="movements__row">
        <div class="movements__type movements__type--${movementType}">${
      index + 1
    } ${movementType}</div>
        <div class="movements__date">3 days ago</div>
        <div class="movements__value">${mov}</div>
      </div>`;
    containerMovements.insertAdjacentHTML(sortMethod, html);
  });
};
displayMovements(account1.movements);

btnSort.addEventListener('click', function () {
  sortMethod = sortMethod == 'beforeend' ? 'afterbegin' : 'beforeend';
  displayMovements(account1.movements);
});

const createUsername = function (accounts) {
  accounts.forEach(function (account) {
    account.username = account.owner
      .toLowerCase()
      .split(' ')
      .map(name => name[0])
      .join('');
  });
};
createUsername(accounts);

const calculateDisplayBalance = function (movements) {
  const balance = movements.reduce(
    (accumulator, current) => accumulator + current,
    0
  );
  labelBalance.textContent = `${balance}???`;
};
calculateDisplayBalance(account1.movements);
// LECTURES

const calculateDisplaySummery = function (movements) {
  const incomes = movements
    .filter(mov => mov > 0)
    .reduce((acc, mov) => acc + mov, 0);
  labelSumIn.textContent = incomes;

  const outcomes = movements
    .filter(mov => mov < 0)
    .reduce((acc, mov) => acc + mov, 0);
  labelSumOut.textContent = outcomes;

  const interests = movements.reduce((acc, mov) => acc + mov, 0);
  labelSumInterest.textContent = interests;
};
calculateDisplaySummery(account1.movements);

const appSwitcherMood = function () {
  containerApp.style.opacity == 0
    ? (containerApp.style.opacity = 1)
    : (containerApp.style.opacity = 0);
};

const login = function (username, pin) {
  const userAccount = accounts.find(acc => acc.username === username);
  if (userAccount.pin === pin) {
    appSwitcherMood();
    currentAccount = { ...userAccount };
  } else {
    alert('your pin is not correct:(');
  }
};

// Login event handler
btnLogin.addEventListener('click', function (e) {
  e.preventDefault();
  const username = inputLoginUsername.value;
  const pin = Number(inputLoginPin.value);
  login(username, pin);
});
const currencies = new Map([
  ['USD', 'United States dollar'],
  ['EUR', 'Euro'],
  ['GBP', 'Pound sterling'],
]);

const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];
