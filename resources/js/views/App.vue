<template>
    <v-app>
        <v-navigation-drawer app fixed clipped>
            <v-list>
                <v-list-tile v-for="page in pages" :key="page.name" :to="page.route">
                    <v-list-tile-action>
                        <v-icon>{{page.icon}}</v-icon>
                    </v-list-tile-action>
                    <v-list-tile-content>
                        <v-list-tile-title>{{page.name}}</v-list-tile-title>
                    </v-list-tile-content>
                </v-list-tile>
            </v-list>
        </v-navigation-drawer>

        <v-toolbar app fixed clipped-left>
            <v-toolbar-title>
                MediaCube
            </v-toolbar-title>
        </v-toolbar>

        <v-content>
            <v-fade-transition mode="out-in">
                <router-view></router-view>
            </v-fade-transition>
        </v-content>

        <v-snackbar top v-model="notification.enabled" :color="notification.color" :timeout="notification.timeout">
            {{ notification.text }}
        </v-snackbar>
    </v-app>
</template>

<script>
    import {mapGetters, mapActions} from 'vuex';

    export default {
        name: "App",

        data() {
            return {
                pages: [
                    {
                        name: 'Отделы',
                        route: {path: '/departments'},
                        icon: 'group'
                    },

                    {
                        name: 'Сотрудники',
                        route: {path: '/employees'},
                        icon: 'person'
                    },

                    {
                        name: 'Сетка',
                        route: {path: '/grid'},
                        icon: 'group_work'
                    }
                ]
            }
        },

        computed: {
            ...mapGetters({
                notification: 'notification/notification'
            })
        },
    }
</script>

<style scoped>

</style>