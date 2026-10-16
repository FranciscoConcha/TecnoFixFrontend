import { useState, type FormEvent } from "react";
import { registrarOrden } from "../../Api/Orden";
import styles from "../../styles/Form.module.css";

export function RegisterOrden() {
  const [rutCliente, setRutCliente] = useState("");
  const [tipoEquipo, setTipoEquipo] = useState("");
  const [marca, setMarca] = useState("");
  const [modelo, setModelo] = useState("");
  const [numeroSerie, setNumeroSerie] = useState("");
  const [descripcionFalla, setDescripcionFalla] = useState("");
  const [accesoriosEntregados, setAccesoriosEntregados] = useState("");

  const [error, setError] = useState<string | null>(null);
  const [mensajeExito, setMensajeExito] = useState<string | null>(null);
  const [cargando, setCargando] = useState(false);

  async function manejarSubmit(evento: FormEvent) {
    evento.preventDefault();
    setError(null);
    setMensajeExito(null);
    setCargando(true);

    try {
      const respuesta = await registrarOrden({
        rutCliente,
        tipoEquipo,
        marca,
        modelo,
        numeroSerie,
        descripcionFalla,
        accesoriosEntregados,
      });

      setMensajeExito(
        `Orden ${respuesta.numeroOrden} registrada para ${respuesta.nombreCliente} (estado: ${respuesta.estado}).`
      );

      setRutCliente("");
      setTipoEquipo("");
      setMarca("");
      setModelo("");
      setNumeroSerie("");
      setDescripcionFalla("");
      setAccesoriosEntregados("");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error desconocido");
    } finally {
      setCargando(false);
    }
  }

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Registrar orden de reparación</h1>

      {error && <p className={styles.error}>{error}</p>}
      {mensajeExito && <p className={styles.success}>{mensajeExito}</p>}

      <form onSubmit={manejarSubmit}>
        <div className={styles.field}>
          <label className={styles.label} htmlFor="rutCliente">RUT del cliente (sin puntos ni guion)</label>
          <input id="rutCliente" type="text" className={styles.input}
            value={rutCliente} onChange={(e) => setRutCliente(e.target.value)}
            placeholder="123456785" required />
        </div>

        <div className={styles.field}>
          <label className={styles.label} htmlFor="tipoEquipo">Tipo de equipo</label>
          <input id="tipoEquipo" type="text" className={styles.input}
            value={tipoEquipo} onChange={(e) => setTipoEquipo(e.target.value)}
            placeholder="Notebook, celular, tablet..." required />
        </div>

        <div className={styles.field}>
          <label className={styles.label} htmlFor="marca">Marca</label>
          <input id="marca" type="text" className={styles.input}
            value={marca} onChange={(e) => setMarca(e.target.value)} required />
        </div>

        <div className={styles.field}>
          <label className={styles.label} htmlFor="modelo">Modelo</label>
          <input id="modelo" type="text" className={styles.input}
            value={modelo} onChange={(e) => setModelo(e.target.value)} required />
        </div>

        <div className={styles.field}>
          <label className={styles.label} htmlFor="numeroSerie">Número de serie (opcional)</label>
          <input id="numeroSerie" type="text" className={styles.input}
            value={numeroSerie} onChange={(e) => setNumeroSerie(e.target.value)} />
        </div>

        <div className={styles.field}>
          <label className={styles.label} htmlFor="descripcionFalla">Descripción de la falla</label>
          <textarea id="descripcionFalla" rows={3} className={styles.input}
            value={descripcionFalla} onChange={(e) => setDescripcionFalla(e.target.value)} required />
        </div>

        <div className={styles.field}>
          <label className={styles.label} htmlFor="accesorios">Accesorios entregados (opcional)</label>
          <input id="accesorios" type="text" className={styles.input}
            value={accesoriosEntregados} onChange={(e) => setAccesoriosEntregados(e.target.value)}
            placeholder="Cargador, funda..." />
        </div>

        <button type="submit" className={styles.button} disabled={cargando}>
          {cargando ? "Registrando..." : "Registrar orden"}
        </button>
      </form>
    </div>
  );
}