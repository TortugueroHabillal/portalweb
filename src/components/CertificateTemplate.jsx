import React from "react";
import { TOKENS, LOGO_URL } from "../theme";

export function CertificateTemplate({
  donorName = "María Mercedes Pérez",
  temporada = "Temporada 2026",
  fecha = "14 de Septiembre de 2026",
  responsableNombre = "", // Se completa hasta que exista el envío del certificado real por correo
  responsableCargo = "",
  signatureSrc = null, // Se puede pasar la ruta del PNG de la firma cuando esté disponible
}) {
  return (
    <div
      className="certificate-print-area"
      style={{
        width: "100%",
        maxWidth: "920px",
        margin: "0 auto",
        boxSizing: "border-box",
      }}
    >
      {/* SVG Vector Scaling Container: Comportamiento idéntico a una imagen fija en móvil */}
      <svg
        viewBox="0 0 920 630"
        style={{
          width: "100%",
          height: "auto",
          display: "block",
          filter: "drop-shadow(0px 15px 35px rgba(0,0,0,0.15))",
        }}
      >
        <foreignObject x="0" y="0" width="920" height="630">
          <div
            xmlns="http://www.w3.org/1999/xhtml"
            style={{
              width: "920px",
              height: "630px",
              background: "#FAF8F3",
              border: `8px solid ${TOKENS.noche}`,
              padding: "16px",
              boxSizing: "border-box",
              fontFamily: "'Public Sans', sans-serif",
              userSelect: "none",
            }}
          >
            {/* Marco Interno Institucional de Doble Línea Recta */}
            <div
              style={{
                width: "100%",
                height: "100%",
                border: `2px solid ${TOKENS.azulOlaOscuro}`,
                padding: "32px 48px",
                boxSizing: "border-box",
                position: "relative",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                alignItems: "center",
                textAlign: "center",
                background: `radial-gradient(circle at center, #FFFFFF 40%, #FAF8F3 100%)`,
              }}
            >
              {/* Marca de Agua de Fondo */}
              <div
                style={{
                  position: "absolute",
                  top: "50%",
                  left: "50%",
                  transform: "translate(-50%, -50%)",
                  opacity: 0.04,
                  pointerEvents: "none",
                }}
              >
                <img src={LOGO_URL} alt="Marca de agua" loading="lazy" style={{ width: "380px", height: "auto" }} />
              </div>

              {/* ENCABEZADO */}
              <div style={{ width: "100%", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <img src={LOGO_URL} alt="Logo Campamento" loading="lazy" style={{ width: "90px", height: "auto" }} />

                <div style={{ textAlign: "center" }}>
                  <span
                    style={{
                      fontFamily: "'Public Sans', sans-serif",
                      fontSize: "11px",
                      fontWeight: 700,
                      letterSpacing: "0.18em",
                      textTransform: "uppercase",
                      color: TOKENS.azulOlaOscuro,
                      display: "block",
                    }}
                  >
                    Campamento Tortuguero "El Habillal" A.C.
                  </span>
                  <span style={{ fontSize: "10.5px", color: TOKENS.conchaSuave, letterSpacing: "0.08em" }}>
                    Lázaro Cárdenas, Michoacán, México
                  </span>
                </div>

                <div style={{ textAlign: "right" }}>
                  <span style={{ fontSize: "11px", fontWeight: 700, color: TOKENS.noche, display: "block" }}>
                    {temporada}
                  </span>
                  <span style={{ fontSize: "10.5px", color: TOKENS.conchaSuave }}>{fecha}</span>
                </div>
              </div>

              {/* TÍTULO PRINCIPAL */}
              <div style={{ marginTop: "10px", marginBottom: "6px" }}>
                <h1
                  style={{
                    fontFamily: "'Fraunces', serif",
                    fontSize: "30px",
                    color: TOKENS.noche,
                    margin: "0 0 6px",
                    letterSpacing: "0.04em",
                    textTransform: "uppercase",
                  }}
                >
                  Reconocimiento de Apadrinamiento
                </h1>
                <div style={{ width: "120px", height: "2px", background: TOKENS.coral, margin: "0 auto" }} />
              </div>

              {/* TEXTO DE RECONOCIMIENTO */}
              <div style={{ maxWidth: "680px" }}>
                <p
                  style={{
                    fontSize: "14px",
                    color: TOKENS.concha,
                    lineHeight: 1.6,
                    margin: "0 0 14px",
                  }}
                >
                  Por su invaluable apoyo y compromiso con la conservación de la tortuga marina en las costas del Pacífico mexicano, se otorga el presente certificado a:
                </p>

                {/* NOMBRE DEL DONANTE (DESTACADO) */}
                <div
                  style={{
                    borderBottom: `2px solid ${TOKENS.azulOlaOscuro}`,
                    paddingBottom: "6px",
                    marginBottom: "14px",
                    display: "inline-block",
                    minWidth: "340px",
                  }}
                >
                  <h2
                    style={{
                      fontFamily: "'Fraunces', serif",
                      fontSize: "34px",
                      fontWeight: 700,
                      color: TOKENS.azulOlaOscuro,
                      margin: 0,
                      letterSpacing: "0.02em",
                    }}
                  >
                    {donorName || "Nombre del Donante"}
                  </h2>
                </div>

                <p style={{ fontSize: "13px", color: TOKENS.conchaSuave, margin: 0, lineHeight: 1.5 }}>
                  Gracias a tu aportación, financiamos las patrullas nocturnas, la protección en el corral de incubación y el feliz retorno de las crías al océano.
                </p>
              </div>

              {/* SECCIÓN DE FIRMA Y PIE CENTRADA */}
              <div
                style={{
                  width: "100%",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  marginTop: "16px",
                  paddingTop: "8px",
                }}
              >
                {/* Área de Firma del Responsable */}
                <div style={{ textAlign: "center", width: "280px", margin: "0 auto" }}>
                  <div style={{ height: "50px", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "4px" }}>
                    {signatureSrc ? (
                      <img src={signatureSrc} alt="Firma Responsable" loading="lazy" style={{ maxHeight: "50px", width: "auto" }} />
                    ) : (
                      <div
                        style={{
                          fontFamily: "'Fraunces', serif",
                          fontStyle: "italic",
                          fontSize: "17px",
                          color: TOKENS.nocheSuave,
                          opacity: 0.6,
                        }}
                      >
                      </div>
                    )}
                  </div>
                  <div style={{ borderTop: `1px solid ${TOKENS.noche}`, paddingTop: "4px", minHeight: "34px" }}>
                    <span style={{ fontFamily: "'Public Sans', sans-serif", fontSize: "13.5px", fontWeight: 700, color: TOKENS.noche, display: "block", minHeight: "17px" }}>
                      {responsableNombre}
                    </span>
                    <span style={{ fontSize: "11px", color: TOKENS.conchaSuave, display: "block", minHeight: "14px" }}>{responsableCargo}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </foreignObject>
      </svg>
    </div>
  );
}
