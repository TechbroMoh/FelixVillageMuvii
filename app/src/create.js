import {showDetails} from "./details.js";

let main;
let section;

async function onSubmit(event) {
    event.preventDefault();

    const formData = new FormData(event.target);
    const movie = {
        title: formData.get('title'),
        description: formData.get('description'),
        img: formData.get('imageUrl'),
    }

    if (movie.title.trim() === '' ||
        movie.description.trim() === '' ||
        movie.img.trim() === '') {
        return alert('All fields are required!');
    }

    const response = await fetch('http://localhost:3030/data/movies', {
        method: 'post',
        headers: {
            'Content-Type': 'application/json',
            'X-Authorization': sessionStorage.getItem('authToken'),
        },
        body: JSON.stringify(movie)
    });

    if (response.ok) {
        const fetchedMovie = await response.json();
        showDetails(fetchedMovie._id);
    } else {
        const error = await response.json();
        alert(error.message);
    }
}

export function setupCreate(mainTarget, sectionTarget) {
    main = mainTarget;
    section = sectionTarget;

    const form = section.querySelector('form');
    form.addEventListener('submit', onSubmit)
}

export async function showCreate() {
    main.innerHTML = '';
    main.appendChild(section);

    document.getElementById('homeLink').textContent = '⋖ Back to Movies';
}