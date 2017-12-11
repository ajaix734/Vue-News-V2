<template>
    <v-app>
        <v-navigation-drawer fixed clipped app v-model="drawer" temporary style="height : 100% , width : 250">
            <v-list dense class="pt-0">
                <v-list-tile v-for="item in items" :key="item.title" @click="changeCategory(item.id)" @click.stop="drawer = !drawer">
                    <v-list-tile-action>
                        <v-icon>{{ item.icon }}</v-icon>
                    </v-list-tile-action>
                    <v-list-tile-content>
                        <v-list-tile-title>{{ item.text }}</v-list-tile-title>
                    </v-list-tile-content>
                </v-list-tile>
            </v-list>
        </v-navigation-drawer>
        <v-toolbar color="red darken-4" dark app clipped-left fixed>
            <!-- :style="$vuetify.breakpoint.smAndUp ? 'width: 300px; min-width: 250px' : 'min-width: 72px'" -->
            <v-toolbar-title class="ml-0 pl-3">
                <v-toolbar-side-icon @click.stop="drawer = !drawer" class="hidden-sm-and-up"></v-toolbar-side-icon>
                <span @click="defaultHome" style="cursor:pointer">Vue Newe</span>
            </v-toolbar-title>
            <div class="d-flex align-center" style="margin-left: auto">
                <v-toolbar-title class="hidden-xs-only">
                    <span>Trending</span>
                    <v-menu :nudge-width="100">
                        <v-btn icon slot="activator" dark>
                            <v-icon dark class="">arrow_drop_down</v-icon>
                        </v-btn>
                        <v-list>
                            <!-- changeCategory(item.id) -->
                            <v-list-tile v-for="item in items" :key="item" @click="changeCategory(item.id)">
                                <v-list-tile-title v-text="item.text"></v-list-tile-title>
                            </v-list-tile>
                        </v-list>
                    </v-menu>
                </v-toolbar-title>
                <v-text-field light solo prepend-icon="search" class="hidden-xs-only" placeholder="Search" style="max-width: 150px; min-width: 100px" v-model="temp" @keypress.enter="changeSearch(temp)"></v-text-field>
                <!-- <v-icon dark>search</v-icon> -->
                <v-text-field class="hidden-sm-and-up" name="input1" id="testing" append-icon="search" style="max-width : 100px" v-model="temp" @keypress.enter="changeSearch(temp)"></v-text-field>
                </v-btn>
            </div>
        </v-toolbar>
        <v-content>
            <!-- <v-parallax src="http://www.androidwallpper.com/wp-content/uploads/2017/02/Elegant-4K-Wallpaper-HD-Wallpapers-Android-wF4f.jpg" height="100%" jumbotron> -->
            <v-container fluid fill-height class="grey lighten-4">
                <v-layout row wrap>
                    <keep-alive>
                        <div v-cloak>
                            <component :is="currentView" :sendprop="id" :search="searchText"></component>
                        </div>
                    </keep-alive>
                </v-layout>
            </v-container>
            <!-- </v-parallax> -->
        </v-content>
        <!-- <v-btn fab bottom right color="pink" dark fixed @click.stop="dialog = !dialog">
            <v-icon>favorite</v-icon>
        </v-btn>
        <v-dialog v-model="dialog" width="800px">
            <v-card>
                <v-card-title class="grey lighten-4 py-4 title">
                    Create contact
                </v-card-title>
                <v-container grid-list-sm class="pa-4">
                    <v-layout row wrap>
                        <v-flex xs12 align-center justify-space-between>
                            <v-layout align-center>
                                <v-avatar size="40px" class="mr-3">
                                    <img src="//ssl.gstatic.com/s2/oz/images/sge/grey_silhouette.png" alt="">
                                </v-avatar>
                                <v-text-field placeholder="Name"></v-text-field>
                            </v-layout>
                        </v-flex>
                        <v-flex xs6>
                            <v-text-field prepend-icon="business" placeholder="Company"></v-text-field>
                        </v-flex>
                        <v-flex xs6>
                            <v-text-field placeholder="Job title"></v-text-field>
                        </v-flex>
                        <v-flex xs12>
                            <v-text-field prepend-icon="mail" placeholder="Email"></v-text-field>
                        </v-flex>
                        <v-flex xs12>
                            <v-text-field type="tel" prepend-icon="phone" placeholder="(000) 000 - 0000" mask="phone"></v-text-field>
                        </v-flex>
                        <v-flex xs12>
                            <v-text-field prepend-icon="notes" placeholder="Notes"></v-text-field>
                        </v-flex>
                    </v-layout>
                </v-container>
                <v-card-actions>
                    <v-btn flat color="primary">More</v-btn>
                    <v-spacer></v-spacer>
                    <v-btn flat color="primary" @click="dialog = false">Cancel</v-btn>
                    <v-btn flat @click="dialog = false">Save</v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog> -->
    </v-app>
