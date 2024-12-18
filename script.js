let isPlaying = false;

let currentLang = localStorage.getItem("selectedLanguage") || "en";

const audio = document.getElementById("music");
const playBtn = document.querySelector(".play-btn");
const chillGuy = document.getElementById("chillGuy");
const moodText = document.getElementById("moodText");
const container = document.getElementById("mainContainer");
const deepThoughts = document.getElementById("deepThoughts");
const backgroundPattern = document.getElementById("backgroundPattern");
const audioVisualization = document.getElementById("audioVisualization");
const feedbackModal = document.getElementById("feedbackModal");
const responseModal = document.getElementById("responseModal");

const thoughts = [
  {
    en: "Take a deep breath... Let the music flow through you...",
    tr: "Derin bir nefes al... Müziğin içinden akmasına izin ver...",
    es: "Respira profundo... Deja que la música fluya a través de ti...",
    fr: "Respirez profondément... Laissez la musique vous traverser...",
    de: "Atmen Sie tief durch... Lassen Sie die Musik durch sich fließen...",
    it: "Fai un respiro profondo... Lascia che la musica fluisca attraverso di te...",
    si: "ගැඹුරු හුස්මක් ගන්න... සංගීතයට ඔබ තුළින් ගලා යන්නට ඉඩ දෙන්න...",
  },
  {
    en: "Feel your muscles relaxing with each note...",
    tr: "Kaslarının her nota ile gevşediğini hisset...",
    es: "Siente tus músculos relajándose con cada nota...",
    fr: "Sentez vos muscles se détendre à chaque note...",
    de: "Spüren Sie, wie sich Ihre Muskeln mit jeder Note entspannen...",
    it: "Senti i tuoi muscoli rilassarsi con ogni nota...",
    si: "ඔබේ මාංශපේශි සැහැල්ලු වන ආකාරය දැනෙනවාද...",
  },
  {
    en: "Let go of any tension... Just be present in this moment...",
    tr: "Tüm gerginliği bırak... Sadece şu anın içinde ol...",
    es: "Libera toda la tensión... Solo está presente en este momento...",
    fr: "Lâchez toute tension... Soyez simplement présent dans ce moment...",
    de: "Lassen Sie alle Spannungen los... Seien Sie einfach im Moment präsent...",
    it: "Lascia andare ogni tensione... Sii semplicemente presente in questo momento...",
    si: "සියලු ආතතීන් අතහැර දමන්න... මේ මොහොතේ පමණක් සිටින්න...",
  },
  {
    en: "Listen to the gentle rhythm... Feel your worries melt away...",
    tr: "Nazik ritmi dinle... Endişelerinin eriyip gittiğini hisset...",
    es: "Escucha el suave ritmo... Siente cómo tus preocupaciones se desvanecen...",
    fr: "Écoutez le rythme doux... Sentez vos soucis fondre...",
    de: "Hören Sie den sanften Rhythmus... Spüren Sie, wie sich Ihre Sorgen auflösen...",
    it: "Ascolta il ritmo gentile... Senti le tue preoccupazioni svanire...",
    si: "මෘදු රිද්මය අසන්න... ඔබේ කනස්සල්ල දියවී යන ආකාරය දැනෙනවාද...",
  },
  {
    en: "Your mind is becoming clearer with every breath...",
    tr: "Her nefeste zihnin daha da berraklaşıyor...",
    es: "Tu mente se aclara con cada respiración...",
    fr: "Votre esprit devient plus clair à chaque respiration...",
    de: "Ihr Geist wird mit jedem Atemzug klarer...",
    it: "La tua mente diventa più chiara con ogni respiro...",
    si: "සෑම හුස්මක් සමඟම ඔබේ මනස පැහැදිලි වෙමින් පවතී...",
  },
  {
    en: "Allow yourself to float with the melody...",
    tr: "Kendinin melodiyle süzülmesine izin ver...",
    es: "Permítete flotar con la melodía...",
    fr: "Permettez-vous de flotter avec la mélodie...",
    de: "Erlauben Sie sich, mit der Melodie zu schweben...",
    it: "Permettiti di fluttuare con la melodia...",
    si: "ඔබට රාගධාරාව සමඟ පා වී යන්නට ඉඩ දෙන්න...",
  },
  {
    en: "Feel the warmth spreading through your body...",
    tr: "Vücudunda yayılan sıcaklığı hisset...",
    es: "Siente el calor que se extiende por tu cuerpo...",
    fr: "Sentez la chaleur se répandre dans votre corps...",
    de: "Fühlen Sie die Wärme, die sich durch Ihren Körper ausbreitet...",
    it: "Senti il calore che si diffonde nel tuo corpo...",
    si: "ඔබේ සිරුර පුරා පැතිරෙන උණුසුම දැනෙනවාද...",
  },
  {
    en: "Each moment brings more peace and calm...",
    tr: "Her an daha fazla huzur ve sükunet getiriyor...",
    es: "Cada momento trae más paz y calma...",
    fr: "Chaque instant apporte plus de paix et de calme...",
    de: "Jeder Moment bringt mehr Frieden und Ruhe...",
    it: "Ogni momento porta più pace e calma...",
    si: "සෑම මොහොතක්ම වඩා සාමය හා සන්සුන්කම ගෙන එයි...",
  },
  {
    en: "Your body is becoming lighter and lighter...",
    tr: "Vücudun gittikçe hafifliyor...",
    es: "Tu cuerpo se vuelve cada vez más ligero...",
    fr: "Votre corps devient de plus en plus léger...",
    de: "Ihr Körper wird immer leichter...",
    it: "La tua mente diventa più chiara con ogni respiro...",
    si: "ඔබේ සිරුර වඩ වඩා සැහැල්ලු වෙමින් පවතී...",
  },
  {
    en: "Let the music guide you to tranquility...",
    tr: "Müziğin seni huzura götürmesine izin ver...",
    es: "Deja que la música te guíe hacia la tranquilidad...",
    fr: "Laissez la musique vous guider vers la tranquillité...",
    de: "Lassen Sie die Musik Sie zur Ruhe führen...",
    it: "Lascia che la musica ti guidi verso la tranquillità...",
    si: "සංගීතයට ඔබව ප්‍රශාන්තිය කරා මග පෙන්වීමට ඉඩ දෙන්න...",
  },
  {
    en: "Feel yourself becoming one with the harmony...",
    tr: "Kendini harmoniyle bütünleşmiş hisset...",
    es: "Siéntete uno con la armonía...",
    fr: "Ressentez-vous devenir un avec l'harmonie...",
    de: "Fühlen Sie sich eins mit der Harmonie...",
    it: "Sentiti uno con l'armonia...",
    si: "ඔබ සංගීතය සමඟ එක් වන ආකාරය දැනෙනවාද...",
  },
  {
    en: "Embrace the peaceful energy surrounding you...",
    tr: "Seni saran huzurlu enerjiyi kucakla...",
    es: "Abraza la energía pacífica que te rodea...",
    fr: "Embrassez l'énergie paisible qui vous entoure...",
    de: "Umarmen Sie die friedliche Energie um Sie herum...",
    it: "Abbraccia l'energia pacifica che ti circonda...",
    si: "ඔබ වටා ඇති සාමකාමී ශක්තිය වැළඳ ගන්න...",
  },
];

