<template>
    <v-container fluid>
        <v-layout row wrap>
            <v-flex xs12>
                <span>
                    <h1 class="text-xs-center">Business</h1>
                </span>
            </v-flex>
            <v-flex xs12 sm6 md8 lg8 offset-sm3 offset-md2 offset-lg2 v-for="article in articles" :key="article.publishedAt">
                <v-card class="mb-2" ripple hover>
                    <v-container fluid fill-heigt>
                        <v-layout row wrap fill-height>
                            <v-flex xs12 sm3 md4 lg4>
                                <v-card-media :src="article.urlToImage" style="height : 200px ; display : bock ; margin-left : auto ; margin-right : auto">
                                </v-card-media>
                            </v-flex>
                            <v-flex sm8 md7 lg7>
                                <v-card-title primary-title class="pt-1 ml-2 d-flex">
                                    <div>
                                        <h3 class="headline">{{article.title}}</h3>
                                        <div>{{article.publishedAt}}<br>Found: {{article.description}}</div>
                                    </div>
                                </v-card-title>
                            </v-flex>
                            <v-spacer></v-spacer>
                            <v-flex sm1 md1 lg1>
                                <v-card-actions class="justify-center">
                                    <v-btn icon>
                                        <v-icon>bookmark
                                        </v-icon>
                                    </v-btn>
                                </v-card-actions>
                            </v-flex>
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
    data() {
        return {
            articles: [],
            show: 'false'
        }
    },
    created() {
        this.$http.get('https://newsapi.org/v2/top-headlines?category=business&language=en&apiKey=d59cfaf4b5944cbeab7fdade05c160a7').then(Response => {
            this.articles = Response.data.articles
        })
    }
}
</script>
