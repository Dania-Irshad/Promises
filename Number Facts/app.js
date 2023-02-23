let threeNums = [1, 2, 3];

$.getJSON("http://numbersapi.com/7?json").then(data => {
    console.log(data);
});

$.getJSON(`http://numbersapi.com/7?json/${threeNums}?json`).then(data => {
    console.log(data);
});

Promise.all(
    Array.from({ length: 4 }, () => {
        return $.getJSON("http://numbersapi.com/7?json");
    }))
    .then(fourFacts => { fourFacts.forEach(data => $("ul").append(`<li>${data.text}</li>`)); })
    .catch(err => console.log(err));