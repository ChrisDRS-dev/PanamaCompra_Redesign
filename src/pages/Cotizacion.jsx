import React, { useState, useRef, useEffect } from "react";
import { PDFDownloadLink, Document, Page, Text, View, StyleSheet } from "@react-pdf/renderer";
import emailjs from "emailjs-com";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

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
  // Simulación: obtener usuario logueado de localStorage (o contexto real en app completa)
  const [user, setUser] = useState({ nombre: "", email: "" });
  useEffect(() => {
    // Simula obtener usuario logueado (ajusta según tu lógica real)
    const stored = localStorage.getItem("user");
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        setUser({ nombre: parsed.nombre || "", email: parsed.email || "" });
      } catch {
        setUser({ nombre: "", email: "" });
      }
    }
  }, []);

  const [form, setForm] = useState({ nombre: "", email: "", producto: "", cantidad: 1, precio: 0 });
  const [enviando, setEnviando] = useState(false);
  const [enviado, setEnviado] = useState(false);
  const pdfRef = useRef();

  useEffect(() => {
    setForm(f => ({ ...f, nombre: user.nombre, email: user.email }));
  }, [user]);

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
    <>
      <Navbar />
      <div style={{ maxWidth: 520, margin: "48px auto 32px auto", padding: 32, background: "#f8fafc", borderRadius: 14, boxShadow: "0 4px 24px rgba(26,86,123,0.10)", border: "1.5px solid #e6f0f7", boxSizing: "border-box" }}>
        <h2 style={{ textAlign: "center", color: "#1a567b", marginBottom: 24, fontWeight: 700, letterSpacing: 0.5 }}>Cotización en Línea</h2>
        <form onSubmit={handleSend} style={{ display: "flex", flexDirection: "column", gap: 18 }}>
          <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
            <label htmlFor="nombre" style={{ fontWeight: 500, color: "#1a567b", marginBottom: 2 }}>Nombre</label>
            <input id="nombre" name="nombre" value={user.nombre} readOnly style={{ padding: "10px 12px", border: "1.5px solid #cbe2f3", borderRadius: 6, fontSize: 15, background: "#f3f6fa", color: "#6a7a8c", cursor: "not-allowed" }} />
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
            <label htmlFor="email" style={{ fontWeight: 500, color: "#1a567b", marginBottom: 2 }}>Email</label>
            <input id="email" name="email" type="email" value={user.email} readOnly style={{ padding: "10px 12px", border: "1.5px solid #cbe2f3", borderRadius: 6, fontSize: 15, background: "#f3f6fa", color: "#6a7a8c", cursor: "not-allowed" }} />
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
            <label htmlFor="producto" style={{ fontWeight: 500, color: "#1a567b", marginBottom: 2 }}>Producto</label>
            <input id="producto" name="producto" placeholder="Producto" value={form.producto} onChange={handleChange} required style={{ padding: "10px 12px", border: "1.5px solid #cbe2f3", borderRadius: 6, fontSize: 15, background: "#fff" }} />
          </div>
          <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
            <div style={{ flex: 1, minWidth: 120, display: "flex", flexDirection: "column", gap: 6 }}>
              <label htmlFor="cantidad" style={{ fontWeight: 500, color: "#1a567b", marginBottom: 2 }}>Cantidad</label>
              <input id="cantidad" name="cantidad" type="number" min="1" placeholder="Cantidad" value={form.cantidad} onChange={handleChange} required style={{ padding: "10px 12px", border: "1.5px solid #cbe2f3", borderRadius: 6, fontSize: 15, background: "#fff" }} />
            </div>
            <div style={{ flex: 1, minWidth: 120, display: "flex", flexDirection: "column", gap: 6 }}>
              <label htmlFor="precio" style={{ fontWeight: 500, color: "#1a567b", marginBottom: 2 }}>Precio Unitario</label>
              <input id="precio" name="precio" type="number" min="0" step="0.01" placeholder="Precio Unitario" value={form.precio} onChange={handleChange} required style={{ padding: "10px 12px", border: "1.5px solid #cbe2f3", borderRadius: 6, fontSize: 15, background: "#fff" }} />
            </div>
          </div>
          <button type="submit" disabled={enviando} style={{ width: "100%", padding: "12px 0", background: enviando ? "#b3d4ee" : "#1a567b", color: "#fff", border: "none", borderRadius: 6, fontWeight: 600, fontSize: 16, letterSpacing: 0.2, boxShadow: "0 2px 8px rgba(26,86,123,0.08)", cursor: enviando ? "not-allowed" : "pointer", transition: "background 0.2s" }}>
            {enviando ? "Enviando..." : "Enviar Cotización por Email"}
          </button>
        </form>
        {enviado && <div style={{ color: "green", marginTop: 14, textAlign: "center", fontWeight: 500 }}>¡Cotización enviada!</div>}
        <div style={{ marginTop: 28, textAlign: "center" }}>
          <PDFDownloadLink
            document={<CotizacionPDF {...form} />}
            fileName={`cotizacion_${form.nombre || "usuario"}.pdf`}
          >
            {({ loading }) => loading ? "Generando PDF..." : <span style={{ color: "#1a567b", fontWeight: 600, textDecoration: "underline", cursor: "pointer" }}>Descargar PDF</span>}
          </PDFDownloadLink>
        </div>
      </div>
      <Footer />
      <style>{`
        @media (max-width: 700px) {
          .cotizacion-form-container {
            padding: 10px !important;
            margin: 16px auto 16px auto !important;
            border-radius: 8px !important;
          }
        }
        @media (max-width: 520px) {
          .cotizacion-form-container {
            padding: 2vw !important;
            margin: 0 !important;
            border-radius: 0 !important;
            box-shadow: none !important;
            border: none !important;
          }
        }
      `}</style>
    </>
  );
} 