</template>

<script>
import DefaultCategory from './components/DefaultCategory.vue'
// import Businesscategory from './components/Businesscategory.vue'
// import Entertainccategory from './components/Entertainccategory.vue'
// import Gamingcategory from './components/Gamingcategory.vue'
// import Healthcategory from './components/Healthcategory.vue'
// import Musiccategory from './components/Musiccategory.vue'
// import Naturecategory from './components/Naturecategory.vue'
// import Politicscategory from './components/Politicscategory.vue'
// import Sportcategory from './components/Sportcategory.vue'
// import Technologycategory from './components/Technologycategory.vue'

import { bus } from './main'
export default {
    data: () => ({
        temp: '',
        searchText: '',
        id: '',
        name: '',
        articles: [],
        currentView: 'defaultcategory',
        dialog: false,
        drawer: null,
        items: [
            { icon: 'business', text: 'Business', id: 'business' },
            { icon: 'weekend', text: 'Entertainment', id: 'entertainment' },
            { icon: 'videogame_asset', text: 'Gaming', id: 'gaming' },
            { icon: 'local_hospital', text: 'Health', id: 'health-and-medical' },
            { icon: 'library_music', text: 'Music', id: 'music' },
            { icon: 'nature_people', text: 'Nature', id: 'science-and-nature' },
            { icon: 'people', text: 'Politics', id: 'politics' },
            { icon: 'directions_bike', text: 'Sports', id: 'sport' },
            { icon: 'favorite', text: 'Technology', id: 'technology' }
        ]
    }),
    components: {
        'defaultcategory': DefaultCategory,
        // 'businesscategory': Businesscategory,
        // 'entertainccategory': Entertainccategory,
        // 'gamingcategory': Gamingcategory,
        // 'healthcategory': Healthcategory,
        // 'musiccategory': Musiccategory,
        // 'naturecategory': Naturecategory,
        // 'politicscategory': Politicscategory,
        // 'sportcategory': Sportcategory,
        // 'technologycategory': Technologycategory
    },
    methods: {
        changeCategory(id) {
            this.id = id
            // if (id === 'business') { this.currentView = 'businesscategory' }
            // else if (id === 'entertainment') { this.currentView = 'entertainccategory' }
            // else if (id === 'gaming') { this.currentView = 'gamingcategory' }
            // else if (id === 'health-and-medical') { this.currentView = 'healthcategory' }
            // else if (id === 'music') { this.currentView = 'musiccategory' }
            // else if (id === 'science-and-nature') { this.currentView = 'naturecategory' }
            // else if (id === 'politics') { this.currentView = 'politicscategory' }
            // else if (id === 'sport') { this.currentView = 'sportcategory' }
            // else { this.currentView = 'technologycategory' }
        },
        defaultHome() {
            this.id = 'defaultsource'
            this.temp = ''
            // },
            // search() {
            //     return this.searchText
            // }
        },
        changeSearch(text) {
            this.searchText = text
        }
    },
    watch: {
        temp() {
            if (this.temp.length == 0) {
                this.searchText = ''
                this.id = this.id
            }
        }
    }
}
</script>

<style>
[v-cloak] {
  display: none;
}
</style>
