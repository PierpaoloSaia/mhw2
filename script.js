/* TODO: inserite il codice JavaScript necessario a completare il MHW! */

function clickRisposta(event){
    const box=event.currentTarget;
    const image=box.querySelector('.checkbox');
    image.src='images/checked.png';
    if(box.classList.contains("opacita")){
        box.classList.remove("opacita");
    }
    box.classList.add("blu");
    const index=freeSel.indexOf(box);
    freeSel.splice(index, 1);
    for(let i=0;i<freeSel.length;i++){
        if(freeSel[i].dataset.questionId===box.dataset.questionId){
            if(freeSel[i].classList.contains("blu")){
                freeSel[i].classList.remove("blu");
                freeSel[i].querySelector('.checkbox').src='images/unchecked.png';
            }
            
            freeSel[i].classList.add("opacita");
        }
    }
    freeSel.push(box);

    if(box.dataset.questionId==='one'){
        scelte[0]=box;
    }
    else if(box.dataset.questionId==='two'){
        scelte[1]=box;
    }
    else if(box.dataset.questionId==='three'){
        scelte[2]=box;
    }

    if(finito()){
        const elementi=document.querySelectorAll('.choice-grid div');
        for(const elemento of elementi){
            elemento.removeEventListener('click', clickRisposta);
        }
        stampaPersonalita();
    }

}

function clickRicomincia(){
    const elementi=document.querySelectorAll('.choice-grid div');
    for(const elemento of elementi){
        elemento.addEventListener('click', clickRisposta);
        if(elemento.classList.contains('opacita')){
            elemento.classList.remove('opacita');
        }
    }

    for(let i=0;i<scelte.length;i++){
        scelte[i].classList.remove('blu');
        let image=scelte[i].querySelector('.checkbox');
        image.src='images/unchecked.png';
        scelte[i]=undefined;
    }

    const risposta=document.querySelector('#risposta');
    risposta.innerHTML='';
    risposta.classList.add('nascosto');
}

function stampaPersonalita(){
    const risposta=document.querySelector('#risposta');
    risposta.classList.remove('nascosto');
    const maxPers=personalitaPiuPresente();
    const intest=document.createElement('h2');
    intest.textContent=RESULTS_MAP[maxPers].title;
    const descr=document.createElement('span');
    descr.textContent=RESULTS_MAP[maxPers].contents;
    descr.classList.add('paragrafo');
    const ricomincia=document.createElement('button');
    ricomincia.textContent='Ricomincia';
    risposta.appendChild(intest);
    risposta.appendChild(descr);
    risposta.appendChild(ricomincia);

    ricomincia.addEventListener('click', clickRicomincia);


}

function personalitaPiuPresente(){
    let persMax='';
    let max=0;
    const persNum={};
    for(const personalita of scelte){
        persNum[personalita.dataset.choiceId]=persNum[personalita.dataset.choiceId] ? persNum[personalita.dataset.choiceId] + 1 : 1;
    }

    for(let item in persNum){
        if(persNum[item]>max){
            max=persNum[item];
            persMax=item;
        }
    }

    return persMax;
}

function finito(){
    if(scelte[0]!==undefined && scelte[1]!=undefined && scelte[2]!==undefined){
        return true;
    }
    return false;
}

const sel=document.querySelectorAll('.choice-grid div');
const freeSel=[];
const scelte=[];
for(const elemento of sel){
    elemento.addEventListener('click', clickRisposta);
    freeSel.push(elemento);
}