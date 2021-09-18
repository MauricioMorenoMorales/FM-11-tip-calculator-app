const $billInput = document.querySelector('.controls__input.bill');
const $peopleInput = document.querySelector('.controls__input.people');
const $resetInput = document.querySelector('.output__reset');
const $controllerButtons = document.querySelectorAll(
	'.controls__buttons__item',
);
const $customPercentage = document.querySelector(
	'.controls__buttons__item.input',
);
const $billError = document.querySelector('.error.bill');
const $peopleError = document.querySelector('.error.people');
const $tipAmount = document.querySelector('.output__item__number.amount');
const $tipTotal = document.querySelector('.output__item__number.total');

let percentage = 0;
let people = 0;
let bill = 0;

const showinfo = () => {
	if (!$billInput.value || $billInput.value < 0) {
		$billError.classList.add('active');
		$billInput.classList.add('active');
	} else {
		$billError.classList.remove('active');
		$billInput.classList.remove('active');
	}
	if (!$peopleInput.value || $peopleInput.value <= 0) {
		$peopleError.classList.add('active');
		$peopleInput.classList.add('active');
	} else {
		$peopleError.classList.remove('active');
		$peopleInput.classList.remove('active');
	}
	const totalTip = (percentage * bill) / 100;
	const tipForEachPerson = totalTip / people;
	const totalForEachPerson = tipForEachPerson + bill / people;
	$tipAmount.innerHTML = `$${
		tipForEachPerson === Infinity ||
		tipForEachPerson < 0 ||
		isNaN(tipForEachPerson)
			? '0.00'
			: tipForEachPerson.toFixed(2)
	}`;
	$tipTotal.innerHTML = `$${
		totalForEachPerson === Infinity ||
		totalForEachPerson < 0 ||
		isNaN(totalForEachPerson)
			? '0.00'
			: totalForEachPerson.toFixed(2)
	}`;
};

document.addEventListener('input', event => {
	if (event.target.matches('.controls__buttons__item.input')) {
		percentage = parseInt($customPercentage.value) || 0;
		showinfo();
	}
	if (event.target.matches('.controls__input.bill')) {
		bill = parseInt($billInput.value) || 0;
		showinfo();
	}
	if (event.target.matches('.controls__input.people')) {
		people = parseInt($peopleInput.value) || 0;
		showinfo();
	}
});

document.addEventListener('click', event => {
	if (event.target.matches('.controls__buttons__item')) {
		$controllerButtons.forEach(element => element.classList.remove('active'));
		event.target.classList.add('active');
		percentage = Number(event.target.innerHTML.replace('%', ''));
		showinfo();
	}
	if (event.target.matches('.output__reset')) {
		percentage = 0;
		people = 0;
		bill = 0;
		$billInput.value = 0;
		$controllerButtons.forEach(element => element.classList.remove('active'));
		$customPercentage.value = '';
		$peopleInput.value = 0;
		showinfo();
		$billError.classList.remove('active');
		$peopleError.classList.remove('active');
		$peopleInput.classList.remove('active');
		$billInput.classList.remove('active');
	}
});
