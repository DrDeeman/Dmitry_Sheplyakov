
let idButtonInLenta=0;
//Данные переменные являются хранилищем индексов карточек и собственно, самих карточек
const masProduct = [
	{ img: "image/x.jpg", name: "FantasticFour", countFrom: 6 }, { img: "image/b.jpg", name: "Deadpool", countFrom: 7 }, { img: "image/c.jpg", name: "Superman", countFrom:10 }, { img: "image/v.jpg", name: "Batman", countFrom: 5 }, { img: "image/z.jpg", name: "spiderman", countFrom: 7 }
];
const min = Math.ceil(0);
const max = Math.floor(5);
let masIndexRandom = [];
//хранилище товаров в корзине
let componentPopup=new Map();
let popup=null;
let flash=false;


function masCount([...rest]=null){
	return function discount(count){
		rest.forEach((ob,i)=>{
		if(componentPopup.has(ob)){
			
			componentPopup.get(ob).object.countTo=componentPopup.get(ob).object.countFrom-(componentPopup.get(ob).object.countFrom*count);
		}
		});
	}
}

function createPopup(){
popup = new Popup(document.getElementById('temp-popup'),document.getElementById('temp-product'));
}

function closePopup(){
	popup.popupNode.style.display=document.getElementsByClassName('layer')[0].style.display='none';
}
class Counter{
	constructor(template){
		this.templateCounter = document.importNode(template.content,true);
		this.counter=1;
		document.getElementsByClassName("pay-cart__count-pay")[0].innerHTML=Number(document.getElementsByClassName("pay-cart__count-pay")[0].textContent)+1;
	}
	 getCounter(){
		return this.counter;
	}
	setCounter(value,name){
		this.counter+=value;
     if(document.getElementsByClassName(name)[0]!=null)document.getElementsByClassName(name)[0].querySelectorAll('button')[1].innerHTML=this.counter;
	 document.getElementsByClassName("pay-cart__count-pay")[0].innerHTML=Number(document.getElementsByClassName("pay-cart__count-pay")[0].textContent)+value;
	 	
	}
}
class Card{
	constructor(object){
     this.object=object;
	 this.col=new Counter(document.getElementById('temp-counter'));
	}
	
	colChange(col){
		this.col.setCounter(col,this.object.name);	 			
	}
}



class Popup{
	constructor(templatePopup,templateProduct){
		this.templatePopup = document.importNode(templatePopup.content,true);	
		document.getElementById('cont').appendChild(this.templatePopup.cloneNode(true));
		this.popupNode= document.getElementsByClassName('popup')[0];
		this.popupImportNode = document.importNode(templateProduct.content,true);
	}
	
	
	deleteCard(name){
	document.getElementsByClassName("pay-cart__count-pay")[0].innerHTML=Number(document.getElementsByClassName("pay-cart__count-pay")[0].textContent)-componentPopup.get(name).col.getCounter();
		 popup.popupNode.getElementsByClassName(name)[0].parentElement.parentElement.remove();
			 componentPopup.delete(name);
	}
	

	
	addEvent(classElement,targetId){
		if(Number(targetId)===2)this.deleteCard(classElement); else componentPopup.get(classElement).colChange(Number(targetId));	
		if(componentPopup.get(classElement)!=undefined && componentPopup.get(classElement).col.getCounter()==0)this.deleteCard(classElement);
	
	}
	
	render(){
		let ukaz = masCount(['Deadpool','Batman']);
		ukaz(0.5);
		componentPopup.forEach((item,i)=>{
			if(popup.popupNode.getElementsByClassName(i).length==0){
            this.popupImportNode.querySelector('img').src=item.object.img;
		    let [...rest] = this.popupImportNode.querySelectorAll('p');
			rest[0].innerHTML='<b>Наименование товара:</b> комикс '+item.object.name;
			if(item.object.hasOwnProperty('countTo')) rest[1].innerHTML='<b>Цена товара со скидкой</b>: '+item.object.countTo+' $'
		    else 
			rest[1].innerHTML='<b>Цена товара</b>: '+item.object.countFrom+' $';
			
		
			rest[2].classList.remove(rest[2].classList.item(0));
			rest[2].classList.add(item.object.name);
			//let [...rest2] = this.popupImportNode.querySelectorAll('button');
			//rest2[1].innerHTML = item.col.getCounter();
			let[...rest2] = item.col.templateCounter.querySelectorAll('button');
			rest2[1].innerHTML = item.col.getCounter();
			let b = this.popupNode.appendChild(this.popupImportNode.cloneNode(true));
			document.getElementsByClassName(i)[0].appendChild(item.col.templateCounter.cloneNode(true));
			} else document.getElementsByClassName(i)[0].querySelectorAll('button')[1].innerHTML=item.col.getCounter();
			
			
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
			if (Number(document.getElementsByClassName("pay-cart__count-pay")[0].textContent) > 0) resolve("Товары есть"); else reject(new Error("Товаров нет"));
		}, 0);
	});
	promise.finally(
		() => {
			load.style.display = 'none';
			load.value = 0;
		}
	)
	promise.then(
		result => { this.popupNode.style.display = 'block'; popup.flash=true; this.render();},
		error => { this.popupNode.style.display=document.getElementsByClassName('layer')[0].style.display = 'none';  alert(error); load.value = 0; }
	);

}



 changeCard(t){
	//document.getElementsByClassName("pay-cart__count-pay")[0].innerHTML = ++summar;
	if (!componentPopup.has(t)) {//Если имя рандомной карточки не соответствует ключу в мапе, то
		masProduct.forEach((item) => {//Добавляем товар извлекая его из общего набора
			if (t == item.name) {
			
	        componentPopup.set(t,new Card(item));
           
			}
		});

	} else {
		popup.addEvent(t,1);
	}
		 
}
}
		






//Эта функция отвечает за рандомную генерацию товара из списка
const randomCard =(id, divId)=> {
	const randSeed = Math.floor(Math.random() * (max - min)) + min;
	if (masIndexRandom.indexOf(randSeed) == -1) {
		masIndexRandom.push(randSeed);
		id.src = masProduct[randSeed].img;
		divId.innerHTML = '<p>Цена товара раньше: ' + masProduct[randSeed].countFrom + '$</p>';//<p>Цена сейчас: ' + masProduct[randSeed].countTo + '$</p>';
		return masProduct[randSeed].name;
	} else return randomCard(id, divId);

}




function MoveBlock(idBlock){
	let [...rest]=document.getElementsByClassName('block-sale');
	let [...buttons]=document.getElementsByClassName('radio');
	let x;
     if(idButtonInLenta<=idBlock)x=1;else x=-1;
	idButtonInLenta=idBlock;
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




