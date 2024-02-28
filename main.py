import os, json
from flask import request, session, Flask, url_for, render_template, redirect, flash
from werkzeug.utils import secure_filename

UPLOAD_FOLDER = f'{os.getcwd().replace("\\", "/")}/img'
ALLOWED_EXTENSIONS = {'txt', 'pdf', 'png', 'jpg', 'jpeg', 'gif', 'xml', 'xmls', 'csv', 'doc', 'docx'}

class App(Flask):
    def __init__(self, import_name: str, static_url_path: str | None = None, static_folder: str | os.PathLike | None = "static", static_host: str | None = None, host_matching: bool = False, subdomain_matching: bool = False, template_folder: str | os.PathLike | None = "templates", instance_path: str | None = None, instance_relative_config: bool = False, root_path: str | None = None):
        super().__init__(import_name, static_url_path, static_folder, static_host, host_matching, subdomain_matching, template_folder, instance_path, instance_relative_config, root_path)

    def index(self):        
        if request.method == 'GET':
            return render_template('start.html')

    def login(self):
        if request.method == 'GET':
            return render_template('login.html')
    def base(self):
        if request.method == 'GET':
            return render_template('base.html')
    def variants(self):
        if request.method == 'GET':
            return render_template('variants.html')
    def change(self):
        if request.method == 'GET':
            return render_template('change.html')
        if request.method == 'POST':
            # If the user does not select a file, the browser submits an
            # empty file without a filename.
            if request.form.get('info') == 'upload':
                session['list'] = request.form.get('names').split(', ')[0:-1]
                session['task'] = {}
                for i in session['list']:
                    if i == 'widget':
                        session['task'][i] = f'<div class=\"task-top row-flex\"><div class=\"task-number-ege centralize\"></div> <div class=\"task-number-all\"></div></div><div class=\"container column-flex task-info\">{request.form.get(i)}</div>'
                    else:    
                        session['task'][i] = request.form.get(i)
                    print(i)
                print(session['task'])
                if 'widget' in session['task']:
                    session['task']['sources'] = []

                with open('data.json', 'r', encoding='utf-8') as file:
                    data = json.load(file)
                    data_len = len(data['tasks']) + 1
                print(request.files)
                for i in request.files:
                    file = request.files[i]
                    print(file.filename)
                    if file and self.allowed_file(file.filename):
                        filename = secure_filename(session['task']['number_ege'] + f'_{data_len}.{self.get_extensition(file.filename)}')
                        file.save(os.path.join(self.config['UPLOAD_FOLDER'], filename))
                        session['filename'] = url_for('static',filename='img/' + filename)
                        session['task']['sources'].append(session['filename'])


                with open('data.json', 'r', encoding='utf-8') as file:
                    data['tasks'][str(data_len)] = session['task']
                
                with open('data.json', 'w', encoding='utf-8') as file:
                    json.dump(data, file)
                print(request.form.get('names'))
                return redirect(url_for('change'))
            if request.form.get('info') == 'del':
                with open('data.json', 'r', encoding='utf-8') as file:
                    data = json.load(file)
                new_tasks = {}
                new_tasks_list = []
                del_num = request.form.get('num')
                del_task = False
                for i in data['tasks']:
                    if i != del_num:
                        new_tasks[i] = data['tasks'][i]
                        new_tasks_list.append(i)
                    else:
                        del_task = data['tasks'][i]
                if del_task:
                    for i in del_task['sources']:
                        os.remove(os.path.join(self.config['UPLOAD_FOLDER']+i.split('/ege%20project/img')[1]))
                data['tasks'] = {}
                for i in range(1, len(new_tasks) + 1):
                    data['tasks'][i] = new_tasks[new_tasks_list[i-1]]
                print(data['tasks'])

                with open('data.json', 'w', encoding='utf-8') as file:
                    json.dump(data, file)
                return redirect(url_for('change'))
                


    def allowed_file(self, filename):
        return '.' in filename and filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

    def get_extensition(self, filename):
        return filename.rsplit('.', 1)[1].lower()


        

app = App(__name__, template_folder=os.getcwd(), static_folder=os.getcwd())
app.config['SECRET_KEY'] = '#rl(C1TRO84Xl*(O9d%0&ZIhl&k0uK(g'
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER


app.add_url_rule('/', 'index', app.index, methods=['GET', 'POST'])
app.add_url_rule('/login', 'login', app.login, methods=['GET', 'POST'])
app.add_url_rule('/base', 'base', app.base, methods=['GET'])
app.add_url_rule('/variants', 'variants', app.variants, methods=['GET', 'POST'])
app.add_url_rule('/change', 'change', app.change, methods=['GET', 'POST'])

if __name__ == '__main__':
    app.run(debug=True)
    