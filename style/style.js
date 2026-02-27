// NAVBAR

var navItems = [
  { name: "Početna", href: "index.html" },
  { name: "Ture", href: "index.html#ture" },
  { name: "O nama", href: "index.html#aboutUs" },
  { name: "Prijavite se", href: "index.html#myForm" },
  { name: "Autor", href: "autor.html" }
];
//navigacioni 
navItems.forEach(item => {
  const li = document.createElement("li");
  li.className = "nav-item";
  li.innerHTML = `<a class="nav-link text-end" href="${item.href}">${item.name}</a>`;
  document.querySelector(".navbar-nav").appendChild(li);
}); 

// objPlanine
var mountains = [
  {
    mountianName: "Tara",
    difficulty: "Laka",
    description: "Laka i pristupačna tura, pogodna za sve uzraste i nivoe kondicije.",
    image: "img/tara.jpg",
    visina: "1544m",
    price: "200e"
  },
  {
    mountianName: "Rtanj",
    difficulty: "Srednja",
    description: "Srednje teška tura sa pogledom koji će vas ostaviti bez daha.",
    image: "img/rtanj.jpg",
    visina: "1565m",
    price: "300e"
  },
  {
    mountianName: "Sar",
    difficulty: "Teška",
    description: "Teška tura na koju nećete zažaliti ako krenete.",
    image: "img/sar.jpg",
    visina: "2651m",
    price: "500e"
  },
  {
    mountianName: "Kopaonik",
    difficulty: "Teška",
    description: "Teška tura sa spektakularnim pogledom na vrhu.",
    image: "img/kopaonik.jpg",
    visina: "2017m",
    price: "500e"
  },
  {
    mountianName: "Zlatibor",
    difficulty: "Srednja",
    description: "Više grad nego planina al ajde",
    image: "img/zlatibor.jpg",
    visina: "1496m",
    price: "400e"
  },
  {
    mountianName: "Stara Planina",
    difficulty: "Teška",
    description: "Srednje teška tura sa prelepim pejzažima i bogatom florom i faunom.",
    image: "img/staraplanina.jpg",
    visina: "2169m",
    price: "400e"
  }
];

let mountainCopy = mountains.slice();
let showAll = false;

// TEZINE
const difficulties=[];
mountainCopy.forEach(mc=>{
if(!difficulties.includes(mc.difficulty)){
  difficulties.push(mc.difficulty);
}
});

function renderMountains() {
  const container = document.querySelector(".mountainTours");
  container.innerHTML = "";

  const onMobile = window.innerWidth < 768;

  // limitiranje za fon
  const limit = (onMobile && !showAll) ? 3 : mountainCopy.length;

  mountainCopy.slice(0, limit).forEach(mc => {
    const card = document.createElement("div");
    card.className = "col-12 col-md-4";

    card.innerHTML = `
      <div class="tourCard d-flex flex-column h-100">
        <img src="${mc.image}" alt="${mc.mountianName}">
        <div class="tourInfo d-flex flex-column p-3 flex-grow-1">
          <h4 class="fw-bold">${mc.mountianName}</h4>
          <p class="mb-1"><strong>Težina:</strong> ${mc.difficulty}</p>
          <p class="mb-1"><strong>Visina:</strong> ${mc.visina}</p>
          <p class="flex-grow-1">${mc.description}</p>
          <p class="mt-auto fw-bold ">${mc.price}</p>
        </div>
      </div>
    `;

    container.appendChild(card);
  });

    $(".tourCard").hover(
        function () {
            $(this).addClass("scale1");
          },
          function () {
            $(this).removeClass("scale1");
          }
      );

  const toggleBtn = $("#toggleMountains");

if (onMobile) {
  if (mountainCopy.length <= 3) {
    toggleBtn.hide();
  } else {
    toggleBtn.show();
    toggleBtn.text(showAll ? "Prikaži manje" : "Još ponuda");
  }
} else {
  toggleBtn.hide();
};
}


// dugme za planine
$("#toggleMountains").on("click", function () {
  showAll = !showAll;
  renderMountains();
});

// Filter
$("#filterContainer").append(`<select id="difficultyFilter" class="form-select w-50 mx-auto"><option value="all">Sve težine</option></select>`);
difficulties.forEach(diff => {
  $("#difficultyFilter").append(`<option value="${diff}">${diff}</option>`);
});

$("#difficultyFilter").on("change", function () {
  const value = $(this).val();

  mountainCopy = value === "all"
    ? mountains.slice()
    : mountains.filter(m => m.difficulty === value);

  showAll = false;
  renderMountains();
});

renderMountains();

// show more/less
const aboutBtn = $("#toggleAbout");
const moreSpan = $("#moreAbout");

aboutBtn.on("click", function() {
  moreSpan.toggleClass("show");
  const showing = moreSpan.hasClass("show");
  aboutBtn.text(showing ? "Prikaži manje" : "Prikaži više");
});

// SLIKE ZA KARTICU
 const content = [
    {
      image: "img/perucac.jpg",
      alt: "Perućac",
      title: "Avantura čeka",
      text: "Istražite netaknute vode i skrivene dragulje prirode."
    },
    {
      image: "img/taraput.jpg",
      alt: "Tara Put",
      title: "Oseti slobodu",
      text: "Osetite slobodu i oslobodite svoj duh na stazama Tare."
    },
    {
      image: "img/rtanjjesen.jpg",
      alt: "Rtanj Jesen",
      title: "Jesen je pravo vreme za planinarenje",
      text: "Uživajte u spektakularnim bojama i svežem vazduhu."
    }
  ];

  let x = 0;

  // kartica menja lsiku
  function changeContent() {
    x = (x + 1) % content.length;
  $(`#dynamicCard img`).remove();
  $(`#dynamicCard`).prepend(`<img src="${content[x].image}" alt="${content[x].alt}" class="card-img-top full-size">`);
    $(`#dynamicCard .card-title`).text(content[x].title);
    $(`#dynamicCard .card-text`).text(content[x].text);
  }

  setInterval(changeContent, 3000); 


