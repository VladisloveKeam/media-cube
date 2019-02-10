<template>
    <v-card>
        <v-card-title>
            <v-card-text>
                <h2>Отделы</h2>
            </v-card-text>
        </v-card-title>
        <v-card-text>
            <v-data-table
                    select-all
                    hide-actions
                    v-model="selected"
                    item-key="title"
                    :headers="headers"
                    :loading="loading"
                    :items="departments">
                <template slot="items" slot-scope="props">
                    <td width="50">
                        <v-checkbox v-model="props.selected" primary hide-details></v-checkbox>
                    </td>
                    <td>{{ props.item.title }}</td>
                    <td>{{ props.item.employees_count }}</td>
                    <td>{{ props.item.employees_max_salary }}</td>
                </template>
            </v-data-table>
        </v-card-text>
        <v-card-actions>
            <v-card-text>
                <v-btn color="success" @click="$router.push({name: 'department-add'})">Создать</v-btn>
                <v-btn v-show="hasDepartments"
                       :disabled="isDisabledEditButton"
                       color="primary"
                       @click="handleUpdate()">
                    Редактировать
                </v-btn>
                <v-btn v-show="hasDepartments"
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
        name: "DepartmentIndexPage",

        data() {
            return {
                headers: [
                    {
                        text: 'Название',
                        align: 'left',
                        sortable: false,
                        value: 'title',
                    },
                    {
                        text: 'Количество сотрудников',
                        align: 'left',
                        sortable: false,
                        value: 'employees_count',
                    },
                    {
                        text: 'Максимальная заработная плата',
                        align: 'left',
                        sortable: false,
                        value: 'employees_max_salary',
                    }
                ],
                selected: [],
            }
        },

        computed: {
            isDisabledEditButton() {
                return this.selected.length !== 1;
            },

            isDisabledDeleteButton() {
                return !this.selected.length > 0
            },

            hasDepartments() {
                return this.departments.length > 0;
            },

            ...mapGetters({
                departments: 'department/departments',
                loading: 'department/loading'
            })
        },

        methods: {
            ...mapActions({
                fetchDepartments: 'department/fetchDepartments',
                destroyDepartments: 'department/destroyDepartments',
                showNotificationSuccess: 'notification/showNotification',
                showNotification: 'notification/showNotification'
            }),

            handleUpdate() {
                const id = this.selected[0].id;

                return this.$router.push({name: 'department-edit', params: {id}});
            },

            async handleRemove() {
                const params = {
                    ids: this.selected.map(item => item.id)
                };

                try {
                    await this.destroyDepartments({data: params});
                    await this.fetchDepartments();
                    this.selected = [];
                    this.showNotification({color: 'success', text: 'Отделы были удалены'});
                } catch (e) {
                    this.showNotification({color: 'error', text: e.response.data.error.message});
                }
            }
        },

        created() {
            this.fetchDepartments();
        }
    }
</script>

<style scoped>

</style>