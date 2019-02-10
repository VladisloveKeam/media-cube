<template>
    <v-card>
        <v-card-title>
            <v-card-text>
                <h2>Сетка</h2>
            </v-card-text>
        </v-card-title>
        <v-card-text>
            <v-data-table
                    hide-actions
                    :headers="departments"
                    header-key="id"
                    header-text="title"
                    :items="employees">
                <template slot="headers" slot-scope="props">
                    <tr>
                        <th></th>
                        <th v-for="department in props.headers">
                            {{department.title}}
                        </th>
                    </tr>
                </template>
                <template slot="items" slot-scope="props">
                    <td>{{ `${props.item.first_name} ${props.item.last_name}`}}</td>
                    <template v-for="department in departments">
                        <td align="center"
                            v-html="departmentExistEmployee(department.employees, props.item.id)"></td>
                    </template>
                </template>
            </v-data-table>
        </v-card-text>
    </v-card>
</template>

<script>
    import {mapActions, mapGetters} from 'vuex';

    export default {
        name: "GridPage",

        computed: {
            ...mapGetters({
                employees: 'employee/employees',
                departments: 'department/departments',
            })
        },

        methods: {
            ...mapActions({
                fetchEmployees: 'employee/fetchEmployees',
                fetchDepartments: 'department/fetchDepartments',
            }),

            departmentExistEmployee(departmentEmployees, employeeId) {
                return departmentEmployees.filter(item => item.id === employeeId).length > 0 ? '&#10004;' : '';
            }
        },


        created() {
            this.fetchEmployees();
            this.fetchDepartments();
        }
    }
</script>

<style scoped>

</style>