// principal/script.js - CORREGIDO

document.addEventListener('DOMContentLoaded', function() {
    // Elementos del DOM
    const reportCards = document.querySelectorAll('.report_card');
    const modal = document.getElementById('reportModal');
    const closeModal = document.querySelector('.close_modal');
    const cancelBtn = document.querySelector('.cancel_btn');
    const reportForm = document.getElementById('reportForm');
    const reportTypeSelect = document.getElementById('reportType');
    const crearReporteBtn = document.getElementById('crearReporteBtn');
    
    // Datos de ejemplo para demostración
    const sampleReports = [
        {
            id: 1,
            type: 'alumbrado',
            title: 'Lámpara apagada en Parque Central',
            description: 'Poste número 7 lleva 3 días sin funcionar',
            location: { lat: 20.723456, lng: -103.391234 },
            urgency: 'media',
            status: 'pendiente',
            confirmations: 2,
            date: '2024-01-15'
        },
        {
            id: 2,
            type: 'infraestructura',
            title: 'Bache peligroso en Av. Principal',
            description: 'Bache de aproximadamente 30cm de profundidad',
            location: { lat: 20.725678, lng: -103.389012 },
            urgency: 'alta',
            status: 'confirmado',
            confirmations: 5,
            date: '2024-01-14'
        }
    ];

    // Inicializar la aplicación
    initApp();

    function initApp() {
        setupEventListeners();
        loadSampleReports();
        setupSmoothScrolling();
    }

    function setupEventListeners() {
        // Botón principal "Crear Reporte"
        if (crearReporteBtn) {
            crearReporteBtn.addEventListener('click', function() {
                openReportModal('');
            });
        }

        // Cards de reportes rápidos
        reportCards.forEach(card => {
            card.addEventListener('click', function() {
                const reportType = this.getAttribute('data-type');
                openReportModal(reportType);
            });
        });

        // Cerrar modal
        if (closeModal) {
            closeModal.addEventListener('click', closeModalFunc);
        }
        
        if (cancelBtn) {
            cancelBtn.addEventListener('click', closeModalFunc);
        }

        // Cerrar modal al hacer click fuera
        window.addEventListener('click', function(event) {
            if (event.target === modal) {
                closeModalFunc();
            }
        });

        // Envío del formulario de reporte
        if (reportForm) {
            reportForm.addEventListener('submit', handleReportSubmit);
        }

        // Cambio en tipo de reporte
        if (reportTypeSelect) {
            reportTypeSelect.addEventListener('change', function() {
                updateFormBasedOnType(this.value);
            });
        }

        // Navegación por teclado
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape') {
                closeModalFunc();
            }
        });
    }

    function openReportModal(reportType) {
        if (!modal) {
            console.error('Modal no encontrado');
            return;
        }
        
        if (reportType && reportTypeSelect) {
            reportTypeSelect.value = reportType;
            updateFormBasedOnType(reportType);
        }
        
        modal.style.display = 'block';
        document.body.style.overflow = 'hidden'; // Prevenir scroll
        
        // Enfocar el primer campo
        setTimeout(() => {
            const titleInput = document.getElementById('reportTitle');
            if (titleInput) titleInput.focus();
        }, 300);
    }

    function closeModalFunc() {
        if (!modal) return;
        
        modal.style.animation = 'fadeOut 0.3s ease';
        setTimeout(() => {
            modal.style.display = 'none';
            document.body.style.overflow = ''; // Restaurar scroll
            if (reportForm) {
                reportForm.reset();
            }
        }, 250);
    }

    function updateFormBasedOnType(type) {
        const titleInput = document.getElementById('reportTitle');
        const descriptionTextarea = document.getElementById('reportDescription');
        
        if (!titleInput || !descriptionTextarea) return;

        // Placeholders sugeridos basados en el tipo
        const placeholders = {
            'infraestructura': {
                title: 'Ej: Bache en Av. Principal',
                description: 'Describe el problema de infraestructura...'
            },
            'alumbrado': {
                title: 'Ej: Lámpara apagada en calle...',
                description: 'Describe el problema de alumbrado...'
            },
            'inseguridad': {
                title: 'Ej: Personas sospechosas en...',
                description: 'Describe la situación de seguridad...'
            },
            'emergencia': {
                title: 'Ej: Fuga de agua/gas en...',
                description: 'Describe la emergencia...'
            }
        };

        if (placeholders[type]) {
            titleInput.placeholder = placeholders[type].title;
            descriptionTextarea.placeholder = placeholders[type].description;
        } else {
            titleInput.placeholder = 'Ej: Describe el problema...';
            descriptionTextarea.placeholder = 'Describe el problema en detalle...';
        }
    }

    function handleReportSubmit(e) {
        e.preventDefault();
        
        if (!reportForm) return;
        
        const formData = {
            type: reportTypeSelect ? reportTypeSelect.value : '',
            title: document.getElementById('reportTitle')?.value || '',
            description: document.getElementById('reportDescription')?.value || '',
            evidence: document.getElementById('reportEvidence')?.files[0],
            location: getCurrentLocation(),
            urgency: calculateUrgency(reportTypeSelect ? reportTypeSelect.value : '')
        };

        // Validación adicional
        if (!validateReport(formData)) {
            return;
        }

        submitReport(formData);
    }

    function validateReport(formData) {
        if (formData.title.length < 5) {
            showNotification('El título debe tener al menos 5 caracteres', 'error');
            return false;
        }

        if (formData.description.length < 10) {
            showNotification('La descripción debe tener al menos 10 caracteres', 'error');
            return false;
        }

        if (!formData.type) {
            showNotification('Por favor selecciona un tipo de reporte', 'error');
            return false;
        }

        return true;
    }

    function submitReport(formData) {
        // Mostrar estado de carga
        const submitBtn = reportForm?.querySelector('.submit_btn');
        const originalText = submitBtn?.innerHTML || 'Enviar Reporte';
        
        if (submitBtn) {
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Enviando...';
            submitBtn.disabled = true;
        }

        // Simular envío a API
        setTimeout(() => {
            // Aquí iría la llamada real a tu backend
            console.log('Reporte enviado:', formData);
            
            showNotification('¡Reporte enviado exitosamente! La comunidad será notificada.', 'success');
            
            // Cerrar modal y resetear
            closeModalFunc();
            
            // Recargar reportes (en una app real)
            loadSampleReports();
            
            // Restaurar botón
            if (submitBtn) {
                submitBtn.innerHTML = originalText;
                submitBtn.disabled = false;
            }
        }, 2000);
    }

    function getCurrentLocation() {
        // En una app real, esto obtendría la ubicación real del usuario
        return {
            lat: 20.723456 + (Math.random() - 0.5) * 0.01,
            lng: -103.391234 + (Math.random() - 0.5) * 0.01
        };
    }

    function calculateUrgency(type) {
        const urgencyMap = {
            'emergencia': 'alta',
            'inseguridad': 'alta', 
            'alumbrado': 'media',
            'infraestructura': 'media'
        };
        return urgencyMap[type] || 'media';
    }

    function loadSampleReports() {
        // En una app real, esto cargaría reportes de la base de datos
        console.log('Cargando reportes:', sampleReports);
        
        // Aquí podrías actualizar la UI con los reportes
        updateReportsUI(sampleReports);
    }

    function updateReportsUI(reports) {
        // Esta función actualizaría la interfaz con los reportes
        // Por ahora solo lo dejamos como placeholder para futura implementación
        console.log('Actualizando UI con reportes:', reports);
    }

    function setupSmoothScrolling() {
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });
    }

    function showNotification(message, type = 'info') {
        // Crear elemento de notificación
        const notification = document.createElement('div');
        notification.className = `notification notification--${type}`;
        notification.innerHTML = `
            <div class="notification-content">
                <i class="fas fa-${getNotificationIcon(type)}"></i>
                <span>${message}</span>
            </div>
        `;

        document.body.appendChild(notification);

        // Auto-remover después de 5 segundos
        setTimeout(() => {
            notification.style.animation = 'slideOutRight 0.3s ease';
            setTimeout(() => {
                if (notification.parentNode) {
                    notification.remove();
                }
            }, 250);
        }, 5000);
    }

    function getNotificationIcon(type) {
        const icons = {
            'success': 'check-circle',
            'error': 'exclamation-triangle',
            'info': 'info-circle'
        };
        return icons[type] || 'info-circle';
    }
});