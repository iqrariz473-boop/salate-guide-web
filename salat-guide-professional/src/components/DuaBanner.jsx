import "./DuaBanner.css";

function DuaBanner() {
  return (
    <section className="dua-banner">
      <div className="dua-banner__inner">
        <div className="dua-banner__content">

          {/* Eyebrow */}
          <span className="dua-banner__eyebrow">
            Daily Dua
          </span>

          {/* Decoration */}
          <div
            className="dua-banner__decoration"
            aria-hidden="true"
          >
            ✦
          </div>

          {/* Arabic Dua */}
          <p
            className="dua-banner__arabic"
            lang="ar"
            dir="rtl"
          >
            رَبَّنَا آتِنَا فِي الدُّنْيَا حَسَنَةً وَفِي الْآخِرَةِ
            حَسَنَةً وَقِنَا عَذَابَ النَّارِ
          </p>

          {/* Translation */}
          <p className="dua-banner__translation">
            "Our Lord! Give us good in this world and good in the
            Hereafter, and save us from the punishment of the Fire."
          </p>

          {/* Citation */}
          <p className="dua-banner__citation">
            — Qur'an 2:201
          </p>

        </div>
      </div>
    </section>
  );
}

export default DuaBanner;