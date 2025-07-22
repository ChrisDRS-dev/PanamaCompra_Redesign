import React, { useState, useEffect } from "react";
import { PDFDownloadLink, Document, Page, Text, View, StyleSheet, pdf } from "@react-pdf/renderer";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const styles = StyleSheet.create({
  page: { padding: 32, fontFamily: 'Helvetica' },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 },
  title: { fontSize: 28, fontWeight: 'bold', color: '#1a567b', letterSpacing: 1 },
  brand: { fontSize: 18, fontWeight: 'bold', color: '#ffb300', letterSpacing: 1 },
  section: { marginBottom: 10 },
  label: { fontSize: 13, marginBottom: 2, color: '#1a567b', fontWeight: 700 },
  value: { fontSize: 15, marginBottom: 6, color: '#222' },
  table: { width: '100%', borderStyle: 'solid', borderWidth: 1, borderColor: '#e6f0f7', marginTop: 18, marginBottom: 18 },
  tableRow: { flexDirection: 'row', borderBottomWidth: 1, borderBottomColor: '#e6f0f7', borderBottomStyle: 'solid', alignItems: 'center' },
  tableHeader: { backgroundColor: '#e6f0f7', color: '#1a567b', fontWeight: 'bold', fontSize: 14, padding: 6, flex: 1, textAlign: 'left' },
  tableCell: { fontSize: 13, padding: 6, flex: 1, color: '#222', textAlign: 'left' },
  tableCellRight: { fontSize: 13, padding: 6, flex: 1, color: '#222', textAlign: 'right' },
  totalBlock: { flexDirection: 'row', justifyContent: 'flex-end', alignItems: 'center', marginTop: 18 },
  totalLabel: { fontWeight: 'bold', fontSize: 16, color: '#1a567b', marginRight: 10 },
  totalValue: { backgroundColor: '#e6f0f7', color: '#1a567b', fontWeight: 'bold', fontSize: 20, borderRadius: 8, padding: '6px 20px', letterSpacing: 1 },
});

const CotizacionPDF = ({ nombre, email, producto, cantidad, precio, productos = [] }) => {
  // Convertir el precio a número
  const precioNum = parseFloat(precio) || 0;
  const cantidadNum = parseInt(cantidad) || 1;
  const _total = precioNum * cantidadNum; // Usando _total para evitar advertencia de variable no usada
  
  const prod = Array.isArray(productos) ? productos.find(p => String(p.id) === String(producto)) : null;
  
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.header}>
          <Text style={styles.title}>FACTURA FISCAL</Text>
          <Text style={styles.brand}>PanamaCompra</Text>
        </View>
        <View style={{ marginBottom: 18 }}>
          <Text style={styles.label}>Cliente:</Text>
          <Text style={styles.value}>{nombre}</Text>
          <Text style={styles.label}>Email:</Text>
          <Text style={styles.value}>{email}</Text>
        </View>
        <View style={styles.table}>
          <View style={styles.tableRow}>
            <Text style={styles.tableHeader}>Cantidad</Text>
            <Text style={styles.tableHeader}>Descripción</Text>
            <Text style={[styles.tableHeader, { textAlign: 'right' }]}>Precio Unitario</Text>
            <Text style={[styles.tableHeader, { textAlign: 'right' }]}>Total</Text>
          </View>
          <View style={styles.tableRow}>
            <Text style={styles.tableCell}>{cantidad}</Text>
            <Text style={styles.tableCell}>{prod ? prod.descripcion : ''}</Text>
            <Text style={styles.tableCellRight}>${Number(precio).toFixed(2)}</Text>
            <Text style={styles.tableCellRight}>${(Number(precio) * Number(cantidad)).toFixed(2)}</Text>
          </View>
        </View>
        <View style={styles.totalBlock}>
          <Text style={styles.totalLabel}>TOTAL:</Text>
          <Text style={styles.totalValue}>${(Number(precio) * Number(cantidad)).toFixed(2)}</Text>
        </View>
      </Page>
    </Document>
  );
};