let currentThoughtIndex = 0;

const translations = {
  en: {
    sadMood: "Chill Guy is feeling sad... Play some music to cheer him up!",
    happyMood: "Yay! Chill Guy is happy now, enjoying the music!",
    playButton: "Play Music",
    playingButton: "Playing...",
    feedbackQuestion: "Are you relieved?",
    yesButton: "Yes",
    noButton: "No",
    happyResponse: "If I made you feel comfortable, I'm happy (:",
    okButton: "OK",
    relaxationTips: `Here are some relaxation tips to help you feel better:

1. Take deep, slow breaths - inhale for 4 counts, hold for 4, exhale for 4
2. Gently roll your shoulders and neck to release tension
3. Find a quiet space and practice mindfulness for 5 minutes
4. Try progressive muscle relaxation
5. Take a warm bath or shower
6. Listen to calming nature sounds
7. Write down your thoughts and feelings
8. Take a peaceful walk outside
9. Practice gentle stretching
10. Make yourself a soothing cup of tea

Remember, it's okay to take time for yourself. Would you like to try the experience again?`,
  },
  tr: {
    sadMood: "Sakin Çocuk üzgün... Onu neşelendirmek için biraz müzik çal!",
    happyMood: "Yaşasın! Sakin Çocuk şimdi mutlu, müziğin keyfini çıkarıyor!",
    playButton: "Müzik Çal",
    playingButton: "Çalıyor...",
    feedbackQuestion: "Rahatladınız mı?",
    yesButton: "Evet",
    noButton: "Hayır",
    happyResponse: "Sizi rahatlatabildiysem, mutlu oldum (:",
    okButton: "Tamam",
    relaxationTips: `İşte kendinizi daha iyi hissetmeniz için rahatlama önerileri:

1. Derin, yavaş nefesler alın - 4 sayı içe, 4 sayı tutun, 4 sayı dışa
2. Omuzlarınızı ve boynunuzu nazikçe döndürerek gerginliği atın
3. Sessiz bir yer bulun ve 5 dakika mindfulness yapın
4. İlerleyici kas gevşetme tekniğini deneyin
5. Ilık bir duş veya banyo yapın
6. Rahatlatıcı doğa seslerini dinleyin
7. Düşüncelerinizi ve duygularınızı yazın
8. Huzurlu bir yürüyüşe çıkın
9. Hafif esnemeler yapın
10. Kendinize sakinleştirici bir çay hazırlayın

Unutmayın, kendinize zaman ayırmak normaldir. Deneyimi tekrar denemek ister misiniz?`,
  },
  es: {
    sadMood:
      "¡Chico Tranquilo está triste... ¡Pon algo de música para animarlo!",
    happyMood:
      "¡Genial! ¡Chico Tranquilo está feliz ahora, disfrutando de la música!",
    playButton: "Reproducir Música",
    playingButton: "Reproduciendo...",
    feedbackQuestion: "¿Te sientes aliviado?",
    yesButton: "Sí",
    noButton: "No",
    happyResponse: "Si te hice sentir cómodo, ¡estoy feliz! (:",
    okButton: "OK",
    relaxationTips: `Aquí hay algunos consejos de relajación para ayudarte a sentirte mejor:

1. Toma respiraciones profundas y lentas: inhala durante 4 conteos, mantén durante 4, exhala durante 4.
2. Rueda suavemente tus hombros y cuello para liberar tensión.
3. Encuentra un espacio tranquilo y practica mindfulness durante 5 minutos.
4. Prueba la relajación muscular progresiva.
5. Tómate un baño o ducha tibia.
6. Escucha sonidos de la naturaleza que te relajen.
7. Escribe tus pensamientos y sentimientos.
8. Da un paseo tranquilo al aire libre.
9. Practica estiramientos suaves.
10. Prepárate una taza de té calmante.

Recuerda, está bien tomarte tiempo para ti mismo. ¿Te gustaría intentar la experiencia de nuevo?`,
  },
  fr: {
    sadMood:
      "Guy Décontracté est triste... Jouez de la musique pour lui remonter le moral !",
    happyMood:
      "Hourra ! Guy Décontracté est heureux maintenant, il profite de la musique !",
    playButton: "Jouer la Musique",
    playingButton: "En cours...",
    feedbackQuestion: "Êtes-vous soulagé ?",
    yesButton: "Oui",
    noButton: "Non",
    happyResponse:
      "Si je vous ai fait vous sentir à l'aise, je suis heureux (:",
    okButton: "OK",
    relaxationTips: `Voici quelques conseils de relaxation pour vous aider à vous sentir mieux :

1. Prenez de profondes et lentes respirations - inspirez pendant 4 secondes, maintenez pendant 4, expirez pendant 4.
2. Faites doucement rouler vos épaules et votre cou pour libérer la tension.
3. Trouvez un endroit calme et pratiquez la pleine conscience pendant 5 minutes.
4. Essayez la relaxation musculaire progressive.
5. Prenez un bain ou une douche chaude.
6. Écoutez des sons apaisants de la nature.
7. Écrivez vos pensées et vos sentiments.
8. Faites une promenade paisible à l'extérieur.
9. Pratiquez des étirements doux.
10. Préparez-vous une tasse de thé apaisante.

Rappelez-vous, il est normal de prendre du temps pour vous. Voudriez-vous essayer à nouveau l'expérience ?`,
  },
  de: {
    sadMood:
      "Entspannter Typ ist traurig... Spiele Musik, um ihn aufzuheitern!",
    happyMood:
      "Juhu! Entspannter Typ ist jetzt glücklich und genießt die Musik!",
    playButton: "Musik abspielen",
    playingButton: "Spielt...",
    feedbackQuestion: "Fühlst du dich erleichtert?",
    yesButton: "Ja",
    noButton: "Nein",
    happyResponse: "Wenn ich dich entspannt habe, bin ich glücklich (:",
    okButton: "OK",
    relaxationTips: `Hier sind einige Entspannungstipps, die dir helfen können:

1. Nimm tiefe, langsame Atemzüge - atme 4 Zählungen ein, halte 4, atme 4 aus.
2. Rolle sanft deine Schultern und deinen Nacken, um Spannungen abzubauen.
3. Finde einen ruhigen Ort und übe 5 Minuten lang Achtsamkeit.
4. Versuche progressive Muskelentspannung.
5. Nimm ein warmes Bad oder eine Dusche.
6. Höre beruhigende Naturgeräusche.
7. Schreibe deine Gedanken und Gefühle auf.
8. Mache einen ruhigen Spaziergang im Freien.
9. Übe sanftes Dehnen.
10. Mach dir eine beruhigende Tasse Tee.

Denk daran, dass es in Ordnung ist, sich Zeit für sich selbst zu nehmen. Möchtest du die Erfahrung noch einmal versuchen?`,
  },
  it: {
    sadMood:
      "Ragazzo Tranquillo è triste... Riproduci della musica per tirarlo su!",
    happyMood:
      "Evviva! Ragazzo Tranquillo ora è felice, sta godendo della musica!",
    playButton: "Riproduci Musica",
    playingButton: "In riproduzione...",
    feedbackQuestion: "Ti senti sollevato?",
    yesButton: "Sì",
    noButton: "No",
    happyResponse: "Se ti ho fatto sentire a tuo agio, sono felice (:",
    okButton: "OK",
    relaxationTips: `Ecco alcuni consigli per il relax per aiutarti a sentirti meglio:

1. Fai respiri profondi e lenti - inspira per 4 conteggi, trattieni per 4, espira per 4.
2. Fai ruotare delicatamente le spalle e il collo per liberare la tensione.
3. Trova uno spazio tranquillo e pratica la consapevolezza per 5 minuti.
4. Prova il rilassamento muscolare progressivo.
5. Fai un bagno o una doccia calda.
6. Ascolta suoni calmanti della natura.
7. Scrivi i tuoi pensieri e sentimenti.
8. Fai una passeggiata tranquilla all'aperto.
9. Pratica allungamenti delicati.
10. Prepara una tazza di tè calmante.

Ricorda, va bene prendersi del tempo per se stessi. Vuoi riprovare l'esperienza?`,
  },
  si: {
    sadMood: "චිල් ගයි දුකින් ඉන්නේ... ඔහුව සතුටු කරන්න සංගීතය වාදනය කරන්න!",
    happyMood: "යාය්! චිල් ගයි දැන් සතුටින්, සංගීතය විඳිමින් ඉන්නවා!",
    playButton: "සංගීතය වාදනය කරන්න",
    playingButton: "වාදනය වෙමින්...",
    feedbackQuestion: "ඔබට සහනයක් දැනෙනවාද?",
    yesButton: "ඔව්",
    noButton: "නැහැ",
    happyResponse: "මම ඔබව සුවපහසු කළා නම්, මම සතුටුයි (:",
    okButton: "හරි",
    relaxationTips: `මෙන්න ඔබට වඩා හොඳින් දැනෙන්න උදව් වන සමහර විවේක ඉඟි:

1. ගැඹුරු, සෙමින් හුස්ම ගන්න - ගණන් 4ක් ඇතුළට, 4ක් රඳවාගෙන, 4ක් පිටට
2. ආතතිය මුදා හැරීමට උරහිස් සහ ගෙල මෘදුව චක්‍රව කරකවන්න
3. නිශ්ශබ්ද ඉඩක් සොයා මිනිත්තු 5ක් මනස එකඟ කරගන්න
4. ප්‍රගතිශීලී මාංශපේශි විශ්‍රාම ක්‍රමය උත්සාහ කරන්න
5. උණුසුම් ස්නානයක් හෝ දුශයක් ගන්න
6. සන්සුන් ස්වභාවික හඬවල් අසන්න
7. ඔබේ සිතුවිලි හා හැඟීම් ලියා තබන්න
8. සාමකාමී ඇවිදීමක් යන්න
9. මෘදු ව්‍යායාම කරන්න
10. සන්සුන් තේ කෝප්පයක් සාදාගන්න

මතක තබාගන්න, ඔබට ඔබ වෙනුවෙන් කාලය ගත කිරීම සුදුසුයි. ඔබට නැවත අත්දැකීම උත්සාහ කිරීමට අවශ්‍යද?`,
  },
};

