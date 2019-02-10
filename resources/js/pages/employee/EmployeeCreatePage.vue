<template>
    <EmployeeForm :form="form" title="Создание сотрудника" @process="handleCreate()"/>
</template>

<script>
    import Employee from "../../models/employee/employee";
    import {mapActions} from 'vuex';

    import EmployeeForm from  '@/js/components/forms/EmployeeForm';

    export default {
        name: "EmployeeCreatePage",

        data() {
            return {
                form: new Employee()
            }
        },

        components:{
            EmployeeForm
        },

        methods: {
            handleCreate() {
                this.storeEmployee(this.form).then(() => {
                    this.$router.push({name: 'employees'});
                    this.showNotificationSuccess();
                }).catch(() => {
                    this.showNotificationError();
                });
            },

            ...mapActions({
                storeEmployee: 'employee/storeEmployee',
                showNotificationError: 'notification/showNotificationError',
                showNotificationSuccess: 'notification/showNotificationSuccess'
            })
        }
    }
</script>

<style scoped>

</style>