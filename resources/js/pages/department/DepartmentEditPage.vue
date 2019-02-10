<template>
    <DepartmentForm :form="form" title="Редактирование отдела" @process="handleUpdate()"/>
</template>

<script>
    import Department from "../../models/department/department";
    import {mapGetters, mapActions} from 'vuex';

    import DepartmentForm from  '@/js/components/forms/DepartmentForm';

    export default {
        name: "DepartmentEditPage",

        data() {
            return {
                form: new Department()
            }
        },

        props: ['id'],

        components: {
            DepartmentForm
        },

        computed: {
            ...mapGetters({
                department: 'department/department'
            })
        },

        methods: {
            handleUpdate() {
                const form = Object.assign({}, this.form, {id:this.id});

                this.updateDepartment(form).then(() => {
                    this.$router.push({name: 'departments'});
                    this.showNotificationSuccess();
                }).catch(() => {
                    this.showNotificationError();
                });
            },

            ...mapActions({
                fetchDepartment: 'department/fetchDepartment',
                updateDepartment: 'department/updateDepartment',
                showNotificationError: 'notification/showNotificationError',
                showNotificationSuccess: 'notification/showNotificationSuccess'
            })
        },

        created(){
            this.fetchDepartment({id:this.id}).then(() => {
                this.form = Object.assign(this.form, this.department);
            }).catch(e => {
                this.$router.push({name: 'notfound'});
            });
        }
    }
</script>

<style scoped>

</style>