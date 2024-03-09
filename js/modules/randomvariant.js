import { Base } from "./base.js"

export class RandomVariant{
    constructor(widget, tasks=[], name=0){
        this.tasks_list = tasks
        this.widget = widget
    }
    async main(url=''){
        if (this.tasks_list == [] | url != ''){
            this.tasks_list = await this.createFictiveBase(url)
            // console.log(url)
        }
        
        this.tasks_list = this.shuffle(this.tasks_list)
        this.variant_tasks_list = this.getVariantTasksList(this.tasks_list)
        for (let i of this.variant_tasks_list){
            this.widget.appendChild(i.widget)
            // console.log(i.number_all)
        }
    }
    async createFictiveBase(url) {
        let fictive_base = new Base(document.createElement('div'))
        await fictive_base.main(url)
        return window.tasks
        
    }
    getVariantTasksList(tasks_list){
        let new_list = []
        let task_num = 0
        outer: while(task_num < 27){
            task_num += 1
            inner: for (let task of tasks_list){
                if (task.number_ege == task_num){
                    // console.log(task.number_ege)
                    new_list.push(task)
                    break inner
                }
            }
        }
        return new_list
    }
    getTaskslist(tasks_dict){
        let tasks_list = []
        for (let i in tasks_dict){
            tasks_list.push(tasks_dict[i])
        }
        return tasks_list
    }
    shuffle(list){
        let new_list = []
        let a = list.length

        for (let i = a; i>0; i--){
            let index = parseInt(Math.random()*i)
            new_list.push(list[index])
            list.splice(index, 1)
        }
        return new_list
    }
}