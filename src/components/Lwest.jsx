import { Lock } from 'lucide-react';

export default function Lwest() {
  return (
    <div className="w-full py-16 px-8 flex items-center bg-lfond">
      <div className="w-1/2 pr-8">
        <h1 className="text-5xl text-serif font-bold text-gray-800 mb-4">
          Simplifiez votre quotidien santé.
        </h1>
        <p className="text-xl text-serif text-gray-600 mb-8">
          Enfin, la plateforme qui connecte toutes vos pharmacies.
        </p>
        
        <button className="bg-yellow-400 hover:bg-yellow-500 px-6 py-3 rounded-md text-gray-800 font-bold mb-4">
          Se connecter | S'inscrire
        </button>
        
        <div className="flex items-center text-gray-700">
          <Lock className="h-4 w-4 mr-2" />
          <span>Vos informations de santé sont toujours protégées.</span>
        </div>
      </div>
      
      <div className="w-1/2">
        <img 
          src="/public\pngegg(1).png" 
          alt="Medication bottle" 
          className="max-w-full" 
        />
      </div>
    </div>
  );
}


{/*export default function Lwest() {
  return (
   <section className="flex flex-col items-center justify-center h-[80vh] bg-gradient-to-r from-blue-600 to-purple-600 text-white text-center p-8">
  <h2 className="text-5xl font-bold max-w-2xl">Économisez du temps et de l'argent</h2>
  <p className="text-lg mt-4 max-w-lg">Enfin, une pharmacie qui vous facilite la vie.</p>
  <button className="mt-6 px-8 py-3 bg-yellow-400 text-blue-900 font-semibold text-lg rounded-lg shadow-md hover:bg-yellow-300">
    S'inscrire maintenant
  </button>
</section>
  );
}*/}
