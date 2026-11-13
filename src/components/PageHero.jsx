/* Hero de las páginas interiores: texto sobre la arena y una foto que se funde con ella.
   Estilos en pages-v8.css (.phero). */
export function PageHero({ title, lede, img, alt, children }) {
  return (
    <header className="phero">
      <div className="txt">
        <h1>{title}</h1>
        {lede && <p className="lede">{lede}</p>}
        {children && <div className="ctas">{children}</div>}
      </div>
      <figure className="ph">
        <img src={img} alt={alt} fetchPriority="high" />
      </figure>
    </header>
  );
}