// Initialize language selector
document.addEventListener("DOMContentLoaded", () => {
  const languageSelector = document.getElementById("languageSelector");
  languageSelector.value = currentLang;
  updatePageLanguage();

  languageSelector.addEventListener("change", (e) => {
    currentLang = e.target.value;
    localStorage.setItem("selectedLanguage", currentLang);
    updatePageLanguage();
  });
});

// Function to toggle play
function togglePlay() {
  if (!isPlaying) {
    isPlaying = true;
    audio.play();
    playBtn.textContent = getTranslation("playingButton");
    chillGuy.src =
      "/res/img/images.jpeg";
    chillGuy.classList.add("happy");
    moodText.classList.remove("sad");
    moodText.classList.add("happy");
    updateMoodText(true);

    // Start visual effects
    container.classList.add("dimmed");
    backgroundPattern.classList.add("visible");

    // Start thought display
    showThoughts();

    // Start rain animation
    startRainAnimation();
  }
}

// Function to create floating hearts
function createFloatingHeart(x, y) {
  const heart = document.createElement("div");
  heart.className = "floating-heart";
  heart.textContent = "❤️";
  heart.style.left = x + "px";
  heart.style.top = y + "px";
  document.body.appendChild(heart);

  // Remove the heart element after animation completes
  heart.addEventListener("animationend", () => {
    heart.remove();
  });
}

