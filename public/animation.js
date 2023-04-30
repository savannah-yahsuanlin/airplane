const searchBtn = document.getElementById('searchBtn');
const search = document.getElementById('search');

var i = 0;
var message = "search...";
var typeSpeed = 100;

searchBtn.addEventListener('click', () => {
  search.style.width = '80%';
  search.style.paddingLeft = '60px';
  search.style.cursor = 'text';
  search.focus();
});

search.addEventListener('keydown', () => {
  tip.style.visibility = "visible";
  tip.style.opacity = 1;
});