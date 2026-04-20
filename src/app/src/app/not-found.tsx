'use client';

export default function NotFound() {
  return (
    <html lang="es">
      <body style={{
        backgroundColor: '#0B1E3D', /* Tu color Navy */
        color: '#FFFFFF',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
        margin: 0,
        fontFamily: 'system-ui, sans-serif'
      }}>
        <div style={{ textAlign: 'center' }}>
          <h1 style={{ fontSize: '6rem', color: '#00AEEF', margin: 0, fontWeight: '900' }}>
            404
          </h1>
          <h2 style={{ fontSize: '1.5rem', margin: '10px 0 30px 0', opacity: 0.8 }}>
            Página o recurso no encontrado
          </h2>
          <a href="/" style={{
            backgroundColor: '#00AEEF', /* Tu color Cyan */
            color: '#0B1E3D',
            padding: '14px 28px',
            borderRadius: '12px',
            textDecoration: 'none',
            fontWeight: '900',
            transition: 'opacity 0.3s'
          }}>
            Volver al inicio
          </a>
        </div>
      </body>
    </html>
  );
}