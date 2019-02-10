export default class Employee {
    constructor(data = null){
        this.id = null;
        this.first_name = null;
        this.last_name = null;
        this.patronymic = null;
        this.gender = null;
        this.salary = null;
        this.departments = [];

        if(data){
            Object.assign(this, data);
        }
    }
}