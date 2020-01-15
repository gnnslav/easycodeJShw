// Custom Http Module
function customHttp() {
  return {
    get(url, cb) {
      try {
        const xhr = new XMLHttpRequest();
        xhr.open('GET', url);
        xhr.addEventListener('load', () => {
          if (Math.floor(xhr.status / 100) !== 2) {
            cb(`Error. Status code: ${xhr.status}`, xhr);
            return;
          }
          const response = JSON.parse(xhr.responseText);
          cb(null, response);
        });

        xhr.addEventListener('error', () => {
          cb(`Error. Status code: ${xhr.status}`, xhr);
        });

        xhr.send();
      } catch (error) {
        cb(error);
      }
    },
    post(url, body, headers, cb) {
      try {
        const xhr = new XMLHttpRequest();
        xhr.open('POST', url);
        xhr.addEventListener('load', () => {
          if (Math.floor(xhr.status / 100) !== 2) {
            cb(`Error. Status code: ${xhr.status}`, xhr);
            return;
          }
          const response = JSON.parse(xhr.responseText);
          cb(null, response);
        });

        xhr.addEventListener('error', () => {
          cb(`Error. Status code: ${xhr.status}`, xhr);
        });

        if (headers) {
          Object.entries(headers).forEach(([key, value]) => {
            xhr.setRequestHeader(key, value);
          });
        }

        xhr.send(JSON.stringify(body));
      } catch (error) {
        cb(error);
      }
    },
  };
}
// Init http module
const http = customHttp();

const newsService = (function () {
  const apiKey = '0623cb4470244103bdbd5ead23c1094f';
  const apiUrl = 'https://newsapi.org/v2';

  return {
    topHeadlines(country, category, cb) {
      http.get(`${apiUrl}/top-headlines?country=${country}&category=${category}&apiKey=${apiKey}`, cb);
    },
    everything(query, cb) {
      http.get(`${apiUrl}/everything?q=${query}&apiKey=${apiKey}`, cb);
    }
  };
})();

//  init selects

document.addEventListener('DOMContentLoaded', function () {
  M.AutoInit();
  loadNews();
});

const form = document.forms.newsControls;
const selectCountry = form.elements.country;
const selectCategory = form.elements.category;
const inputSearch = form.elements.search;

form.addEventListener("submit", onFormSubmit);

function onFormSubmit(e) {
  e.preventDefault();
  loadNews();
  form.reset();
}

function loadNews() {
  showLoader();
  const country = selectCountry.value;
  const category = selectCategory.value;
  const searchNews = inputSearch.value;
  if (!searchNews) {
    newsService.topHeadlines(country, category, onGetResponse);
  } else {
    newsService.everything(searchNews, onGetResponse);
  }

}

function onGetResponse(err, res) {
  removeLoader();
  if (err) {
    showMsg(err, 'msg');
    return;
  }
  if (!res.articles.length) {
    showMsg('Ничего не найдено');
    return;
  }
  renderNews(res.articles);
}

function renderNews(news) {
  const conteinerNews = document.querySelector('.grid-container');
  if (conteinerNews.children.length) {
    conteinerNews.innerHTML = '';
  }
  let div = '';
  news.forEach((item) => {
    console.log(item);
    div += templateOneNews(item);
  });
  conteinerNews.insertAdjacentHTML('afterbegin', div);
}

function templateOneNews({
  urlToImage,
  title,
  description,
  url
}) {
  return `
  <div class="row">
  <div class="col s12 m12">
    <div class="card blue-grey darken-1">
      <div class="card-content white-text">
        <img src="${urlToImage || ''}" alt="" class="responsive-img">
        <span class="card-title">${title || ''}</span>
        <p>${description || ''}</p>
      </div>
      <div class="card-action">
        <a href="${url}">This is a link</a>
      </div>
    </div>
  </div>
</div>
  `;
}

function showMsg(msg, type = 'success') {
  M.toast({
    html: msg,
    classes: type
  });
}

function showLoader() {
  document.body.insertAdjacentHTML('afterbegin', `<div class="progress">
                                                    <div class="indeterminate"></div>
                                                  </div>`);
}

function removeLoader() {
  const loader = document.querySelector('.progress');
  if (loader) {
    loader.remove();
  }
}