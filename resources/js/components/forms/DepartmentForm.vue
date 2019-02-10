<template>
    <v-card>
        <v-card-title>
            <h2>{{title}}</h2>
        </v-card-title>
        <v-card-text>
            <v-form class="px-3">
                <v-text-field :error="errors.hasOwnProperty('title')" :error-messages="errors.title" label="Название"
                              v-model="form.title"></v-text-field>
            </v-form>
        </v-card-text>
        <v-card-actions>
            <v-card-text>
                <v-btn color="success" @click="handleProcess()">Сохранить</v-btn>
                <v-btn color="primary" @click="handleBack()">Отмена</v-btn>
            </v-card-text>
        </v-card-actions>
    </v-card>
</template>

<script>
    import {mapGetters, mapActions} from 'vuex';

    export default {
        name: "DeparmentForm",

        props: {
            title: {
                type: String,
                required: true
            },
            form: {
                type: Object,
                required: true
            },

        },

        computed: {
            ...mapGetters({
                errors: 'department/errors'
            })
        },

        methods: {
            handleProcess() {
                this.$emit('process');
            },

            handleBack(){
                this.resetErrors();
                this.$router.push({name: 'departments'})
            },

            ...mapActions({
                resetErrors: 'department/resetErrors'
            })
        },
    }
</script>

<style scoped>

</style>