//  Funcionalidades para la página de login

document.addEventListener('DOMContentLoaded', function() {
    const loginForm = document.querySelector('.login');
    const emailInput = document.querySelector('input[type="email"]');
    const passwordInput = document.querySelector('input[type="password"]');
    const loginButton = document.querySelector('.boton');

    // Validación en tiempo real del email
    emailInput.addEventListener('input', function() {
        const email = this.value;
        if (isValidEmail(email)) {
            this.style.borderColor = '#059669'; // Verde si es válido
        } else {
            this.style.borderColor = '#dc2626'; // Rojo si no es válido
        }
    });

    // Mostrar/ocultar contraseña 
    passwordInput.addEventListener('focus', function() {
        this.style.borderColor = '#2563eb';
    });

    // Manejo del envío del formulario
    loginButton.addEventListener('click', function(e) {
        e.preventDefault();
        
        const email = emailInput.value;
        const password = passwordInput.value;

        // Validaciones
        if (!email || !password) {
            showMessage('Por favor, completa todos los campos', 'error');
            return;
        }

        if (!isValidEmail(email)) {
            showMessage('Por favor, ingresa un email válido', 'error');
            return;
        }

        // Simular proceso de login
        simulateLogin(email, password);
    });

    // Login con redes sociales
    document.querySelectorAll('.redes-sociales a').forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            const platform = this.querySelector('img').alt;
            showMessage(`Iniciando sesión con ${platform}...`, 'info');
            // Aquí iría la integración con OAuth
        });
    });

    // Funciones de utilidad
    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    function showMessage(message, type = 'info') {
        // Remover mensaje anterior si existe
        const existingMessage = document.querySelector('.login-message');
        if (existingMessage) {
            existingMessage.remove();
        }

        // Crear nuevo mensaje
        const messageDiv = document.createElement('div');
        messageDiv.className = `login-message login-message--${type}`;
        messageDiv.textContent = message;
        messageDiv.style.cssText = `
            padding: 1rem;
            margin: 1rem 0;
            border-radius: 8px;
            font-weight: bold;
            text-align: center;
            ${type === 'error' ? 'background-color: #fee2e2; color: #dc2626; border: 1px solid #fecaca;' : ''}
            ${type === 'success' ? 'background-color: #d1fae5; color: #059669; border: 1px solid #a7f3d0;' : ''}
            ${type === 'info' ? 'background-color: #dbeafe; color: #2563eb; border: 1px solid #bfdbfe;' : ''}
        `;

        // Insertar después del formulario
        loginForm.appendChild(messageDiv);

        // Auto-remover después de 5 segundos
        setTimeout(() => {
            if (messageDiv.parentNode) {
                messageDiv.remove();
            }
        }, 5000);
    }

    function simulateLogin(email, password) {
        // Mostrar loading
        loginButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Iniciando sesión...';
        loginButton.disabled = true;

        // Simular llamada a API
        setTimeout(() => {
            // Aquí iría la llamada real a tu backend
            if (email === 'admin@vecinosalert.com' && password === '123456') {
                showMessage('¡Inicio de sesión exitoso! Redirigiendo...', 'success');
                
                // Redirigir después de 2 segundos
                setTimeout(() => {
                    window.location.href = '../principal/index.html';
                }, 2000);
            } else {
                showMessage('Email o contraseña incorrectos', 'error');
                loginButton.innerHTML = 'Iniciar sesión';
                loginButton.disabled = false;
            }
        }, 1500);
    }

    // Efectos de hover para las tarjetas de redes sociales
    document.querySelectorAll('.redes-sociales a').forEach(link => {
        link.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.1)';
        });
        
        link.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1)';
        });
    });

    // Tecla Enter para enviar formulario
    document.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            loginButton.click();
        }
    });
});