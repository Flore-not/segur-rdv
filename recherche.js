(function () {
  var MOTIFS = [
    { id: 'vente', nom: "Vente d'un bien immobilier", k: ['vente', 'vendre', 'vendeur', 'compromis'] },
    { id: 'acquisition', nom: "Acquisition d'un bien immobilier", k: ['achat', 'acheter', 'acquisition', 'acquerir', 'appartement', 'maison', 'pret'] },
    { id: 'testament', nom: 'Testament', k: ['testament', 'legs'] },
    { id: 'divorce', nom: 'Séparation, divorce', k: ['divorce', 'separation'] },
    { id: 'mariage', nom: 'Contrat de mariage ou PACS', k: ['mariage', 'pacs', 'regime'] },
    { id: 'donation', nom: 'Donation, transmission et organisation du patrimoine', k: ['donation', 'donner', 'transmission', 'patrimoine'] },
    { id: 'succession', nom: 'Ouverture de succession', k: ['succession', 'deces', 'heritage', 'heritier'] },
    { id: 'suivi', nom: 'Suivi de dossier', k: ['suivi', 'dossier en cours'] }
  ];
  var DEFAUT = { id: 'renseignements', nom: 'Premier rendez-vous, renseignements (45 minutes, à l’étude ou en visioconférence)' };
  var MOTS = ['achat', 'vente', 'donation', 'succession', 'testament', 'divorce', 'mariage', 'PACS'];

  function norm(s) { return (s || '').toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '').trim(); }
  function trouver(q) {
    q = norm(q);
    if (!q) return null;
    for (var i = 0; i < MOTIFS.length; i++) {
      for (var j = 0; j < MOTIFS[i].k.length; j++) { if (q.indexOf(MOTIFS[i].k[j]) !== -1) return MOTIFS[i]; }
    }
    return DEFAUT;
  }

  document.addEventListener('DOMContentLoaded', function () {
    var zone = document.querySelector('[data-recherche]');
    if (!zone) return;
    var mode = zone.getAttribute('data-recherche'); // "etude" ou "flore"
    var bookings = zone.getAttribute('data-bookings');
    var input = zone.querySelector('input');
    var label = zone.querySelector('.resultat strong');
    var texte = zone.querySelector('.resultat span');
    var lien = zone.querySelector('.resultat a');
    var puces = zone.querySelector('.puces');
    var exemple = texte.textContent;

    MOTS.forEach(function (m) {
      var b = document.createElement('button');
      b.type = 'button'; b.textContent = m;
      b.addEventListener('click', function () { input.value = m; maj(); });
      puces.appendChild(b);
    });

    function maj() {
      var r = trouver(input.value);
      document.querySelectorAll('.motif.vu').forEach(function (el) { el.classList.remove('vu'); });
      if (!r) { label.textContent = 'Exemple :'; texte.textContent = exemple; lien.hidden = true; return; }
      label.textContent = r === DEFAUT ? 'Nous vous proposons :' : 'Motif conseillé :';
      texte.textContent = r.nom;
      lien.hidden = false;
      if (mode === 'flore') {
        var carte = document.getElementById(r.id);
        if (carte) carte.classList.add('vu');
        lien.href = '#' + r.id; lien.removeAttribute('target');
        lien.textContent = 'Voir ce motif';
      } else {
        lien.href = 'flore.html#' + r.id; lien.removeAttribute('target');
        lien.textContent = 'Voir ce motif';
      }
    }
    input.addEventListener('input', maj);
    zone.querySelector('form').addEventListener('submit', function (e) {
      e.preventDefault(); maj();
      if (!lien.hidden) { if (lien.target === '_blank') window.open(lien.href, '_blank', 'noopener'); else window.location.href = lien.href; }
    });
  });
})();
