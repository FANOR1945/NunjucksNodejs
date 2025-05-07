export default function SpecialtyMedical() {
    return {
      type: 'html',
      content: `
        <div class="medical-banner">
          <h2>Departamento Médico</h2>
          <p>Servicios especializados con tecnología de punta</p>
        </div>
        <style>
          .medical-banner {
            background: linear-gradient(135deg, #1a73e8, #0d47a1);
            color: white;
            padding: 2rem;
            border-radius: 8px;
          }
        </style>
      `
    };
  }
  