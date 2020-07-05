const barCat = document.querySelector('.j-bar-cat');
const barDog = document.querySelector('.j-bar-dog');
const barPrt = document.querySelector('.j-bar-prt');

// Привязка названий на сервере к русским названиям и кнопкам
const votes = {
	"cats": ['Кошка', barCat],
	"dogs": ['Собака', barDog],
	"parrots": ['Попугай', barPrt]
};

// Требуется для доступа к внешнему серверу
const header = new Headers({
    'Access-Control-Allow-Credentials': true,
    'Access-Control-Allow-Origin': '*'
});

// Соединение для получения данных
const resES = new EventSource('https://sf-pyw.mosyag.in/sse/vote/stats', header);

// Обработчик данных, полученных с сервера
resES.addEventListener('message', message  => {
	json_data = JSON.parse(message.data);
	json_sum = Object.values(json_data).reduce((s, v) => s + v);
	for (const [k, v] of Object.entries(votes)) {
		data = json_data[k];
		percent = data * 100 / json_sum
		v[1].textContent = `${v[0]}: ${data}`;
		v[1].setAttribute('style', `width: ${percent}%`);
		v[1].setAttribute('aria-valuenow', percent);
	}
});
