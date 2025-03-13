const columns = document.querySelectorAll('.column__cards');

let draggedCard;

const dragstart = (event) => {
    draggedCard = event.target;
    event.dataTransfer.effectAllowed = 'move';
}

const dragOver = (event) => {
    event.preventDefault();
}

const dragEnter = ({target}) => {
   if (target.classList.contains('column--cards')) {
        target.classList.add('column--highlight');
   }
}

const dragLeave = ({target}) => {
    target.classList.remove('column--highlight');
 }
 
 const drop = ({target}) => {
    if (target.classList.contains('column--cards')) {
        target.classList.add('column--highlight');  
        target.append(draggedCard);
   }
  
 }
 
  const createCard = ({target}) => {
    if (!target.classList.contains('column--cards')) return;

    const card = document.createElement('section');

    card.className = 'card';
    card.draggable = 'true';
    card.contentEditable = 'true';

    card.addEventListener('foccusout', () => {
        card.contentEditable = 'false';
        if (!card.textContent) card.remove();
    });

    card.addEventListener('dragstart', dragstart);

    target.append(card);
    card.focus();
  }

columns.forEach((column) => {
    column.addEventListener('dragover', dragOver);
    column.addEventListener('dragenter', dragEnter);
    column.addEventListener('dragleave', dragLeave);
    column.addEventListener('drop', drop);
    column.addEventListener('dblclick', createCard);
})