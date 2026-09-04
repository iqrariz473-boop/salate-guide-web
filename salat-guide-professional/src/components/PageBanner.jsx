import "./PageBanner.css";

function PageBanner({
  image,
  icon: Icon,
  title,
  description,
  variant = "light",
  showSearch = false,
  searchPlaceholder = "Search cities, countries...",
}) {
  return (
    <section
      className={`page-banner page-banner--${variant}`}
      style={{
        backgroundImage: `url(${image})`,
      }}
    >
      {/* Overlay */}
      <div
        className="page-banner__overlay"
        aria-hidden="true"
      />

      {/* Hero Content */}
      <div className="container page-banner__inner">

        {/* Icon */}
        {Icon && (
          <Icon
            className="page-banner__icon"
            aria-hidden="true"
          />
        )}

        {/* Title */}
        <h2>{title}</h2>

        {/* Description */}
        <p>{description}</p>

        {/* Search */}
        {showSearch && (
          <form
            className="page-banner__search"
            onSubmit={(e) => e.preventDefault()}
          >
            <div className="page-banner__search-icon">
              🔍
            </div>

            <input
              type="text"
              placeholder={searchPlaceholder}
              aria-label="Search"
            />

            <button type="submit">
              Search
            </button>
          </form>
        )}

      </div>
    </section>
  );
}

export default PageBanner;