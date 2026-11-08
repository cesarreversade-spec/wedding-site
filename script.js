/* =========================================================
   Comportements du site.
   Pour l'instant une seule chose : faire apparaitre la
   barre de navigation des que l'on quitte la photo
   d'ouverture.
   ========================================================= */

const nav = document.getElementById('nav');

function updateNav() {
  // window.scrollY = nombre de pixels deja defiles depuis le haut.
  // Au-dela de 60, on ajoute la classe ; en deca, on la retire.
  nav.classList.toggle('is-scrolled', window.scrollY > 60);
}

// On appelle la fonction une premiere fois, au cas ou la page
// serait rechargee alors qu'on avait deja defile.
updateNav();

// Puis a chaque defilement.
// { passive: true } indique au navigateur qu'il peut continuer
// a faire defiler sans attendre notre code : le scroll reste fluide.
window.addEventListener('scroll', updateNav, { passive: true });


/* =========================================================
   Quiz : les questions en video.
   Fonctionnement : la video demarre seule quand elle est
   visible, s'arrete a la seconde `data-pause`, et les
   reponses apparaissent a cote. Une fois la reponse donnee,
   on affiche le verdict et la video reprend.
   ========================================================= */

// Les reponses de l'invite, question par question (true = bonne reponse).
// Servira plus tard a afficher le score final "You know us 4/5".
const storyAnswers = {};

document.querySelectorAll('.quiz').forEach(initQuiz);

function initQuiz(quiz) {
  const video   = quiz.querySelector('.quiz__video');
  const play    = quiz.querySelector('.quiz__play');
  const verdict = quiz.querySelector('.quiz__verdict');
  const answers = quiz.querySelectorAll('.quiz__answer');
  const replay  = quiz.querySelector('.quiz__replay');

  const pauseAt = parseFloat(quiz.dataset.pause);
  const goodOne = quiz.dataset.answer;
  let answered  = false;

  // Commun a toutes les questions : noter la reponse, barrer la mauvaise,
  // entourer le choix de l'invite et afficher le verdict.
  function revealAnswer(button) {
    const isRight = button.dataset.choice === goodOne;
    storyAnswers[quiz.id] = isRight;
    answers.forEach((b) => {
      b.disabled = true;
      if (b.dataset.choice !== goodOne) b.classList.add('is-wrong');
    });
    button.classList.add('is-picked');
    verdict.textContent = isRight ? quiz.dataset.right : quiz.dataset.wrong;
  }

  // Question sans video (variante `quiz--card`) : les reponses sont
  // disponibles tout de suite, et le reste de la fonction ne concerne pas
  // la video.
  if (!video) {
    quiz.classList.add('is-asking');
    answers.forEach((button) => button.addEventListener('click', () => {
      if (answered) return;
      answered = true;
      revealAnswer(button);
      // La photo remplace le cadre, juste apres le verdict.
      setTimeout(() => quiz.classList.add('is-revealed'), 700);
    }));
    return;
  }

  // Tant que les reponses ne sont pas visibles, on ne peut pas les atteindre
  // au clavier non plus.
  answers.forEach((b) => { b.disabled = true; });

  // Lancement. Si le navigateur refuse (economie d'energie de l'iPhone),
  // on montre le bouton de secours pour que l'invite lance lui-meme.
  function start() {
    play.classList.add('is-gone');
    video.play().catch(() => play.classList.remove('is-gone'));
  }
  play.addEventListener('click', start);

  // Demarrage automatique quand la video est visible aux deux tiers.
  // Pas plus tot : elle s'arreterait sur la question avant que l'invite
  // soit arrive. S'il repart avant la question, la video se met en pause
  // et reprend a son retour.
  // Pour qui a demande moins d'animations dans son systeme, pas de demarrage
  // automatique : le bouton lecture est affiche a la place.
  const calm = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (calm) {
    play.classList.remove('is-gone');
  } else {
    const observer = new IntersectionObserver(([entry]) => {
      const waiting = quiz.classList.contains('is-asking') && !answered;
      if (entry.isIntersecting && video.paused && !video.ended && !waiting) {
        start();
      } else if (!entry.isIntersecting && !video.paused) {
        video.pause();
      }
    }, { threshold: 0.66 });
    observer.observe(video);
  }

  // Surveillance de la lecture, a chaque image affichee par l'ecran.
  // Plus precis que l'evenement `timeupdate`, qui ne se declenche que
  // quatre fois par seconde : la pause tomberait trop tard.
  function watch() {
    if (answered || video.paused || video.ended) return;
    if (video.currentTime >= pauseAt) {
      video.pause();
      quiz.classList.add('is-asking');
      answers.forEach((b) => { b.disabled = false; });
      return;
    }
    requestAnimationFrame(watch);
  }
  video.addEventListener('play', () => requestAnimationFrame(watch));

  // Reponse de l'invite.
  answers.forEach((button) => {
    button.addEventListener('click', () => {
      if (answered) return;
      answered = true;
      revealAnswer(button);

      // Un court temps pour lire le verdict, puis la suite de la video.
      setTimeout(() => video.play(), 1200);
    });
  });

  // A la fin : proposer de revoir la video, sans reposer la question.
  video.addEventListener('ended', () => { replay.hidden = false; });
  replay.addEventListener('click', () => {
    replay.hidden = true;
    video.currentTime = 0;
    video.play();
  });
}
