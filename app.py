from flask import Flask, render_template, request, send_file, redirect, url_for, flash
import os
import logging

app = Flask(__name__)
app.secret_key = "clave_secreta_muy_segura"  # Cambia esto por una clave segura en producción

# Configurar logging
logging.basicConfig(level=logging.DEBUG)
logger = logging.getLogger(__name__)

# Usuarios administradores (en un sistema real, esto estaría en una base de datos)
ADMIN_USERS = {
    "admin": "admin123",
    "supervisor": "super123"
}

# Ruta para el archivo de administradores
BASE_DIR = os.path.dirname(os.path.abspath(__file__))
ADMIN_FILE_PATH = os.path.join(BASE_DIR, 'admin_files', 'gymRaceAdmin.exe')

@app.route('/')
def home():
    return render_template('index.html')

@app.route('/politica')
def politica():
    return render_template('politica.html')


@app.route('/acercaDe')
def acerca_de():
    return render_template('acercaDe.html')



@app.route('/download/app', methods=['GET'])
def download_app():
    try:
        # Ruta para el archivo app.txt
        APP_FILE_PATH = os.path.join(BASE_DIR, 'app_files', 'app.txt')
        
        # Verificar existencia del archivo
        if not os.path.exists(APP_FILE_PATH):
            # Si no existe, crear el archivo
            os.makedirs(os.path.dirname(APP_FILE_PATH), exist_ok=True)
            with open(APP_FILE_PATH, 'w') as f:
                f.write("Archivo de información de la aplicación GymRace")
        
        # Enviar el archivo
        return send_file(
            APP_FILE_PATH, 
            as_attachment=True, 
            download_name='app.txt'
        )
    except Exception as e:
        logger.error(f"Error sending app file: {str(e)}")
        flash(f'Error al descargar el archivo: {str(e)}', 'error')
        return redirect(url_for('home'))




@app.route('/downloadAdmin', methods=['GET', 'POST'])
def login():
        # Verificar si la solicitud viene de tu sitio web
    referer = request.headers.get('Referer', '')
    if not referer.startswith(request.host_url):
        flash('Acceso denegado', 'error')
        return redirect(url_for('home'))
    if request.method == 'POST':
        # Obtener credenciales del formulario
        username = request.form.get('username')
        password = request.form.get('password')
        
        logger.debug(f"Login attempt - Username: {username}")
        
        # Verificar credenciales de administrador (agregamos más claridad en los mensajes)
        if username in ADMIN_USERS:
            if ADMIN_USERS[username] == password:
                logger.debug(f"Login successful for user: {username}")
                
                try:
                    # Verificar existencia del archivo
                    logger.debug(f"Attempting to send file from: {ADMIN_FILE_PATH}")
                    
                    if not os.path.exists(ADMIN_FILE_PATH):
                        logger.error(f"File not found: {ADMIN_FILE_PATH}")
                        flash('El archivo de administrador no está disponible', 'error')
                        return redirect(url_for('home'))
                    
                    # Intentar enviar el archivo de administrador
                    return send_file(
                        ADMIN_FILE_PATH, 
                        as_attachment=True, 
                        download_name='gymRaceAdmin.exe'
                    )
                except Exception as e:
                    # Registrar cualquier error detallado
                    logger.error(f"Error sending file: {str(e)}")
                    flash(f'Error al descargar el archivo: {str(e)}', 'error')
                    return redirect(url_for('home'))
            else:
                # Contraseña incorrecta
                logger.warning(f"Incorrect password for username: {username}")
                flash('Contraseña incorrecta', 'error')
                return redirect(url_for('home'))
        else:
            # Usuario no encontrado
            logger.warning(f"Unknown username: {username}")
            flash('Usuario no encontrado', 'error')
            return redirect(url_for('home'))
    
    # Manejar solicitudes GET
    return render_template('index.html')

if __name__ == '__main__':
    # Crear directorio para archivos de admin si no existe
    os.makedirs(os.path.dirname(ADMIN_FILE_PATH), exist_ok=True)
    
    # Crear un archivo de ejemplo si no existe
    if not os.path.exists(ADMIN_FILE_PATH):
        os.makedirs(os.path.dirname(ADMIN_FILE_PATH), exist_ok=True)
        with open(ADMIN_FILE_PATH, 'w') as f:
            f.write("Archivo de acceso exclusivo para administradores de GymRace")
        logger.info(f"Created admin file at: {ADMIN_FILE_PATH}")
    
    app.run(debug=True)