from flask import Flask, render_template, request, redirect, url_for, session, flash, jsonify

app = Flask(__name__)
app.secret_key = "clave_secreta_muy_segura"  # Cambia esto por una clave segura en producción

# Usuarios administradores (en un sistema real, esto estaría en una base de datos)
ADMIN_USERS = {
    "admin": "admin123",
    "supervisor": "super123"
}

@app.route('/')
def home():
    return render_template('index.html')

@app.route('/login')
def login():
    return render_template('login.html')

@app.route('/admin/auth', methods=['POST'])
def auth():
    username = request.form.get('username')
    password = request.form.get('password')
    
    if username in ADMIN_USERS and ADMIN_USERS[username] == password:
        session['user'] = username
        return redirect(url_for('admin_dashboard'))
    else:
        return render_template('login.html', error=True)

@app.route('/admin/dashboard')
def admin_dashboard():
    if 'user' not in session:
        return redirect(url_for('login'))
    return render_template('dashboard.html', username=session['user'])

@app.route('/logout')
def logout():
    session.pop('user', None)
    return redirect(url_for('home'))

@app.route('/check-auth')
def check_auth():
    """Endpoint para verificar si el usuario está autenticado"""
    if 'user' in session:
        return jsonify({'authenticated': True})
    else:
        return jsonify({'authenticated': False})

if __name__ == '__main__':
    app.run(debug=True)