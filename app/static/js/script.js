

function add_card(i){
    var div = document.createElement('div');
    div.className = "task card draggable";
    div.draggable = true;
    div.innerHTML = '<div class="status green"></div><div class="content"><p contenteditable="true"></p></div>';
    div.addEventListener('dragstart', dragstart)
    div.addEventListener('dragend', dragend)
    document.getElementById(i).appendChild(div);
}

const cards = document.querySelectorAll('.card')
const dropzones = document.querySelectorAll('.dropzone')

cards.forEach(card => {
    card.addEventListener('dragstart', dragstart)
    card.addEventListener('dragend', dragend)
})

function dragstart() {
    dropzones.forEach( dropzone => dropzone.classList.add('highlight'))
    this.classList.add('is-dragging')
}

function dragend() {
    dropzones.forEach( dropzone => dropzone.classList.remove('highlight'))
    this.classList.remove('is-dragging')
}

dropzones.forEach( dropzone => {
    dropzone.addEventListener('dragover', dragover)
    dropzone.addEventListener('dragleave', dragleave)
    dropzone.addEventListener('drop', drop)
})

function dragover() {
    this.classList.add('over')
    const cardBeingDragged = document.querySelector('.is-dragging')
    this.appendChild(cardBeingDragged)
}


function dragleave() {
    this.classList.remove('over')

}

function drop() {
    this.classList.remove('over')
}

const dropzones_rubbish = document.querySelectorAll('.dropzone-rubbish')

/** place where we will drop cards */
dropzones_rubbish.forEach( dropzone => {
  dropzone.addEventListener('dragenter', dragenter_rubbish)
  dropzone.addEventListener('dragover', dragover_rubbish)
})

function dragenter_rubbish(){
  this.classList.add("hovered")
}

function dragover_rubbish() {
  
  // this = dropzone
  this.classList.add('over')
  this.classList.add('hovered')

  // get dragging card
  const cardBeingDragged = document.querySelector('.is-dragging')

  // this = dropzone
  //this.appendChild(cardBeingDragged)
  cardBeingDragged.remove()
    
}

function convert(obj) {
    return Object.keys(obj).map(key => ({
        name: key,
        value: obj[key],
    }));
}

function getDictFromCard(elem){
    var dict = {};
    var childs = convert(elem['value']['childNodes']);
    if (childs.length > 2){
        dict['status'] = childs[1]['value']['attributes'][0]['nodeValue'];
        dict['text'] = childs[3]['value']['childNodes'][0]['childNodes'][0]['data'];
    }
    else{
        dict['status'] = childs[0]['value']['attributes'][0]['nodeValue'];
        dict['text'] = childs[1]['value']['childNodes'][0]['innerText'];
    }
    return dict;
}

function getInfo(){
    var info = [];
    var boards = document.getElementsByClassName("board");
    Object.entries(boards).forEach(element => {

        var board = {};
        // Get header of card
        board['header'] = element[1]['children'][0]['children'][0]['innerText'];
        var cards = element[1]['children'][1]['children'];

        var cards_array = [];

        for (let card of cards){

            var card_dict = {};
            // Get status and text of card
            card_dict['status'] = card['children'][0]['className'];
            card_dict['text'] = card['children'][1]['innerText'];

            cards_array.push(card_dict);

        }

        board['cards'] = cards_array;
        info.push(board);
        
    });

    return info;
}

var collection = JSON.stringify(getInfo());

setInterval(function() {
    if (collection !== JSON.stringify(getInfo())){
        var collection = JSON.stringify(getInfo())
        $.post({
            url:"/store",
            data: {"data": collection},
            async: true
        });
    }
}, 15000);

