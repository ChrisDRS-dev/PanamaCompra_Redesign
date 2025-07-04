import React, { useState, useRef } from "react";
import { PDFDownloadLink, Document, Page, Text, View, StyleSheet } from "@react-pdf/renderer";
import emailjs from "emailjs-com";

const styles = StyleSheet.create({
  page: { padding: 30 },
  section: { marginBottom: 10 },
  title: { fontSize: 18, marginBottom: 10 },
  label: { fontSize: 12, marginBottom: 2 },
  value: { fontSize: 14, marginBottom: 6 },
});

const CotizacionPDF = ({ nombre, email, producto, cantidad, precio }) => (
  <Document>
    <Page size="A4" style={styles.page}>
      <View style={styles.section}>
        <Text style={styles.title}>Cotización de Compra</Text>
        <Text style={styles.label}>Nombre:</Text>
        <Text style={styles.value}>{nombre}</Text>
        <Text style={styles.label}>Email:</Text>
        <Text style={styles.value}>{email}</Text>
        <Text style={styles.label}>Producto:</Text>
        <Text style={styles.value}>{producto}</Text>
        <Text style={styles.label}>Cantidad:</Text>
        <Text style={styles.value}>{cantidad}</Text>
        <Text style={styles.label}>Precio Unitario:</Text>
        <Text style={styles.value}>B/. {precio}</Text>
        <Text style={styles.label}>Total:</Text>
        <Text style={styles.value}>B/. {Number(precio) * Number(cantidad)}</Text>
      </View>
    </Page>
  </Document>
);

export default function Cotizacion() {
  const [form, setForm] = useState({ nombre: "", email: "", producto: "", cantidad: 1, precio: 0 });
  const [enviando, setEnviando] = useState(false);
  const [enviado, setEnviado] = useState(false);
  const pdfRef = useRef();

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSend = async (e) => {
    e.preventDefault();
    setEnviando(true);
    setEnviado(false);
    // EmailJS config: debes crear tu servicio y plantilla en emailjs.com y poner los IDs aquí
    const serviceID = "tu_service_id";
    const templateID = "tu_template_id";
    const userID = "tu_user_id";
    // Puedes enviar los datos del formulario como variables
    try {
      await emailjs.send(serviceID, templateID, form, userID);
      setEnviado(true);
    } catch (err) {
      alert("Error al enviar el correo");
    }
    setEnviando(false);
  };

  return (
    <div style={{ maxWidth: 500, margin: "40px auto", padding: 24, background: "#fff", borderRadius: 8 }}>
      <h2>Cotización en Línea</h2>
      <form onSubmit={handleSend}>
        <input name="nombre" placeholder="Nombre" value={form.nombre} onChange={handleChange} required style={{ width: "100%", marginBottom: 8 }} />
        <input name="email" type="email" placeholder="Email" value={form.email} onChange={handleChange} required style={{ width: "100%", marginBottom: 8 }} />
        <input name="producto" placeholder="Producto" value={form.producto} onChange={handleChange} required style={{ width: "100%", marginBottom: 8 }} />
        <input name="cantidad" type="number" min="1" placeholder="Cantidad" value={form.cantidad} onChange={handleChange} required style={{ width: "100%", marginBottom: 8 }} />
        <input name="precio" type="number" min="0" step="0.01" placeholder="Precio Unitario" value={form.precio} onChange={handleChange} required style={{ width: "100%", marginBottom: 8 }} />
        <button type="submit" disabled={enviando} style={{ width: "100%", padding: 10, background: "#007bff", color: "#fff", border: "none", borderRadius: 4 }}>
          {enviando ? "Enviando..." : "Enviar Cotización por Email"}
        </button>
      </form>
      {enviado && <div style={{ color: "green", marginTop: 10 }}>¡Cotización enviada!</div>}
      <div style={{ marginTop: 20, textAlign: "center" }}>
        <PDFDownloadLink
          document={<CotizacionPDF {...form} />}
          fileName={`cotizacion_${form.nombre || "usuario"}.pdf`}
        >
          {({ loading }) => loading ? "Generando PDF..." : "Descargar PDF"}
        </PDFDownloadLink>
      </div>
    </div>
  );
} 