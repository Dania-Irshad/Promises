$(function () {

    let firstCard = null;
    let deckId = null;
    let $cards = $('#cards');
    let $btn = $('button');

    $.getJSON("https://deckofcardsapi.com/api/deck/new/draw/").then(data => {
        let { suit, value } = data.cards[0];
        console.log(`${value} of ${suit.toLowerCase()}`);
    });

    $.getJSON("https://deckofcardsapi.com/api/deck/new/draw/")
        .then(data => {
            firstCard = data.cards[0];
            let deckId = data.deck_id;
            return $.getJSON(`https://deckofcardsapi.com/api/deck/${deckId}/draw/`);
        })
        .then(data => {
            let secondCard = data.cards[0];
            [firstCard, secondCard].forEach(function (card) {
                console.log(
                    `${card.value} of ${card.suit.toLowerCase()}`
                );
            });
        });

    $.getJSON("https://deckofcardsapi.com/api/deck/new/shuffle/").then(data => {
        deckId = data.deck_id;
    });

    $btn.on('click', function () {
        $.getJSON(`https://deckofcardsapi.com/api/deck/${deckId}/draw/`).then(data => {
            let cardSrc = data.cards[0].image;
            let angle = Math.random() * 90 - 45;
            let x = Math.random() * 40 - 20;
            let y = Math.random() * 40 - 20;
            $cards.append(
                $('<img>', {
                    src: cardSrc,
                    css: {
                        transform: `translate(${x}px, ${y}px) rotate(${angle}deg)`
                    }
                })
            );
            if (data.remaining === 0) $btn.remove();
        });
    });
});