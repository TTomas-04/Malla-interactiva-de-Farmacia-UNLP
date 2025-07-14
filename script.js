// Definimos todas las materias con sus requisitos
const materias = [
  // Primer Año
  { id: "Algebra Calculo Numérico y Geometría Analítica", abre: ["Física I", "Análisis Matemático II", "Química General"], requisitos: [] },
  { id: "Análisis Matemático I", abre: ["Física I", "Análisis Matemático II", "Química General"], requisitos: [] },
  { id: "Introducción a la Química", abre: ["Química General", "Biología"], requisitos: [] },
  { id: "Física I", abre: ["Física II"], requisitos: ["Algebra Calculo Numérico y Geometría Analítica", "Análisis Matemático I"] },
  { id: "Análisis Matemático II", abre: ["Física II", "Análisis de Datos"], requisitos: ["Algebra Calculo Numérico y Geometría Analítica", "Análisis Matemático I"] },
  { id: "Química General", abre: ["Química Inorgánica", "Análisis de Datos"], requisitos: ["Introducción a la Química", "Algebra Calculo Numérico y Geometría Analítica", "Análisis Matemático I"] },

  // Segundo Año
  { id: "Física II", abre: ["Fisicoquímica"], requisitos: ["Física I", "Análisis Matemático II"] },
  { id: "Biología", abre: ["Anatomía E Histología", "Farmacobotanica", "Química Biológica"], requisitos: ["Introducción a la Química"] },
  { id: "Química Inorgánica", abre: ["Fisicoquímica", "Química Orgánica I", "Química Analítica I"], requisitos: ["Química General"] },
  { id: "Análisis de Datos", abre: ["Fisicoquímica", "Química Analítica I", "Biofarmacia", "Diseño de Experimentos"], requisitos: ["Análisis Matemático II", "Química General"] },

  { id: "Fisicoquímica", abre: ["Ingles Científico Técnico", "Química Medicinal"], requisitos: ["Física II", "Química Inorgánica", "Análisis de Datos"] },
  { id: "Química Orgánica I", abre: ["Ingles Científico Técnico", "Química Orgánica II", "Farmacología"], requisitos: ["Química Inorgánica"] },
  { id: "Química Analítica I", abre: ["Ingles Científico Técnico", "Química Analítica Instrumental", "Química Biológica"], requisitos: ["Química Inorgánica", "Análisis de Datos"] },

  // Tercer Año
  { id: "Ingles Científico Técnico", abre: [], requisitos: ["Fisicoquímica", "Química Orgánica I", "Química Analítica I"] },
  { id: "Química Orgánica II", abre: ["Farmacognosia", "Química Biológica"], requisitos: ["Química Orgánica I"] },
  { id: "Química Analítica Instrumental", abre: ["Biofarmacia", "Diseño de Experimentos"], requisitos: ["Química Analítica I"] },
  { id: "Anatomía E Histología", abre: ["Fisiología"], requisitos: ["Biología"] },
  { id: "Farmacobotanica", abre: ["Farmacognosia"], requisitos: ["Biología"] },
  { id: "Farmacognosia", abre: ["Farmacocinética I", "Química Medicinal"], requisitos: ["Farmacobotanica", "Química Orgánica II"] },
  { id: "Química Biológica", abre: ["Fisiopatología", "Microbiología General", "Nutrición y Bromatología"], requisitos: ["Biología", "Química Analítica I", "Química Orgánica II"] },
  { id: "Fisiología", abre: ["Fisiopatología", "Nutrición y Bromatología"], requisitos: ["Anatomía E Histología"] },

  // Cuarto Año
  { id: "Fisiopatología", abre: ["Farmacología I", "Higiene y Salud Publica"], requisitos: ["Fisiología", "Química Biológica"] },
  { id: "Microbiología General", abre: ["Farmacología II", "Higiene y Salud Publica"], requisitos: ["Química Biológica"] },
  { id: "Diseño de Experimentos", abre: [], requisitos: ["Química Analítica Instrumental", "Análisis de Datos"] },
  { id: "Biofarmacia", abre: ["Farmacología I", "Farmacotecnia I", "Farmacia Clínica y Asistencial"], requisitos: ["Química Analítica Instrumental", "Análisis de Datos"] },
  { id: "Farmacología I", abre: ["Farmacología II"], requisitos: ["Biofarmacia", "Fisiopatología"] },
  { id: "Nutrición y Bromatología", abre: [], requisitos: ["Química Biológica", "Fisiología"] },
  { id: "Farmacotecnia I", abre: ["Higiene y Salud Publica", "Farmacotecnia II", "Control de Calidad de Medicamentos", "Economía y Legislación Farmacéutica", "Practicas Farmacéuticas"], requisitos: ["Biofarmacia"] },

  // Quinto Año
  { id: "Farmacología II", abre: ["Farmacia Clínica y Asistencial", "Practicas Farmacéuticas"], requisitos: ["Farmacología I", "Microbiología General"] },
  { id: "Higiene y Salud Publica", abre: [], requisitos: ["Fisiopatología", "Microbiología General", "Farmacotecnia I"] },
  { id: "Química Medicinal", abre: [], requisitos: ["Fisicoquímica", "Farmacognosia"] },
  { id: "Economía y Legislación Farmacéutica", abre: [], requisitos: ["Farmacotecnia I"] },
  { id: "Farmacotecnia II", abre: [], requisitos: ["Farmacotecnia I"] },
  { id: "Control de Calidad de Medicamentos", abre: [], requisitos: ["Farmacotecnia I"] },
  { id: "Farmacia Clínica y Asistencial", abre: [], requisitos: ["Biofarmacia", "Farmacología II"] },
  { id: "Practicas Farmacéuticas", abre: [], requisitos: ["Farmacología II", "Farmacotecnia I"] }
];

// Estado de cada materia
const estado = {};

// Crear cuadros
const mallaDiv = document.getElementById("malla");

materias.forEach(materia => {
  estado[materia.id] = {
    aprobada: false,
    bloqueada: materia.requisitos.length > 0
  };

  const div = document.createElement("div");
  div.className = "materia";
  if (estado[materia.id].bloqueada) div.classList.add("bloqueada");
  div.textContent = materia.id;
  div.id = materia.id;

  div.addEventListener("click", () => {
    if (estado[materia.id].bloqueada) return;
    estado[materia.id].aprobada = true;
    div.classList.add("aprobada");
    // Desbloquear las que dependan de esta
    materia.abre.forEach(destino => {
      const desbloquear = materias.find(m => m.id === destino);
      const requisitosCumplidos = desbloquear.requisitos.every(req => estado[req].aprobada);
      if (requisitosCumplidos) {
        estado[destino].bloqueada = false;
        document.getElementById(destino).classList.remove("bloqueada");
      }
    });
  });

  mallaDiv.appendChild(div);
});

