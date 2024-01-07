import axios from "axios";

axios.get('https://pixabay.com/api/', {
    params: {
        key: '41296916-da04ab2f63441e92262fae4bb',
        q: 'cat',
        image_type: 'photo',
        orientation: 'horizontal',
        safesearch: true,
    },
    headers: {
        'Content-Type': 'application/json'
    },
})
    .then(res => { console.log(res.data) })
    .catch(error =>{console.log(error);})