// Add click/touch event listener to Chill Guy
document.addEventListener("DOMContentLoaded", () => {
  const chillGuy = document.getElementById("chillGuy");

  // Handle both click and touch
  ["click", "touchstart"].forEach((eventType) => {
    chillGuy.addEventListener(eventType, (e) => {
      e.preventDefault();

      // Get click/touch position relative to the image
      const rect = chillGuy.getBoundingClientRect();
      const x = (e.touches ? e.touches[0].clientX : e.clientX) - rect.left;
      const y = (e.touches ? e.touches[0].clientY : e.clientY) - rect.top;

      // Create multiple hearts at slightly different positions
      for (let i = 0; i < 5; i++) {
        const offsetX = x + (Math.random() * 40 - 20);
        const offsetY = y + (Math.random() * 40 - 20);
        setTimeout(() => {
          createFloatingHeart(offsetX + rect.left, offsetY + rect.top);
        }, i * 100);
      }
    });
  });
});

// Function to update all text content
function updatePageLanguage() {
  const texts = translations[currentLang];
  document.querySelector(".title").textContent = texts.title;
  document.querySelector(".play-btn").textContent = texts.playButton;
  updateMoodText();
  document.querySelector("#feedbackModal h2").textContent =
    texts.feedbackQuestion;
  document.querySelector("#feedbackModal .modal-btn:first-child").textContent =
    texts.yesButton;
  document.querySelector("#feedbackModal .modal-btn:last-child").textContent =
    texts.noButton;
  document.querySelector("#responseModal .modal-btn").textContent =
    texts.okButton;
}

