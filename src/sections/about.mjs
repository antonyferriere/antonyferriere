export function renderAbout() {
  return /* HTML */ `<section
    class="section about-section"
    id="a-propos"
    aria-labelledby="about-title"
  >
    <div class="container about-layout">
      <figure class="portrait" data-reveal>
        <img
          src="/images/antony-ferriere.webp"
          srcset="
            /images/antony-ferriere-small.webp 420w,
            /images/antony-ferriere.webp       750w
          "
          sizes="(max-width: 700px) 90vw, 35vw"
          alt="Antony Ferrière, photographié en lumière naturelle"
          width="750"
          height="1000"
          loading="lazy"
          decoding="async"
        />
        <figcaption>
          Le goût des projets utiles.<br />Et des chemins qui ouvrent des
          perspectives.
        </figcaption>
      </figure>
      <div class="about-copy">
        <header class="section-heading">
          <p class="eyebrow">À propos</p>
          <h2 id="about-title">Derrière<br />les projets</h2>
        </header>
        <p class="about-lead">
          Une double formation.<br />Une façon de relier les choses.
        </p>
        <p>
          Ingénieur informatique et titulaire d’un Master 2 en stratégie de
          communication, j’ai appris à regarder un même problème sous plusieurs
          angles : la technique, le message et la personne qui va utiliser la
          solution.
        </p>
        <p>
          J’aime comprendre, donner forme aux idées et les concrétiser avec les
          autres. La curiosité ouvre des pistes ; la rigueur aide à choisir
          celles qui ont du sens.
        </p>
        <ul class="values-list">
          <li>Curieux</li>
          <li>Créatif</li>
          <li>Rationnel</li>
          <li>Collectif</li>
          <li>Utile</li>
        </ul>
        <p class="outside-work">
          Hors écran, je prends l’air : randonnée, rollers, paddle et
          photographie. La nature m’offre un autre rythme et de nouvelles
          perspectives.
        </p>
        <div class="education">
          <p>
            <strong>2005</strong> Ingénieur informatique <span>3iL / ITII</span>
          </p>
          <p>
            <strong>2007</strong> Master 2 stratégie de communication
            <span>ECEMA</span>
          </p>
        </div>
      </div>
    </div>
  </section>`;
}
