import { useState, useEffect, useContext, createContext } from "react";
import './Ejemplo.css'

export function FormularioNombre() {
    const [nombre, setNombre] = useState('');

    const manejarCambio = (e) => {
        setNombre(e.target.value);
    };

    return (
        <div>
            <label>Ingresa tu nombre:</label>
            <input type="text" value={nombre} onChange={manejarCambio} />
            <p>Hola, {nombre || 'Anónimo'} </p>
        </div>
    );
}

export function Usuarios() {
    const [usuarios, setUsuarios] = useState([]);

    useEffect(() => {
        fetch('https://jsonplaceholder.typicode.com/users')
            .then((respuesta) => respuesta.json())
            .then((datos) => setUsuarios(datos));
    }, []);

    return (
        <div>
            <h2>Lista de Usuarios con useEffect</h2>
            <ul>
                {usuarios.map((usuario) => (
                    <li key={usuario.id}>{usuario.name}</li>
                ))}
            </ul>
        </div>
    );
}

const colorContext = createContext('oscuro');
export function EstiloBoton() {
    const tema = useContext(colorContext);

    return (
        <button className={`btn-${tema}`}>
            Botón en modo {tema}
        </button>
    );
}

export function ListaDeUsuarios() {
    const [usuarios, setUsuarios] = useState([]);
    const [cargando, setCargando] = useState(true);

    useEffect(() => {
        const obtenerUsuarios = async () => {
            try {
                const respuesta = await fetch('https://jsonplaceholder.typicode.com/users');
                const datos = await respuesta.json();
                setUsuarios(datos);
            } catch (error) {
                console.error('Error al obtener usuarios:', error);
            } finally {
                setCargando(false);
            }
        };

        obtenerUsuarios();
    }, []);

    if (cargando) return <p>Cargando usuarios...</p>;

    return (
        <>
            <h2>Lista de Usuarios usando método asyncEffect</h2>
            <ul>
                {usuarios.map((usuario) => (
                    <li key={usuario.id}>{usuario.name}</li>

                ))}
            </ul>
        </>
    );
}

function useFetch(url) {
    const [data, setData] = useState(null);
    const [cargando, setCargando] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const obtenerDatos = async () => {
            try {
                const respuesta = await fetch(url);
                if (!respuesta.ok) throw new Error('Error en la red');
                const resultado = await respuesta.json();
                setData(resultado);
            } catch (err) {
                setError(err);
            } finally {
                setCargando(false);
            }
        };

        obtenerDatos();
    }, [url]);

    return { data, cargando, error };
}

//función donde usamos nuestro hook personalizado "useFetch"
export function UsuariosFetch() {
    const { data: usuarios, cargando, error } = useFetch('https://jsonplaceholder.typicode.com/users');

    if (cargando) return <p>Cargando...</p>;
    if (error) return <p>Error: {error.message}</p>;

    return (
        <> {/* React.Fragment Agrupa elementos */}
            <h1>Lista de usuarios con Custom Hook useFetch</h1>
            <ul>
                {/* Si usuarios es null o undefined, el operador ? evita que la app colapse */}
                {usuarios?.map((usuario) => (
                    <li key={usuario.id}>{usuario.name}</li>
                ))}
            </ul>
        </>
    );
}