// Modify existing functions to use translations
function updateMoodText(isHappy = false) {
  const key = isHappy ? "happyMood" : "sadMood";
  moodText.textContent = getTranslation(key);
}

function getTranslation(key, lang = currentLang) {
  if (translations[lang] && translations[lang][key]) {
    return translations[lang][key];
  }
  return translations["en"][key];
}

// Modify handleFeedback to remove score tracking
async function handleFeedback(answer) {
  feedbackModal.style.display = "none";
  const texts = translations[currentLang];

  // Show response modal
  if (answer === "yes") {
    document.getElementById("responseText").textContent = texts.happyResponse;
  } else {
    document.getElementById("responseText").textContent = texts.relaxationTips;
  }
  responseModal.style.display = "flex";
}

// Remove score update from audio ended event listener
audio.addEventListener("ended", () => {
  isPlaying = false;
  playBtn.classList.add("disabled");

  deepThoughts.classList.remove("visible");
  container.classList.remove("dimmed");
  backgroundPattern.classList.remove("visible");

  setTimeout(() => {
    feedbackModal.style.display = "flex";
  }, 1000);
});

// Add the rain animation function
function startRainAnimation() {
  const createRaindrop = () => {
    const raindrop = document.createElement("div");
    raindrop.className = "raindrop";
    raindrop.style.left = `${Math.random() * 100}%`;
    document.body.appendChild(raindrop);

    raindrop.addEventListener("animationend", () => {
      raindrop.remove();
    });
  };

  // Create raindrops at 129 BPM (approximately every 465ms)
  const interval = setInterval(() => {
    if (!isPlaying) {
      clearInterval(interval);
      return;
    }
    createRaindrop();
  }, 465);
}

