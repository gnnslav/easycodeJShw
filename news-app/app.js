// Custom Http Module
const http = {
  get: async function (url) {
    try {
      const response = await fetch(url);
      const data = await response.json();
      removeLoader();
      return data;
    } catch (err) {
      throw new Error('error' + response.statusText);
    }
  },
  delPost: async function (id) {
    try {
      const response = await fetch(url + "/" + id);
      const data = await response.json();
      return data;
    } catch (err) {
      throw new Error('error' + response.statusText);
    }
  },
  postPost: async function (data) {
    try {
      const response = await fetch(url, {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
          "Content-type": "application/json; charset=UTF-8"
        }
      });
      const json = await response.json();
      return json;
    } catch (err) {
      throw new Error('error' + response.statusText);
    }
  },
  putPost: async function (id, data) {
    try {
      const response = await fetch(url + "/" + id, {
        method: "PUT",
        body: JSON.stringify(data),
        headers: {
          "Content-type": "application/json; charset=UTF-8"
        }
      });
      const json = await response.json();
      return json;
    } catch (err) {
      throw new Error('error' + response.statusText);
    }
  }
};

const newsService = (function () {
  const apiKey = '0623cb4470244103bdbd5ead23c1094f';
  const apiUrl = 'https://newsapi.org/v2';

  return {
    topHeadlines(country, category) {
      const url = `${apiUrl}/top-headlines?country=${country}&category=${category}&apiKey=${apiKey}`;
      http.get(url).then(news => renderNews(news.articles));
    },
    everything(query) {
      url = `${apiUrl}/everything?q=${query}&apiKey=${apiKey}`;
      http.get(url).then(news => {
        if (!news.articles.length) {
          showMsg('Ничего не найдено');
          return;
        }
        renderNews(news.articles);
      });
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
    newsService.topHeadlines(country, category);
  } else {
    newsService.everything(searchNews);
  }

}

function renderNews(news) {
  const conteinerNews = document.querySelector('.grid-container');
  if (conteinerNews.children.length) {
    conteinerNews.innerHTML = '';
  }
  let div = '';
  news.forEach((item) => {
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