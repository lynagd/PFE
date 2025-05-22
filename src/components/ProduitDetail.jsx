import { useParams } from "react-router-dom";

export default function ProduitDetail() {
  const { id } = useParams();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-3xl font-bold mb-4">Détail du produit</h1>
      <p>ID du produit : {id}</p>
      {/* Ajoute ici le fetch et l'affichage des infos plus tard */}
    </div>
  );
}