// Add the thoughts display function
function showThoughts() {
  if (!isPlaying) return;

  const showNextThought = () => {
    if (!isPlaying) return;

    deepThoughts.textContent = thoughts[currentThoughtIndex][currentLang];
    deepThoughts.classList.add("visible");

    currentThoughtIndex = (currentThoughtIndex + 1) % thoughts.length;

    // Show each thought for 5 seconds
    setTimeout(() => {
      if (isPlaying) {
        deepThoughts.classList.remove("visible");
        // Wait 1 second before showing next thought
        setTimeout(() => {
          if (isPlaying) {
            showNextThought();
          }
        }, 1000);
      }
    }, 5000);
  };

  showNextThought();
}

// Add the response modal close function
function closeResponseModal() {
  responseModal.style.display = "none";
  // Reset everything
  playBtn.classList.remove("disabled");
  playBtn.textContent = getTranslation("playButton");
  chillGuy.src = "images (14).jpeg";
  chillGuy.classList.remove("happy");
  moodText.classList.remove("happy");
  moodText.classList.add("sad");
  updateMoodText(false);
  audio.currentTime = 0;
  currentThoughtIndex = 0;

  // Remove any remaining raindrops
  const raindrops = document.querySelectorAll(".raindrop");
  raindrops.forEach((drop) => drop.remove());
}
