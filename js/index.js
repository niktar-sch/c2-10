const btnCat = document.querySelector('.j-btn-cat');
const btnDog = document.querySelector('.j-btn-dog');
const btnPrt = document.querySelector('.j-btn-prt');

const server = 'https://sf-pyw.mosyag.in';

// Отключение/включение кнопок
const disableButtons = (val) => {
	btnCat.disabled = val;
	btnDog.disabled = val;
	btnPrt.disabled = val;
}

// Отправка данных на сервер и переход к результатам в случае успеха
const btnClick = val => {
	disableButtons(true);
	fetch(`${server}/sse/vote/${val}`, {method: 'POST', 'Access-Control-Allow-Credentials': true, 'Access-Control-Allow-Origin': '*'})
		.then((response) => {
			console.log(response);
			disableButtons(false);
			if (response.ok) {
				window.location.href = "result.html";
			}
	});
};

btnCat.addEventListener('click', ()  => {btnClick('cats')});
btnDog.addEventListener('click', ()  => {btnClick('dogs')});
btnPrt.addEventListener('click', ()  => {btnClick('parrots')});
