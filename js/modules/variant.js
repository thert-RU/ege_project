
export class Variant{
    constructor(widget, tasks_list, name=0){
        this.widget = widget
        this.tasks = tasks_list
        this.name = name
    }
    show(){
        for (let i of this.tasks){
            this.widget.appendChild(i.widget)
            i.show()
        }
    }
    async getVariantBase(){
        
    }
}