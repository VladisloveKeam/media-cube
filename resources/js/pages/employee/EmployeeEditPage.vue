<template>
    <EmployeeForm :form="form" title="Редактирование сотрудника" @process="handleUpdate()"/>
</template>

<script>
    import {mapGetters, mapActions} from 'vuex';

    import EmployeeForm from  '@/js/components/forms/EmployeeForm';
    import Employee from "../../models/employee/employee";

    export default {
        name: "EmployeeEditPage",

        data() {
            return {
                form: new Employee()
            }
        },

        props: ['id'],

        components: {
            EmployeeForm
        },

        computed: {
            ...mapGetters({
                employee: 'employee/employee'
            })
        },

        methods: {
            handleUpdate() {
                const form = Object.assign({}, this.form, {id:this.id});

                this.updateEmployee(form).then(() => {
                    this.$router.push({name: 'employees'});
                    this.showNotificationSuccess();
                }).catch(() => {
                    this.showNotificationError();
                });
            },

            ...mapActions({
                fetchEmployee: 'employee/fetchEmployee',
                updateEmployee: 'employee/updateEmployee',
                showNotificationError: 'notification/showNotificationError',
                showNotificationSuccess: 'notification/showNotificationSuccess'
            })
        },

        created(){
            this.fetchEmployee({id:this.id}).then(() => {
                this.form = Object.assign(this.form, this.employee);
                this.form.departments = this.form.departments.map(item => item.id);
            }).catch(e => {
                this.$router.push({name: 'notfound'});
            });
        }
    }
</script>

<style scoped>

</style>