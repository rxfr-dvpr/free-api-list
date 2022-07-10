const url = "https://api.publicapis.org/entries"

let list = document.querySelector('.cards'),
    loading = document.querySelector('.loading');

function random(num) {
    return Math.floor(Math.random() * num + 1)
}

fetch(url)
.then(response => {
    if (response.ok) return response.json()
    else throw new Error(response)
})
.then(data => {
    let info = data.entries;
    let ranNum = random(data.count);
    let pageRan = random(data.count);
    let dataErrorFix = (pageRan < 10 ? pageRan = 25 : pageRan) < ranNum ? ranNum : data.count;

    for (let i = pageRan; i < dataErrorFix; i++) {
        let datas = info[i];

        let div = document.createElement('div')
        div.classList.add('card')
        div.innerHTML = `
            <h2 class="api__title">${datas.API}</h2>
            <p class="api__category">${datas.Category}</p>
            <p class="api__description">${datas.Description}</p>
            <a href="${datas.Link}" target="_blank" class="api__link">Link to Api</a>
        `
        list.append(div)
    }

    loading.classList.remove('active')        
})
.catch(error => {
    console.error(error);
})