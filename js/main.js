const posts = [
    {
        "id": 1,
        "content": "Placeat libero ipsa nobis ipsum quibusdam quas harum ut. Distinctio minima iusto. Ad ad maiores et sint voluptate recusandae architecto. Et nihil ullam aut alias.",
        "media": "https://unsplash.it/600/300?image=171",
        "author": {
            "name": "Phil Mangione",
            "image": "https://unsplash.it/300/300?image=15"
        },
        "likes": 80,
        "created": "2021-06-25"
    },
    {
        "id": 2,
        "content": "Placeat libero ipsa nobis ipsum quibusdam quas harum ut. Distinctio minima iusto. Ad ad maiores et sint voluptate recusandae architecto. Et nihil ullam aut alias.",
        "media": "https://unsplash.it/600/400?image=112",
        "author": {
            "name": "Sofia Perlari",
            "image": "https://unsplash.it/300/300?image=10"
        },
        "likes": 120,
        "created": "2021-09-03"
    },
    {
        "id": 3,
        "content": "Placeat libero ipsa nobis ipsum quibusdam quas harum ut. Distinctio minima iusto. Ad ad maiores et sint voluptate recusandae architecto. Et nihil ullam aut alias.",
        "media": "https://unsplash.it/600/400?image=234",
        "author": {
            "name": "Chiara Passaro",
            "image": "https://unsplash.it/300/300?image=20"
        },
        "likes": 78,
        "created": "2021-05-15"
    },
    {
        "id": 4,
        "content": "Placeat libero ipsa nobis ipsum quibusdam quas harum ut. Distinctio minima iusto. Ad ad maiores et sint voluptate recusandae architecto. Et nihil ullam aut alias.",
        "media": "https://unsplash.it/600/400?image=24",
        "author": {
            "name": "Luca Formicola",
            "image": null
        },
        "likes": 56,
        "created": "2021-04-03"
    },
    {
        "id": 5,
        "content": "Placeat libero ipsa nobis ipsum quibusdam quas harum ut. Distinctio minima iusto. Ad ad maiores et sint voluptate recusandae architecto. Et nihil ullam aut alias.",
        "media": "https://unsplash.it/600/400?image=534",
        "author": {
            "name": "Alessandro Sainato",
            "image": "https://unsplash.it/300/300?image=29"
        },
        "likes": 95,
        "created": "2021-03-05"
    }
];

// Milestone 1 - Prendendo come riferimento il layout di esempio presente nell'html,
//  stampiamo i post del nostro feed.
// Milestone 2 - Se clicchiamo sul tasto "Mi Piace" cambiamo il colore al testo
//  del bottone e incrementiamo il counter dei likes relativo.
// Salviamo in un secondo array gli id dei post ai quali abbiamo messo il like.
// BONUS
// 1. Formattare le date in formato italiano (gg/mm/aaaa)
// 2. Gestire l'assenza dell'immagine profilo con un elemento di fallback che
//  contiene le iniziali dell'utente (es. Luca Formicola > LF).
// 3. Al click su un pulsante "Mi Piace" di un post, se abbiamo già cliccato.
//  dobbiamo decrementare il contatore e cambiare il colore del bottone.

// Selezione il container
const  postsContainer = document.querySelector(`#container`); 

const likedArray =[];

// Creo un ciclo per aggiungere ogni singolo post al DOM
posts.forEach((singleObject) =>{
    const newPost = newSingleDOM(singleObject);
    postsContainer.innerHTML += newPost;
})

// EVENTS

const allLikeButton = document.querySelectorAll(`.js-liked-button`);
const allCounters = document.querySelectorAll(`.js-liked-counter`);
allLikeButton.forEach((singleLikeButton, index) => {
    singleLikeButton.addEventListener(`click`, function(event){
        // Per evitare che la pagina si ricarichi di default
        event.preventDefault() 

        const counterValue = allCounters[index];
        const relatedCounterNumber =  parseInt(counterValue.textContent);

        // Applico la clase solo se non ce l'ha già
        if (!this.classlist.contains(`like-button-liked`)) {
            // Aggiungo la classe sull'elemento che ho cliccato
            this.classlist.add(`like-button-liked`);
            // Prendo il counter e lo aumento di 1
            counterValue.innerHTML =  relatedCounterNumber + 1 ;
            // Prendo l'id del post su cui ho cliccato e lo aggiungo all'array
            const postId = parseInt(this.dataset.postid);
            likedArray.push(postId);
        }  else {
             // Rimuovo la classe sull'elemento se è già cliccato
            this.classlist.remove(`like-button-liked`);
            // Prendo il counter e lo diminuisco di 1
            counterValue.innerHTML =  relatedCounterNumber - 1 ;
    }});
});

// FUNCIOTN

// Creo una funziona da cui estraggo i singoli elementi dall' array di oggetti,
//  e creo il post da attaccare al DOM
function newSingleDOM(object) {

    const {id, content, media, author, likes, created} = object;

    const authorImageTemplateResult = authorImageTemplate(author);

    const newDom = `
    <div class="post">
            <div class="post__header">
                <div class="post-meta">                    
                    <div class="post-meta__icon">
                        ${authorImageTemplate}        
                    </div>
                    <div class="post-meta__data">
                        <div class="post-meta__author">${author.name}</div>
                        <div class="post-meta__time">${convertDate(created)}</div>
                    </div>                    
                </div>
            </div>
            <div class="post__text">${content}</div>
            <div class="post__image">
                <img src="${media}" alt="${author.name}">
            </div>
            <div class="post__footer">
                <div class="likes js-likes">
                    <div class="likes__cta">
                        <a class="like-button  js-like-button" href="#" data-postid="${id}">
                            <i class="like-button__icon fas fa-thumbs-up" aria-hidden="true"></i>
                            <span class="like-button__label">Mi Piace</span>
                        </a>
                    </div>
                    <div class="likes__counter">
                        Piace a <b id="like-counter-${id}" class="js-likes-counter">${likes}</b> persone
                    </div>
                </div> 
            </div>            
        </div>
`
return newDom;
};

// 1. Formattare le date in formato italiano (gg/mm/aaaa)
function convertDate(originalDate) {
     // Destrutturo l'array e costruisco la data in formato italiano
     const createdArray = originalDate.split(`-`);
     const [year, month, day] = createdArray;
     const fullDate = `${day}/${month}/${year}`;
     return fullDate;
}

// 2. Gestire l'assenza dell'immagine profilo con un elemento di fallback che
//  contiene le iniziali dell'utente (es. Luca Formicola > LF)
function authorImageTemplate(author) {
    let imageTemplate;
    if (author.image) {
        imageTemplate = `<img class="profile-pic" src="${author.image}" alt="${author.name}">`;
        } else {
            const authorNameArray = author.name.split(` `);
            const [name, lastname] =  authorNameArray;

            imageTemplate = `
            <div class="profile-pic-default">
                <span> ${name[0]}${lastname[0]}</span>
            </div>`    
    }
    return imageTemplate;
}