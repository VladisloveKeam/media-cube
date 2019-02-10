import Vue from "vue";
import VueRouter from "vue-router";

import NotFoundPage from '@/js/pages/NotFoundPage';

import GridPage from '@/js/pages/GridPage';

import DepartmentIndexPage from '@/js/pages/department/DepartmentIndexPage';
import DepartmentCreatePage from '@/js/pages/department/DepartmentCreatePage';
import DepartmentEditPage from '@/js/pages/department/DepartmentEditPage';

import EmployeeIndexPage from '@/js/pages/employee/EmployeeIndexPage';
import EmployeeCreatePage from '@/js/pages/employee/EmployeeCreatePage';
import EmployeeEditPage from '@/js/pages/employee/EmployeeEditPage';

Vue.use(VueRouter);

const departmentRoutes = [
    {
        path: '/departments',
        name: 'departments',
        component: DepartmentIndexPage,
    },
    {
        path: '/departments/add',
        name: 'department-add',
        component: DepartmentCreatePage,
    },
    {
        path: '/departments/:id/edit',
        name: 'department-edit',
        component: DepartmentEditPage,
        props: true
    },
];

const employeeRoutes = [
    {
        path: '/employees',
        name: 'employees',
        component: EmployeeIndexPage
    },
    {
        path: '/employees/add',
        name: 'employee-add',
        component: EmployeeCreatePage
    },
    {
        path: '/employees/:id/edit',
        name: 'employee-edit',
        component: EmployeeEditPage,
        props: true
    },
];

const additionalRoutes = [
    {
      path: '/grid',
      name: 'grid',
      component: GridPage
    },

    {
        path: '*',
        name: 'notfound',
        component: NotFoundPage
    },
];

const router = new VueRouter({
    mode: 'history',
    routes: [ ...departmentRoutes,...employeeRoutes, ...additionalRoutes]
});

export default router;