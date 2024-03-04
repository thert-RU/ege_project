import {Task} from './task.js'

export class Base {
    constructor(base_widget=document.createElement('div'), select=document.createElement('div'), select_text=document.createElement('div'), inner=document.createElement('div'), red=false) {
        this.base = base_widget
        this.select = select
        this.select_text = select_text
        this.inner = inner
        this.red = red
    }
    async main(url, do_funcs=true){
    await fetch(url)
     .then(response => response.json())
     .then(data_json => {
        // Добавляем результат в глобальную переменную
        this.data = data_json
        let list = this.getTasksAndThemesList(this.data['tasks'])
        this.tasks_list = list[0]
        this.themes_list = list[1]
        console.log(this.tasks_list, this.themes_list)
        
        this.setSelectText(this.select, this.select_text, this.inner)
        if (do_funcs){
            for(let i of this.tasks_list){
                i.show()
            }
        }

        window.tasks = this.tasks_list
        window.themes = this.themes_list
    })
    .catch(error => console.error(error))
    }
    getTasksAndThemesList(tasks_data){
      let tasks = [];
      let themes = []
      for (let i in tasks_data) {
        let task_data = tasks_data[i];
        let task_theme = task_data['theme']

        let widget = document.createElement('div')
        widget.innerHTML = task_data.widget
        let task_info = widget.querySelector('.task-info')
        let count = 0
        for (let child of task_info.children)     {
            if (child.className.includes('task-img')){
                child.src=task_data['sources'][count]
                count++
            }
            if (child.className.includes('task-file')){
                child.href=task_data['sources'][count]
                count++
            }
        }   
        task_data['widget'] = widget.innerHTML
    
        let task = new Task(
          i,
          task_data['number_ege'],
          task_theme,
          task_data['widget'],
          task_data["ans"],
          this.base,
          this.red
        );
        tasks.push(task);
        if (themes.indexOf(task_theme) == -1) {
            themes.push(task_theme)
        }
    }
      return [tasks, themes]
    }
    setSelectText (select, select_text, inner){
        select_text.innerHTML = `${this.themes_list[0]}`
        console.log(select)
        inner.style.backgroundColor = 'azure'
        for (let i of this.themes_list) {
        // for(let i = 0; i<100; i++){
            let p = document.createElement('p')
            p.innerHTML = i
            p.className = 'inner-text'
            p.addEventListener('click', ()=>{
                select_text.innerHTML = p.innerHTML
                inner.style.display = 'none'
            })
            inner.appendChild(p)
        }
        
    }
    showTasks(tasks){
        for (let i of tasks) {
            i.show()
        }
    }
    getTasksWithOneTheme(tasks, theme){
        list = []
        for (let i of tasks) {
            if (theme == i.theme) {
                list.push(i)
            }
        }
        return list
    }
    getTaskByNumber(tasks, number){
        list = []
        for (let i of tasks) {
            if (number == i.number_all) {
                list.push(i)
            }
        }
        return list
    }
}