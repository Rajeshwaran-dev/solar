import { useParams } from "react-router-dom";
import Products from "./Products";

export default function CategoryPage() {
  const { slug } = useParams();
  return <Products categorySlug={slug} />;
}
