from flask import Flask, request, jsonify
from flask_cors import CORS
from recommend import recommend

app = Flask(__name__)
CORS(app)


@app.route("/health", methods=["GET"])
def health():
    return jsonify({"status": "ok", "service": "SkillSage ML API"})


@app.route("/recommend", methods=["POST"])
def get_recommendations():
    data = request.get_json()

    if not data or "query" not in data:
        return jsonify({"error": "Missing 'query' field in request body"}), 400

    query = data["query"].strip()

    if not query:
        return jsonify({"error": "Query cannot be empty"}), 400

    try:
        results = recommend(query, top_n=5)
        return jsonify({"recommended_courses": results})
    except Exception as e:
        return jsonify({"error": str(e)}), 500


if __name__ == "__main__":
    print("🚀 SkillSage ML service running on http://localhost:5001")
    app.run(host="0.0.0.0", port=5001, debug=False)
