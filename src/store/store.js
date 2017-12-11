import Vue from "vue";
import Vuex from "vuex";
import VueResource from 'vue-resource'
Vue.use(VueResource)
Vue.use(Vuex)

const store = new Vuex.Store({
    state: {
        sources: [],
        articles: []
    },
    actions: {
        getSources({ commit }) {
            Vue.http.get('https://newsapi.org/v2/sources?apiKey=d59cfaf4b5944cbeab7fdade05c160a7').then(Response => commit('addSources', Response.data.sources))
        },
        getCarouselHeadlines({ commit }) {
            Vue.http.get('https://newsapi.org/v2/top-headlines?sources=google-news-in&apiKey=d59cfaf4b5944cbeab7fdade05c160a7').then(Response => commit('addArticles', Response.data.articles))
        },
        getCategoryHeadlines({ commit }, id) {
            vue.http.get(`https://newsapi.org/v2/top-headlines?category=${id}&apiKey=d59cfaf4b5944cbeab7fdade05c160a7`).then(Response => commit('addArticles', Response.data.articles))
        }
    },
    mutations: {
        addSources(state, data) {
            state.sources = data
        },
        addArticles(state, data) {
            state.articles = data
        }
    },
    getters: {
        sourceGetter: state => {
            return state.sources
        },
        articleGetter: state => {
            return state.articles
        }
    }
});

export default store;