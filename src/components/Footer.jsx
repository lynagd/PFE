export default function Footer() {
  return (
    <footer className="bg-khder py-8">
      <div className="w-full px-8">
        <div > 
            <h2 className="font-bold text-lfond mb-4">Assistance</h2>
            <ul className="flex flex-row justify-between w-full">
              <li><a href="#" className="text-lfond hover:text-yellow-500">FAQ</a></li>
              <li><h3 className="text-lfond hover:text-yellow-500">Contactez nous</h3></li>
              <li><h3 className="text-lfond hover:text-yellow-500">Fax : xxxxxxxx</h3></li>
              <li><h3 className="text-lfond hover:text-yellow-500">Email : x@gmail.com</h3></li>
              <li><a href="#" className="text-lfond hover:text-yellow-500">Privacy Policy</a></li>
            </ul>
        </div>
        <div className="pt-8 border-t border-gray-200 text-center text-lfond">
          <p>© 2025 Pharmacy Platform. Tous droits réservés.</p>
        </div>
      </div>
    </footer>
  );
}

{/*export default function Footer() {
  return (
    <footer className="text-center p-6 bg-gray-800 text-white">
      <p>© 2025 Ma Plateforme - Tous droits réservés</p>
    </footer>
  );
}*/}

