import { Info, Truck, FileText, CreditCard } from 'lucide-react';

export default function Benefits() {
  return (
    <div className="bg-lfond py-12">
      <div className="w-full px-8">
        <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">
          Pourquoi choisir notre plateforme
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Avantage 1 */}
          <div className="flex flex-col items-center bg-lsecondary text-center p-6 rounded-lg border border-lfond hover:shadow-lg transition-shadow">
            <CreditCard className="h-12 w-12 text-khder mb-4" />
            <h3 className="text-xl font-bold mb-2 text-gray-800">Payement en ligne</h3>
            <p className="text-gray-600">
              Évitez les déplacements tout en profitant de vos remboursements
            </p>
          </div>
          
          {/* Avantage 2 */}
          <div className="flex flex-col items-center bg-lsecondary text-center p-6 rounded-lg border border-lfond hover:shadow-lg transition-shadow">
            <Info className="h-12 w-12 text-khder mb-4" />
            <h3 className="text-xl font-bold mb-2 text-gray-800">Informations</h3>
            <p className="text-gray-600">
              Accédez aux détails de n’importe quel médicament
            </p>
          </div>
          
          {/* Avantage 3 */}
          <div className="flex flex-col items-center bg-lsecondary text-center p-6 rounded-lg border border-lfond hover:shadow-lg transition-shadow">
            <FileText className="h-12 w-12 text-khder mb-4" />
            <h3 className="text-xl font-bold mb-2 text-gray-800">Ordonnances</h3>
            <p className="text-gray-600">
              Consultez toutes vos ordonnances médicales en un seul endroit
            </p>
          </div>
          
          {/* Avantage 4 */}
          <div className="flex flex-col items-center bg-lsecondary text-center p-6 rounded-lg border border-lfond hover:shadow-lg transition-shadow">
            <Truck className="h-12 w-12 text-khder mb-4" />
            <h3 className="text-xl font-bold mb-2 text-gray-800">Livraison disponible</h3>
            <p className="text-gray-600">
              Commandez vos médicaments et recevez-les directement chez vous
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

{/*export default function Benefits() {
  return (
    <section className="bg-white py-12">
  <h2 className="text-4xl font-bold text-center">Pourquoi nous choisir ?</h2>
  <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-6 px-8">
    <div className="text-center p-6 border border-gray-300 rounded-lg">
      <img src="/images/prix.svg" alt="Prix bas" className="mx-auto h-20"/>
      <p className="mt-4 text-xl font-medium">Des prix abordables, avec ou sans assurance</p>
    </div>
    <div className="text-center p-6 border border-gray-300 rounded-lg">
      <img src="/images/livraison.svg" alt="Livraison rapide" className="mx-auto h-20"/>
      <p className="mt-4 text-xl font-medium">Livraison rapide et sécurisée</p>
    </div>
    <div className="text-center p-6 border border-gray-300 rounded-lg">
      <img src="/images/pharmaciens.svg" alt="Support 24/7" className="mx-auto h-20"/>
      <p className="mt-4 text-xl font-medium">Pharmaciens disponibles 24/7</p>
    </div>
  </div>
</section>
  );
}*/}
