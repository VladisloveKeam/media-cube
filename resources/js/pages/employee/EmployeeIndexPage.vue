<template>
    <v-card>
        <v-card-title>
            <v-card-text>
                <h2>Сотрудники</h2>
            </v-card-text>
        </v-card-title>
        <v-card-text>
            <v-data-table
                    select-all
                    hide-actions
                    v-model="selected"
                    :headers="headers"
                    :loading="loading"
                    :items="employees">
                <template slot="items" slot-scope="props">
                    <td>
                        <v-checkbox v-model="props.selected" primary hide-details></v-checkbox>
                    </td>
                    <td>{{ props.item.last_name }}</td>
                    <td>{{ props.item.first_name }}</td>
                    <td>{{ props.item.patronymic | isset }}</td>
                    <td>{{ props.item.gender | gender }}</td>
                    <td>{{ props.item.salary |isset }}</td>
                    <td>
                        <span v-for="department in props.item.departments" :key="department.id">
                             <v-chip>{{department.title}}</v-chip>
                        </span>
                    </td>
                </template>
            </v-data-table>
        </v-card-text>
        <v-card-actions>
            <v-card-text>
                <v-btn color="success" @click="$router.push({name: 'employee-add'})">Создать</v-btn>
                <v-btn v-show="hasEmployees"
                       :disabled="isDisabledEditButton"
                       color="primary"
                       @click="handleUpdate()">
                    Редактировать
                </v-btn>
                <v-btn v-show="hasEmployees"
                       :disabled="isDisabledDeleteButton"
                       color="error" @click="handleRemove()">
                    Удалить
                </v-btn>
            </v-card-text>
        </v-card-actions>
    </v-card>
</template>

<script>
    import {mapActions, mapGetters} from 'vuex';

    export default {
        name: "EmployeeIndexPage",

        data() {
            return {
                headers: [
                    {
                        text: 'Фамилия',
                        align: 'left',
                        sortable: false,
                        value: 'last_name',
                    },
                    {
                        text: 'Имя',
                        align: 'left',
                        sortable: false,
                        value: 'first_name',
                    },
                    {
                        text: 'Отчество',
                        align: 'left',
                        sortable: false,
                        value: 'patronymic',
                    },
                    {
                        text: 'Пол',
                        align: 'left',
                        sortable: false,
                        value: 'gender',
                    },
                    {
                        text: 'Заработная плата',
                        align: 'left',
                        sortable: false,
                        value: 'salary',
                    },
                    {
                        text: 'Отделы',
                        align: 'left',
                        sortable: false,
                        value: 'departments',
                    },
                ],
                selected: [],
            }
        },

        filters: {
            isset(value) {
                if (!value) {
                    return "—";
                }
                return value;
            },

            gender(value){
                switch (value) {
                    case 'male':
                        return 'Мужской';
                    case 'female':
                        return 'Женский';
                    default:
                        return "—";
                }
            }
        },

        computed: {
            isDisabledEditButton() {
                return this.selected.length !== 1;
            },

            isDisabledDeleteButton() {
                return !this.selected.length > 0
            },

            hasEmployees() {
                return this.employees.length > 0;
            },

            ...mapGetters({
                employees: 'employee/employees',
                loading: 'employee/loading'
            })
        },

        methods: {
            ...mapActions({
                fetchEmployees: 'employee/fetchEmployees',
                destroyEmployees: 'employee/destroyEmployees',
                showNotification: 'notification/showNotification',
                showNotificationError: 'notification/showNotificationError'
            }),

            handleUpdate() {
                const id = this.selected[0].id;
                return this.$router.push({name: 'employee-edit', params: {id}});
            },

            async handleRemove() {
                const params = {
                    ids: this.selected.map(item => item.id)
                };

                try {
                    await this.destroyEmployees({data: params});
                    await this.fetchEmployees();
                    this.selected = [];
                    this.showNotification({color: 'success', text: 'Сотрудники были удалены'});
                } catch (e) {
                    this.showNotificationError();
                }
            }
        },

        created() {
            this.fetchEmployees();
        }
    }
</script>

<style scoped>

</style>