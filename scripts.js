
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
let popup=null;



function createPopup(){
popup = new Popup(document.getElementById('temp-popup'),document.getElementById('tovar'));
}

function closePopup(){
	popup.popupId.style.display=document.getElementsByClassName('layer')[0].style.display='none';
}
class Counter{
	constructor(){
		this.counter=0;
	}
	 getCounter(){
		return this.counter;
	}
	setCounter(value){
		this.counter+=value;
		document.getElementsByClassName("pay-cart__count-pay")[0].innerHTML=this.counter;
	}
}
let count = new Counter();
class Tovar{
	constructor(object){
     this.object=object;
	 this.col=1;
	 count.setCounter(this.col);
	}
	
	reCol(newCol){
		this.col+=newCol;

		if(this.col!=0 ){
			if(popup.popupId.getElementsByClassName(this.object.name)[0]!= undefined)popup.popupId.getElementsByClassName(this.object.name)[0].querySelectorAll('button')[1].innerHTML=this.col;
		}
	     else{
			 popup.popupId.getElementsByClassName(this.object.name)[0].parentElement.parentElement.remove();
			 componentPopup.delete(this.object.name);
		 }
		
		 			count.setCounter(newCol);
	}
}



class Popup{
	constructor(template,tempStroke){
		this.tempPopup = document.importNode(template.content,true);	
		document.getElementById('cont').appendChild(this.tempPopup.cloneNode(true));
		this.popupId= document.getElementsByClassName('popup')[0];
		this.string = document.importNode(tempStroke.content,true);
	}
	
	render(){
		
		componentPopup.forEach((item,i)=>{
			if(popup.popupId.getElementsByClassName(i).length==0){
            this.string.querySelector('img').src=item.object.img;
		    let [...rest] = this.string.querySelectorAll('p');
			rest[0].innerHTML='<b>Наименование товара:</b> комикс '+item.object.name;
			rest[1].innerHTML='<b>Цена товара</b>: '+item.object.countFrom+' $';
			rest[2].classList.remove(rest[2].classList.item(0));
			rest[2].classList.add(item.object.name);
			let [...rest2] = this.string.querySelectorAll('button');
			rest2[1].innerHTML = item.col;
			let b = this.popupId.appendChild(this.string.cloneNode(true));
			}; 
			
			
		});
	}
	 visualCart(){

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
			if (count.getCounter() > 0) resolve("Товары есть"); else reject(new Error("Товаров нет"));
		}, 0);
	});
	promise.finally(
		() => {
			load.style.display = 'none';
			load.value = 0;
		}
	)
	promise.then(
		result => { this.popupId.style.display = 'block'; this.render();},
		error => { this.popupId.style.display=document.getElementsByClassName('layer')[0].style.display = 'none';  alert(error); load.value = 0; }
	);

}
}
		



//Эта функция отвечает за динамическое добавление товара в корзину
const sumWrite = t => {
	//document.getElementsByClassName("pay-cart__count-pay")[0].innerHTML = ++summar;
	if (!componentPopup.has(t)) {//Если имя рандомной карточки не соответствует ключу в мапе, то
		masCard.forEach((item) => {//Добавляем товар извлекая его из общего набора
			if (t == item.name) {
				
	        componentPopup.set(t,new Tovar(item));
           
			}
		});

	} else {
		componentPopup.get(t).reCol(1);
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




