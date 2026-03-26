import CategoryPageClient from "@/src/views/CategoryPage";

const categoryMeta = {
  tollywood: {
    title: "Tollywood Movies - Latest & Trending Telugu Movies",
    description: "Browse the latest and trending Tollywood Telugu movies. Discover ratings, reviews and recommendations on iBommaFlix.",
  },
  bollywood: {
    title: "Bollywood Movies - Latest & Trending Hindi Movies",
    description: "Browse the latest and trending Bollywood Hindi movies. Discover ratings, reviews and recommendations on iBommaFlix.",
  },
  hollywood: {
    title: "Hollywood Movies - Latest & Trending English Movies",
    description: "Browse the latest and trending Hollywood English movies. Discover ratings, reviews and recommendations on iBommaFlix.",
  },
};

export async function generateMetadata({ params }) {
  const { type } = await params;
  const meta = categoryMeta[type] || { title: "Movies", description: "Browse movies on iBommaFlix." };
  const canonicalUrl = `https://ibommaflix.com/category/${type}`;

  return {
    title: meta.title,
    description: meta.description,
    alternates: { canonical: canonicalUrl },
    openGraph: {
      title: meta.title,
      description: meta.description,
      url: canonicalUrl,
    },
    twitter: {
      title: meta.title,
      description: meta.description,
    },
  };
}

export default async function CategoryRoute({ params }) {
  const { type } = await params;
  return <CategoryPageClient typeParam={type} />;
}
