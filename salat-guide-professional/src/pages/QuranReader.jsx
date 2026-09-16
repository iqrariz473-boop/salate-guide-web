import { Link, useParams } from "react-router-dom";

function QuranReader() {
  const { surahId } = useParams();

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#f7f5e9",
        padding: "120px 20px",
      }}
    >
      <div
        style={{
          maxWidth: "900px",
          margin: "0 auto",
          background: "#ffffff",
          borderRadius: "20px",
          padding: "50px 30px",
          textAlign: "center",
          boxShadow: "0 10px 30px rgba(0,0,0,0.08)",
        }}
      >
        <div
          style={{
            fontSize: "50px",
            marginBottom: "20px",
          }}
        >
          📖
        </div>

        <h1
          style={{
            color: "#0d3025",
            marginBottom: "15px",
          }}
        >
          Quran Reader
        </h1>

        <h2
          style={{
            color: "#b48c35",
            marginBottom: "20px",
          }}
        >
          Surah {surahId}
        </h2>

        <p
          style={{
            color: "#666",
            marginBottom: "30px",
          }}
        >
          Quran Reader page is working successfully.
        </p>

        <Link
          to="/quran"
          style={{
            display: "inline-block",
            padding: "12px 22px",
            borderRadius: "10px",
            background: "#0d3025",
            color: "#fff",
            textDecoration: "none",
            fontWeight: "700",
          }}
        >
          ← Back to Quran
        </Link>
      </div>
    </div>
  );
}

export default QuranReader;