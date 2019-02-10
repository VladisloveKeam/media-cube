export default class Department {
    constructor(data = null){
        this.id = null;
        this.title = null;
        this.employees_count = null;
        this.employees_max_salary = null;

        if(data){
            Object.assign(this, data);
        }
    }
}