//FORMA
const formFields = [
  { id: "firstName", label: "Ime*", type: "text" },
  { id: "lastName", label: "Prezime*", type: "text" },
  { id: "email", label: "Email*", type: "email" },
  { id: "password", label: "Lozinka*", type: "password" }
];

const formContainer = document.getElementById("formContainer");

//FORMA DINAMICKA
formContainer.innerHTML = `
  <form id="myForm" method="POST" action="#myForm">
    ${formFields.map(field => `
      <div class="row mb-3">
        <label class="col-md-4 col-form-label" for="${field.id}">${field.label}</label>
        <div class="col-md-8">
          <input type="${field.type}" id="${field.id}" class="form-control">
          <div class="errorMsg"></div>
        </div>
      </div>
    `).join("")}

    <div id="radioSection"></div>
    <div id="selectSection"></div>

    <div class="text-center">
      <input class="btn btn-outline-dark" type="submit" value="Submit">
    </div>

    <div id="formMessage" class="text-center mt-3"></div>
  </form>
`;

// dinamicki radio

document.getElementById("radioSection").innerHTML = `
  <div class="row mb-3">
    <label class="col-md-4 col-form-label">Experience*</label>
    <div id="radioContainer" class="col-md-8">
      ${difficulties.map(diff => `
        <div class="form-check form-check-inline">
          <input class="form-check-input" type="radio" name="experience" value="${diff}">
          <label class="form-check-label">${diff}</label>
        </div>
      `).join("")}
      <div class="errorMsg"></div>
    </div>
  </div>
`;

// Selekt planina
document.getElementById("selectSection").innerHTML = `
  <div class="row mb-3">
    <label class="col-md-4 col-form-label" for="mountainSelect">Izaberite planinu</label>
    <div class="col-md-8">
      <select id="mountainSelect" class="form-select">
        <option value="0">Izaberite...</option>
        ${mountains.map(m => `<option value="${m.mountianName}">${m.mountianName}</option>`).join("")}
      </select>
      <div class="errorMsg"></div>
    </div>
  </div>
`;

// REGEXI
const validationRules = [
  {
    id: "firstName",
    regex: /^([A-ZŠČĆĐŽ][a-zščćđž]{1,})(\s[A-ZŠČĆĐŽ][a-zščćđž]{1,})*$/,
    message: "Ime mora početi velikim slovom i imati makar 2 slova."
  },
  {
    id: "lastName",
    regex: /^([A-ZŠČĆĐŽ][a-zščćđž]{1,})(\s[A-ZŠČĆĐŽ][a-zščćđž]{1,})*$/,
    message: "Prezime mora početi velikim slovom i imati makar 2 slova."
  },
  {
    id: "email",
    regex: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}(\.[a-zA-Z]{2,})?$/,
    message: "Email mora sadržati @ i ne sme sadrzati specijalne znakove osim ._-"
  },
  {
    id: "password",
    regex: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{6,}$/,
    message: "Lozinka mora imati veliko, malo slovo, broj i mora imati najmanje 6 karaktera."
  }
];

// greska ako nije validno

validationRules.forEach(rule => {
  const input = document.getElementById(rule.id);
  if(input){ 
    input.addEventListener("blur", () => validateField(input, rule));
  }
});

function validateField(input, rule) {
  const errorDiv = input.nextElementSibling;
  if (!rule.regex.test(input.value.trim())) {
    input.classList.add("is-invalid");
    input.classList.remove("is-valid");
    errorDiv.textContent = rule.message;
    return false;
  } else {
    input.classList.remove("is-invalid");
    input.classList.add("is-valid");
    errorDiv.textContent = "";
    return true;
  }
}

// Submit za formu
document.getElementById("myForm").addEventListener("submit", function(e) {
  e.preventDefault();

  let isValid = true;

  // validacija input polja
  validationRules.forEach(rule => {
    const input = document.getElementById(rule.id);
    if(!validateField(input, rule)) isValid = false;
  });

  // Check za radio
  const radio = document.querySelector('input[name="experience"]:checked');
  const radioError = document.querySelector("#radioContainer .errorMsg");
  if(!radio){
    radioError.textContent = "Morate izabrati nivo iskustva.";
    isValid = false;
  } else {
    radioError.textContent = "";
  }

  // check za selekt
  const select = document.getElementById("mountainSelect");
  if(select.value === "0"){
    select.classList.add("is-invalid");
    select.nextElementSibling.textContent = "Morate izabrati planinu.";
    isValid = false;
  } else {
    select.classList.remove("is-invalid");
    select.classList.add("is-valid");
    select.nextElementSibling.textContent = "";
  }

  // Poruka za popunjavanje
  const formMessage = document.getElementById("formMessage");
  if(isValid){
    formMessage.innerHTML = `<div class="successMsg">Hvala na prijavi!</div>`;
    document.getElementById("myForm").reset();
  } else {
    formMessage.innerHTML = `<div class="errorMsg">Niste lepo popunili formu.</div>`;
  }
});