export default function Cotizacion() {
  // Simulación: obtener usuario logueado de localStorage (o contexto real en app completa)
  const [user, setUser] = useState({ nombre: "", email: "" });
  useEffect(() => {
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

  // Productos y categorías
  const [productos, setProductos] = useState([]);
  const [categorias, setCategorias] = useState([]);
  const [selectedCategoria, setSelectedCategoria] = useState("");
  const [filteredProductos, setFilteredProductos] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3001/api/productos")
      .then(res => res.json())
      .then(data => {
        console.log("Productos recibidos:", data);
        setProductos(data);
        // Extraer categorías únicas
        const cats = Array.from(new Set(data.map(p => p.categoria)));
        setCategorias(cats);
      });
  }, []);

  useEffect(() => {
    if (selectedCategoria) {
      setFilteredProductos(productos.filter(p => p.categoria === selectedCategoria));
    } else {
      setFilteredProductos([]);
    }
  }, [selectedCategoria, productos]);

  const [form, setForm] = useState({ nombre: "", email: "", producto: "", cantidad: 1, precio: 0 });
  const [enviando, setEnviando] = useState(false);
  const [enviado, setEnviado] = useState(false);
  const [showFactura, setShowFactura] = useState(false);
  const [showEmailPreview, setShowEmailPreview] = useState(false);
  const [pdfUrl, setPdfUrl] = useState("");

  useEffect(() => {
    setForm(f => ({ ...f, nombre: user.nombre, email: user.email }));
  }, [user]);

  // Cuando selecciona producto, autocompletar precio
  const handleProductoChange = e => {
    const prodId = e.target.value;
    const prod = productos.find(p => String(p.id) === prodId);
    setForm(f => ({
      ...f,
      producto: prod ? String(prod.id) : "",
      precio: prod ? prod.precio : 0
    }));
  };

  const handleCategoriaChange = e => {
    setSelectedCategoria(e.target.value);
    setForm(f => ({ ...f, producto: "", precio: 0 }));
  };

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSend = async (e) => {
    e.preventDefault();
    setEnviando(true);
    setEnviado(false);
    
    try {
      // 1. Generar el PDF
      const pdfDoc = <CotizacionPDF {...form} productos={productos} />;
      const pdfBlob = await pdf(pdfDoc).toBlob();
      
      // 2. Crear un enlace de descarga para el PDF
      const pdfUrl = URL.createObjectURL(pdfBlob);
      setPdfUrl(pdfUrl); // Guardar la URL para usarla en la vista previa
      
      // 3. Mostrar la vista previa del correo
      setShowEmailPreview(true);
      
    } catch (error) {
      console.error('Error al generar la factura:', error);
      alert('Error al generar la factura. Por favor, intente nuevamente.');
    } finally {
      setEnviando(false);
    }
  };
  
  const handleDownloadPDF = () => {
    if (!pdfUrl) return;
    
    const link = document.createElement('a');
    link.href = pdfUrl;
    link.download = `factura_${form.nombre.replace(/\s+/g, '_')}.pdf`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    // Cerrar el modal después de descargar
    setShowEmailPreview(false);
    
    // Limpiar el formulario después de 1 segundo
    setTimeout(() => {
      setForm({
        nombre: user.nombre || '',
        email: user.email || '',
        producto: '',
        cantidad: 1,
        precio: 0
      });
      setEnviado(false);
      setPdfUrl('');
    }, 1000);
  };
  
  const handleCloseEmailPreview = () => {
    setShowEmailPreview(false);
    // Liberar la URL del objeto Blob cuando ya no se necesite
    if (pdfUrl) {
      URL.revokeObjectURL(pdfUrl);
      setPdfUrl('');
    }
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
          {/* Selector de categoría */}
          <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
            <label htmlFor="categoria" style={{ fontWeight: 500, color: "#1a567b", marginBottom: 2 }}>Categoría</label>
            <select
              id="categoria"
              name="categoria"
              value={selectedCategoria}
              onChange={handleCategoriaChange}
              required
              style={{ padding: "10px 12px", border: "1.5px solid #cbe2f3", borderRadius: 6, fontSize: 15, background: "#fff" }}
            >
              <option value="" disabled>Selecciona una categoría</option>
              {categorias.map(cat => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          </div>
          {/* Selector de producto */}
          {selectedCategoria && (
            <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
              <label htmlFor="producto" style={{ fontWeight: 500, color: "#1a567b", marginBottom: 2 }}>Producto</label>
              <select
                id="producto"
                name="producto"
                value={form.producto}
                onChange={handleProductoChange}
                required
                style={{ padding: "10px 12px", border: "1.5px solid #cbe2f3", borderRadius: 6, fontSize: 15, background: "#fff" }}
              >
                <option value="" disabled>Selecciona un producto</option>
                {filteredProductos.map(p => (
                  <option key={p.id} value={p.id}>{p.nombre}</option>
                ))}
              </select>
              {/* Descripción del producto seleccionado */}
              {form.producto && (() => {
                const prod = productos.find(p => String(p.id) === String(form.producto));
                return prod && prod.descripcion ? (
                  <div style={{
                    marginTop: 6,
                    background: '#e6f0f7',
                    color: '#1a567b',
                    borderRadius: 6,
                    padding: '8px 12px',
                    fontSize: 14,
                    fontStyle: 'italic',
                    boxShadow: '0 1px 4px rgba(26,86,123,0.07)'
                  }}>
                    {prod.descripcion}
                  </div>
                ) : null;
              })()}
            </div>
          )}
          <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
            <div style={{ flex: 1, minWidth: 120, display: "flex", flexDirection: "column", gap: 6 }}>
              <label htmlFor="cantidad" style={{ fontWeight: 500, color: "#1a567b", marginBottom: 2 }}>Cantidad</label>
              <input id="cantidad" name="cantidad" type="number" min="1" placeholder="Cantidad" value={form.cantidad} onChange={handleChange} required style={{ padding: "10px 12px", border: "1.5px solid #cbe2f3", borderRadius: 6, fontSize: 15, background: "#fff" }} />
            </div>
            <div style={{ flex: 1, minWidth: 120, display: "flex", flexDirection: "column", gap: 6 }}>
              <label style={{ fontWeight: 500, color: "#1a567b", marginBottom: 2 }}>Precio Unitario</label>
              <div style={{ display: 'flex', alignItems: 'center', background: '#f3f6fa', border: '1.5px solid #cbe2f3', borderRadius: 6, padding: '10px 12px', color: '#6a7a8c', fontSize: 15, height: 40 }}>
                <span style={{ marginRight: 6, color: '#1a567b', fontWeight: 600 }}>$</span>
                <span style={{ fontWeight: 500 }}>{Number(form.precio).toFixed(2)}</span>
              </div>
            </div>
          </div>
          {/* Total visual */}
          <div style={{ marginTop: 8, marginBottom: 8, display: 'flex', alignItems: 'center', justifyContent: 'flex-end' }}>
            <span style={{ fontWeight: 500, color: '#1a567b', marginRight: 8 }}>Total:</span>
            <span style={{ background: '#f3f6fa', border: '1.5px solid #cbe2f3', borderRadius: 6, padding: '8px 16px', color: '#1a567b', fontWeight: 700, fontSize: 17, minWidth: 90, textAlign: 'right', display: 'inline-block' }}>
              ${ (Number(form.precio) * Number(form.cantidad)).toFixed(2) }
            </span>
          </div>
          {/* Botón para mostrar/ocultar factura fiscal */}
          <div style={{ textAlign: 'center', marginBottom: 16 }}>
            <button
              type="button"
              onClick={() => setShowFactura(v => !v)}
              style={{
                background: '#fff',
                color: '#1a567b',
                border: '1.5px solid #1a567b',
                borderRadius: 6,
                padding: '10px 24px',
                fontWeight: 600,
                fontSize: 16,
                cursor: 'pointer',
                marginTop: 8,
                marginBottom: 8,
                transition: 'background 0.2s, color 0.2s',
              }}
            >
              {showFactura ? 'Ocultar factura' : 'Ver factura'}
            </button>
          </div>
          {showFactura && form.producto && (
            <div style={{
              background: '#fff',
              border: '2.5px solid #1a567b',
              borderRadius: 14,
              boxShadow: '0 4px 24px rgba(26,86,123,0.10)',
              padding: 32,
              margin: '0 auto 24px auto',
              maxWidth: 520,
              color: '#1a567b',
              fontSize: 15,
              position: 'relative',
            }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 18 }}>
                <span style={{ fontWeight: 900, fontSize: 28, letterSpacing: 1, color: '#1a567b' }}>FACTURA FISCAL</span>
                <span style={{ fontWeight: 700, fontSize: 18, color: '#ffb300', letterSpacing: 1 }}>PanamaCompra</span>
              </div>
              <div style={{ marginBottom: 18, fontSize: 14 }}>
                <b>Cliente:</b> {user.nombre} <br />
                <b>Email:</b> {user.email}
              </div>
              <table style={{ width: '100%', borderCollapse: 'collapse', marginBottom: 18 }}>
                <thead>
                  <tr style={{ background: '#e6f0f7', color: '#1a567b' }}>
                    <th style={{ textAlign: 'left', padding: '8px 6px', fontWeight: 700, fontSize: 15 }}>Cantidad</th>
                    <th style={{ textAlign: 'left', padding: '8px 6px', fontWeight: 700, fontSize: 15 }}>Descripción</th>
                    <th style={{ textAlign: 'right', padding: '8px 6px', fontWeight: 700, fontSize: 15 }}>Precio Unitario</th>
                    <th style={{ textAlign: 'right', padding: '8px 6px', fontWeight: 700, fontSize: 15 }}>Total</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td style={{ padding: '8px 6px', borderBottom: '1px solid #e6f0f7' }}>{form.cantidad}</td>
                    <td style={{ padding: '8px 6px', borderBottom: '1px solid #e6f0f7' }}>{(() => {
                      const prod = productos.find(p => String(p.id) === String(form.producto));
                      return prod ? prod.descripcion : '';
                    })()}</td>
                    <td style={{ padding: '8px 6px', borderBottom: '1px solid #e6f0f7', textAlign: 'right' }}>${Number(form.precio).toFixed(2)}</td>
                    <td style={{ padding: '8px 6px', borderBottom: '1px solid #e6f0f7', textAlign: 'right' }}>${(Number(form.precio) * Number(form.cantidad)).toFixed(2)}</td>
                  </tr>
                </tbody>
              </table>
              <div style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center', marginTop: 18 }}>
                <span style={{ fontWeight: 700, fontSize: 18, marginRight: 12 }}>TOTAL:</span>
                <span style={{ background: '#e6f0f7', color: '#1a567b', fontWeight: 900, fontSize: 22, borderRadius: 8, padding: '8px 24px', letterSpacing: 1 }}>
                  ${ (Number(form.precio) * Number(form.cantidad)).toFixed(2) }
                </span>
              </div>
            </div>
          )}
          <button type="submit" disabled={enviando} style={{ width: "100%", padding: "12px 0", background: enviando ? "#b3d4ee" : "#1a567b", color: "#fff", border: "none", borderRadius: 6, fontWeight: 600, fontSize: 16, letterSpacing: 0.2, boxShadow: "0 2px 8px rgba(26,86,123,0.08)", cursor: enviando ? "not-allowed" : "pointer", transition: "background 0.2s" }}>
            {enviando ? "Enviando..." : "Enviar Cotización por Email"}
          </button>
        </form>
        {enviado && <div style={{ color: "green", marginTop: 14, textAlign: "center", fontWeight: 500 }}>¡Cotización enviada!</div>}
        <div style={{ marginTop: 28, textAlign: "center" }}>
          <PDFDownloadLink
            document={<CotizacionPDF {...form} productos={productos} />}
            fileName={`cotizacion_${form.nombre || "usuario"}.pdf`}
          >
            {({ loading }) => loading ? "Generando PDF..." : <span style={{ color: "#1a567b", fontWeight: 600, textDecoration: "underline", cursor: "pointer" }}>Descargar PDF</span>}
          </PDFDownloadLink>
        </div>
      </div>
      
      {/* Modal de vista previa del correo */}
      {showEmailPreview && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(0, 0, 0, 0.7)',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          zIndex: 1000,
          padding: '20px'
        }}>
          <div style={{
            backgroundColor: 'white',
            borderRadius: '8px',
            width: '100%',
            maxWidth: '800px',
            maxHeight: '90vh',
            overflow: 'hidden',
            display: 'flex',
            flexDirection: 'column'
          }}>
            {/* Encabezado del modal */}
            <div style={{
              backgroundColor: '#1a567b',
              color: 'white',
              padding: '15px 20px',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center'
            }}>
              <h3 style={{ margin: 0 }}>Vista previa del correo</h3>
              <button 
                onClick={handleCloseEmailPreview}
                style={{
                  background: 'none',
                  border: 'none',
                  color: 'white',
                  fontSize: '20px',
                  cursor: 'pointer',
                  padding: '5px 10px'
                }}
              >
                &times;
              </button>
            </div>
            
            {/* Cuerpo del correo */}
            <div style={{ 
              padding: '20px',
              flex: 1,
              overflowY: 'auto',
              backgroundColor: '#f5f5f5',
              borderBottom: '1px solid #ddd'
            }}>
              <div style={{
                maxWidth: '600px',
                margin: '0 auto',
                backgroundColor: 'white',
                borderRadius: '8px',
                boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
                overflow: 'hidden'
              }}>
                {/* Encabezado del correo */}
                <div style={{ 
                  backgroundColor: '#1a567b',
                  color: 'white',
                  padding: '20px',
                  textAlign: 'center'
                }}>
                  <h2 style={{ margin: 0, color: '#ffb300' }}>PanamaCompra</h2>
                  <p style={{ margin: '10px 0 0', opacity: 0.9 }}>Factura de Compra</p>
                </div>
                
                {/* Contenido del correo */}
                <div style={{ padding: '25px' }}>
                  <p>Estimado/a {form.nombre},</p>
                  
                  <p>Gracias por realizar tu compra en PanamaCompra. Adjunto encontrarás la factura de tu compra.</p>
                  
                  <div style={{
                    backgroundColor: '#f8f9fa',
                    padding: '15px',
                    borderRadius: '6px',
                    margin: '20px 0',
                    borderLeft: '4px solid #1a567b'
                  }}>
                    <p style={{ margin: '5px 0', fontWeight: 'bold' }}>Resumen de la compra:</p>
                    <p style={{ margin: '5px 0' }}>• Producto: {productos.find(p => String(p.id) === String(form.producto))?.nombre || 'N/A'}</p>
                    <p style={{ margin: '5px 0' }}>• Cantidad: {form.cantidad}</p>
                    <p style={{ margin: '5px 0' }}>• Precio unitario: ${parseFloat(form.precio).toFixed(2)}</p>
                    <p style={{ margin: '10px 0 0', paddingTop: '10px', borderTop: '1px solid #ddd', fontWeight: 'bold' }}>
                      Total: ${(parseFloat(form.precio) * parseInt(form.cantidad)).toFixed(2)}
                    </p>
                  </div>
                  
                  <p>Si tienes alguna pregunta sobre tu pedido, no dudes en contactarnos.</p>
                  
                  <p>¡Gracias por elegir PanamaCompra!</p>
                  
                  <p>Atentamente,<br/>El equipo de PanamaCompra</p>
                </div>
                
                {/* Pie de página del correo */}
                <div style={{
                  backgroundColor: '#f5f5f5',
                  padding: '15px 25px',
                  textAlign: 'center',
                  fontSize: '12px',
                  color: '#666',
                  borderTop: '1px solid #eee'
                }}>
                  <p style={{ margin: '5px 0' }}>© {new Date().getFullYear()} PanamaCompra. Todos los derechos reservados.</p>
                  <p style={{ margin: '5px 0', fontSize: '11px', color: '#999' }}>
                    Este es un correo automático, por favor no lo responda.
                  </p>
                </div>
              </div>
            </div>
            
            {/* Pie del modal */}
            <div style={{
              padding: '15px 20px',
              backgroundColor: '#f8f9fa',
              borderTop: '1px solid #ddd',
              display: 'flex',
              justifyContent: 'flex-end',
              gap: '10px'
            }}>
              <button
                onClick={handleCloseEmailPreview}
                style={{
                  padding: '8px 16px',
                  backgroundColor: '#6c757d',
                  color: 'white',
                  border: 'none',
                  borderRadius: '4px',
                  cursor: 'pointer'
                }}
              >
                Cerrar
              </button>
              <button
                onClick={handleDownloadPDF}
                style={{
                  padding: '8px 16px',
                  backgroundColor: '#1a567b',
                  color: 'white',
                  border: 'none',
                  borderRadius: '4px',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px'
                }}
              >
                <span>Descargar Factura</span>
                <span>↓</span>
              </button>
            </div>
          </div>
        </div>
      )}
      
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