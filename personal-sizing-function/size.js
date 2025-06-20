// Connection to Supabase
import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm'

const supabaseUrl = 'https://lwbuetnezecxolyunric.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imx3YnVldG5lemVjeG9seXVucmljIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTAyMzg0NTEsImV4cCI6MjA2NTgxNDQ1MX0.ars7eVWjX05BABvROvUI8UEIJZwllX_bIBDT3OgmGWE'
const supabase = createClient(supabaseUrl, supabaseKey)

// Load measurements on page load
document.addEventListener('DOMContentLoaded', function() {
    loadMeasurements();
    setupForm();
});

function setupForm() {
    const form = document.getElementById('measurementForm');
    form.addEventListener('submit', async function(e) {
        e.preventDefault();
        await saveMeasurement();
    });
}

async function saveMeasurement() {
    const formData = new FormData(document.getElementById('measurementForm'));
    
    const measurement = {
        height: parseFloat(formData.get('height')) || null,
        alpha_sizing: formData.get('alpha_sizing'),
        body_part: formData.get('body_part'),
        inch_cm: formData.get('inch_cm')
    };

    try {
        const { data, error } = await supabase
            .from('submit sizing and measurements')
            .insert([measurement])
            .select()

        if (error) {
            console.error('Error saving measurement:', error);
            alert('Error saving measurement');
            return;
        }

        // Reset form and reload measurements
        document.getElementById('measurementForm').reset();
        await loadMeasurements();
        alert('Measurement saved successfully!');
    } catch (error) {
        console.error('Error:', error);
        alert('Error saving measurement');
    }
}

async function loadMeasurements() {
    try {
        const { data: measurements, error } = await supabase
            .from('submit sizing and measurements')
            .select('*')
            .order('created_at', { ascending: false });

        if (error) {
            console.error('Error loading measurements:', error);
            return;
        }

        displayMeasurements(measurements);
    } catch (error) {
        console.error('Error:', error);
    }
}

function displayMeasurements(measurements) {
    const listContainer = document.getElementById('measurementsList');
    
    if (!measurements || measurements.length === 0) {
        listContainer.innerHTML = `
            <div class="empty-state">
                <h3>No measurements yet</h3>
                <p>Add your first measurement above!</p>
            </div>
        `;
        return;
    }

    listContainer.innerHTML = measurements.map(measurement => `
        <div class="measurement-item">
            <div class="measurement-info">
                <div class="measurement-title">${measurement.body_part} - ${measurement.alpha_sizing}</div>
                <div class="measurement-details">
                    ${measurement.inch_cm}${measurement.height ? ` • Height: ${measurement.height}cm` : ''}
                </div>
            </div>
            <button class="delete-btn" onclick="deleteMeasurement(${measurement.id})">Delete</button>
        </div>
    `).join('');
}

async function deleteMeasurement(id) {
    if (!confirm('Are you sure you want to delete this measurement?')) return;

    try {
        const { error } = await supabase
            .from('submit sizing and measurements')
            .delete()
            .eq('id', id);

        if (error) {
            console.error('Error deleting measurement:', error);
            alert('Error deleting measurement');
            return;
        }

        await loadMeasurements();
    } catch (error) {
        console.error('Error:', error);
        alert('Error deleting measurement');
    }
}

// Make deleteMeasurement available globally
window.deleteMeasurement = deleteMeasurement;