<template>
    <DepartmentForm :form="form" title="Создание отдела" @process="handleCreate()"/>
</template>

<script>
    import Department from "../../models/department/department";
    import {mapActions} from 'vuex';

    import DepartmentForm from  '@/js/components/forms/DepartmentForm';

    export default {
        name: "DepartmentCreatePage",

        data() {
            return {
                form: new Department()
            }
        },

        components:{
            DepartmentForm
        },

        methods: {
            handleCreate() {
                this.storeDepartment(this.form).then(() => {
                    this.$router.push({name: 'departments'});
                    this.showNotificationSuccess();
                }).catch(() => {
                    this.showNotification();
                });
            },

            ...mapActions({
                storeDepartment: 'department/storeDepartment',
                showNotificationError: 'notification/showNotificationError',
                showNotificationSuccess: 'notification/showNotificationSuccess'
            })
        }
    }
</script>

<style scoped>

</style>