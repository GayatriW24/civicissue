import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const title = "CivicIssues";

function Intro() {
  const navigate = useNavigate();
  const [showTagline, setShowTagline] = useState(false);

  useEffect(() => {
    const taglineTimer = setTimeout(() => {
      setShowTagline(true);
    }, title.length * 150);

    const redirectTimer = setTimeout(() => {
      navigate("/home", { replace: true });
    }, 3000);

    return () => {
      clearTimeout(taglineTimer);
      clearTimeout(redirectTimer);
    };
  }, [navigate]);

  return (
    <div className="h-screen flex flex-col items-center justify-center bg-white text-center">
      <h1 className="text-6xl font-extrabold tracking-wide text-green-700">
        {title.split("").map((char, index) => (
          <span
            key={index}
            className="inline-block opacity-0 animate-letter"
            style={{ animationDelay: `${index * 0.15}s` }}
          >
            {char}
          </span>
        ))}
      </h1>

      {showTagline && (
        <p className="mt-6 text-lg text-gray-600 max-w-xl animate-fadeUp">
          A Digital Portal for Efficient Civic Complaint Handling
        </p>
      )}
    </div>
  );
}

export default Intro;
