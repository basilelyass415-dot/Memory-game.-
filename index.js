let cards = document.querySelectorAll('.card'),
timeTag = document.querySelector('.time b'),
flipTag = document.querySelector('.flips b');
let btn = document.querySelector('.detales button');


let modalOverlay = document.getElementById('custom-modal');
let modalMessage = document.getElementById('modal-message');
let modalSubMessage = document.getElementById('modal-sub-message');
let modalBtn = document.getElementById('modal-btn');


let disable = false;
let isplaying = false;
let cardOne, cardTwo, timer;

let maxTime = 35;
let timeLeft = maxTime;
let flips = 0; 
let matchedCards = 0;

// تفعيل الضغط على البطاقات عند التشغيل
cards.forEach((card) => {
  card.addEventListener("click", flipCard);
});

function showModal(isWin) {
  if (isWin) {
    modalMessage.innerText = "🎉 You Win! 🎉";
    modalMessage.style.color = "#25D366"; // لون أخضر للفوز
    modalSubMessage.innerText = `Flips: ${flips} | Time Left: ${timeLeft}s`;
  } else {
    modalMessage.innerText = "😂 You Lose! 😂";
    modalMessage.style.color = "#E4405F"; // لون أحمر للخسارة
    modalSubMessage.innerText = "Time is up! Try again.";
  }
  modalOverlay.classList.add('show');
}

function hideModal() {
  modalOverlay.classList.remove('show');
}

// زر إعادة اللعب من داخل النافذة
modalBtn.addEventListener('click', () => {
  hideModal();
  shuffleCard();
});



function initTimer() {
  if (timeLeft <= 0) {
    clearInterval(timer);
    return showModal(false);
  }
  timeLeft--;
  timeTag.innerText = timeLeft;
}

function flipCard({target: clickedCard}) {
  if (!isplaying) {
    isplaying = true;
    timer = setInterval(initTimer, 1000);
  }
  if (clickedCard !== cardOne && !disable && timeLeft > 0) {
    flips++;
    flipTag.innerText = flips; // تحديث عدد القلبات في الشاشة
    clickedCard.classList.add('flip');
    if (!cardOne) {
      return cardOne = clickedCard;
    }
    cardTwo = clickedCard;
    disable = true;
    
    let cardOneIcon = cardOne.querySelector('.front-card i').classList.value;
    let cardTwoIcon = cardTwo.querySelector('.front-card i').classList.value;
    matchCards(cardOneIcon, cardTwoIcon);
  }
}

function matchCards(icon1, icon2) {
  if (icon1 === icon2) {
    matchedCards++;
    if (matchedCards == 9 && timeLeft > 0) {
      clearInterval(timer);
      return showModal(true);
    }
    cardOne.removeEventListener("click", flipCard);
    cardTwo.removeEventListener("click", flipCard);
    cardOne = cardTwo = '';
    return disable = false;
  }
  
  setTimeout(() => {
    cardOne.classList.add('shake');
    cardTwo.classList.add('shake');
  }, 400);
  
  setTimeout(() => {
    cardOne.classList.remove('shake', 'flip');
    cardTwo.classList.remove('shake', 'flip');
    cardOne = cardTwo = "";
    disable = false;
  }, 1200);
}

function shuffleCard() {
  timeLeft = maxTime;
  flips = matchedCards = 0;
  cardOne = cardTwo = "";
  clearInterval(timer);
  timeTag.innerText = timeLeft;
  flipTag.innerText = flips;
  disable = isplaying = false;
  
  // المصفوفة الآن تحتوي على 12 أيقونة لتطابق عدد البطاقات
  let arr = ['fa-tiktok','fa-youtube','fa-facebook','fa-instagram','fa-discord','fa-linkedin','fa-tiktok','fa-youtube','fa-facebook','fa-instagram','fa-discord','fa-linkedin','fa-whatsapp','fa-snapchat','fa-google-play','fa-whatsapp','fa-snapchat','fa-google-play'];
  arr.sort(() => Math.random() > 0.5 ? 1 : -1);

  cards.forEach((card, index) => {
    card.classList.remove("flip");
    let iconTag = card.querySelector(".front-card i");

    setTimeout(() => {
      // استخدام fa-brands لتوافق أيقونات السوشيال ميديا
      iconTag.className = `fa-brands ${arr[index]}`; 
    }, 500);

    card.addEventListener("click", flipCard);
  });
}

// ربط زر التحديث بالوظيفة
btn.addEventListener("click", shuffleCard);

// تشغيل خلط البطاقات عند بداية تحميل الصفحة
shuffleCard();
