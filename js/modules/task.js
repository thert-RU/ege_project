export class Task {
    constructor(number_all, number_ege, theme, widget_inner, ans, base_widget, red=false) {
        this.number_ege = number_ege
        this.number_all = number_all
        this.theme = theme
        this.ans = ans
        this.widget = document.createElement('div')
        this.widget.innerHTML = widget_inner
        let ans_widget = document.createElement('div')
        ans_widget.className = 'task-ans'
        ans_widget.innerHTML = `Ответ: ${this.ans}`
        this.widget.className = `container column-flex task task${this.number_ege}-ege task${this.number_all}-all theme-${this.theme}`
        this.widget.querySelector('.task-number-ege').innerHTML = `${this.number_ege}`
        this.widget.querySelector('.task-number-all').innerHTML = `№${this.number_all }`
        this.widget.appendChild(ans_widget)
        this.red = red
        // if (red){
        //     let task_top = this.widget.querySelector('task-top')
        //     let red_group = document.createElement('div')

        // }
        this.widget.style.display = 'none'
        this.base = base_widget
        this.base.appendChild(this.widget)
        
    }

    show(){
        this.widget.style.display = 'flex'
    }
    hide() {
        this.widget.style.display = 'none'
    }
    info() {
        console.log(this.number_all, this.number_ege, this.theme, this.text, this.img_link, this.file_link, this.ans)
    }
}