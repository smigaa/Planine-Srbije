// footer 
const footerLinks = [
  {
    name: "Dokumentacija",
    url: "dokumentacija.pdf",
    icon: "fa-solid fa-sitemap"
  },
  {
    name: "Sitemap (XML)",
    url: "sitemap.xml",
    icon: "fa-solid fa-file"
  },
  {
    name:"Instagram",
    url:"index.html",
    icon:"fab fa-instagram"
  },
{
  name:"Facebook",
  url:"index.html",
  icon:"fab fa-facebook"
}
];

function createFooter() {
  const footer = document.getElementById("mainFooter");

  footer.className = "text-center py-4";

  let linksHTML = footerLinks.map(link => `
      <a href="${link.url}" class="text-white mx-3 text-decoration-none">
        <i class="${link.icon}"></i> ${link.name}
      </a>
  `).join("");

  footer.innerHTML = `
    <div class="container">
      <div class="mb-3">
        ${linksHTML}
      </div>
      <p class="mb-0">© 2026 Planinarenje u Srbiji. Sva prava zadržana.</p>
    </div>
  `;
}
window.onload = function(){
    createFooter();
};