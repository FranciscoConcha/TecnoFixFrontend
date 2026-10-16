import { useState, type FormEvent } from "react";
import { registrarTecnico } from "../../Api/Auth";
import styles from "../../styles/Form.module.css";

export function RegisterTecnico() {
  const [name, setName] = useState("");
  const [correo, setCorreo] = useState("");
  const [especialidad, setEspecialidad] = useState("");

  const [error, setError] = useState<string | null>(null);
  const [mensajeExito, setMensajeExito] = useState<string | null>(null);
  const [cargando, setCargando] = useState(false);

  async function manejarSubmit(evento: FormEvent) {
    evento.preventDefault();
    setError(null);
    setMensajeExito(null);
    setCargando(true);

    try {
      const respuesta = await registrarTecnico({ name, correo, especialidad });
      setMensajeExito(respuesta.mensaje);
      setName("");
      setCorreo("");
      setEspecialidad("");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error desconocido");
    } finally {
      setCargando(false);
    }
  }

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Registrar técnico</h1>

      {error && <p className={styles.error}>{error}</p>}
      {mensajeExito && <p className={styles.success}>{mensajeExito}</p>}

      <form onSubmit={manejarSubmit}>
        <div className={styles.field}>
          <label className={styles.label} htmlFor="name">Nombre completo</label>
          <input id="name" type="text" className={styles.input}
            value={name} onChange={(e) => setName(e.target.value)} required />
        </div>

        <div className={styles.field}>
          <label className={styles.label} htmlFor="correo">Correo</label>
          <input id="correo" type="email" className={styles.input}
            value={correo} onChange={(e) => setCorreo(e.target.value)} required />
        </div>

        <div className={styles.field}>
          <label className={styles.label} htmlFor="especialidad">Especialidad</label>
          <input id="especialidad" type="text" className={styles.input}
            value={especialidad} onChange={(e) => setEspecialidad(e.target.value)}
            placeholder="Ej: Celulares, Notebooks" required />
        </div>

        <button type="submit" className={styles.button} disabled={cargando}>
          {cargando ? "Registrando..." : "Registrar técnico"}
        </button>
      </form>
    </div>
  );
}