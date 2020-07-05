const numDivs = 36;
const maxHits = 10;

let hits = 0;
let firstHitTime = 0;
let previousTarget;
let missCounter = 0;

function round() {
    // FIXME: надо бы убрать "target" прежде чем искать новый
    // TODO: помечать target текущим номером
    // FIXME: тут надо определять при первом клике firstHitTime
    let divSelector = randomDivId();
    if (firstHitTime) {
        $(previousTarget).removeClass("target");
        $(previousTarget).addClass("game-field");
        $(previousTarget).text(``);
    } else {
        firstHitTime = getTimestamp();
        $("#button-reload").html("Играть заново");
    }
    $(divSelector).addClass("target");
    $(divSelector).text(`${hits + 1}`);
    if (hits === maxHits) endGame();
    previousTarget = divSelector;
}

function endGame() {
    // FIXME: спрятать игровое поле сначала
    $(".field").hide();
    let totalPlayedMillis = getTimestamp() - firstHitTime;
    let totalPlayedSeconds = Number(totalPlayedMillis / 1000).toPrecision(3);
    $("#total-time-played").text(totalPlayedSeconds);
    $("#missCounter").text(missCounter);

    $("#win-message").removeClass("d-none");
    }

function handleClick(event) {
    // FIXME: убирать текст со старых таргетов. Кажется есть .text?
    if ($(event.target).hasClass("target")) {
        hits += 1;
        round();
    } else {
        missCounter += 1;
        $(event.target).addClass("miss");
        setTimeout(() => {
            $(event.target).removeClass("miss");
        }, 500);
    }
    // TODO: как-то отмечать если мы промахнулись? См CSS класс .miss
}

$("#button-reload").click(function () {
    // TODO: заказчик просил отдельную кнопку, запускающую игру а не просто по загрузке
    round();

    $(".game-field").click(handleClick);
    $("#button-reload").click(function () {
        location.reload();
    });
});
