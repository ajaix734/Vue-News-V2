<template>
    <v-container fluid v-cloak>
        <v-layout row wrap>
            <v-flex xs12 v-if="categoryShow" v-cloak>
                <span>
                    <h1 class="text-xs-center mb-3">{{displayCategory}}</h1>
                </span>
            </v-flex>
            <v-flex xs12 v-if="show" v-cloak>
                <span>
                    <h1 class="grey--text mb-3">Found {{categoryCount}} articles for "{{search}}"
                    </h1>
                </span>
            </v-flex>
            <v-flex xs12 sm8 md8 lg8 offset-sm2 offset-md2 offset-lg2 v-for="article in articles" :key="article.publishedAt">
                <v-card class="mb-2" hover>
                    <v-container fluname fill-heigt>
                        <v-layout row wrap fill-height>
                            <v-flex xs12 sm12 md4 lg4>
                                <a :href="article.url " target="_blank " style="text-decoration: none ">
                                    <v-card-media :src="article.urlToImage" style="height : 200px ; display : bock ; margin-left : auto ; margin-right : auto">
                                    </v-card-media>
                                </a>
                            </v-flex>
                            <v-flex md8 lg8>
                                <v-card-title primary-title class="pt-1 ml-2 d-flex">
                                    <div>
                                        <a :href="article.url " target="_blank " style="text-decoration: none ">
                                            <h3 class="headline">{{article.title}}</h3>
                                        </a>
                                        <div class="d-inline-flex">{{article.description}}<br><br><br>{{article.publishedAt | dateFilter}} hour(s) ago...</div>
                                    </div>
                                </v-card-title>
                            </v-flex>
                            <!-- <v-spacer></v-spacer>
                            <v-flex sm1 md1 lg1>
                                <v-card-actions class="justify-center">
                                    <v-btn icon>
                                        <v-icon>bookmark
                                        </v-icon>
                                    </v-btn>
                                </v-card-actions>
                            </v-flex> -->
                        </v-layout>
                    </v-container>
                </v-card>
            </v-flex>
        </v-layout>
    </v-container>
</template>

<script>
import { bus } from '../main'
export default {
    props: ['sendprop', 'search'],
    data() {
        return {
            show: false,
            categoryShow: true,
            displayCategory: '',
            articles: []
        }
    },
    created() {
        if (sessionStorage.getItem('categoryId')) {
            NProgress.start()
            let sessionItems = JSON.parse(sessionStorage.getItem('categoryId'))
            this.$http.get(`https://newsapi.org/v2/top-headlines?category=${sessionItems.id}&language=en&apiKey=d59cfaf4b5944cbeab7fdade05c160a7`).then(Response => {
                this.articles = Response.data.articles
                this.displayCategory = sessionItems.name
            })
            NProgress.done()
            NProgress.remove()
        }
        else {
            NProgress.start()
            this.$http.get('https://newsapi.org/v2/top-headlines?sources=google-news-in,the-times-of-india,the-hindu&language=en&apiKey=d59cfaf4b5944cbeab7fdade05c160a7').then(Response => {
                this.articles = Response.data.articles
                this.displayCategory = 'General'
            })
            NProgress.done()
            NProgress.remove()
        }

    },
    watch: {
        sendprop() {
            if (this.sendprop != 'defaultsource') {
                NProgress.start()
                this.$http.get(`https://newsapi.org/v2/top-headlines?category=${this.sendprop}&language=en&apiKey=d59cfaf4b5944cbeab7fdade05c160a7`).then(Response => {
                    this.articles = _.uniqBy(Response.data.articles, 'title', 'publishedAt');
                    if (this.sendprop === 'business') { this.displayCategory = 'Business' }
                    else if (this.sendprop === 'entertainment') { this.displayCategory = 'Entertainment' }
                    else if (this.sendprop === 'gaming') { this.displayCategory = 'Gaming' }
                    else if (this.sendprop === 'health-and-medical') { this.displayCategory = 'Health' }
                    else if (this.sendprop === 'music') { this.displayCategory = 'Music' }
                    else if (this.sendprop === 'science-and-nature') { this.displayCategory = 'Nature' }
                    else if (this.sendprop === 'politics') { this.displayCategory = 'Politics' }
                    else if (this.sendprop === 'sport') { this.displayCategory = 'Sports' }
                    else { this.displayCategory = 'Technology' }
                    NProgress.done()
                    NProgress.remove()
                    sessionStorage.setItem('categoryId', JSON.stringify({ id: this.sendprop, name: this.displayCategory }))
                })

            }
            else {
                NProgress.start()
                this.$http.get('https://newsapi.org/v2/top-headlines?sources=google-news-in,the-times-of-india,the-hindu&language=en&apiKey=d59cfaf4b5944cbeab7fdade05c160a7').then(Response => {
                    this.articles = _.uniqBy(Response.data.articles, 'title', 'publishedAt');
                    this.displayCategory = 'General'
                    sessionStorage.removeItem('categoryId')
                    NProgress.done()
                    NProgress.remove()
                })
            }
        },
        search() {
            if (this.search.length === 0) {
                if (sessionStorage.getItem('categoryId')) {
                    NProgress.start()
                    let sessionItems = JSON.parse(sessionStorage.getItem('categoryId'))
                    this.$http.get(`https://newsapi.org/v2/top-headlines?category=${sessionItems.id}&language=en&apiKey=d59cfaf4b5944cbeab7fdade05c160a7`).then(Response => {
                        this.articles = Response.data.articles
                        this.displayCategory = sessionItems.name
                        this.show = false
                        this.categoryShow = true
                        NProgress.done()
                        NProgress.remove()
                    })
                }
                else {
                    NProgress.start()
                    this.$http.get('https://newsapi.org/v2/top-headlines?sources=google-news-in,the-times-of-india,the-hindu&language=en&apiKey=d59cfaf4b5944cbeab7fdade05c160a7').then(Response => {
                        this.articles = _.uniqBy(Response.data.articles, 'title', 'publishedAt');
                        this.displayCategory = 'General'
                        this.show = false
                        this.categoryShow = true
                        sessionStorage.removeItem('categoryId')
                        NProgress.done()
                        NProgress.remove()
                    })
                }
            }
            else {
                NProgress.start()
                this.$http.get(`https://newsapi.org/v2/everything?q=${this.search}&language=en&apiKey=d59cfaf4b5944cbeab7fdade05c160a7`).then(Response => {
                    this.articles = _.uniqBy(Response.data.articles, 'title', 'publishedAt');
                    this.show = true
                    this.categoryShow = false
                })
                NProgress.done()
                NProgress.remove()
            }

        }
    },
    computed: {
        categoryCount() {
            let count = 0
            for (let article of this.articles) {
                count++
            }
            return count
        }
    },
    filters: {
        dateFilter(date) {
            let d = new Date(date)
            if (date == null) {
                return 1
            }
            else {
                return d.getUTCHours()
            }
        }
    }
}
</script>

<style>
[v-cloak] {
  display: none;
}
#nprogress .bar {
  background: #ffffff;

  position: fixed;
  z-index: 1031;
  top: 0;
  left: 0;

  width: 100%;
  height: 2px;
}
</style>

