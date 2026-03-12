import pandas as pd
import numpy as np
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity
import os

# Load dataset
BASE_DIR = os.path.dirname(os.path.abspath(__file__))
CSV_PATH = os.path.join(BASE_DIR, "courses.csv")

df = pd.read_csv(CSV_PATH)

# Drop unnamed index column if present
df = df.loc[:, ~df.columns.str.contains('^Unnamed')]

# Rename columns for ease of use
df.columns = [c.strip() for c in df.columns]

# Fill NaN with empty string
df = df.fillna('')

# Build a combined text feature for TF-IDF
df['combined'] = (
    df['course_title'] + ' ' +
    df['course_organization'] + ' ' +
    df['course_Certificate_type'] + ' ' +
    df['course_difficulty']
)

# Build TF-IDF matrix
vectorizer = TfidfVectorizer(stop_words='english', ngram_range=(1, 2))
tfidf_matrix = vectorizer.fit_transform(df['combined'])


def recommend(query: str, top_n: int = 5):
    """
    Given a free-text query, return top_n recommended courses.
    Each result: { title, platform, rating, difficulty, url }
    """
    query_vec = vectorizer.transform([query])
    cosine_scores = cosine_similarity(query_vec, tfidf_matrix).flatten()

    top_indices = np.argsort(cosine_scores)[::-1][:top_n]

    results = []
    for idx in top_indices:
        row = df.iloc[idx]
        title = row['course_title']
        # Build a Coursera-like search URL from the title
        slug = title.lower().replace(' ', '-').replace('/', '-').replace(':', '').replace(',', '').replace('&', 'and')
        url = f"https://www.coursera.org/search?query={title.replace(' ', '+')}"
        results.append({
            "title": title,
            "platform": row['course_organization'],
            "rating": str(row['course_rating']),
            "difficulty": row['course_difficulty'],
            "certificate_type": row['course_Certificate_type'],
            "students_enrolled": row.get('course_students_enrolled', 'N/A'),
            "url": url
        })

    return results
