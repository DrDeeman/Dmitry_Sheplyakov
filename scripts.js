let summar = 0;
let outId=0;
//Данные переменные являются хранилищем индексов карточек и собственно, самих карточек
const masCard = [
	{ img: "image/x.jpg", name: "FantasticFour", countFrom: 6, countTo: 4 }, { img: "image/b.jpg", name: "Deadpool", countFrom: 7, countTo: 5 }, { img: "image/c.jpg", name: "Superman", countFrom: 8, countTo: 6 }, { img: "image/v.jpg", name: "Batman", countFrom: 5, countTo: 4 }, { img: "image/z.jpg", name: "spiderman", countFrom: 7, countTo: 4 }
];
const min = Math.ceil(0);
const max = Math.floor(5);
let masIndex = [];
//хранилище товаров в корзине
let componentPopup=new Map();

class Counter{
	constructor(){
		this.counter=1;
	}
	 getCounter(){
		return this.counter;
	}
	setCounter(value){
		this.counter+=value;
	}
}

	class Component{  
	constructor(object){
		this.object = object;
			this.counterComponent=new Counter();
		this.string = `<div class='create_div'>
	  <img src=${this.object.img} height='100%' width='15%'/>
	  <div class='cart_product'>
	  <p><b>Наименование товара</b>: комикс ${this.object.name}</p><p><b>Цена товара</b>: ${this.object.countFrom} $</p><p class=${this.object.name}><b>Количество товара</b>: 
	  <button onclick='deleteProduct(this);'>-</button>
	<input type='button' disabled value=${this.col}/>
	  <button onclick='sumWrite(this.parentElement.className);'>+</button></p>
	  </div><button onclick='deleteProduct(this);'><img src='image/trash.png'</button>
	  </div>`;
		document.getElementsByClassName('popup')[0].innerHTML +=this.string;
	}
	
		re_init(ob=document.getElementsByClassName(this.object.name)[0].getElementsByTagName('input')[0]){
		ob.value =this.counterComponent.getCounter();
	};
	
		destroy(key){
		document.getElementsByClassName(this.object.name)[0].parentElement.parentElement.remove();
		componentPopup.delete(key);
	}
	
	
	}








const deleteProduct = ob => {
	//document.getElementsByClassName['popup'].getElementsByTageName('div')
	const [t] = document.getElementsByClassName('popup');
	for (let i in t.children) {
		if (ob.parentElement.parentElement.parentElement == t.children[i]) {//Здесь получаю массив дивов в попапе для обнаружения, в каком диве была нажата кнопка
			//Если родительский див равен диву в массиве, то
			let index = 2;                    //индекс равен 2, т.к. не учитываем крестик выхода из попапа и заголовок
			componentPopup.forEach((value, key) => {//Затем циклом пробегаем по хранилищу корзины, порядок в корзине соответствует пордку в мапе

				if (index == i) {//Если индекс равен индексу дива
					if (value.counterComponent.getCounter() > 1) {//и количество товаров ондого вида больше 1, то просто уменьшаем количество
						value.counterComponent.setCounter(-1);
				
						value.re_init(ob.nextElementSibling);

					} else {
						componentPopup.get(key).destroy(key);
					};
				};
				index++;
			});
		};

	};		//ob.parentElement.remove(); 
	summar--;
	document.getElementsByClassName("pay-cart__count-pay")[0].innerHTML = summar;
}
//Эта функция отвечает за динамическое добавление товара в корзину
const sumWrite = t => {
	document.getElementsByClassName("pay-cart__count-pay")[0].innerHTML = ++summar;
	if (!componentPopup.has(t)) {//Если имя рандомной карточки не соответствует ключу в мапе, то
		masCard.forEach((item) => {//Добавляем товар извлекая его из общего набора
			if (t == item.name) {
				

	        componentPopup.set(t,new Component(item));

			}
		});

	} else {
		componentPopup.get(t).counterComponent.setCounter(1);

		componentPopup.get(t).re_init();
		//document.getElementsByClassName(t)[0].innerHTML = "<b>Количество товара</b>:" + mapCount.get(t).col;
	}
}


//Эта функция отвечает за рандомную генерацию товара из списка
const rand =(id, dId)=> {
	const randZ = Math.floor(Math.random() * (max - min)) + min;
	if (masIndex.indexOf(randZ) == -1) {
		masIndex.push(randZ);
		id.src = masCard[randZ].img;
		dId.innerHTML = '<p>Цена товара раньше: ' + masCard[randZ].countFrom + '$</p><p>Цена сейчас: ' + masCard[randZ].countTo + '$</p>';
		return masCard[randZ].name;
	} else return rand(id, dId);

}

const visualCart = () => {
	document.getElementsByClassName('layer')[0].style.display = document.getElementsByClassName('loadbar')[0].style.display = 'block';
	let [load] = document.getElementsByClassName('loadbar');
	let timer = 0;
	let timerLoadBar = setInterval(() => {
		if (load.value === load.max) load.value = 10;
		else load.value++;
		timer += 50;
	}, 50);
	let promise = new Promise((resolve, reject) => {
		setTimeout(() => {
			clearInterval(timerLoadBar);
			if (summar > 0) resolve("Товары есть"); else reject(new Error("Товаров нет"));
		}, 0);
	});
	promise.finally(
		() => {
			load.style.display = 'none';
			load.value = 0;
		}
	)
	promise.then(
		result => document.getElementsByClassName('popup')[0].style.display = 'block',
		error => { alert(error); document.getElementsByClassName('layer')[0].style.display = 'none'; load.value = 0; }
	);

}


function MoveBlock(idBlock){
	let [...rest]=document.getElementsByClassName('block-sale');
	let [...buttons]=document.getElementsByClassName('radio');
	let x;
     if(outId<=idBlock)x=1;else x=-1;
	outId=idBlock;
	let timer;
	buttons[0].style.pointerEvents=buttons[1].style.pointerEvents=buttons[2].style.pointerEvents='none';

	timer=setInterval(()=>{
		rest.forEach((ob,i)=>{
			ob.style.left=`${parseInt(getComputedStyle(ob).left,10)-5*x}px`;
		});
		if( (x==1 && rest[idBlock].offsetLeft<=0) || (x==-1 && rest[idBlock].offsetLeft>=0)){ 
		clearInterval(timer);
		 buttons[0].style.pointerEvents=buttons[1].style.pointerEvents=buttons[2].style.pointerEvents='auto';
		}

	

	},10);
         }




