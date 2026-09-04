import { useState } from "react";
import { PILLAR_ICONS, ChevronDownIcon } from "./Icons.jsx";
import "./PillarCard.css";

function PillarCard({ pillar }) {
  const [isExpanded, setIsExpanded] = useState(false);
  const Icon = PILLAR_ICONS[pillar.id];
  const detailId = `pillar-detail-${pillar.id}`;

  return (
    <div className="pillar-card">
      <div className="pillar-card__icon">
        <Icon aria-hidden="true" />
      </div>
      <h3>{pillar.name}</h3>
      <p className="pillar-card__arabic" lang="ar" dir="rtl">
        {pillar.arabic}
      </p>
      <p className="pillar-card__subtitle">{pillar.subtitle}</p>
      <p className="pillar-card__summary">{pillar.summary}</p>

      <button
        type="button"
        className="pillar-card__toggle"
        aria-expanded={isExpanded}
        aria-controls={detailId}
        onClick={() => setIsExpanded((open) => !open)}
      >
        {isExpanded ? "Show less" : "Learn more"}
        <ChevronDownIcon
          width={16}
          height={16}
          style={{ transform: isExpanded ? "rotate(180deg)" : "none" }}
        />
      </button>

      {isExpanded && (
        <p id={detailId} className="pillar-card__detail">
          {pillar.details}
        </p>
      )}
    </div>
  );
}

export default PillarCard;
