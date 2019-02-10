<template>
    <v-card>
        <v-card-title>
            <h2>{{title}}</h2>
        </v-card-title>
        <v-card-text>
            <v-form class="px-3">
                <v-text-field :error="errors.hasOwnProperty('last_name')"
                              :error-messages="errors.last_name"
                              label="Фамилия"
                              v-model="form.last_name"></v-text-field>

                <v-text-field :error="errors.hasOwnProperty('first_name')"
                              :error-messages="errors.first_name"
                              label="Имя"
                              v-model="form.first_name"></v-text-field>

                <v-text-field :error="errors.hasOwnProperty('patronymic')"
                              :error-messages="errors.patronymic"
                              label="Отчество"
                              v-model="form.patronymic"></v-text-field>

                <v-select :error="errors.hasOwnProperty('gender')"
                          :error-messages="errors.gender"
                          clearable
                          :items="genders"
                          label="Пол"
                          v-model="form.gender"></v-select>

                <v-text-field :error="errors.hasOwnProperty('salary')"
                              :error-messages="errors.salary"
                              label="Заработная плата"
                              v-model="form.salary"></v-text-field>

                <v-select :error="errors.hasOwnProperty('departments')"
                          :error-messages="errors.departments"
                          clearable
                          multiple
                          chips
                          :items="departments"
                          item-text="title"
                          item-value="id"
                          label="Отдел"
                          v-model="form.departments"></v-select>
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
        name: "EmployeeForm",

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

        data(){
          return{
              genders: [ //todo normalization table
                  {
                      text: 'Мужской',
                      value: 'male'
                  },
                  {
                      text: 'Женский',
                      value: 'female'
                  }
              ]
          }
        },

        computed: {
            ...mapGetters({
                errors: 'employee/errors',
                departments: 'department/departments'
            })
        },

        methods: {
            handleProcess() {
                this.$emit('process');
            },

            handleBack() {
                this.resetErrors();
                this.$router.push({name: 'employees'})
            },

            ...mapActions({
                fetchDepartments: 'department/fetchDepartments',
                resetErrors: 'employee/resetErrors'
            })
        },

        created(){
            this.fetchDepartments();
        }
    }
</script>

<style scoped>

</style>